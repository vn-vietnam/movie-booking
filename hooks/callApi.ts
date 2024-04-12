import { movieCastDetails, movieDetails, nowPlayingMovies, popularMovies, upcomingMovies } from "@/app/api/api";

export const getNowPlayingMoviesList = async () => {
	try {
		let response = await fetch(nowPlayingMovies);
		let json = await response.json();
		return json;
	} catch (error) {
		console.error(
			" Something went wrong in getNowPlayingMoviesList Function",
			error
		);
	}
};

export const getUpcomingMoviesList = async () => {
	try {
		let response = await fetch(upcomingMovies);
		let json = await response.json();
		return json;
	} catch (error) {
		console.error(
			" Something went wrong in getUpcomingMoviesList Function",
			error
		);
	}
};

export const getPopularMoviesList = async () => {
	try {
		let response = await fetch(popularMovies);
		let json = await response.json();
		return json;
	} catch (error) {
		console.error(
			" Something went wrong in getPopularMoviesList Function",
			error
		);
	}
};

export const getMovieDetails = async (movieid: number) => {
	try {
		let response = await fetch(movieDetails(movieid));
		let json = await response.json();
		return json;
	} catch (error) {
		console.error("Something Went wrong in getMoviesDetails Function", error);
	}
};

export const getMovieCastDetails = async (movieid: number) => {
	try {
		let response = await fetch(movieCastDetails(movieid));
		let json = await response.json();
		return json;
	} catch (error) {
		console.error(
			"Something Went wrong in getMovieCastDetails Function",
			error
		);
	}
};
