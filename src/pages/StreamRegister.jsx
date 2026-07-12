import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { authApi } from "../lib/api";

export default function StreamRegister() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      await authApi.register({
        username,
        email,
        password,
      });

      navigate("/login");

    } catch (err) {

      setError(err.message || "Unable to create your account.");

    }

    setLoading(false);

  }

  return (

    <AuthLayout>

      {/* Logo */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "0px"
        }}
      >

        <img
          src="/FlixBridge.png"
          alt="FlixBridge"
          style={{
            width: "470px",
            maxWidth: "100%",
            paddingTop: "150px"
          }}
        />

      </div>

      {/* Card */}

      <div

        style={{

          width: "100%",
          maxWidth: "470px",
          background: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.04)",
          borderRadius: "22px",
          padding: "45px",
          boxShadow: "0 35px 100px rgba(0, 0, 0, 0.45)",
          marginBottom: "250px"

        }}
      >

        <h1
          style={{
            color: "#fff",
            fontSize: "32px",
            fontWeight: 700,
            marginBottom: "8px",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center"
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            color: "#8A94A7",
            marginBottom: "30px",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            fontSize: "15px"
          }}
        >
          Join FlixBridge and start streaming.
        </p>

        {error && (

          <div
            style={{
              background: "rgba(229,9,20,.12)",
              border: "1px solid rgba(229,9,20,.35)",
              color: "#FF5D68",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px"
            }}
          >
            {error}
          </div>

        )}

        <form onSubmit={handleSubmit}>

          <input

            placeholder="Username"

            value={username}

            onChange={(e)=>setUsername(e.target.value)}

            required

            style={inputStyle}

          />

          <input

            type="email"

            placeholder="Email"

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

            {loading ? "Creating Account..." : "Create Account"}

          </button>

        </form>

        <p
          style={{
            color: "#9CA5B5",
            marginTop: "28px",
            textAlign: "center",
            fontSize: "15px"
          }}
        >

          Already have an account?{" "}

          <Link

            to="/login"

            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600
            }}

          >

            Sign In

          </Link>

        </p>

      </div>

    </AuthLayout>

  );

}

const inputStyle = {

  width: "100%",

  padding: "15px 18px",

  marginBottom: "18px",

  borderRadius: "12px",

  border: "1px solid rgba(255,255,255,.08)",

  background: "rgba(255,255,255,.05)",

  color: "#fff",

  fontSize: "15px",

  outline: "none",

  boxSizing: "border-box"

};

const buttonStyle = {

  width: "100%",

  padding: "16px",

  marginTop: "8px",

  border: "none",

  borderRadius: "12px",

  background: "#0970e5",

  color: "#fff",

  fontWeight: 700,

  fontSize: "15px",

  cursor: "pointer",

  transition: ".25s"

};