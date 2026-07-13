import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
} from "react-icons/hi2";

export default function SearchOverlay({ open, onClose }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      return;
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 120);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      
      contentApi.search(query)
      
        .then((res) => res.json())
        .then((data) => setResults(data));
    }, 250);

    return () => clearTimeout(timer);
  }, [query, open]);

  if (!open) return null;

  return (
    <>
      {/* Dark Background */}

      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(10px)",
          zIndex: 29998,
        }}
      />

      {/* Search Panel */}

      <div
        style={{
          position: "fixed",
          top: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "1600px",
          height: "calc(100vh - 140px)",
          background: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,.05)",
          boxShadow: "0 40px 120px rgba(0,0,0,.6)",
          overflow: "hidden",
          zIndex: 30000,
        }}
      >
        {/* Search Bar */}

        <div
          style={{
            padding: "35px 40px",
            borderBottom: "1px solid rgba(255,255,255,.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              background: "#1B1E27",
              border: "1px solid rgba(255,255,255,.06)",
              borderRadius: "18px",
              padding: "18px 24px",
            }}
          >
            <HiOutlineMagnifyingGlass
              size={24}
              color="#8b8f98"
            />

            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, TV shows..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px",
              }}
            />

            <HiOutlineXMark
              size={26}
              color="white"
              style={{
                cursor: "pointer",
              }}
              onClick={onClose}
            />
          </div>
        </div>

        {/* Results */}

        <div
          style={{
            padding: "35px 40px",
            overflowY: "auto",
            height: "calc(100% - 120px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
            gap: "26px",
          }}
        >
          {results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                navigate(`/movie/${movie.id}`);
                onClose();
              }}
              style={{
                cursor: "pointer",
                transition: ".25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
              }}
            >
              <img
                src={movie.poster_url}
                alt={movie.title}
                style={{
                  width: "100%",
                  aspectRatio: "2/3",
                  objectFit: "cover",
                  borderRadius: "14px",
                  marginBottom: "12px",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,.35)",
                }}
              />

              <div
                style={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: "15px",
                  marginBottom: "6px",
                  lineHeight: "22px",
                }}
              >
                {movie.title}
              </div>

              <div
                style={{
                  color: "#8c9098",
                  fontSize: "13px",
                }}
              >
                {movie.release_year} • {movie.resolution}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}