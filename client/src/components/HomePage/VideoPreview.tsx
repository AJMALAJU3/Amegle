import React, { useEffect, useState } from 'react'

const VideoPreview = () => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  
    useEffect(() => {
      const requestPermissions = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          });
          setHasPermission(true);
          setVideoStream(stream); 
        } catch (error) {
          console.error('Permission denied or error:', error);
          setHasPermission(false);
        }
      };
  
      requestPermissions();
    }, []);
  return (
    <>
    {hasPermission ? (
        <div id="video-preview" >
          <video
            autoPlay
            muted
            ref={(videoRef) => {
              if (videoRef && videoStream) {
                videoRef.srcObject = videoStream;
              }
            }}
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>
      ) : (
        <div className="text-red-500">Please grant camera and microphone permissions.</div>
      )}
    </>
  )
}

export default VideoPreview
