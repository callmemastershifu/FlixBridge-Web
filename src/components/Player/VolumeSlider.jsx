export default function VolumeSlider({

    volume,

    onChange

}) {

    return (

        <div

            style={{

                display: "flex",

                alignItems: "center",

                width: "120px",

                marginLeft: "8px"

            }}

        >

            <input

                type="range"

                min="0"

                max="1"

                step="0.01"

                value={volume}

                onChange={(e) =>

                    onChange(Number(e.target.value))

                }

                style={{

                    width: "100%",

                    cursor: "pointer",

                    accentColor: "#E50914"

                }}

            />

        </div>

    );

}