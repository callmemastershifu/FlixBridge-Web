// Configurable backend base URL
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://projected-checks-banners-quarters.trycloudflare.com";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('stream_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  
  if (res.status === 401) {
    localStorage.removeItem('stream_token');
    localStorage.removeItem('stream_user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `Error ${res.status}`);
  }

  return res.json();
}

// Auth
export const authApi = {

  login: (email, password) =>
    request("/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    }),

  register: (data) =>
    request("/register", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  getProfile: () =>
    request("/profile")

};

// Content
export const contentApi = {
  getHome: () => request("/home"),
  getTrending: () => request("/trending"),
  getRecent: () => request("/recent"),
  getGenres: () => request("/categories"),
  getByGenre: (genre) =>
    request(`/movies/category/${encodeURIComponent(genre)}`),
  search: (query) =>
    request(`/search?q=${encodeURIComponent(query)}`)
};

// Movies
export const movieApi = {

  getDetails: (id) =>
    request(`/movie/${id}`),

  getStreamUrl: (id) =>
    `${BASE_URL}/stream/movie/${id}?token=${localStorage.getItem("stream_token")}`

};

// Series
export const seriesApi = {
    getDetails: (id) => request(`/series/${id}`),
    getEpisodes: (id) => request(`/series/${id}/episodes`)
};

// User actions
export const userApi = {

  getFavorites: () =>
    request("/favorites"),

  addFavorite: (movieId) =>
    request("/favorites/add", {
      method: "POST",
      body: JSON.stringify({
        movie_id: movieId
      })
    }),

  removeFavorite: (movieId) =>
    request(`/favorites/remove/${movieId}`, {
      method: "DELETE"
    }),

  isFavorite: (movieId) =>
    request(`/favorites/check/${movieId}`),

  getContinueWatching: () =>
    request("/continue-watching"),

  getMovieProgress: (movieId) =>
    request(`/continue-watching/movie/${movieId}`),

  updateProgress: (movieId, position, duration) =>
    request("/continue-watching/update", {
      method: "POST",
      body: JSON.stringify({
        movie_id: movieId,
        position_seconds: position,
        duration_seconds: duration
      })
    })

};