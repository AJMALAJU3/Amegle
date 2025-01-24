import { UserState } from "../store/slices/userSlice";
import * as wss from "./wss";
import Peer from "peerjs";

const defaultConstraints: MediaStreamConstraints = {
    audio: true,
    video: true
};

let localStream: MediaStream | null = null;
let peers: any = {};
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

        peers[connUserSocketId] = new Peer();

        peers[connUserSocketId].on("open", (id) => {
            console.log("Peer ID:", id);
        });

        peers[connUserSocketId].on("call", (call) => {
            call.answer(localStream!);
            call.on("stream", (remoteStream) => {
                console.log("New stream received");
                addStream(remoteStream, connUserSocketId);
                streams.push(remoteStream);
            });
        });

        const call = peers[connUserSocketId].call(connUserSocketId, localStream!);
        call.on("stream", (remoteStream) => {
            console.log("New stream received");
            addStream(remoteStream, connUserSocketId);
            streams.push(remoteStream);
        });
    } catch (error) {
        console.error("Error creating PeerJS object:", error);
    }
};

export const handleSignalData = (data: { connUserSocketId: string; signal: any }): void => {
    const { connUserSocketId } = data;
    if (peers[connUserSocketId]) {
        console.log(`Handling signal data for peer: ${connUserSocketId}`);
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

const removeStream = (connUserSocketId: string): void => {
    console.log("➖ Removing peer video:", connUserSocketId);

    const videoContainer = document.getElementById(connUserSocketId);
    if (videoContainer) {
        videoContainer.remove();
    }
};
