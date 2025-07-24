// Core data types
export interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  poster_path?: string;
  genres?: Array<{ id: number; name: string }>;
}

export interface TVShow {
  id: number;
  name: string;
  first_air_date: string;
  vote_average: number;
  overview: string;
  poster_path?: string;
  genres?: Array<{ id: number; name: string }>;
}

export interface Person {
  id: number;
  name: string;
  profile_path?: string;
  known_for_department: string;
  popularity: number;
}

export interface MovieDetails extends Movie {
  credits?: {
    cast: Array<{ name: string; character: string }>;
    crew: Array<{ name: string; job: string }>;
  };
  reviews?: {
    results: Array<{ author: string; content: string; rating?: number }>;
  };
}

// API Response types
export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface TMDBTVResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

export interface TMDBPersonResponse {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}

export interface TMDBCollectionResponse {
  page: number;
  results: Array<{ id: number; name: string; overview: string }>;
  total_pages: number;
  total_results: number;
}

export interface TMDBCompanyResponse {
  page: number;
  results: Array<{ id: number; name: string; origin_country: string }>;
  total_pages: number;
  total_results: number;
}

export interface TMDBKeywordResponse {
  page: number;
  results: Array<{ id: number; name: string }>;
  total_pages: number;
  total_results: number;
}

export interface TMDBGenreResponse {
  genres: Array<{ id: number; name: string }>;
}

export interface TMDBFindResponse {
  movie_results: Movie[];
  person_results: Person[];
  tv_results: TVShow[];
}

export interface TMDBTrendingResponse {
  page: number;
  results: Array<Movie | TVShow | Person>;
  total_pages: number;
  total_results: number;
}

export interface TMDBWatchProviderRegionResponse {
  results: Record<string, any>;
}

export interface TMDBWatchProviderMovieResponse {
  results: Record<string, any>;
}

export interface TMDBWatchProviderTVResponse {
  results: Record<string, any>;
}

export interface TMDBChangeListResponse {
  page: number;
  results: Array<{ key: string; items: any[] }>;
  total_pages: number;
  total_results: number;
}

// Tool parameter types
export interface ToolArguments {
  [key: string]: any;
}

export interface ParameterMapping {
  [key: string]: string;
} 