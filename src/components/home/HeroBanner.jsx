import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HeroBanner({ item }) {

  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  if (!item) return null;

  return (

    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "720px",
        overflow: "hidden",
        background: "#000105",
      }}
    >

      {/* BACKDROP */}

      <img
        src={
          item.backdrop_url ||
          item.poster_url_tmdb ||
          item.poster_url
        }
        alt={item.title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          transform: "scale(1.06)",
          filter: "brightness(.55)",
        }}
      />

      {/* OVERLAY */}

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

      {/* CONTENT */}

      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "5%",
          transform: "translateY(-50%)",
          width: "min(760px,85vw)",
          zIndex: 5,
        }}
      >

        {/* Featured */}

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "999px",
            background: "rgba(255, 0, 0, 0.66)",
            backdropFilter: "blur(12px)",
            //border: "2px solid rgb(253, 0, 0)",
            color: "#FFFFFF",
            fontSize: "12px",
            fontWeight: 400,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            marginBottom: "11px",
          }}
        >
          Featured Movies
        </div>

        {/* TITLE */}

        <h1
          style={{
            margin: 0,
            marginBottom: "18px",
            color: "#FFF",
            fontWeight: 800,
            fontSize: "clamp(42px,6vw,78px)",
            lineHeight: 1.05,
            letterSpacing: "-2px",
          }}
        >
          {item.title}
        </h1>

        {/* META */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            color: "#8a8a8a",
            fontSize: "15px",
            marginBottom: "20px",
          }}
        >
          <span>{item.release_year}</span>

          <span>•</span>

          <span>{item.resolution}</span>

          <span>•</span>

          <span>{item.quality}</span>

        </div>

        {/* DESCRIPTION */}

        <p
          style={{
            color: "#D6DBE3",
            fontSize: "15px",
            lineHeight: 1.8,
            maxWidth: "700px",
            marginBottom: "38px",
          }}
        >
          {item.overview
            ? item.overview.length > 220
              ? item.overview.substring(0, 220) + "..."
              : item.overview
            : "No description available."}
        </p>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >

          {/* WATCH */}

          <button
            onClick={() => navigate(`/watch/${item.id}`)}
            style={{
              padding: "15px 34px",
              border: "none",
              borderRadius: "10px",
              background: "#FFFFFF",
              color: "#111",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 15px 40px rgba(255,255,255,.18)",
            }}
          >
            ▶ WATCH NOW
          </button>

          {/* DETAILS */}

          <button
            onClick={() => navigate(`/movie/${item.id}`)}
            style={{
              padding: "15px 34px",
              borderRadius: "10px",
              background: "rgba(255,255,255,.08)",
              color: "#FFF",
              border: "1px solid rgba(255,255,255,.12)",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            DETAILS
          </button>

          {/* MY LIST */}

          <button
            onClick={() => setFavorite(!favorite)}
            style={{
              padding: "15px 34px",
              borderRadius: "10px",
              background: "rgba(255,255,255,.08)",
              color: "#FFF",
              border: "1px solid rgba(255,255,255,.12)",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {favorite ? "✓ MY LIST" : "+ MY LIST"}
          </button>

        </div>

      </div>

    </section>

  );

}