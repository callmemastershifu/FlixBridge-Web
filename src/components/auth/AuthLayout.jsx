import { useEffect, useState } from "react";
import { contentApi } from "../../lib/api";

export default function AuthLayout({ children }) {
  const [background, setBackground] = useState("");
  const [previousBackground, setPreviousBackground] = useState("");

  useEffect(() => {
    async function loadBackground() {
      try {
        const data = await contentApi.getHome();

        const movies = [];

        if (data.featured)
            movies.push(data.featured);

        if (data.categories)
            data.categories.forEach(cat => {
                if (cat.movies)
                    movies.push(...cat.movies);
            });

        if (data.series)
            movies.push(...data.series);

        if (data.latest_series)
            movies.push(...data.latest_series);

        const valid = movies.filter(
            movie => movie?.backdrop_url
        );

        if (valid.length) {
          const random =
            valid[Math.floor(Math.random() * valid.length)];

          setPreviousBackground(background);
          if (random.backdrop_url !== background) {
            setPreviousBackground(background);
            setBackground(random.backdrop_url);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    loadBackground();

    const timer = setInterval(loadBackground, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000105",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <>
        {previousBackground && (
          <img
            src={previousBackground}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(.22)",
              animation: "fadeOut 2s forwards",
            }}
          />
        )}

        <>
          {previousBackground && (
            <img
              key={`old-${previousBackground}`}
              src={previousBackground}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(.22)",
                animation: "fadeOut 1800ms forwards",
              }}
            />
          )}

          {background && (
            <img
              key={`new-${background}`}
              src={background}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(.22)",
                animation:
                  "fadeIn 1800ms ease forwards, zoomBackground 12s linear forwards",
              }}
            />
          )}
        </>
      </>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              to top,
              #000105 0%,
              rgba(0,1,5,.55) 45%,
              rgba(0,0,0,.80) 100%
            )
          `,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "40px",
        }}
      >
        {children}
      </div>

      <style>
      {`
      @keyframes zoomBackground{
          0%{
              transform:scale(1.0);
          }
          100%{
              transform:scale(1.15);
          }
      }

      @keyframes fadeIn{
          0%{
              opacity:0;
          }
          100%{
              opacity:1;
          }
      }

      @keyframes fadeOut{
          0%{
              opacity:1;
          }
          100%{
              opacity:0;
          }
      }
      `}
      </style>
    </div>
  );
}