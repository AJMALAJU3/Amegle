import { UserState } from "../store/slices/userSlice";
import * as wss from "./wss";
import Peer, { SignalData } from "simple-peer";

const getConfiguration = () => ({
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        }
    ]
});

const defaultConstraints: MediaStreamConstraints = {
    audio: true,
    video: true
};

let localStream: MediaStream | null = null;
let peers:any= {};
let streams: MediaStream[] = [];

export const getLocalPreviewAndInitRoomConnection = async (
    user: UserState,
    roomId: string | null = null
): Promise<void> => {
    try {

        localStream = await navigator.mediaDevices.getUserMedia(defaultConstraints);
        console.log("Successfully received local stream");

        showLocalVideoPreview(localStream);

        if (!roomId) {
            wss.createNewRoom(user);
        } else {
            wss.joinRoom(user, roomId as string);
        }
    } catch (error) {
        console.error("Error accessing local stream:", error);
    }
};

export const prepareNewPeerConnection = (connUserSocketId: any, isInitiator: boolean) => {
    try {
        if (!localStream) {
            console.error("localStream is not initialized!");
            return;
        }

        console.log("prepareNewPeerConnection function", connUserSocketId, isInitiator);

        if (window.RTCPeerConnection && window.crypto && (window.crypto as any).getRandomValues) {
            // WebRTC and secure random numbers are supported
        } else {
            console.error("Your browser does not support WebRTC or secure random number generation.");
        }
        

        const configuration = getConfiguration();

        // Initialize the Peer object
        peers[connUserSocketId] = new Peer({
            initiator: isInitiator,
            config: configuration,
            stream: localStream
        });

        
        peers[connUserSocketId].on("signal", (data: any) => {
            console.log("connUser socketId==================>",connUserSocketId,"signal data===================================>",data)
            const signalData = {
                signal: data,
                connUserSocketId: connUserSocketId
            };
            wss.signalPeerData(signalData);
        });

        peers[connUserSocketId].on("stream", (stream: any) => {
            console.log("new stream received");

            addStream(stream, connUserSocketId);
            streams.push(stream);
        });
    } catch (error) {
        console.error("Error creating Peer object:", error);
    }
};



export const handleSignalData = (data: { connUserSocketId: string; signal: SignalData }): void => {
    const { connUserSocketId, signal } = data;
    if (peers[connUserSocketId]) {
        peers[connUserSocketId].signal(signal);
    } else {
        console.warn(`⚠️ Peer connection not found for: ${connUserSocketId}`);
    }
};



///////////////////// UI VIDEO FUNCTIONS /////////////////////
const showLocalVideoPreview = (stream: MediaStream): void => {
    const videosContainer = document.getElementById("videos_portal") as HTMLDivElement;
    videosContainer.classList.add("videos_portal_styles");

    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video_track_container");

    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => videoElement.play();

    videoContainer.appendChild(videoElement);
    videosContainer.appendChild(videoContainer);
};


const addStream = (stream: MediaStream, connUserSocketId: string): void => {
    console.log("➕ Adding new peer video:", connUserSocketId);

    const videosContainer = document.getElementById("videos_portal") as HTMLDivElement;
    const videoContainer = document.createElement("div");
    videoContainer.id = connUserSocketId;
    videoContainer.classList.add("video_track_container");

    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.srcObject = stream;
    videoElement.id = `${connUserSocketId}-video`;

    videoElement.onloadedmetadata = () => videoElement.play();

    videoContainer.appendChild(videoElement);
    videosContainer.appendChild(videoContainer);
};

/**
 * Remove peer's video stream from UI when they disconnect
 * @param connUserSocketId string
 */
const removeStream = (connUserSocketId: string): void => {
    console.log("➖ Removing peer video:", connUserSocketId);

    const videoContainer = document.getElementById(connUserSocketId);
    if (videoContainer) {
        videoContainer.remove();
    }
};