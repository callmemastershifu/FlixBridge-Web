import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../lib/api";

import {
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle
} from "react-icons/hi2";

export default function ProfileMenu({ open, onClose }) {

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [user, setUser] = useState(null);

  useEffect(() => {

  if (!open) return;

  authApi
    .getProfile()
    .then((data) => {
      setUser(data.user);
    })
    .catch((err) => {
      console.error(err);
    });

}, [open]);

  useEffect(() => {

    function handleClick(e) {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {

        onClose();

      }

    }

    if (open)
      window.addEventListener("mousedown", handleClick);

    return () => {

      window.removeEventListener(
        "mousedown",
        handleClick
      );

    };

  }, [open, onClose]);

  function logout() {

  localStorage.removeItem("stream_token");
  localStorage.removeItem("stream_user");

  navigate("/login");

  window.location.reload();

}

  if (!open)
    return null;

  return (

    <div

      ref={menuRef}

      style={{

        position: "fixed",
        top: "82px",
        right: "38px",
        width: "260px",
        background: "rgba(255, 255, 255, 0)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,.45)",
        zIndex: 20000

      }}

    >

      <div

        style={{

          padding: "22px",

          borderBottom: "1px solid rgba(255,255,255,.06)"

        }}

      >

        <div

          style={{

            fontSize: "18px",

            color: "white",

            fontWeight: 700

          }}

        >

          {user?.username || "Loading..."}

        </div>

        <div

          style={{

            color: "#888",

            marginTop: "4px",

            fontSize: "14px"

          }}

        >

          {user?.email}

        </div>

      </div>

      <MenuItem

        icon={<HiOutlineUser size={20} />}

        text="Profile"

        onClick={() => {

          navigate("/profile");

          onClose();

        }}

      />

      <MenuItem

        icon={<HiOutlineCog6Tooth size={20} />}

        text="Settings"

        onClick={() => {

          navigate("/settings");

          onClose();

        }}

      />

      <MenuItem

        icon={<HiOutlineArrowRightOnRectangle size={20} />}

        text="Logout"

        onClick={logout}

      />

    </div>

  );

}

function MenuItem({

  icon,

  text,

  onClick

}) {

  return (

    <div

      onClick={onClick}

      style={{

        display: "flex",

        alignItems: "center",

        gap: "14px",

        padding: "18px 22px",

        color: "#ddd",

        cursor: "pointer",

        transition: ".2s"

      }}

      onMouseEnter={(e) => {

        e.currentTarget.style.background =
          "rgba(255,255,255,.05)";

      }}

      onMouseLeave={(e) => {

        e.currentTarget.style.background =
          "transparent";

      }}

    >

      {icon}

      {text}

    </div>

  );

}