const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const movieContainer = document.getElementById("movieContainer");

// Put your OMDb API key here
const API_KEY = "568a11af";


// Search Movie
async function searchMovie() {

    const movieName = searchInput.value.trim();

    if (movieName === "") {
        alert("Please enter a movie name");
        return;
    }

    movieContainer.innerHTML = `
        <div class="col-12 text-center">
            <h4>Loading... 🎬</h4>
        </div>
    `;

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`
        );

        const data = await response.json();

        if (data.Response === "False") {

            movieContainer.innerHTML = `
                <div class="col-12 text-center">
                    <h4>No movies found 😔</h4>
                    <p>${data.Error}</p>
                </div>
            `;

            return;
        }

        displayMovies(data.Search);

    } catch (error) {

        console.error(error);

        movieContainer.innerHTML = `
            <div class="col-12 text-center">
                <h4>Something went wrong ❌</h4>
            </div>
        `;
    }
}


// Display Movies

function displayMovies(movies) {

    movieContainer.innerHTML = "";

    movies.forEach(function(movie) {

        let poster = movie.Poster;

        if (!poster || poster === "N/A") {
            poster = "https://placehold.co/300x400/png?text=No+Poster";
        } else {
            poster = poster.replace("http://", "https://");
        }

        movieContainer.innerHTML += `
        
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card h-100">

                <img
                    src="${poster}"
                    class="card-img-top"
                    alt="${movie.Title}"
                    onerror="this.onerror=null; this.src='https://placehold.co/300x400/png?text=No+Poster';"
                >

                <div class="card-body">

                    <h5 class="card-title text-primary"
                        style="cursor: pointer;"
                        onclick="getMovieDetails('${movie.imdbID}')">
                        ${movie.Title}
                    </h5>

                    <p class="card-text">
                        <strong>Year:</strong> ${movie.Year}
                    </p>

                    <p class="card-text">
                        <strong>Type:</strong> ${movie.Type}
                    </p>

                    <button
                        class="btn btn-primary"
                        onclick="getMovieDetails('${movie.imdbID}')">
                        View Details
                    </button>

                </div>
            </div>
        </div>
        `;
    });
}
// Get Movie Details
async function getMovieDetails(imdbID) {

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
        );

        const movie = await response.json();

        if (movie.Response === "False") {
            alert(movie.Error);
            return;
        }


        // Set movie details

        document.getElementById("modalTitle").textContent =
            movie.Title;

        document.getElementById("movieTitle").textContent =
            movie.Title;

        document.getElementById("movieYear").textContent =
            movie.Year;

        document.getElementById("movieGenre").textContent =
            movie.Genre;

        document.getElementById("movieDirector").textContent =
            movie.Director;

        document.getElementById("movieActors").textContent =
            movie.Actors;

        document.getElementById("movieRating").textContent =
            movie.imdbRating;

        document.getElementById("moviePlot").textContent =
            movie.Plot;


        // Poster

        let poster = movie.Poster;

if (!poster || poster === "N/A") {
   poster = "https://placehold.co/300x400/png?text=No+Poster"; 
} else {
    poster = poster.replace("http://", "https://");
}

        document.getElementById("modalPoster").src =
            poster;


        // Open Bootstrap Modal

        const modal =
            new bootstrap.Modal(
                document.getElementById("movieModal")
            );

        modal.show();


    } catch (error) {

        console.error(error);

        alert("Unable to get movie details.");

    }
}


// Search Button
searchButton.addEventListener("click", searchMovie);


// Press Enter to Search
searchInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        searchMovie();
    }

});
window.addEventListener("load", function() {
    searchInput.value = "Inception";
    searchMovie();
});