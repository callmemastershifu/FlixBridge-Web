import { useRef } from "react";

export default function ProgressBar({

    progress,

    onSeek

}) {

    const barRef = useRef(null);

    function handleClick(e) {

        if (!barRef.current) return;

        const rect = barRef.current.getBoundingClientRect();

        const percent =

            ((e.clientX - rect.left) / rect.width) * 100;

        onSeek(percent);

    }

    return (

        <div

            ref={barRef}

            onClick={handleClick}

            style={{

                width: "100%",

                height: "8px",

                background: "rgba(255,255,255,.18)",

                borderRadius: "999px",

                cursor: "pointer",

                position: "relative",

                overflow: "hidden"

            }}

        >

            {/* Played */}

            <div

                style={{

                    width: `${progress}%`,

                    height: "100%",

                    background: "#E50914",

                    borderRadius: "999px",

                    transition: "width .08s linear"

                }}

            />

            {/* Thumb */}

            <div

                style={{

                    position: "absolute",

                    left: `calc(${progress}% - 9px)`,

                    top: "-5px",

                    width: "18px",

                    height: "18px",

                    borderRadius: "50%",

                    background: "#FFF",

                    boxShadow: "0 0 16px rgba(255,255,255,.55)",

                    transition: "left .08s linear"

                }}

            />

        </div>

    );

}