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

  const token = localStorage.getItem("stream_token");

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
            token ? (
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
            token ? (
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
            token ? (
              <VideoPlayer />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/series/:id"
          element={
            token ? (
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
            token ? (
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
            token ? (
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