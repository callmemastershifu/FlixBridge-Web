import {
  HiOutlineFilm,
  HiOutlineTv,
  HiOutlineHeart,
  HiOutlineClock,
  HiOutlineSquares2X2,
  HiOutlineTag,
  HiOutlineXMark
} from "react-icons/hi2";

export default function Sidebar({ open, onClose }) {
  const menuItems = [
    {
      icon: <HiOutlineFilm size={22} />,
      label: "Movies"
    },
    {
      icon: <HiOutlineTv size={22} />,
      label: "TV Shows"
    },
    {
      icon: <HiOutlineHeart size={22} />,
      label: "My List"
    },
    {
      icon: <HiOutlineClock size={22} />,
      label: "Continue Watching"
    },
    {
      icon: <HiOutlineTag size={22} />,
      label: "Genres"
    },
    {
      icon: <HiOutlineSquares2X2 size={22} />,
      label: "Collections"
    }
  ];

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.45)",
          backdropFilter: open ? "blur(10px)" : "blur(0px)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: ".3s",
          zIndex: 9998
        }}
      />

      {/* Sidebar */}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "330px",
          height: "100vh",
          background: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(255,255,255,.08)",

          transform: open
            ? "translateX(0)"
            : "translateX(-100%)",

          transition: "all .35s ease",

          zIndex: 9999,

          display: "flex",

          flexDirection: "column"
        }}
      >

        {/* Header */}

        <div
          style={{
            height: "82px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            borderBottom: "1px solid rgba(255,255,255,.08)"
          }}
        >

        </div>

        {/* Menu */}

        <div
          style={{
            padding: "24px"
          }}
        >

          {menuItems.map((item) => (

            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",

                color: "#ECECEC",

                padding: "16px",

                marginBottom: "10px",

                borderRadius: "14px",

                cursor: "pointer",

                transition: ".25s"
              }}

              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "rgba(255,255,255,.08)";
                e.currentTarget.style.transform =
                  "translateX(8px)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform =
                  "translateX(0)";
              }}

            >

              {item.icon}

              <span
                style={{
                  fontSize: "17px",
                  fontWeight: 500
                }}
              >
                {item.label}
              </span>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}