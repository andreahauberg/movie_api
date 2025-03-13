import { apiKey, apiToken } from "./info.js";

const categories = ["now_playing", "popular", "top_rated", "upcoming"];

const fetchMoviesByCategory = async (category) => {
  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1&api_key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }

    const data = await response.json();
    renderMovies(category, data.results);
  } catch (error) {
    console.error(error);
  }
};

const renderMovies = (category, movies) => {
  const section = document.getElementById(`${category}_page`);
  if (!section) return;

  const moviesContainer = section.querySelector(".movies");
  moviesContainer.innerHTML = "";

  const template = document.querySelector("#movie-template");

  movies.forEach((movie) => {
    const movieElement = template.content.cloneNode(true);

    const img = movieElement.querySelector("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title;

    movieElement.querySelector("h2").textContent = movie.title;
    movieElement.querySelector(".rating").textContent = movie.vote_average;
    movieElement.querySelector(".description").textContent = movie.overview;
    movieElement.querySelector(".release_date").textContent =
      movie.release_date;

    const button = movieElement.querySelector(".accordion");
    const panel = movieElement.querySelector(".panel");


    moviesContainer.appendChild(movieElement);
  });
};

document.addEventListener("click", (event) => {
  if (event.target.matches(".accordion")) {
    const panel = event.target.nextElementSibling;
    const isOpen = panel.classList.toggle("open");

    if (isOpen) {
      event.target.textContent = "Read less";
    } else {
      event.target.textContent = "Read more";
    }
  }
});

categories.forEach((category) => fetchMoviesByCategory(category));
