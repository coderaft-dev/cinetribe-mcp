import fetch from 'node-fetch';
import { TMDB_BASE_URL, TMDB_API_KEY } from '../config/index.js';
import * as Types from '../types/index.js';

export class TMDBService {
  private static async fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.append("api_key", TMDB_API_KEY!);
    
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  }

  // Movie endpoints
  static async getMovieDetails(movieId: string): Promise<Types.MovieDetails> {
    return this.fetchFromTMDB<Types.MovieDetails>(`/movie/${movieId}`, { append_to_response: "credits,reviews" });
  }

  static async discoverMovies(params: Record<string, string> = {}): Promise<Types.TMDBResponse> {
    return this.fetchFromTMDB<Types.TMDBResponse>("/discover/movie", params);
  }

  static async getMovieRecommendations(movieId: string): Promise<Types.TMDBResponse> {
    return this.fetchFromTMDB<Types.TMDBResponse>(`/movie/${movieId}/recommendations`);
  }

  static async searchMovies(params: Record<string, string>): Promise<Types.TMDBResponse> {
    return this.fetchFromTMDB<Types.TMDBResponse>("/search/movie", params);
  }

  static async getNowPlaying(params: Record<string, string> = {}): Promise<Types.TMDBResponse> {
    return this.fetchFromTMDB<Types.TMDBResponse>("/movie/now_playing", params);
  }

  static async getPopularMovies(params: Record<string, string> = {}): Promise<Types.TMDBResponse> {
    return this.fetchFromTMDB<Types.TMDBResponse>("/movie/popular", params);
  }

  static async getTopRatedMovies(params: Record<string, string> = {}): Promise<Types.TMDBResponse> {
    return this.fetchFromTMDB<Types.TMDBResponse>("/movie/top_rated", params);
  }

  static async getUpcomingMovies(params: Record<string, string> = {}): Promise<Types.TMDBResponse> {
    return this.fetchFromTMDB<Types.TMDBResponse>("/movie/upcoming", params);
  }

  // TV endpoints
  static async discoverTVShows(params: Record<string, string> = {}): Promise<Types.TMDBTVResponse> {
    return this.fetchFromTMDB<Types.TMDBTVResponse>("/discover/tv", params);
  }

  static async searchTVShows(params: Record<string, string>): Promise<Types.TMDBTVResponse> {
    return this.fetchFromTMDB<Types.TMDBTVResponse>("/search/tv", params);
  }

  static async getAiringToday(params: Record<string, string> = {}): Promise<Types.TMDBTVResponse> {
    return this.fetchFromTMDB<Types.TMDBTVResponse>("/tv/airing_today", params);
  }

  static async getOnTheAir(params: Record<string, string> = {}): Promise<Types.TMDBTVResponse> {
    return this.fetchFromTMDB<Types.TMDBTVResponse>("/tv/on_the_air", params);
  }

  static async getPopularTV(params: Record<string, string> = {}): Promise<Types.TMDBTVResponse> {
    return this.fetchFromTMDB<Types.TMDBTVResponse>("/tv/popular", params);
  }

  static async getTopRatedTV(params: Record<string, string> = {}): Promise<Types.TMDBTVResponse> {
    return this.fetchFromTMDB<Types.TMDBTVResponse>("/tv/top_rated", params);
  }

  // People endpoints
  static async searchPeople(params: Record<string, string>): Promise<Types.TMDBPersonResponse> {
    return this.fetchFromTMDB<Types.TMDBPersonResponse>("/search/person", params);
  }

  static async getPopularPeople(params: Record<string, string> = {}): Promise<Types.TMDBPersonResponse> {
    return this.fetchFromTMDB<Types.TMDBPersonResponse>("/person/popular", params);
  }

  // Search endpoints
  static async searchMulti(params: Record<string, string>): Promise<Types.TMDBFindResponse> {
    return this.fetchFromTMDB<Types.TMDBFindResponse>("/search/multi", params);
  }

  static async searchCollections(params: Record<string, string>): Promise<Types.TMDBCollectionResponse> {
    return this.fetchFromTMDB<Types.TMDBCollectionResponse>("/search/collection", params);
  }

  static async searchCompanies(params: Record<string, string>): Promise<Types.TMDBCompanyResponse> {
    return this.fetchFromTMDB<Types.TMDBCompanyResponse>("/search/company", params);
  }

  static async searchKeywords(params: Record<string, string>): Promise<Types.TMDBKeywordResponse> {
    return this.fetchFromTMDB<Types.TMDBKeywordResponse>("/search/keyword", params);
  }

  // Trending endpoints
  static async getTrendingAll(timeWindow: string, params: Record<string, string> = {}): Promise<Types.TMDBTrendingResponse> {
    return this.fetchFromTMDB<Types.TMDBTrendingResponse>(`/trending/all/${timeWindow}`, params);
  }

  static async getTrendingMovies(timeWindow: string, params: Record<string, string> = {}): Promise<Types.TMDBResponse> {
    return this.fetchFromTMDB<Types.TMDBResponse>(`/trending/movie/${timeWindow}`, params);
  }

  static async getTrendingTV(timeWindow: string, params: Record<string, string> = {}): Promise<Types.TMDBTVResponse> {
    return this.fetchFromTMDB<Types.TMDBTVResponse>(`/trending/tv/${timeWindow}`, params);
  }

  static async getTrendingPeople(timeWindow: string, params: Record<string, string> = {}): Promise<Types.TMDBPersonResponse> {
    return this.fetchFromTMDB<Types.TMDBPersonResponse>(`/trending/person/${timeWindow}`, params);
  }

  // Genre endpoints
  static async getMovieGenres(params: Record<string, string> = {}): Promise<Types.TMDBGenreResponse> {
    return this.fetchFromTMDB<Types.TMDBGenreResponse>("/genre/movie/list", params);
  }

  static async getTVGenres(params: Record<string, string> = {}): Promise<Types.TMDBGenreResponse> {
    return this.fetchFromTMDB<Types.TMDBGenreResponse>("/genre/tv/list", params);
  }

  // Watch provider endpoints
  static async getWatchProviderRegions(params: Record<string, string> = {}): Promise<Types.TMDBWatchProviderRegionResponse> {
    return this.fetchFromTMDB<Types.TMDBWatchProviderRegionResponse>("/watch/providers/regions", params);
  }

  static async getWatchProviderMovies(params: Record<string, string> = {}): Promise<Types.TMDBWatchProviderMovieResponse> {
    return this.fetchFromTMDB<Types.TMDBWatchProviderMovieResponse>("/watch/providers/movie", params);
  }

  static async getWatchProviderTV(params: Record<string, string> = {}): Promise<Types.TMDBWatchProviderTVResponse> {
    return this.fetchFromTMDB<Types.TMDBWatchProviderTVResponse>("/watch/providers/tv", params);
  }

  // Find endpoints
  static async findById(externalId: string, externalSource: string, params: Record<string, string> = {}): Promise<Types.TMDBFindResponse> {
    return this.fetchFromTMDB<Types.TMDBFindResponse>(`/find/${externalId}`, { ...params, external_source: externalSource });
  }

  // Changes endpoints
  static async getMovieChanges(params: Record<string, string> = {}): Promise<Types.TMDBChangeListResponse> {
    return this.fetchFromTMDB<Types.TMDBChangeListResponse>("/movie/changes", params);
  }

  static async getTVChanges(params: Record<string, string> = {}): Promise<Types.TMDBChangeListResponse> {
    return this.fetchFromTMDB<Types.TMDBChangeListResponse>("/tv/changes", params);
  }

  static async getPersonChanges(params: Record<string, string> = {}): Promise<Types.TMDBChangeListResponse> {
    return this.fetchFromTMDB<Types.TMDBChangeListResponse>("/person/changes", params);
  }
} 