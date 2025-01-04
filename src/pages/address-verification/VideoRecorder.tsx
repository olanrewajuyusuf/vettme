import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiRecordFill } from "react-icons/pi";
import { FaPlayCircle, FaStopCircle, FaPause } from "react-icons/fa";
import { FcSwitchCamera } from "react-icons/fc";
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
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('user');
  const navigate = useNavigate();

  useEffect(() => {
    const startWebcam = async (facingMode: 'user' | 'environment') => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });
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

    startWebcam(cameraFacingMode);

    return () => {
      if (videoRef.current?.srcObject instanceof MediaStream) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cameraFacingMode]);

  const switchCamera = async () => {
    if (recording) {
      alert("Please stop recording before switching the camera.");
      return;
    }

    setCameraFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

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
      try {
        mediaRecorderRef.current.pause();
        setPaused(true);
        if (timerRef.current) clearInterval(timerRef.current);
      } catch (err) {
        console.warn("Pause is not supported on this device.");
        setPaused(false); // Fallback: indicate it's not paused
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recording && paused) {
      try {
        mediaRecorderRef.current.resume();
        setPaused(false);
        timerRef.current = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000);
      } catch (err) {
        console.warn("Resume is not supported on this device.");
      }
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
        <div className={`flex justify-center items-center gap-2 text-3xl absolute bottom-14 left-1/2 -translate-x-1/2`}>
          {recording && (
            <>
              {!paused ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={pauseRecording} aria-label="Pause Recording">
                      <FaPause className="text-yellow-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pause</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={resumeRecording} aria-label="Resume Recording">
                      <FaPlayCircle className="text-yellow-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Resume</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={stopRecording} aria-label="Stop Recording">
                    <FaStopCircle className="text-destructive" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Stop</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
          {!recording && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={startRecording} aria-label="Start Recording">
                  <PiRecordFill className="text-destructive" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start Recording</p>
              </TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={switchCamera} aria-label="Switch Camera">
                Switch Camera
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <FcSwitchCamera />
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
