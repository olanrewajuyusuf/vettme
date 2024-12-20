import React, { useEffect, useRef, useState } from 'react';
import { PiRecordFill } from "react-icons/pi";
import { FaPlayCircle, FaStopCircle, FaPause } from "react-icons/fa";

const VideoRecorder: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  // Start webcam automatically on mount
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    startWebcam();
    return () => {
      // Cleanup webcam stream on unmount
      if (videoRef.current?.srcObject instanceof MediaStream) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      const chunks: Blob[] = [];
      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
      };
      mediaRecorderRef.current.start();
      setRecording(true);
      setPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setPaused(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recording && !paused) {
      mediaRecorderRef.current.pause();
      setPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recording && paused) {
      mediaRecorderRef.current.resume();
      setPaused(false);
    }
  };

  return (
    <div className='bg-background w-full h-svh relative'>
      <video
        ref={videoRef}
        autoPlay
        muted
        className='w-[100%] h-full object-cover'
      />
      <div className='flex justify-center items-center gap-2 text-3xl bg-white h-14 px-5 rounded-full absolute bottom-14 left-1/2 -translate-x-1/2'>
        {recording && !paused && <button onClick={pauseRecording}><FaPause className={`${recording? 'text-blue':'none'} hover:text-yellow-400`} /></button>}
        {recording && paused && <button onClick={resumeRecording}><FaPlayCircle /></button>}
        <button onClick={stopRecording}><FaStopCircle className='hover:text-yellow-300' /></button>
        <hr className='w-[1px] h-10 bg-black'/>
        <button onClick={startRecording}><PiRecordFill  className={`${!recording? 'none': "text-destructive"} hover:text-destructive text-[32px]`} /></button>
      </div>
      {/* {videoURL && (
        <div>
          <h2>Recorded Video</h2>
          <video
            src={videoURL}
            controls
            style={{ width: '100%', maxWidth: '500px' }}
          />
        </div>
      )} */}
    </div>
  );
};

export default VideoRecorder;
