export const TOOL_DEFINITIONS = [
  // Movie Discovery
  {
    name: "mcp_tmdb_search_movies",
    description: "Discover movies using various filters and criteria",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code (e.g., 'en-US')" },
        region: { type: "string", description: "ISO 3166-1 region code (e.g., 'US')" },
        sort_by: { type: "string", description: "Sort results by (e.g., 'popularity.desc', 'release_date.desc', 'vote_average.desc')" },
        certification_country: { type: "string", description: "Country for certification filtering" },
        certification: { type: "string", description: "Certification rating (e.g., 'R', 'PG-13')" },
        certification_gte: { type: "string", description: "Certification greater than or equal to" },
        certification_lte: { type: "string", description: "Certification less than or equal to" },
        include_adult: { type: "boolean", description: "Include adult movies" },
        include_video: { type: "boolean", description: "Include video content" },
        page: { type: "integer", description: "Page number for pagination" },
        primary_release_year: { type: "integer", description: "Primary release year" },
        primary_release_date_gte: { type: "string", description: "Primary release date greater than or equal to (YYYY-MM-DD)" },
        primary_release_date_lte: { type: "string", description: "Primary release date less than or equal to (YYYY-MM-DD)" },
        release_date_gte: { type: "string", description: "Release date greater than or equal to (YYYY-MM-DD)" },
        release_date_lte: { type: "string", description: "Release date less than or equal to (YYYY-MM-DD)" },
        with_release_type: { type: "string", description: "Release type filter" },
        year: { type: "integer", description: "Release year" },
        vote_count_gte: { type: "integer", description: "Vote count greater than or equal to" },
        vote_count_lte: { type: "integer", description: "Vote count less than or equal to" },
        vote_average_gte: { type: "number", description: "Vote average greater than or equal to" },
        vote_average_lte: { type: "number", description: "Vote average less than or equal to" },
        with_cast: { type: "string", description: "Comma-separated list of cast member IDs" },
        with_crew: { type: "string", description: "Comma-separated list of crew member IDs" },
        with_people: { type: "string", description: "Comma-separated list of people IDs (cast or crew)" },
        with_companies: { type: "string", description: "Comma-separated list of production company IDs" },
        with_genres: { type: "string", description: "Comma-separated list of genre IDs" },
        without_genres: { type: "string", description: "Comma-separated list of genre IDs to exclude" },
        with_keywords: { type: "string", description: "Comma-separated list of keyword IDs" },
        without_keywords: { type: "string", description: "Comma-separated list of keyword IDs to exclude" },
        with_runtime_gte: { type: "integer", description: "Runtime greater than or equal to (minutes)" },
        with_runtime_lte: { type: "integer", description: "Runtime less than or equal to (minutes)" },
        with_original_language: { type: "string", description: "Original language ISO 639-1 code" },
        with_watch_providers: { type: "string", description: "Comma-separated list of watch provider IDs" },
        watch_region: { type: "string", description: "Region for watch providers" },
        with_watch_monetization_types: { type: "string", description: "Monetization types (flatrate, free, ads, rent, buy)" },
        without_companies: { type: "string", description: "Comma-separated list of production company IDs to exclude" }
      },
      required: [],
    },
  },
  // Movie Recommendations
  {
    name: "mcp_tmdb_get_recommendations",
    description: "Get movie recommendations based on a movie ID",
    inputSchema: {
      type: "object",
      properties: {
        movieId: { type: "string", description: "TMDB movie ID to get recommendations for" },
      },
      required: ["movieId"],
    },
  },
  // Trending
  {
    name: "mcp_tmdb_get_trending",
    description: "Get trending movies for a time window",
    inputSchema: {
      type: "object",
      properties: {
        timeWindow: { type: "string", enum: ["day", "week"], description: "Time window for trending movies" },
      },
      required: ["timeWindow"],
    },
  },
  // TV Discovery
  {
    name: "mcp_tmdb_search_tv_serials",
    description: "Discover TV shows using various filters and criteria",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code (e.g., 'en-US')" },
        sort_by: { type: "string", description: "Sort results by (e.g., 'popularity.desc', 'first_air_date.desc', 'vote_average.desc')" },
        air_date_gte: { type: "string", description: "Air date greater than or equal to (YYYY-MM-DD)" },
        air_date_lte: { type: "string", description: "Air date less than or equal to (YYYY-MM-DD)" },
        first_air_date_gte: { type: "string", description: "First air date greater than or equal to (YYYY-MM-DD)" },
        first_air_date_lte: { type: "string", description: "First air date less than or equal to (YYYY-MM-DD)" },
        first_air_date_year: { type: "integer", description: "First air date year" },
        page: { type: "integer", description: "Page number for pagination" },
        timezone: { type: "string", description: "Timezone for air dates" },
        vote_average_gte: { type: "number", description: "Vote average greater than or equal to" },
        vote_average_lte: { type: "number", description: "Vote average less than or equal to" },
        vote_count_gte: { type: "integer", description: "Vote count greater than or equal to" },
        vote_count_lte: { type: "integer", description: "Vote count less than or equal to" },
        with_genres: { type: "string", description: "Comma-separated list of genre IDs" },
        with_networks: { type: "string", description: "Comma-separated list of network IDs" },
        without_genres: { type: "string", description: "Comma-separated list of genre IDs to exclude" },
        with_runtime_gte: { type: "integer", description: "Runtime greater than or equal to (minutes)" },
        with_runtime_lte: { type: "integer", description: "Runtime less than or equal to (minutes)" },
        include_null_first_air_dates: { type: "boolean", description: "Include TV shows with null first air dates" },
        with_original_language: { type: "string", description: "Original language ISO 639-1 code" },
        without_keywords: { type: "string", description: "Comma-separated list of keyword IDs to exclude" },
        screened_theatrically: { type: "boolean", description: "Filter shows that were screened theatrically" },
        with_companies: { type: "string", description: "Comma-separated list of production company IDs" },
        without_companies: { type: "string", description: "Comma-separated list of production company IDs to exclude" },
        with_keywords: { type: "string", description: "Comma-separated list of keyword IDs" },
        with_watch_providers: { type: "string", description: "Comma-separated list of watch provider IDs" },
        watch_region: { type: "string", description: "Region for watch providers" },
        with_watch_monetization_types: { type: "string", description: "Monetization types (flatrate, free, ads, rent, buy)" },
        with_status: { type: "string", description: "TV show status filter" },
        with_type: { type: "string", description: "TV show type filter" }
      },
      required: [],
    },
  },
  // Search endpoints
  {
    name: "mcp_tmdb_search_movie",
    description: "Search for movies by title",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" },
        include_adult: { type: "boolean", description: "Include adult movies" },
        region: { type: "string", description: "ISO 3166-1 region code" },
        year: { type: "integer", description: "Release year" },
        primary_release_year: { type: "integer", description: "Primary release year" }
      },
      required: ["query"],
    },
  },
  {
    name: "mcp_tmdb_search_tv",
    description: "Search for TV shows by title",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" },
        include_adult: { type: "boolean", description: "Include adult TV shows" },
        first_air_date_year: { type: "integer", description: "First air date year" }
      },
      required: ["query"],
    },
  },
  {
    name: "mcp_tmdb_search_person",
    description: "Search for people by name",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" },
        include_adult: { type: "boolean", description: "Include adult content" },
        region: { type: "string", description: "ISO 3166-1 region code" }
      },
      required: ["query"],
    },
  },
  {
    name: "mcp_tmdb_search_multi",
    description: "Search for movies, TV shows, and people in a single request",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" },
        include_adult: { type: "boolean", description: "Include adult content" },
        region: { type: "string", description: "ISO 3166-1 region code" }
      },
      required: ["query"],
    },
  },
  {
    name: "mcp_tmdb_search_collection",
    description: "Search for collections by name",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" },
        include_adult: { type: "boolean", description: "Include adult content" },
        region: { type: "string", description: "ISO 3166-1 region code" }
      },
      required: ["query"],
    },
  },
  {
    name: "mcp_tmdb_search_company",
    description: "Search for companies by name",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        page: { type: "integer", description: "Page number" }
      },
      required: ["query"],
    },
  },
  {
    name: "mcp_tmdb_search_keyword",
    description: "Search for keywords by name",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        page: { type: "integer", description: "Page number" }
      },
      required: ["query"],
    },
  },
  // Movie lists
  {
    name: "mcp_tmdb_get_now_playing",
    description: "Get movies currently in theatres",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" },
        region: { type: "string", description: "ISO 3166-1 region code" }
      },
      required: [],
    },
  },
  {
    name: "mcp_tmdb_get_popular_movies",
    description: "Get popular movies",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" },
        region: { type: "string", description: "ISO 3166-1 region code" }
      },
      required: [],
    },
  },
  {
    name: "mcp_tmdb_get_top_rated_movies",
    description: "Get top rated movies",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" },
        region: { type: "string", description: "ISO 3166-1 region code" }
      },
      required: [],
    },
  },
  {
    name: "mcp_tmdb_get_upcoming_movies",
    description: "Get upcoming movies",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" },
        region: { type: "string", description: "ISO 3166-1 region code" }
      },
      required: [],
    },
  },
  // TV lists
  {
    name: "mcp_tmdb_get_airing_today",
    description: "Get TV shows airing today",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" },
        timezone: { type: "string", description: "Timezone" }
      },
      required: [],
    },
  },
  {
    name: "mcp_tmdb_get_on_the_air",
    description: "Get TV shows currently on the air",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" },
        timezone: { type: "string", description: "Timezone" }
      },
      required: [],
    },
  },
  {
    name: "mcp_tmdb_get_popular_tv",
    description: "Get popular TV shows",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" }
      },
      required: [],
    },
  },
  {
    name: "mcp_tmdb_get_top_rated_tv",
    description: "Get top rated TV shows",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" }
      },
      required: [],
    },
  },
  // People lists
  {
    name: "mcp_tmdb_get_popular_people",
    description: "Get popular people",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" },
        page: { type: "integer", description: "Page number" }
      },
      required: [],
    },
  },
  // Trending
  {
    name: "mcp_tmdb_get_trending_all",
    description: "Get trending items (movies, TV shows, people)",
    inputSchema: {
      type: "object",
      properties: {
        timeWindow: { type: "string", enum: ["day", "week"], description: "Time window" },
        language: { type: "string", description: "ISO 639-1 language code" }
      },
      required: ["timeWindow"],
    },
  },
  {
    name: "mcp_tmdb_get_trending_movies",
    description: "Get trending movies",
    inputSchema: {
      type: "object",
      properties: {
        timeWindow: { type: "string", enum: ["day", "week"], description: "Time window" },
        language: { type: "string", description: "ISO 639-1 language code" }
      },
      required: ["timeWindow"],
    },
  },
  {
    name: "mcp_tmdb_get_trending_tv",
    description: "Get trending TV shows",
    inputSchema: {
      type: "object",
      properties: {
        timeWindow: { type: "string", enum: ["day", "week"], description: "Time window" },
        language: { type: "string", description: "ISO 639-1 language code" }
      },
      required: ["timeWindow"],
    },
  },
  {
    name: "mcp_tmdb_get_trending_people",
    description: "Get trending people",
    inputSchema: {
      type: "object",
      properties: {
        timeWindow: { type: "string", enum: ["day", "week"], description: "Time window" },
        language: { type: "string", description: "ISO 639-1 language code" }
      },
      required: ["timeWindow"],
    },
  },
  // Genres
  {
    name: "mcp_tmdb_get_movie_genres",
    description: "Get movie genres",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" }
      },
      required: [],
    },
  },
  {
    name: "mcp_tmdb_get_tv_genres",
    description: "Get TV genres",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" }
      },
      required: [],
    },
  },
  // Watch Providers
  {
    name: "mcp_tmdb_get_watch_provider_regions",
    description: "Get available watch provider regions",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" }
      },
      required: [],
    },
  },
  {
    name: "mcp_tmdb_get_watch_provider_movies",
    description: "Get movie watch providers",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" },
        watch_region: { type: "string", description: "Watch region" }
      },
      required: [],
    },
  },
  {
    name: "mcp_tmdb_get_watch_provider_tv",
    description: "Get TV watch providers",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "ISO 639-1 language code" },
        watch_region: { type: "string", description: "Watch region" }
      },
      required: [],
    },
  },
  // Find
  {
    name: "mcp_tmdb_find_by_id",
    description: "Find items by external ID",
    inputSchema: {
      type: "object",
      properties: {
        external_id: { type: "string", description: "External ID" },
        external_source: { type: "string", enum: ["imdb_id", "freebase_mid", "freebase_id", "tvrage_id", "facebook_id", "instagram_id", "twitter_id", "wikidata_id"], description: "External source" },
        language: { type: "string", description: "ISO 639-1 language code" }
      },
      required: ["external_id", "external_source"],
    },
  },
  // Changes
  {
    name: "mcp_tmdb_get_movie_changes",
    description: "Get movie changes",
    inputSchema: {
      type: "object",
      properties: {
        start_date: { type: "string", description: "Start date (YYYY-MM-DD)" },
        end_date: { type: "string", description: "End date (YYYY-MM-DD)" },
        page: { type: "integer", description: "Page number" }
      },
      required: [],
    },
  },
  {
    name: "mcp_tmdb_get_tv_changes",
    description: "Get TV changes",
    inputSchema: {
      type: "object",
      properties: {
        start_date: { type: "string", description: "Start date (YYYY-MM-DD)" },
        end_date: { type: "string", description: "End date (YYYY-MM-DD)" },
        page: { type: "integer", description: "Page number" }
      },
      required: [],
    },
  },
  {
    name: "mcp_tmdb_get_person_changes",
    description: "Get person changes",
    inputSchema: {
      type: "object",
      properties: {
        start_date: { type: "string", description: "Start date (YYYY-MM-DD)" },
        end_date: { type: "string", description: "End date (YYYY-MM-DD)" },
        page: { type: "integer", description: "Page number" }
      },
      required: [],
    },
  },
]; 