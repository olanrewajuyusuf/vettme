import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiRecordFill } from "react-icons/pi";
import { FaPlayCircle, FaStopCircle, FaPause } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useVideoContext } from '@/utils/context/VideoContext';
import { formatTime } from '@/lib/formatter';

const VideoRecorder: React.FC = () => {
  const { setVideo } = useVideoContext();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0); // Timer in seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
          };
        }
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
      } catch (err) {
        console.error('Error accessing webcam:', err);
        alert('Failed to access webcam. Please check your permissions.');
      }
    };

    startWebcam();

    return () => {
      if (videoRef.current?.srcObject instanceof MediaStream) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      if (timerRef.current) clearInterval(timerRef.current);
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
        const videoFile = new File([blob], "recorded-video.webm", { type: "video/webm" });
        setVideo(videoFile);
      };
      mediaRecorderRef.current.start();
      setRecording(true);
      setPaused(false);

      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setPaused(false);

      if (videoRef.current?.srcObject instanceof MediaStream) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }

      if (timerRef.current) clearInterval(timerRef.current);
      setTime(0);

      if (window.history.length > 1) {
        navigate(-1); // Go back to the last page
      } else {
        navigate('/'); // Fallback to homepage if no history
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recording && !paused) {
      mediaRecorderRef.current.pause();
      setPaused(true);

      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recording && paused) {
      mediaRecorderRef.current.resume();
      setPaused(false);

      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
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
      <TooltipProvider>
        <div className={`flex justify-center items-center ${recording? 'gap-2' : 'gap-0'} text-6xl absolute bottom-14 left-1/2 -translate-x-1/2`}>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <span>
                {recording && !paused && (
                  <button 
                    onClick={pauseRecording} aria-label="Pause Recording" 
                    className='w-14 h-14 bg-white text-[20px] rounded-full place-items-center'
                  >
                    <FaPause className={`text-destructive hover:text-yellow-400`} />
                  </button>
                )}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Pause</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <span>
                {recording && paused && (
                  <button 
                    onClick={resumeRecording} aria-label="Resume Recording"
                    className='w-14 h-14 bg-white text-[20px] rounded-full place-items-center'
                  >
                    <FaPlayCircle className="text-destructive hover:text-yellow-400" />
                  </button>
                )}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Resume</p>
            </TooltipContent>
          </Tooltip>
          {recording && <hr className='w-[1px] h-14 bg-gray-200' />}
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <span>
              {recording && (
                <button onClick={stopRecording} aria-label="Stop Recording">
                  <FaStopCircle className='bg-destructive text-white rounded-full' />
                </button>
              )}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Stop</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <span>
              {!recording && (
                <button onClick={startRecording} aria-label="Start Recording">
                  <PiRecordFill
                    className='text-destructive bg-white rounded-full'
                  />
                </button>
              )}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Start Recording</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      {recording && (
        <div className="absolute top-5 left-5 text-white bg-black px-4 py-2 rounded-lg">
          <p>Recording Time: {formatTime(time)}</p>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
