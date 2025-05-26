import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { PiRecordFill } from "react-icons/pi";
import { FaPlayCircle, FaStopCircle, FaPause } from "react-icons/fa";
import { FcSwitchCamera } from "react-icons/fc";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useVideoContext } from '@/hooks/useVideoContext';
import { formatTime } from '@/lib/formatter';
import { uploadToCloudinary } from '@/lib/cloudinary';

const getSupportedMimeType = (): string => {
  const mimeTypes = [
    "video/webm; codecs=vp8,opus",      // WebM (VP8/Opus) - Supported on most browsers except Safari
    "video/webm; codecs=vp9,opus",      // WebM (VP9/Opus) - Better quality, but similar compatibility
    "video/mp4; codecs=h264,aac",       // MP4 (H.264/AAC) - Best for Safari & iOS
    "video/mp4; codecs=avc1.64001E,mp4a.40.2", // H.264 Variant (More compatibility)
    "video/ogg; codecs=theora,vorbis",  // Ogg (Rare, but supported on some platforms)
    "video/3gpp",                       // 3GP - Older mobile support (low-quality)
    "video/x-matroska; codecs=avc1,opus" // Matroska (MKV) - Experimental
];
  return mimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || "";
};

const VideoRecorder: React.FC = () => {
  const { setVideo } = useVideoContext();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('user');
  const navigate = useNavigate();
  const chunksRef = useRef<Blob[]>([]);
  const mimeType = getSupportedMimeType();

  useEffect(() => {
    const startWebcam = async (facingMode: 'user' | 'environment') => {
      try {
        const constraints = {
          video: {
            facingMode,
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          audio: true,
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => videoRef.current?.play();
        }

        if (!mimeType) {
          toast.error("No supported video format found.");
          return;
        }

        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) chunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = handleRecordingStop;
      } catch (err) {
        console.error('Error accessing webcam:', err);
        toast.error("Failed to access webcam. Check permissions.");
      }
    };

    startWebcam(cameraFacingMode);

    return () => {
      stopStream();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cameraFacingMode]);

  const stopStream = () => {
    if (videoRef.current?.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const switchCamera = () => {
    if (recording) {
      toast.error("Stop recording before switching cameras.");
      return;
    }
    setCameraFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  const startRecording = () => {
    if (!mediaRecorderRef.current) {
      toast.error("MediaRecorder is not available.");
      return;
    }

    chunksRef.current = []; 

    mediaRecorderRef.current.start();
    setRecording(true);
    setPaused(false);

    timerRef.current = setInterval(() => setTime(prev => prev + 1), 1000);
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    
    mediaRecorderRef.current.stop();
    setRecording(false);
    setPaused(false);

    stopStream();

    if (timerRef.current) clearInterval(timerRef.current);
    setTime(0);

    navigate(-1);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.pause();
      setPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current?.state === "paused") {
      mediaRecorderRef.current.resume();
      setPaused(false);
      timerRef.current = setInterval(() => setTime(prev => prev + 1), 1000);
    }
  };

  const handleRecordingStop = async () => {
    const blob = new Blob(chunksRef.current, { type: mimeType });

    if (blob.size === 0) {
      toast.error("Recording failed.");
      return;
    }

    const fileType = mimeType.includes("mp4") ? "mp4" : "webm";
    const videoFile = new File([blob], `recorded-video.${fileType}`, { type: mimeType });

    try {
      const videoURL = await uploadToCloudinary(videoFile, 'vettmepro', 'video');

      if (videoURL) {
        setVideo(videoURL);
        toast.success("Video saved successfully!");
      } else {
        toast.error("Failed to upload video.");
      }
    } catch (error) {
      console.error("Error uploading video to Cloudinary:", error);
      toast.error("Upload failed. Try again.");
    }
  };

  return (
    <div className='bg-background w-full h-svh relative'>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className='w-full h-full object-cover'
      />

      <TooltipProvider>
        <div className="flex justify-center items-center gap-2 text-3xl absolute bottom-14 left-1/2 -translate-x-1/2">
          {recording ? (
            <>
              {!paused ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={pauseRecording} aria-label="Pause Recording">
                      <FaPause className="text-yellow-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent><p>Pause</p></TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={resumeRecording} aria-label="Resume Recording">
                      <FaPlayCircle className="text-yellow-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent><p>Resume</p></TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={stopRecording} aria-label="Stop Recording">
                    <FaStopCircle className="text-destructive" />
                  </button>
                </TooltipTrigger>
                <TooltipContent><p>Stop</p></TooltipContent>
              </Tooltip>
            </>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={startRecording} aria-label="Start Recording">
                  <PiRecordFill className="text-destructive" />
                </button>
              </TooltipTrigger>
              <TooltipContent><p>Start Recording</p></TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={switchCamera} aria-label="Switch Camera">
                <FcSwitchCamera />
              </button>
            </TooltipTrigger>
            <TooltipContent>Switch Camera</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      
      {recording && <div className="absolute top-5 left-5 text-white bg-black px-4 py-2 rounded-lg"><p>Recording Time: {formatTime(time)}</p></div>}
    </div>
  );
};

export default VideoRecorder;
