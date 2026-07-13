import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import { useStreamAuth } from "../lib/StreamAuthContext";

export default function StreamLogin() {

  const navigate = useNavigate();
  const { login } = useStreamAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      await login(email, password);

      navigate("/", { replace: true });

    } catch (err) {

      setError(err.message || "Unable to connect to server.");

    }

    setLoading(false);

  }

  return (

    <AuthLayout>

      <div

        style={{

          width: "100%",
          maxWidth: "470px",
          background: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.04)",
          borderRadius: "22px",
          padding: "45px",
          boxShadow: "0 35px 100px rgba(0, 0, 0, 0.44)"

        }}

      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px"
          }}
        >

          <img
            src="/FlixBridge.png"
            alt="FlixBridge"
            style={{
              width: "370px",
              maxWidth: "100%",
              marginBottom: "10px",
              marginLeft: "auto",
              marginRight: "auto",
              userSelect: "none"
            }}
          />

          <p
            style={{
              color: "#A6AFBD",
              fontSize: "15px",
              lineHeight: 1.6
            }}
          >
            THE ULTIMATE STREAMING EXPERIENCE
            FOR BANGLADESH
          </p>

        </div>

        {error && (

          <div

            style={{

              background: "rgba(229,9,20,.12)",

              border: "1px solid rgba(229,9,20,.35)",

              color: "#FF6A6A",

              padding: "14px",

              borderRadius: "10px",

              marginBottom: "20px"

            }}

          >

            {error}

          </div>

        )}

        <form onSubmit={handleSubmit}>

          <input

            type="email"

            placeholder="Email Address"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            required

            style={inputStyle}

          />

          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            required

            style={inputStyle}

          />

          <button

            type="submit"

            disabled={loading}

            style={buttonStyle}

          >

            {loading

              ? "Signing In..."

              : "SIGN IN"

            }

          </button>

        </form>

        <div

          style={{

            marginTop: "28px",

            textAlign: "center",

            color: "#9098A8",

            fontSize: "15px"

          }}

        >

          Don't have an account?

          <Link

            to="/register"

            style={{

              marginLeft: "8px",

              color: "#FFFFFF",

              textDecoration: "none",

              fontWeight: 600

            }}

          >

            Create Account

          </Link>

        </div>

      </div>

    </AuthLayout>

  );
}

const inputStyle = {

  width: "100%",

  padding: "16px 18px",

  marginBottom: "18px",

  borderRadius: "12px",

  border: "1px solid rgba(255,255,255,.10)",

  background: "rgba(255,255,255,.05)",

  color: "#FFFFFF",

  fontSize: "15px",

  outline: "none",

  boxSizing: "border-box"

};

const buttonStyle = {

  width: "100%",

  padding: "17px",

  marginTop: "8px",

  border: "none",

  borderRadius: "12px",

  background: "#0970e5",

  color: "#FFF",

  fontSize: "15px",

  fontWeight: 700,

  cursor: "pointer",

  transition: ".25s",

  boxShadow: "0 12px 35px rgba(9,112,229,.35)"

};