import { TMDBService } from '../services/tmdbService.js';
import * as Types from '../types/index.js';

export class ResourceHandlers {
  static async handleListResources(request: any) {
    const params: Record<string, string> = {
      page: request.params?.cursor || "1",
    };

    const data = await TMDBService.getPopularMovies(params);
    
    return {
      resources: data.results.map((movie) => ({
        uri: `tmdb:///movie/${movie.id}`,
        mimeType: "application/json",
        name: `${movie.title} (${movie.release_date.split("-")[0]})`,
      })),
      nextCursor: data.page < data.total_pages ? String(data.page + 1) : undefined,
    };
  }

  static async handleReadResource(request: any) {
    const movieId = request.params.uri.replace("tmdb:///movie/", "");
    const movie = await TMDBService.getMovieDetails(movieId);

    const movieInfo = {
      title: movie.title,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      overview: movie.overview,
      genres: movie.genres?.map(g => g.name).join(", "),
      posterUrl: movie.poster_path ?
        `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
        "No poster available",
      cast: movie.credits?.cast?.slice(0, 5).map(actor => `${actor.name} as ${actor.character}`),
      director: movie.credits?.crew?.find(person => person.job === "Director")?.name,
      reviews: movie.reviews?.results?.slice(0, 3).map(review => ({
        author: review.author,
        content: review.content,
        rating: review.rating
      }))
    };

    return {
      contents: [
        {
          uri: request.params.uri,
          mimeType: "application/json",
          text: JSON.stringify(movieInfo, null, 2),
        },
      ],
    };
  }
} 