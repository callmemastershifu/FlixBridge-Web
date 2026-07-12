import { Link } from "react-router-dom";

export default function Footer() {

  return (

    <footer
      style={{
        background: "#000105",
        borderTop: "1px solid rgba(255,255,255,.08)",
        padding: "60px 8%",
        marginTop: "0px",
      }}
    >

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >

        {/* Logo */}

        <h2
          style={{
            color: "white",
            marginBottom: "10px",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          <i>FLIXBRIDGE</i>
        </h2>

        <p
          style={{
            color: "#8F98A8",
            maxWidth: "1000px",
            lineHeight: 1.7,
            marginBottom: "35px",
          }}
        >
          Your ultimate personal streaming platform.
          Browse thousands of Movies, TV Shows and Anime
          with a beautiful cinematic experience.More then <b>9,000+</b> Movies, <b>2300+</b> TV Shows and <b>135,000+</b> Episodes are available to stream online.
        </p>

        {/* Links */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "28px",
            marginBottom: "45px",
          }}
        >

          <Link to="/" style={linkStyle}>
            Home
          </Link>

          <Link to="/movies" style={linkStyle}>
            Movies
          </Link>

          <Link to="/series" style={linkStyle}>
            TV Shows
          </Link>

          <Link to="/anime" style={linkStyle}>
            Anime
          </Link>

          <Link to="/favorites" style={linkStyle}>
            My List
          </Link>

        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.08)",
            paddingTop: "25px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >

          <span
            style={{
              color: "#70798B",
              fontSize: "14px",
            }}
          >
            © 2026 FlixBridge. All rights reserved.
                   Developed by 'SIXDOT STUDIO' (CallMeMasterShifu)
          </span>

          <span
            style={{
              color: "#70798B",
              fontSize: "14px",
            }}
          >
            Version 1.0
          </span>

        </div>

      </div>

    </footer>

  );

}

const linkStyle = {
  color: "#C8D0DA",
  textDecoration: "none",
  fontSize: "15px",
  transition: ".2s",
};