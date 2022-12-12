export const API_KEY = "e3bb99f79b1bb8906dac2d3227927c8f";

export const genres = {
  12: "Пригода",
  14: "Фантастика",
  16: "Анімація",
  18: "Драма",
  27: "Жахи",
  28: "Екшин",
  35: "Комедія",
  36: "Історія",
  37: "Західний",
  53: "Трилер",
  80: "Злочинність",
  99: "Документальний",
  878: "Наукова фантастика",
  9648: "Таємниця",
  10402: "Музика",
  10749: "Романтика",
  10751: "Сімейний",
  10752: "Війна",
  10770: "ТБ фільм",
};

const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=uk-UA&page=1`;
const getImagePath = (path) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const getYoutubeKey = (movie_key) =>
  `https://api.themoviedb.org/3/movie/${movie_key}/videos?api_key=${API_KEY}`;

export const getMovies = async () => {
  const { results } = await fetch(API_URL).then((response) => response.json());

  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
      imdb_id,
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      YoutubeKey: getYoutubeKey(id),
      genres: genre_ids.map((genre) => genres[genre]),
      imdbID: imdb_id,
    })
  );
  return movies;
};


export const getTV = async () => {
  const { results } = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=uk-UA&page=1`).then((response) => response.json());

  const tvs = results.map(
    ({
      id,
      original_name,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      first_air_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_name,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: first_air_date,
      YoutubeKey: getYoutubeKey(id),
      genres: genre_ids.map((genre) => genres[genre]),
    })
  );
  return tvs;
};

export const getTvIds = async (id) => {
  const {results} = await fetch(`https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${API_KEY}&language=uk-UA`).then((response) => response.json());

  const ids = results.map(
    ({
      id,
      imdb_id,
    }) => ({
      key: String(id),
      imdb_id: imdb_id
    })
  )

  return ids
}