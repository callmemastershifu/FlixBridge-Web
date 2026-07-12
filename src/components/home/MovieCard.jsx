import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userApi } from "../../lib/api";

import {
  HiOutlinePlay,
  HiOutlineHeart,
  HiHeart
} from "react-icons/hi2";

export default function MovieCard({ movie }) {

  const navigate = useNavigate();

  const [hover, setHover] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = async (e) => {

    e.stopPropagation();

    const token = localStorage.getItem("stream_token");

    if (!token) return;

    try {

      if (favorite) {

        await userApi.removeFavorite(movie.id);

        setFavorite(false);

      } else {

        await userApi.addFavorite(movie.id);

        setFavorite(true);

      }

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div

      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (movie.media_type === "series") {
          navigate(`/series/${movie.id}`);
        } else {
          navigate(`/movie/${movie.id}`);
        }

      }}

      style={{
        minWidth: "185px",
        cursor: "pointer",
        transition: ".28s",
        transform: hover ? "translateY(-8px)" : "translateY(0)",
        position: "relative"
      }}

    >

      <div

        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "16px",
          boxShadow: hover
            ? "0 28px 60px rgba(0,0,0,.45)"
            : "0 12px 24px rgba(0,0,0,.25)"
        }}

      >

        <img

          src={movie.poster_url}

          alt={movie.title}

          style={{
            width: "185px",
            height: "278px",
            objectFit: "cover",
            transition: ".15s",
            transform: hover ? "scale(1.05)" : "scale(1)"
          }}

        />

        {/* Gradient */}

        <div

          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,.85), transparent 55%)"
          }}

        />

        {/* Buttons */}

        <div

          style={{
            position: "absolute",
            left: "14px",
            bottom: "14px",
            display: "flex",
            gap: "10px",
            opacity: hover ? 1 : 0,
            transition: ".25s"
          }}

        >

          {/* DETAILS */}

          <button

            onClick={(e)=>{

              e.stopPropagation();

              if (movie.media_type === "series") {

                navigate(`/series/${movie.id}`);

              } else {

                navigate(`/movie/${movie.id}`);

              }

            }}

            style={{
              width: "42px",
              height: "42px",
              border: "none",
              borderRadius: "50%",
              background: "#FFFFFF",
              cursor: "pointer",
              display: "grid",
              placeItems: "center"
            }}

          >

            <HiOutlinePlay size={20} color="#FF1744" />

          </button>

          {/* MY LIST */}

          <button

            onClick={toggleFavorite}

            style={{
              width: "42px",
              height: "42px",
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: "50%",
              background: "rgba(255,255,255,.08)",
              color: "white",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              backdropFilter: "blur(12px)"
            }}

          >

            {favorite ? (
              <HiHeart
                size={18}
                color="#E50914"
              />
            ) : (
              <HiOutlineHeart
                size={18}
                color="white"
              />
            )}

          </button>

        </div>

      </div>

      {/* Info */}

      <div

        style={{
          marginTop: "14px",
          padding: "0 2px"
        }}

      >

        <div

          style={{
            color: "#F5F5F5",
            fontSize: "15px",
            fontWeight: 600,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          }}

        >

          {movie.title}

        </div>

        <div

          style={{
            marginTop: "5px",
            color: "#8E96A3",
            fontSize: "13px"
          }}

        >

          {movie.release_year} • {movie.resolution}

        </div>

      </div>

    </div>

  );

}