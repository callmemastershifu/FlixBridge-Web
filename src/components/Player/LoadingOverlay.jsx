export default function LoadingOverlay() {

    return (

        <div

            style={{

                position: "absolute",

                inset: 0,

                zIndex: 999,

                display: "flex",

                flexDirection: "column",

                alignItems: "center",

                justifyContent: "center",

                background:
                    "linear-gradient(to bottom,#030303,#000)",

                color: "white"

            }}

        >

            {/* Logo */}

            <div

                style={{

                    fontSize: "42px",

                    fontWeight: 800,

                    letterSpacing: "2px",

                    marginBottom: "18px",

                    color: "#E50914"

                }}

            >

                FLIXBRIDGE

            </div>

            {/* Spinner */}

            <div

                style={{

                    width: "62px",

                    height: "62px",

                    borderRadius: "50%",

                    border: "5px solid rgba(255,255,255,.15)",

                    borderTop: "5px solid #E50914",

                    animation: "spin 1s linear infinite"

                }}

            />

            <div

                style={{

                    marginTop: "24px",

                    fontSize: "18px",

                    color: "#D6D6D6",

                    letterSpacing: ".5px"

                }}

            >

                Preparing your movie...

            </div>

            <style>

                {`

                @keyframes spin{

                    from{

                        transform:rotate(0deg);

                    }

                    to{

                        transform:rotate(360deg);

                    }

                }

                `}

            </style>

        </div>

    );

}