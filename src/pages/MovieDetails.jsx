import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import { movieApi, userApi } from "../lib/api";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  useEffect(() => {

    async function loadMovie() {

      try {

        const [movieData, favoriteData] = await Promise.all([
          movieApi.getDetails(id),
          userApi.getFavorites()
        ]);

        setMovie(movieData);

        if (favoriteData.success) {

          setFavorite(
            favoriteData.items.some(
              item => item.id === Number(id)
            )
          );

        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadMovie();

  }, [id]);

////////////////////////////////////////////////////////////

  const toggleFavorite = async () => {

    try {

      if (favorite) {

        await userApi.removeFavorite(id);

        setFavorite(false);

      } else {

        await userApi.addFavorite(Number(id));

        setFavorite(true);

      }

    } catch (err) {

      console.error(err);

    }

  };

///////////////////////////////////////////////////////////////////

  if (loading) {
    return (
      <div
        style={{
          background: "#000105",
          color: "white",
          height: "100vh",
          display: "grid",
          placeItems: "center",
          fontSize: "30px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
  <div
    style={{
      minHeight: "100vh",
      background: "#000105",
      color: "white",
    }}
  >

    <Navbar />

      <div
        style={{
          position: "relative",
          height: "90vh",
          overflow: "hidden",
        }}
      >
        <img
            src={movie.backdrop_url || movie.poster_url_tmdb || movie.poster_url}
            alt={movie.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(28%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
             background:
            `
            linear-gradient(
            to top,
            #000105 5%,
            rgba(0,1,5,.18) 38%,
            rgba(0,0,0,.75) 100%
            )
            `,
          }}
        />

        

        <div
          style={{
            position: "absolute",
            bottom: "70px",
            left: "90px",
            right: "90px",

            display: "flex",
            alignItems: "flex-end",
            gap: "40px",
          }}
        >
          <img
            src={movie.poster_url_tmdb || movie.poster_url}
            alt={movie.title}
            style={{
              width: "230px",
              height: "345px",
              objectFit: "cover",
              borderRadius: "18px",
              boxShadow: "0 30px 70px rgba(0,0,0,.55)",
              flexShrink: 0,
            }}
          />
        <div>
          <h1
            style={{
              fontSize:"60px",
              fontWeight:900,
              letterSpacing:"-.02em",
              lineHeight:1.05,
              marginBottom:"18px",
            }}
          >
            {movie.title}
          </h1>

          {movie.tagline && (
            <p
              style={{
                color: "#c7c7c7",
                fontSize: "17px",
                fontStyle: "italic",
                marginBottom: "22px",
                opacity: 0.9,
              }}
            >
              "{movie.tagline}"
            </p>
          )}    

          <div
          style={{
          display:"flex",
          flexWrap:"wrap",
          alignItems:"center",
          gap:"14px",
          color:"#C5CBD4",
          fontSize:"13px",
          fontWeight:500,
          marginBottom:"26px"

          }}
          >
          <span>
          <span
            style={{
              background: "#b89c00",
              color: "white",
              padding: "5px 10px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            ★ {movie.rating ? movie.rating.toFixed(1) : "N/A"}
          </span>
          </span>
          <span>
          {movie.release_year}
          </span>
          <span>
          {movie.runtime || "--"} min
          </span>
          <span>
          {movie.genres || movie.category}
          </span>
          </div>
          <p

          style={{
          fontSize:"16px",
          lineHeight:1.5,
          color:"#D3D7DE",
          maxWidth:"700px",
          marginBottom:"20px",
          fontWeight: 450,
          }}

          >

          {movie.overview
            ? `${movie.overview.slice(0, 180)}...`
            : "No description available."}

          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {/* PLAY */}

            <button
              onClick={() => navigate(`/watch/${movie.id}`)}
              style={{
                background: "rgba(187, 187, 187, 0)",
                color: "white",
                border: "2px solid rgba(255,255,255,.18)",
                padding:"13px 30px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ▶ PLAY
            </button>

            {/* TRAILER */}

            <button
              disabled={!movie.trailer_key}
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${movie.trailer_key}`,
                  "_blank"
                )
              }
              style={{
                background: "rgba(255, 255, 255, 0)",
                color: "white",
                border: "2px solid rgba(255,255,255,.18)",
                padding: "13px 30px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: movie.trailer_key ? "pointer" : "not-allowed",
                opacity: movie.trailer_key ? 1 : 0.5,
              }}
            >
              ▶ TRAILER
            </button>

            {/* MY LIST */}

            <button
              onClick={toggleFavorite}
              style={{
                background: "rgba(255, 255, 255, 0)",
                color: "white",
                border: "2px solid rgba(255,255,255,.18)",
                padding: "13px 30px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {favorite ? "+ MY LIST" : "❤ MY LIST"}
            </button>
          </div>
        </div>
        </div>
      </div>

      <div
        style={{
          padding: "70px 90px",
          maxWidth: "1400px",
          margin: "0 auto",
          background: "#000105",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "70px",
            alignItems: "start",
          }}
        >
          {/* LEFT COLUMN */}

          <div>

            <h2
              style={{
                fontSize: "15px",
                textTransform: "uppercase",
                fontWeight: 400,
                marginBottom: "10px",
              }}
            >
              Overview
            </h2>

            <p
              style={{
                lineHeight: 1.5,
                color: "#7D8592",
                fontSize: "15px",
              }}
            >
              {movie.overview || "No overview available."}
            </p>
            <div
              style={{
                marginTop: "45px",
              }}
            >
              <h2
                style={{
                  fontSize: "15px",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  fontWeight: 400,
                }}
              >
                Cast
              </h2>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {(movie.cast_members || movie.cast || "")
                  .split(",")
                  .filter(Boolean)
                  .map((actor) => (
                    <span
                      key={actor}
                      style={{
                        background: "rgba(255,255,255,.06)",
                        border: "1px solid rgba(255,255,255,.08)",
                        padding: "5px 10px",
                        borderRadius: "999px",
                        color: "#7D8592",
                        fontSize: "13px",
                      }}
                    >
                      {actor.trim()}
                    </span>
                  ))}
              </div>
            </div>
            {movie.cast_members && (
              <>
                <h2
                  style={{
                    marginTop: "50px",
                    marginBottom: "10px",
                    fontSize: "15px",
                    textTransform: "uppercase",
                    fontWeight: 400,
                  }}
                >
                  Top Cast
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  {movie.cast_members.split(",").map((actor) => (
                    <div
                      key={actor}
                      style={{
                        background: "#1B1B1B",
                        border: "1px solid rgba(255,255,255,.08)",
                        borderRadius: "999px",
                        padding: "5px 10px",
                        color: "#7D8592",
                        fontSize: "13px",
                      }}
                    >
                      {actor.trim()}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* RIGHT COLUMN */}

          <div>

            <InfoRow
              label="Director"
              value={movie.director}
            />

            <div style={{ marginBottom: "22px" }}>
              <div
                style={{
                  color: "#7D8592",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Genres
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {(movie.genres || "")
                  .split(",")
                  .filter(Boolean)
                  .map((genre) => (
                    <span
                      key={genre}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "999px",
                        background: "#1f1f1f",
                        border: "1px solid rgba(255,255,255,.08)",
                        color: "#fff",
                        fontSize: "13px",
                      }}
                    >
                      {genre.trim()}
                    </span>
                  ))}
              </div>
            </div>

            <InfoRow
              label="Release"
              value={movie.release_date}
            />

            <InfoRow
              label="Runtime"
              value={
                movie.runtime
                  ? `${movie.runtime} min`
                  : "-"
              }
            />

            <InfoRow
              label="Language"
              value={movie.language}
            />

            <InfoRow
              label="Country"
              value={movie.country}
            />

            <InfoRow
              label="Production"
              value={movie.production}
            />

          </div>

        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        marginBottom: "22px",
      }}
    >
      <div
        style={{
          color: "#7D8592",
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: ".08em",
          marginBottom: "6px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "white",
          fontSize: "13px",
          lineHeight: 1.6,
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}