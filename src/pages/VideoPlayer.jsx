import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieApi, userApi } from "../lib/api";

import {
  HiArrowLeft,
  HiFilm,
  HiPlay,
  HiPause,
  HiSpeakerWave,
  HiSpeakerXMark,
  HiForward,
  HiBackward,
  HiArrowsPointingOut,
  HiArrowsPointingIn
} from "react-icons/hi2";

export default function VideoPlayer() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [centerIcon, setCenterIcon] = useState("");
  const [buffering, setBuffering] = useState(false);
  const [seekIndicator, setSeekIndicator] = useState("");
  const token = localStorage.getItem("stream_token");
  const handleDoubleClick = (e) => {

    if (!videoRef.current) return;

    const isLeft = e.currentTarget.style.left === "0px";

    if (isLeft) {

      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 10
      );

      setSeekIndicator("-10");

    } else {

      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 10
      );

      setSeekIndicator("+10");

    }

    setTimeout(() => {

      setSeekIndicator("");

    }, 500);

  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load movie

  useEffect(() => {

    async function loadMovie() {

      try {

        const data = await movieApi.getDetails(id);

        setMovie(data);

      } catch (err) {

        console.error(err);

      }

    }

    loadMovie();

  }, [id]);

  // Save Progress

  useEffect(() => {

    const timer = setInterval(() => {

      if (!videoRef.current) return;

      userApi.updateProgress(
        Number(id),
        Math.floor(videoRef.current.currentTime),
        Math.floor(videoRef.current.duration || 0)
      ).catch(console.error);

    }, 5000);

    return () => clearInterval(timer);

  }, [id, token]);

  // ======================================================
  // PLAYER FUNCTIONS
  // ======================================================

  const togglePlay = () => {

    if (!videoRef.current) return;

    if (videoRef.current.paused) {

      videoRef.current.play();

      setPlaying(true);

      setCenterIcon("play");

    } else {

      videoRef.current.pause();

      setPlaying(false);

      setCenterIcon("pause");

    }

    setTimeout(() => {

      setCenterIcon("");

    }, 500);

  };

  const skipForward = () => {

    if (!videoRef.current) return;

    videoRef.current.currentTime += 10;

  };

  const skipBackward = () => {

    if (!videoRef.current) return;

    videoRef.current.currentTime -= 10;

  };

  const handleProgress = () => {

    if (!videoRef.current || isDragging) return;

    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 0;

    setCurrentTime(current);
    setDuration(total);

    setProgress(
      total ? (current / total) * 100 : 0
    );

  };

  const seekVideo = (e) => {

    if (!videoRef.current) return;

    const value = Number(e.target.value);

    videoRef.current.currentTime =

      (value / 100) * videoRef.current.duration;

  };

  const toggleMute = () => {

    if (!videoRef.current) return;

    videoRef.current.muted = !muted;

    setMuted(!muted);

  };

  const changeVolume = (e) => {

    if (!videoRef.current) return;

    const value = Number(e.target.value);

    videoRef.current.volume = value;

    setVolume(value);

  };

  const toggleFullscreen = async () => {

    if (!playerRef.current) return;

    if (!document.fullscreenElement) {

      await playerRef.current.requestFullscreen();

    } else {

      await document.exitFullscreen();

    }

  };

  useEffect(() => {

    const updateFullscreen = () => {

      setFullscreen(!!document.fullscreenElement);

    };

    document.addEventListener(
      "fullscreenchange",
      updateFullscreen
    );

    return () => {

      document.removeEventListener(
        "fullscreenchange",
        updateFullscreen
      );

    };

  }, []);

  const formatTime = (seconds) => {

    if (!seconds) return "00:00";

    const hrs = Math.floor(seconds / 3600);

    const mins = Math.floor((seconds % 3600) / 60);

    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {

      return `${hrs}:${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;

    }

    return `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;

  };

  const hideTimer = useRef(null);

  const showPlayerControls = () => {

    setShowControls(true);

    document.body.style.cursor = "default";

    clearTimeout(hideTimer.current);

    if (!videoRef.current) return;

    if (videoRef.current.paused) return;

    hideTimer.current = setTimeout(() => {

      setShowControls(false);

      document.body.style.cursor = "none";

    }, 3000);

  };

  useEffect(() => {

    const handleKeys = (e) => {

      if (!videoRef.current) return;

      switch (e.code) {

        case "Space":

          e.preventDefault();

          togglePlay();

          break;

        case "ArrowRight":

          videoRef.current.currentTime += 10;

          break;

        case "ArrowLeft":

          videoRef.current.currentTime -= 10;

          break;

        case "ArrowUp":

          e.preventDefault();

          videoRef.current.volume = Math.min(
            1,
            videoRef.current.volume + 0.1
          );

          setVolume(videoRef.current.volume);

          break;

        case "ArrowDown":

          e.preventDefault();

          videoRef.current.volume = Math.max(
            0,
            videoRef.current.volume - 0.1
          );

          setVolume(videoRef.current.volume);

          break;

        case "KeyM":

          videoRef.current.muted =
            !videoRef.current.muted;

          setMuted(videoRef.current.muted);

          break;

        case "KeyF":

          toggleFullscreen();

          break;

        default:

          break;

      }

      showPlayerControls();

    };

    window.addEventListener("keydown", handleKeys);

    return () => {

      window.removeEventListener(
        "keydown",
        handleKeys
      );

    };

  }, [volume]);

  useEffect(() => {

    showPlayerControls();

    window.addEventListener("mousemove", showPlayerControls);

    return () => {

      clearTimeout(hideTimer.current);

      window.removeEventListener(
        "mousemove",
        showPlayerControls
      );

      document.body.style.cursor = "default";

    };

  }, []);


  if (!movie) {

    return (

      <div

        onMouseMove={() => setShowControls(true)}

        style={{

          background: "#000105",

          color: "white",

          height: "100vh",

          display: "grid",

          placeItems: "center",

          fontSize: "34px",

          fontWeight: 600

        }}

      >

        Loading FlixBridge Player...

      </div>

    );

  }

  return (

    <div

        ref={playerRef}

        style={{

            background:"#000",

            width:"100%",

            height:"100vh",

            overflow:"hidden",

            position:"relative"

        }}

    >

      {/* ================= TOP OVERLAY ================= */}

      <div

        style={{

          position: "absolute",

          top: 0,

          left: 0,

          width: "100%",

          padding: "22px 32px",

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          background:

            "linear-gradient(to bottom, rgba(0,0,0,.85), transparent)",

          zIndex: 100

        }}

      >

        <div

          style={{

            display: "flex",

            alignItems: "center",

            gap: 16

          }}

        >

          <button

            onClick={() => navigate(-1)}

            style={{

              width: 46,

              height: 46,

              borderRadius: "50%",

              border: "none",

              background: "rgba(255,255,255,.12)",

              color: "white",

              cursor: "pointer",

              display: "grid",

              placeItems: "center",

              backdropFilter: "blur(12px)"

            }}

          >

            <HiArrowLeft size={22} />

          </button>

          <div>

            <div

              style={{

                color: "white",

                fontSize: 24,

                fontWeight: 700

              }}

            >

              {movie.title}

            </div>

            <div

              style={{

                color: "#B9C0CF",

                marginTop: 4,

                fontSize: 14

              }}

            >

              <HiFilm

                style={{

                  display: "inline",

                  marginRight: 6

                }}

              />

              FlixBridge Player

            </div>

          </div>

        </div>

        <div

          style={{

            display: "flex",

            gap: 12

          }}

        >

          <div

            style={badge}

          >

            {movie.resolution}

          </div>

          <div

            style={badge}

          >

            {movie.audio}

          </div>

        </div>

      </div>

      {/* ================= VIDEO ================= */}

      <video

        ref={videoRef}
        autoPlay
        onClick={togglePlay}
        onTimeUpdate={handleProgress}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => setBuffering(false)}
        onCanPlay={() => setBuffering(false)}

        style={{

          width: "100%",

          height: "100%",

          objectFit: "contain",

          background: "#000"

        }}

        onLoadedMetadata={() => {

          userApi
          .getMovieProgress(id)
          .then((progress) => {

            if (videoRef.current) {
              videoRef.current.currentTime =
                progress.position_seconds || 0;
            }

          })
          .catch(console.error);

        }}

      >

        <source
          src={movieApi.getStreamUrl(id)}
        />

      </video>

      <div
        onDoubleClick={handleDoubleClick}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "50%",
          height: "100%",
          zIndex: 5
        }}
      />

      <div
        onDoubleClick={handleDoubleClick}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          zIndex: 5
        }}
      />

        {centerIcon && (

        <div

        style={{

        position:"absolute",

        left:"50%",

        top:"50%",

        transform:"translate(-50%,-50%)",

        width:120,

        height:120,

        borderRadius:"50%",

        background:"rgba(0,0,0,.55)",

        backdropFilter:"blur(18px)",

        display:"grid",

        placeItems:"center",

        animation:"fadeScale .5s ease",

        zIndex:250,

        pointerEvents:"none"

        }}

        

        >

        {

        centerIcon==="play"

        ?

        <HiPlay size={60} color="white"/>

        :

        <HiPause size={60} color="white"/>

        }

        </div>

        )}

        {buffering && (

        <div
        style={{
        position:"absolute",
        inset:0,
        display:"grid",
        placeItems:"center",
        background:"rgba(0,0,0,.25)",
        backdropFilter:"blur(3px)",
        zIndex:220
        }}
        >

        <div
        style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:18
        }}
        >

        <div
        style={{
        width:70,
        height:70,
        borderRadius:"50%",
        border:"5px solid rgba(255,255,255,.15)",
        borderTop:"5px solid #E50914",
        animation:"flixSpin 1s linear infinite"
        }}
        />

        <div
        style={{
        color:"white",
        fontWeight:600,
        fontSize:18,
        letterSpacing:.4
        }}
        >
        Buffering...
        </div>

        </div>

        </div>

        )}

        {seekIndicator && (

        <div
        style={{
        position:"absolute",
        left:"50%",
        top:"50%",
        transform:"translate(-50%,-50%)",
        padding:"18px 34px",
        borderRadius:"999px",
        background:"rgba(0,0,0,.65)",
        backdropFilter:"blur(20px)",
        color:"white",
        fontWeight:700,
        fontSize:34,
        zIndex:240,
        pointerEvents:"none",
        animation:"fadeScale .5s ease"
        }}
        >

        {seekIndicator}s

        </div>

        )}

     {/* ===========================
      PLAYER CONTROLS
      =========================== */}

      <div
        style={{
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? "auto" : "none",
          transition: "opacity .35s"
        }}
      >

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "28px",
            background:
              "linear-gradient(to top, rgba(0,0,0,.92), transparent)",
            zIndex: 100
          }}
        >

    {/* ================= PROGRESS BAR ================= */}

    <div
      style={{
        width: "100%",
        marginBottom: 22
      }}
    >

    <input
    type="range"
    min="0"
    max="100"
    value={progress}
    onMouseDown={() => setIsDragging(true)}
    onMouseUp={(e) => {

    setIsDragging(false);

    const value = Number(e.target.value);

    setProgress(value);

    videoRef.current.currentTime =
    (value / 100) * duration;

    }}
    onChange={(e) => {

    const value = Number(e.target.value);

    setProgress(value);

    }}
    style={{

    width: "100%",

    cursor: "pointer",

    accentColor: "#E50914",

    height: "6px"

    }}
    />

    </div>

      <div

      style={{

      display:"flex",

      justifyContent:"space-between",

      alignItems:"center"

      }}

      >

      {/* Left */}

      <div

      style={{

      display:"flex",

      alignItems:"center",

      gap:"14px"

      }}

      >

      <button
          onClick={skipBackward}
          style={controlButton}
          onMouseEnter={(e)=>{
            e.currentTarget.style.transform="scale(1.12)";
            e.currentTarget.style.background="rgba(229,9,20,.95)";
          }}
          onMouseLeave={(e)=>{
            e.currentTarget.style.transform="scale(1)";
            e.currentTarget.style.background="rgba(18,18,18,.55)";
          }}
      >
          <HiBackward size={22}/>
      </button>

      <button

      onClick={togglePlay}

      style={{

      ...controlButton,

      width:58,

      height:58,

      background:"linear-gradient(135deg,#E50914,#ff3d4d)"

      }}

      >

      {

      playing

      ?

      <HiPause size={28}/>

      :

      <HiPlay size={28}/>

      }

      </button>

      <button
          onClick={skipForward}
          style={controlButton}
          onMouseEnter={(e)=>{
            e.currentTarget.style.transform="scale(1.12)";
            e.currentTarget.style.background="rgba(229,9,20,.95)";
          }}
          onMouseLeave={(e)=>{
            e.currentTarget.style.transform="scale(1)";
            e.currentTarget.style.background="rgba(18,18,18,.55)";
          }}
      >

      <HiForward size={22}/>

      </button>

      <button

      onClick={toggleMute}

      style={controlButton}

      >

      {

      muted

      ?

      <HiSpeakerXMark size={20}/>

      :

      <HiSpeakerWave size={20}/>

      }

      </button>

      <input

      type="range"

      min="0"

      max="1"

      step="0.05"

      value={volume}

      onChange={changeVolume}

      style={{
        width:120,
        cursor:"pointer",
        accentColor:"#E50914",
        transition:".25s"
      }}

      />

      <span

      style={{

      color:"white",

      fontWeight:600,

      marginLeft:"12px"

      }}

      >

      {formatTime(currentTime)}

      {" / "}

      {formatTime(duration)}

      
      </span>

      </div>

      {/* Right */}

      <div>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFullscreen();
        }}
        style={controlButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.12)";
          e.currentTarget.style.background = "rgba(229,9,20,.95)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "rgba(18,18,18,.55)";
        }}
      >
        {fullscreen ? (
          <HiArrowsPointingIn size={22} />
        ) : (
          <HiArrowsPointingOut size={22} />
        )}
      </button>

      </div>

      </div>

      </div>

      </div>

    </div>

  );

}

const badge = {

  padding: "9px 16px",

  borderRadius: "999px",

  background: "rgba(255,255,255,.12)",

  color: "white",

  fontSize: 13,

  fontWeight: 600,

  backdropFilter: "blur(12px)"

};

const controlButton = {
  width: 50,
  height: 50,
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,.08)",
  background: "rgba(18,18,18,.55)",
  backdropFilter: "blur(20px)",
  color: "#fff",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  transition: "all .25s ease",
  boxShadow: "0 10px 35px rgba(0,0,0,.45)"
};


if (!document.getElementById("flix-player-animation")) {

const style=document.createElement("style");

style.id="flix-player-animation";

style.innerHTML = `

@keyframes fadeScale{

0%{
opacity:0;
transform:translate(-50%,-50%) scale(.6);
}

35%{
opacity:1;
transform:translate(-50%,-50%) scale(1);
}

100%{
opacity:0;
transform:translate(-50%,-50%) scale(1.25);
}

}

@keyframes flixSpin{

0%{
transform:rotate(0deg);
}

100%{
transform:rotate(360deg);
}

}

`;

document.head.appendChild(style);

}