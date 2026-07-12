import { useEffect, useRef, useState } from "react";

import LoadingOverlay from "./LoadingOverlay";
import PlayerControls from "./PlayerControls";

export default function Player({

    movie,
    onBack,
    onSaveProgress,
    resumePosition = 0

}) {

    const playerRef = useRef(null);
    const videoRef = useRef(null);

    const [loading, setLoading] = useState(true);

    const [playing, setPlaying] = useState(true);

    const [showControls, setShowControls] = useState(true);

    const [currentTime, setCurrentTime] = useState(0);

    const [duration, setDuration] = useState(0);

    const [volume, setVolume] = useState(1);

    const [muted, setMuted] = useState(false);

    const [fullscreen, setFullscreen] = useState(false);

    const [progress, setProgress] = useState(0);

    const hideTimer = useRef(null);

    // --------------------------------------------------
    // Resume Playback
    // --------------------------------------------------

    useEffect(() => {

        if (!videoRef.current) return;

        videoRef.current.currentTime = resumePosition;

    }, [resumePosition]);

    // --------------------------------------------------
    // Auto Hide Controls
    // --------------------------------------------------

    useEffect(() => {

        const move = () => {

            setShowControls(true);

            clearTimeout(hideTimer.current);

            hideTimer.current = setTimeout(() => {

                setShowControls(false);

            }, 3000);

        };

        window.addEventListener("mousemove", move);

        move();

        return () => {

            window.removeEventListener("mousemove", move);

            clearTimeout(hideTimer.current);

        };

    }, []);

    // --------------------------------------------------
    // Save Progress
    // --------------------------------------------------

    useEffect(() => {

        const interval = setInterval(() => {

            if (!videoRef.current) return;

            onSaveProgress?.(

                Math.floor(videoRef.current.currentTime),

                Math.floor(videoRef.current.duration || 0)

            );

        }, 5000);

        return () => clearInterval(interval);

    }, [onSaveProgress]);

    // --------------------------------------------------

    const togglePlay = () => {

        if (!videoRef.current) return;

        if (videoRef.current.paused) {

            videoRef.current.play();

        } else {

            videoRef.current.pause();

        }

    };

    const seek = (percent) => {

        if (!videoRef.current) return;

        videoRef.current.currentTime =
            (percent / 100) * duration;

    };

    const skip = (seconds) => {

        if (!videoRef.current) return;

        videoRef.current.currentTime += seconds;

    };

    const toggleMute = () => {

        if (!videoRef.current) return;

        videoRef.current.muted = !muted;

        setMuted(!muted);

    };

    const changeVolume = (value) => {

        if (!videoRef.current) return;

        videoRef.current.volume = value;

        setVolume(value);

    };

    const toggleFullscreen = () => {

        if (!playerRef.current) return;

        if (!document.fullscreenElement) {

            playerRef.current.requestFullscreen();

            setFullscreen(true);

        } else {

            document.exitFullscreen();

            setFullscreen(false);

        }

    };

    return (

        <div

            ref={playerRef}

            style={{

                width: "100vw",

                height: "100vh",

                background: "#000",

                position: "relative",

                overflow: "hidden",

                cursor: showControls ? "default" : "none"

            }}

        >

            {loading && (

                <LoadingOverlay />

            )}

            <video

                ref={videoRef}

                autoPlay

                playsInline

                preload="metadata"

                onLoadedMetadata={() => {

                    setLoading(false);

                    setDuration(videoRef.current.duration);

                }}

                onTimeUpdate={() => {

                    const current = videoRef.current.currentTime;

                    const total = videoRef.current.duration || 1;

                    setCurrentTime(current);

                    setProgress((current / total) * 100);

                }}

                onPlay={() => setPlaying(true)}

                onPause={() => setPlaying(false)}

                style={{

                    width: "100%",

                    height: "100%",

                    objectFit: "contain",

                    background: "#000"

                }}

            >

                <source src={movie.video_url} />

            </video>

            <PlayerControls

                movie={movie}

                playing={playing}

                showControls={showControls}

                progress={progress}

                currentTime={currentTime}

                duration={duration}

                volume={volume}

                muted={muted}

                fullscreen={fullscreen}

                onBack={onBack}

                onPlayPause={togglePlay}

                onSeek={seek}

                onSkipForward={() => skip(10)}

                onSkipBackward={() => skip(-10)}

                onMute={toggleMute}

                onVolume={changeVolume}

                onFullscreen={toggleFullscreen}

            />

        </div>

    );

}