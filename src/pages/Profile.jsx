import { useEffect, useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import { authApi } from "../lib/api";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadProfile() {

      try {

        const data = await authApi.getProfile();

        setUser(data.user);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadProfile();

  }, []);

  //////////////////////////////////////////////////////////////////

  if (loading) {

    return (

      <AuthLayout>

        <div
          style={{
            color: "white",
            fontSize: "24px"
          }}
        >
          Loading...
        </div>

      </AuthLayout>

    );

  }

  if (!user) {

    return (

      <AuthLayout>

        <div
          style={{
            color: "white",
            fontSize: "24px",
            textAlign: "center"
          }}
        >
          Unable to load profile.
        </div>

      </AuthLayout>

    );

  }

  return (

    <AuthLayout>

      {/* Logo */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "28px"
        }}
      >

        <img
          src="/FlixBridge.png"
          alt="FlixBridge"
          style={{
            width: "270px",
            marginBottom: "20px"
          }}
        />

      </div>

      {/* Card */}

      <div
        style={{
          width: "430px",
          background: "rgba(0, 1, 5, 0.25)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: "22px",
          padding: "42px"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "25px"
          }}
        >

          <div
            style={{
              width: "95px",
              height: "95px",
              borderRadius: "50%",
              background: "#0970e5",
              display: "grid",
              placeItems: "center",
              color: "white",
              fontSize: "40px",
              fontWeight: 700
            }}
          >
            {user.username?.charAt(0).toUpperCase() || "U"}
          </div>

        </div>

        <h1
          style={{
            color: "#fff",
            textAlign: "center",
            marginBottom: "35px",
            fontSize: "30px"
          }}
        >
          My Profile
        </h1>

        <div style={fieldBox}>

          <span style={labelStyle}>
            Username
          </span>

          <span style={valueStyle}>
            {user.username}
          </span>

        </div>

        <div style={fieldBox}>

          <span style={labelStyle}>
            Email
          </span>

          <span style={valueStyle}>
            {user.email}
          </span>

        </div>

        <div style={fieldBox}>

          <span style={labelStyle}>
            Member Since
          </span>

          <span style={valueStyle}>
            {new Date(user.created_at).toLocaleDateString()}
          </span>

        </div>

        <button

          onClick={() => {

            localStorage.removeItem("stream_token");
            localStorage.removeItem("stream_user");

            window.location.href = "/login";

          }}

          style={logoutButton}

        >

          Sign Out

        </button>

      </div>

    </AuthLayout>

  );

}

const fieldBox = {

  background: "rgba(255,255,255,.05)",

  border: "1px solid rgba(255,255,255,.08)",

  borderRadius: "12px",

  padding: "15px 18px",

  marginBottom: "18px",

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center"

};

const labelStyle = {

  color: "#8F98A8",

  fontSize: "14px"

};

const valueStyle = {

  color: "#FFFFFF",

  fontWeight: 600,

  fontSize: "15px"

};

const logoutButton = {

  width: "100%",

  marginTop: "18px",

  padding: "16px",

  background: "#0970e5",

  color: "white",

  border: "none",

  borderRadius: "12px",

  cursor: "pointer",

  fontWeight: 700,

  fontSize: "15px"

};