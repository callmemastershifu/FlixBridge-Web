import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import HeroBanner from "../components/home/HeroBanner";
import MovieRow from "../components/home/MovieRow";

import { contentApi, userApi } from "../lib/api";

export default function Home() {

  const [home, setHome] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [trending, setTrending] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hero rotation
  const [heroMovies, setHeroMovies] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);


  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

 useEffect(() => {

  async function loadHome() {

    try {

      const [
        homeData,
        favoritesData,
        continueData,
        trendingData,
        recentData
      ] = await Promise.all([

        contentApi.getHome(),
        userApi.getFavorites(),
        userApi.getContinueWatching(),
        contentApi.getTrending(),
        contentApi.getRecent()

      ]);

      setHome(homeData);

      if (favoritesData.success)
        setFavorites(favoritesData.items);

      if (continueData.success)
        setContinueWatching(continueData.items);

      setTrending(trendingData);
      setRecent(recentData);

      const heroes = [];

      if (homeData.featured)
        heroes.push(homeData.featured);

      if (trendingData?.length)
        heroes.push(...trendingData.slice(0, 6));

      setHeroMovies(heroes);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  loadHome();

}, []);

  // Auto rotate hero every 9 seconds
  useEffect(() => {

    if (heroMovies.length <= 1) return;

    const timer = setInterval(() => {

      setHeroIndex(prev =>
        (prev + 1) % heroMovies.length
      );

    }, 9000);

    return () => clearInterval(timer);

  }, [heroMovies]);

  if (loading || !home) {

    return (

      <div
        style={{
          background: "#000105",
          color: "white",
          height: "100vh",
          display: "grid",
          placeItems: "center",
          fontSize: "30px"
        }}
      >
        Loading...
      </div>

    );

  }

  return (

    <>

      <Navbar />

      {heroMovies.length > 0 && (

        <HeroBanner
          key={heroMovies[heroIndex].id}
          item={heroMovies[heroIndex]}
        />

      )}

      <div
        style={{
          background: "#000105",
          padding: "40px"
        }}
      >

        {continueWatching.length > 0 && (

          <MovieRow
            title="Continue Watching"
            movies={continueWatching}
          />

        )}

        {trending.length > 0 && (

          <MovieRow
            title="Trending Now"
            movies={trending}
          />

        )}

        {recent.length > 0 && (

          <MovieRow
            title="Recently Added"
            movies={recent}
          />

        )}

        {favorites.length > 0 && (

          <MovieRow
            title="My List"
            movies={favorites}
          />

        )}

        {home.series?.length > 0 && (

          <MovieRow
            title="TV Series"
            movies={home.series}
          />

        )}

        {home.latest_series?.length > 0 && (

          <MovieRow
            title="Latest TV Series"
            movies={home.latest_series}
          />

        )}

        {home.categories.map(category => (

          <MovieRow
            key={category.title}
            title={category.title}
            movies={category.movies}
          />

        ))}

      </div>

    </>

  );

}