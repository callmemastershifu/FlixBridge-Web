import {
    HiPlay,
    HiPause,
    HiBackward,
    HiForward,
    HiSpeakerWave,
    HiSpeakerXMark,
    HiArrowLeft,
    HiArrowsPointingOut,
    HiArrowsPointingIn
} from "react-icons/hi2";

import ProgressBar from "./ProgressBar";
import VolumeSlider from "./VolumeSlider";

function formatTime(seconds){

    if(!seconds) return "00:00";

    const hrs=Math.floor(seconds/3600);

    const mins=Math.floor((seconds%3600)/60);

    const secs=Math.floor(seconds%60);

    if(hrs>0){

        return `${hrs}:${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;

    }

    return `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;

}

export default function PlayerControls({

    movie,

    showControls,

    playing,

    progress,

    currentTime,

    duration,

    volume,

    muted,

    fullscreen,

    onBack,

    onPlayPause,

    onSeek,

    onSkipForward,

    onSkipBackward,

    onMute,

    onVolume,

    onFullscreen

}){

return(

<div

style={{

position:"absolute",

inset:0,

opacity:showControls?1:0,

pointerEvents:showControls?"auto":"none",

transition:"opacity .35s",

display:"flex",

flexDirection:"column",

justifyContent:"space-between"

}}

>

{/* TOP */}

<div

style={{

padding:"30px",

background:"linear-gradient(to bottom, rgba(0,0,0,.85), transparent)"

}}

>

<div

style={{

display:"flex",

alignItems:"center",

gap:"18px"

}}

>

<button

onClick={onBack}

style={circleButton}

>

<HiArrowLeft size={22}/>

</button>

<div>

<div

style={{

color:"white",

fontSize:"32px",

fontWeight:700

}}

>

{movie.title}

</div>

<div

style={{

marginTop:6,

color:"#BDBDBD",

fontSize:15

}}

>

{movie.release_year}

{" • "}

{movie.resolution}

{" • "}

{movie.audio}

</div>

</div>

</div>

</div>

{/* BOTTOM */}

<div

style={{

padding:"30px",

background:"linear-gradient(to top, rgba(0,0,0,.92), transparent)"

}}

>

<ProgressBar

progress={progress}

onSeek={onSeek}

/>

<div

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginTop:"18px"

}}

>

<div

style={{

display:"flex",

alignItems:"center",

gap:"12px"

}}

>

<button

style={circleButton}

onClick={onSkipBackward}

>

<HiBackward size={22}/>

</button>

<button

style={playButton}

onClick={onPlayPause}

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

style={circleButton}

onClick={onSkipForward}

>

<HiForward size={22}/>

</button>

<button

style={circleButton}

onClick={onMute}

>

{

muted

?

<HiSpeakerXMark size={20}/>

:

<HiSpeakerWave size={20}/>

}

</button>

<VolumeSlider

volume={volume}

onChange={onVolume}

/>

<div

style={{

color:"white",

marginLeft:"10px",

fontWeight:600

}}

>

{formatTime(currentTime)}

{" / "}

{formatTime(duration)}

</div>

</div>

<button

style={circleButton}

onClick={onFullscreen}

>

{

fullscreen

?

<HiArrowsPointingIn size={22}/>

:

<HiArrowsPointingOut size={22}/>

}

</button>

</div>

</div>

</div>

);

}

const circleButton={

width:48,

height:48,

borderRadius:"50%",

border:"1px solid rgba(255,255,255,.10)",

background:"rgba(255,255,255,.12)",

backdropFilter:"blur(18px)",

color:"white",

display:"grid",

placeItems:"center",

cursor:"pointer",

transition:".25s"

};

const playButton={

...circleButton,

width:60,

height:60,

background:"#E50914",

border:"none"

};