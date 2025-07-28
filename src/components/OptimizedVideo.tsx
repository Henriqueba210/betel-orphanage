import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface OptimizedVideoProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  onClick?: () => void;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export default function OptimizedVideo({
  src,
  alt,
  caption,
  className = "",
  onClick,
  poster,
  autoplay = false,
  muted = true,
  loop = false
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [volume, setVolume] = useState(1);
  const [isError, setIsError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [showCenterButton, setShowCenterButton] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const centerButtonTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Handle video load events
  const handleLoadStart = () => {
    setIsLoaded(false);
  };

  const handleCanPlay = () => {
    setIsLoaded(true);
    // Set initial volume
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
    // If autoplay is enabled, start playing and update state
    if (autoplay && videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay failed (common in browsers that block autoplay)
        setIsPlaying(false);
      });
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleError = () => {
    setIsError(true);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  // Handle play/pause
  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle mute/unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
      } else if (newVolume === 0 && !isMuted) {
        setIsMuted(true);
      }
    }
  };

  // Toggle volume slider visibility
  const toggleVolumeSlider = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVolumeSlider(!showVolumeSlider);
  };

  // Show volume slider on hover
  const handleVolumeHover = () => {
    setShowVolumeSlider(true);
  };

  // Hide volume slider on leave
  const handleVolumeLeave = () => {
    setShowVolumeSlider(false);
  };

  // Handle scrubber change
  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Format time to MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Show controls on hover/mouse move
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Handle center click for play/pause
  const handleCenterClick = () => {
    togglePlay();
    
    // Show center button briefly
    setShowCenterButton(true);
    if (centerButtonTimeoutRef.current) {
      clearTimeout(centerButtonTimeoutRef.current);
    }
    centerButtonTimeoutRef.current = setTimeout(() => {
      setShowCenterButton(false);
    }, 600);
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load video when it comes into view
            video.load();
            observer.unobserve(video);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (centerButtonTimeoutRef.current) {
        clearTimeout(centerButtonTimeoutRef.current);
      }
    };
  }, []);

  if (isError) {
    return (
      <div className={`bg-base-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🎥</div>
          <p className="text-sm text-base-content/60">Video not available</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onClick={handleCenterClick}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-base-200 animate-pulse flex items-center justify-center">
          <div className="text-base-content/30">Loading video...</div>
        </div>
      )}

      {/* Optimized video */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        poster={poster}
        preload="metadata"
        autoPlay={autoplay}
        muted={isMuted}
        loop={loop}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        onError={handleError}
        style={{
          aspectRatio: '16/9',
        }}
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* YouTube-style center play/pause button */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          showCenterButton ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="bg-black/70 hover:bg-black/80 text-white p-4 rounded-full transition-all duration-200 cursor-pointer">
          {isPlaying ? (
            <Play size={32} fill="white" className="ml-1" />
          ) : (
            <Pause size={32} fill="white" />
          )}
        </div>
      </div>

      {/* Caption overlay */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pb-20">
          <p className="text-white text-sm font-medium">{caption}</p>
        </div>
      )}

      {/* Video controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div className="mb-3" onClick={(e) => e.stopPropagation()}>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleScrubberChange}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, white 0%, white ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) 100%)`
            }}
            aria-label="Video progress"
            title="Video progress"
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play/Pause button */}
            <button
              onClick={togglePlay}
              className="text-white hover:text-gray-300 hover:scale-110 transition-all duration-200 p-1 rounded"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            {/* Time display */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Volume control */}
          <div 
            className="flex items-center gap-2 relative"
            onMouseEnter={handleVolumeHover}
            onMouseLeave={handleVolumeLeave}
          >
            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-300 hover:scale-110 transition-all duration-200 p-1 rounded"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            
            {/* Volume slider */}
            <div className={`transition-all duration-300 flex items-center ${showVolumeSlider ? 'w-20 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer volume-slider"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) 100%)`
                }}
                aria-label="Volume control"
                title="Volume control"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom slider styles */}
      <style>{`
        .slider::-webkit-slider-thumb,
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
        }
        .slider::-moz-range-thumb,
        .volume-slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </motion.div>
  );
} 