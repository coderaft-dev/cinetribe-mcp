import { TMDBService } from '../services/tmdbService.js';
import { Formatters } from '../utils/formatters.js';
import * as Types from '../types/index.js';

export class ToolImplementations {
  static async executeTool(toolName: string, args: Types.ToolArguments): Promise<{ content: Array<{ type: string; text: string }>; isError: boolean }> {
    try {
      switch (toolName) {
        // Movie Discovery
        case "mcp_tmdb_search_movies": {
          const parameterMapping = Formatters.getParameterMapping('movieDiscovery');
          const params = Formatters.buildParams(args, parameterMapping);
          const data = await TMDBService.discoverMovies(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatMovieResults(data.results, `Found ${data.results.length} movies (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        // Movie Recommendations
        case "mcp_tmdb_get_recommendations": {
          const movieId = args.movieId as string;
          const data = await TMDBService.getMovieRecommendations(movieId);
          
          return {
            content: [{ type: "text", text: Formatters.formatMovieResults(data.results.slice(0, 5), "Top 5 recommendations") }],
            isError: false,
          };
        }

        // Trending
        case "mcp_tmdb_get_trending": {
          const timeWindow = args.timeWindow as string;
          const data = await TMDBService.getTrendingMovies(timeWindow);
          
          return {
            content: [{ type: "text", text: Formatters.formatMovieResults(data.results.slice(0, 10), `Trending movies for the ${timeWindow}`) }],
            isError: false,
          };
        }

        // TV Discovery
        case "mcp_tmdb_search_tv_serials": {
          const parameterMapping = Formatters.getParameterMapping('tvDiscovery');
          const params = Formatters.buildParams(args, parameterMapping);
          const data = await TMDBService.discoverTVShows(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatTVResults(data.results, `Found ${data.results.length} TV shows (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        // Search endpoints
        case "mcp_tmdb_search_movie": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.searchMovies(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatMovieResults(data.results, `Found ${data.results.length} movies for "${args.query}" (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_search_tv": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.searchTVShows(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatTVResults(data.results, `Found ${data.results.length} TV shows for "${args.query}" (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_search_person": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.searchPeople(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatPersonResults(data.results, `Found ${data.results.length} people for "${args.query}" (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_search_multi": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.searchMulti(params);
          
          const results = [];
          if (data.movie_results.length > 0) {
            results.push(Formatters.formatMovieResults(data.movie_results, `Movies (${data.movie_results.length})`));
          }
          if (data.tv_results.length > 0) {
            results.push(Formatters.formatTVResults(data.tv_results, `TV Shows (${data.tv_results.length})`));
          }
          if (data.person_results.length > 0) {
            results.push(Formatters.formatPersonResults(data.person_results, `People (${data.person_results.length})`));
          }
          
          return {
            content: [{ type: "text", text: `Search results for "${args.query}":\n\n${results.join('\n\n')}` }],
            isError: false,
          };
        }

        case "mcp_tmdb_search_collection": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.searchCollections(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatCollectionResults(data.results, `Found ${data.results.length} collections for "${args.query}" (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_search_company": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.searchCompanies(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatCompanyResults(data.results, `Found ${data.results.length} companies for "${args.query}" (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_search_keyword": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.searchKeywords(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatKeywordResults(data.results, `Found ${data.results.length} keywords for "${args.query}" (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        // Movie lists
        case "mcp_tmdb_get_now_playing": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getNowPlaying(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatMovieResults(data.results, `Now Playing Movies (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_popular_movies": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getPopularMovies(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatMovieResults(data.results, `Popular Movies (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_top_rated_movies": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getTopRatedMovies(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatMovieResults(data.results, `Top Rated Movies (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_upcoming_movies": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getUpcomingMovies(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatMovieResults(data.results, `Upcoming Movies (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        // TV lists
        case "mcp_tmdb_get_airing_today": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getAiringToday(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatTVResults(data.results, `TV Shows Airing Today (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_on_the_air": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getOnTheAir(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatTVResults(data.results, `TV Shows On The Air (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_popular_tv": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getPopularTV(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatTVResults(data.results, `Popular TV Shows (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_top_rated_tv": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getTopRatedTV(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatTVResults(data.results, `Top Rated TV Shows (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        // People lists
        case "mcp_tmdb_get_popular_people": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getPopularPeople(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatPersonResults(data.results, `Popular People (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        // Trending
        case "mcp_tmdb_get_trending_all": {
          const timeWindow = args.timeWindow as string;
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getTrendingAll(timeWindow, params);
          
          return {
            content: [{ type: "text", text: Formatters.formatTrendingResults(data.results, `Trending items for the ${timeWindow} (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_trending_movies": {
          const timeWindow = args.timeWindow as string;
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getTrendingMovies(timeWindow, params);
          
          return {
            content: [{ type: "text", text: Formatters.formatMovieResults(data.results, `Trending Movies for the ${timeWindow} (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_trending_tv": {
          const timeWindow = args.timeWindow as string;
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getTrendingTV(timeWindow, params);
          
          return {
            content: [{ type: "text", text: Formatters.formatTVResults(data.results, `Trending TV Shows for the ${timeWindow} (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_trending_people": {
          const timeWindow = args.timeWindow as string;
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getTrendingPeople(timeWindow, params);
          
          return {
            content: [{ type: "text", text: Formatters.formatPersonResults(data.results, `Trending People for the ${timeWindow} (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        // Genres
        case "mcp_tmdb_get_movie_genres": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getMovieGenres(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatGenreResults(data.genres, "Movie Genres") }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_tv_genres": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getTVGenres(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatGenreResults(data.genres, "TV Genres") }],
            isError: false,
          };
        }

        // Watch Providers
        case "mcp_tmdb_get_watch_provider_regions": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getWatchProviderRegions(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatWatchProviderRegions(data.results, "Available Watch Provider Regions") }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_watch_provider_movies": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getWatchProviderMovies(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatWatchProviderResults(data.results, "Movie Watch Providers") }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_watch_provider_tv": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getWatchProviderTV(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatWatchProviderResults(data.results, "TV Watch Providers") }],
            isError: false,
          };
        }

        // Find
        case "mcp_tmdb_find_by_id": {
          const externalId = args.external_id as string;
          const externalSource = args.external_source as string;
          const params = Formatters.buildParams(args);
          const data = await TMDBService.findById(externalId, externalSource, params);
          
          const results = [];
          if (data.movie_results.length > 0) {
            results.push(Formatters.formatMovieResults(data.movie_results, `Movies (${data.movie_results.length})`));
          }
          if (data.tv_results.length > 0) {
            results.push(Formatters.formatTVResults(data.tv_results, `TV Shows (${data.tv_results.length})`));
          }
          if (data.person_results.length > 0) {
            results.push(Formatters.formatPersonResults(data.person_results, `People (${data.person_results.length})`));
          }
          
          return {
            content: [{ type: "text", text: `Find results for ${externalSource} ID "${externalId}":\n\n${results.join('\n\n')}` }],
            isError: false,
          };
        }

        // Changes
        case "mcp_tmdb_get_movie_changes": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getMovieChanges(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatChangeResults(data.results, `Movie Changes (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_tv_changes": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getTVChanges(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatChangeResults(data.results, `TV Changes (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        case "mcp_tmdb_get_person_changes": {
          const params = Formatters.buildParams(args);
          const data = await TMDBService.getPersonChanges(params);
          
          return {
            content: [{ type: "text", text: Formatters.formatChangeResults(data.results, `Person Changes (Page ${data.page} of ${data.total_pages})`) }],
            isError: false,
          };
        }

        default:
          throw new Error(`Tool not found: ${toolName}`);
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
          },
        ],
        isError: true,
      };
    }
  }
} 