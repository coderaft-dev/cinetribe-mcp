export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const SERVER_CONFIG = {
  name: "example-servers/tmdb",
  version: "0.1.0",
};

export const CAPABILITIES = {
  resources: {},
  tools: {},
};

// Parameter mappings for API endpoints
export const PARAMETER_MAPPINGS = {
  movieDiscovery: {
    'certification_gte': 'certification.gte',
    'certification_lte': 'certification.lte',
    'primary_release_date_gte': 'primary_release_date.gte',
    'primary_release_date_lte': 'primary_release_date.lte',
    'release_date_gte': 'release_date.gte',
    'release_date_lte': 'release_date.lte',
    'vote_count_gte': 'vote_count.gte',
    'vote_count_lte': 'vote_count.lte',
    'vote_average_gte': 'vote_average.gte',
    'vote_average_lte': 'vote_average.lte',
    'with_runtime_gte': 'with_runtime.gte',
    'with_runtime_lte': 'with_runtime.lte'
  },
  tvDiscovery: {
    'air_date_gte': 'air_date.gte',
    'air_date_lte': 'air_date.lte',
    'first_air_date_gte': 'first_air_date.gte',
    'first_air_date_lte': 'first_air_date.lte',
    'vote_average_gte': 'vote_average.gte',
    'vote_average_lte': 'vote_average.lte',
    'vote_count_gte': 'vote_count.gte',
    'vote_count_lte': 'vote_count.lte',
    'with_runtime_gte': 'with_runtime.gte',
    'with_runtime_lte': 'with_runtime.lte'
  }
}; 