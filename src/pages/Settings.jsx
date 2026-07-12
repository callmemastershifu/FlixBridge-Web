import AuthLayout from "../components/auth/AuthLayout";

export default function Settings() {

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
          width: "500px",
          background: "rgba(18,20,28,.82)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: "22px",
          padding: "42px"
        }}
      >

        <h1
          style={{
            color: "#fff",
            textAlign: "center",
            marginBottom: "35px",
            fontSize: "30px"
          }}
        >
          Settings
        </h1>

        <SettingItem
          title="Theme"
          value="Dark"
        />

        <SettingItem
          title="Language"
          value="English"
        />

        <SettingItem
          title="Default Video Quality"
          value="Auto"
        />

        <SettingItem
          title="Autoplay Next Episode"
          value="Enabled"
        />

        <SettingItem
          title="Subtitles"
          value="Off"
        />

        <SettingItem
          title="Audio Language"
          value="Original"
        />

        <SettingItem
          title="App Version"
          value="1.0.0"
        />
        <h2
            style={{
                color: "#FFFFFF",
                fontSize: "20px",
                marginTop: "35px",
                marginBottom: "20px"
            }}
            >
            Security
            </h2>

            <input
            type="password"
            placeholder="Current Password"
            style={inputStyle}
            />

            <input
            type="password"
            placeholder="New Password"
            style={inputStyle}
            />

            <input
            type="password"
            placeholder="Confirm New Password"
            style={inputStyle}
            />

            <button
            style={changePasswordButton}
            >
            Change Password
            </button>
        <button
          style={saveButton}
        >
          Save Changes
        </button>

      </div>

    </AuthLayout>

  );

}

function SettingItem({ title, value }) {

  return (

    <div
      style={itemStyle}
    >

      <span
        style={titleStyle}
      >
        {title}
      </span>

      <span
        style={valueStyle}
      >
        {value}
      </span>

    </div>

  );

}

const itemStyle = {

  background: "rgba(255,255,255,.05)",

  border: "1px solid rgba(255,255,255,.08)",

  borderRadius: "12px",

  padding: "15px 18px",

  marginBottom: "16px",

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center"

};

const titleStyle = {

  color: "#8F98A8",

  fontSize: "14px"

};

const valueStyle = {

  color: "#FFFFFF",

  fontWeight: 600,

  fontSize: "15px"

};

const saveButton = {

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
const inputStyle = {

  width: "100%",

  padding: "14px 16px",

  marginBottom: "15px",

  background: "rgba(255,255,255,.05)",

  color: "#FFFFFF",

  border: "1px solid rgba(255,255,255,.08)",

  borderRadius: "12px",

  outline: "none",

  fontSize: "15px",

  boxSizing: "border-box"

};

const changePasswordButton = {

  width: "100%",

  padding: "15px",

  marginBottom: "30px",

  background: "#b40009",

  color: "#FFFFFF",

  border: "none",

  borderRadius: "12px",

  cursor: "pointer",

  fontSize: "15px",

  fontWeight: 700

};