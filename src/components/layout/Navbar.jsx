import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  HiOutlineBars3,
  HiOutlineMagnifyingGlass,
  HiOutlineUserCircle,
  HiOutlineXMark,
} from "react-icons/hi2";

import Sidebar from "./Sidebar";
import SearchOverlay from "./SearchOverlay";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 80);

    };

    window.addEventListener("scroll", handleScroll);

    return () => {

      window.removeEventListener("scroll", handleScroll);

    };

  }, []);

  const iconStyle = {

    color: "#F5F5F5",
    fontSize: "26px",
    cursor: "pointer",
    transition: "all .25s ease"

  };

  return (

    <>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <ProfileMenu
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      <nav

        style={{

          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
          zIndex: 9999,
          transition: ".35s",
          backdropFilter: scrolled
            ? "blur(10px)"
            : "none",

          background: scrolled
            ? "rgba(255, 255, 255, 0)"
            : "linear-gradient(to bottom, rgba(0, 0, 0, 0.38), transparent)",

          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,.05)"
            : "none"

        }}

      >

        {/* LEFT */}

<div
  style={{
    width: "150px",
    display: "flex",
    alignItems: "center"
  }}
>

  {sidebarOpen ? (

    <HiOutlineXMark
      style={iconStyle}

      onClick={() => setSidebarOpen(false)}

      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.12)";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    />

  ) : (

    <HiOutlineBars3
      style={iconStyle}

      onClick={() => {
        setSidebarOpen(true);
        setProfileOpen(false);
        setSearchOpen(false);
      }}

      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.12)";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    />

  )}

</div>

        {/* LOGO */}

        <div

          style={{

            flex:1,

            display:"flex",

            justifyContent:"center"

          }}

        >

          <img

            src="/FlixBridge.png"

            alt="FlixBridge"

            onClick={()=>navigate("/")}

            style={{

              height:"34px",

              cursor:"pointer",

              transition:".25s"

            }}

            onMouseEnter={(e)=>{

              e.currentTarget.style.transform="scale(1.04)";

              e.currentTarget.style.filter="brightness(1.08)";

            }}

            onMouseLeave={(e)=>{

              e.currentTarget.style.transform="scale(1)";

              e.currentTarget.style.filter="brightness(1)";

            }}

          />

        </div>

        {/* RIGHT */}

        <div

          style={{

            width:"150px",

            display:"flex",

            justifyContent:"flex-end",

            alignItems:"center",

            gap:"24px"

          }}

        >

          <HiOutlineMagnifyingGlass

            style={iconStyle}

            onClick={()=>{

              setSearchOpen(true);

              setProfileOpen(false);

            }}

            onMouseEnter={(e)=>{

              e.currentTarget.style.transform="scale(1.12)";

            }}

            onMouseLeave={(e)=>{

              e.currentTarget.style.transform="scale(1)";

            }}

          />

          <HiOutlineUserCircle

            style={iconStyle}

            onClick={()=>{

              setProfileOpen(!profileOpen);

            }}

            onMouseEnter={(e)=>{

              e.currentTarget.style.transform="scale(1.12)";

            }}

            onMouseLeave={(e)=>{

              e.currentTarget.style.transform="scale(1)";

            }}

          />

        </div>

      </nav>

    </>

  );

}