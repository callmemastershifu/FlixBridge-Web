import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import VideoPlayer from "./pages/VideoPlayer";
import StreamLogin from "./pages/StreamLogin";
import StreamRegister from "./pages/StreamRegister";
import Profile from "./pages/Profile";
import ScrollToTop from "./components/ScrollToTop";
import SeriesDetails from "./pages/SeriesDetails";
import Settings from "./pages/Settings";
import { useStreamAuth } from "./lib/StreamAuthContext";

import Footer from "./components/Footer";

function ProtectedLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default function App() {

  const { user, loading } = useStreamAuth();

  if (loading) {
    return (
      <div
        style={{
          background: "#000105",
          color: "white",
          height: "100vh",
          display: "grid",
          placeItems: "center",
          fontSize: "30px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (

    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* Public */}

        <Route
          path="/login"
          element={<StreamLogin />}
        />

        <Route
          path="/register"
          element={<StreamRegister />}
        />

        {/* Protected */}

        <Route
          path="/"
          element={
            user ? (
              <ProtectedLayout>
                <Home />
              </ProtectedLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/movie/:id"
          element={
            user ? (
              <ProtectedLayout>
                <MovieDetails />
              </ProtectedLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/watch/:id"
          element={
            user ? (
              <VideoPlayer />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/series/:id"
          element={
            user ? (
              <ProtectedLayout>
                <SeriesDetails />
              </ProtectedLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/profile"
          element={
            user ? (
              <ProtectedLayout>
                <Profile />
              </ProtectedLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/settings"
          element={
            user ? (
              <ProtectedLayout>
                <Settings />
              </ProtectedLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>

    </BrowserRouter>

  );

}