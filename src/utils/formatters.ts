import * as Types from '../types/index.js';
import { PARAMETER_MAPPINGS } from '../config/index.js';

export class Formatters {
  // Helper function to build parameters
  static buildParams(args: Types.ToolArguments, parameterMapping: Types.ParameterMapping = {}): Record<string, string> {
    const params: Record<string, string> = {};
    Object.keys(args).forEach(key => {
      if (args[key] !== undefined && args[key] !== null && args[key] !== '') {
        const apiKey = parameterMapping[key] || key;
        params[apiKey] = String(args[key]);
      }
    });
    return params;
  }

  // Helper function to format movie results
  static formatMovieResults(movies: Types.Movie[], title: string): string {
    const results = movies
      .map((movie) =>
        `${movie.title} (${movie.release_date?.split("-")[0]}) - ID: ${movie.id}\n` +
        `Rating: ${movie.vote_average}/10\n` +
        `Overview: ${movie.overview}\n`
      )
      .join("\n---\n");
    return `${title}:\n\n${results}`;
  }

  // Helper function to format TV results
  static formatTVResults(shows: Types.TVShow[], title: string): string {
    const results = shows
      .map((show) =>
        `${show.name} (${show.first_air_date?.split("-")[0]}) - ID: ${show.id}\n` +
        `Rating: ${show.vote_average}/10\n` +
        `Overview: ${show.overview}\n`
      )
      .join("\n---\n");
    return `${title}:\n\n${results}`;
  }

  // Helper function to format person results
  static formatPersonResults(people: Types.Person[], title: string): string {
    const results = people
      .map((person) =>
        `${person.name} - ID: ${person.id}\n` +
        `Department: ${person.known_for_department}\n` +
        `Popularity: ${person.popularity}\n`
      )
      .join("\n---\n");
    return `${title}:\n\n${results}`;
  }

  // Helper function to format collection results
  static formatCollectionResults(collections: Array<{ id: number; name: string; overview: string }>, title: string): string {
    const results = collections
      .map((collection) =>
        `${collection.name} - ID: ${collection.id}\n` +
        `Overview: ${collection.overview}\n`
      )
      .join("\n---\n");
    return `${title}:\n\n${results}`;
  }

  // Helper function to format company results
  static formatCompanyResults(companies: Array<{ id: number; name: string; origin_country: string }>, title: string): string {
    const results = companies
      .map((company) =>
        `${company.name} - ID: ${company.id}\n` +
        `Country: ${company.origin_country}\n`
      )
      .join("\n---\n");
    return `${title}:\n\n${results}`;
  }

  // Helper function to format keyword results
  static formatKeywordResults(keywords: Array<{ id: number; name: string }>, title: string): string {
    const results = keywords
      .map((keyword) =>
        `${keyword.name} - ID: ${keyword.id}\n`
      )
      .join("\n---\n");
    return `${title}:\n\n${results}`;
  }

  // Helper function to format genre results
  static formatGenreResults(genres: Array<{ id: number; name: string }>, title: string): string {
    const results = genres
      .map((genre) => `${genre.name} - ID: ${genre.id}`)
      .join("\n");
    return `${title}:\n\n${results}`;
  }

  // Helper function to format trending results
  static formatTrendingResults(items: Array<Types.Movie | Types.TVShow | Types.Person>, title: string): string {
    const results = items
      .map((item) => {
        if ('title' in item) {
          return `${(item as Types.Movie).title} (Movie) - ID: ${item.id}`;
        } else if ('name' in item && 'first_air_date' in item) {
          return `${(item as Types.TVShow).name} (TV Show) - ID: ${item.id}`;
        } else {
          return `${(item as Types.Person).name} (Person) - ID: ${item.id}`;
        }
      })
      .join("\n---\n");
    return `${title}:\n\n${results}`;
  }

  // Helper function to format change results
  static formatChangeResults(changes: Array<{ key: string; items: any[] }>, title: string): string {
    const results = changes
      .map((change) => `${change.key}: ${change.items.length} changes`)
      .join("\n");
    return `${title}:\n\n${results}`;
  }

  // Helper function to format watch provider results
  static formatWatchProviderResults(results: Record<string, any>, title: string): string {
    const formattedResults = Object.entries(results)
      .map(([region, providers]) => `${region}: ${Object.keys(providers).join(", ")}`)
      .join("\n");
    return `${title}:\n\n${formattedResults}`;
  }

  // Helper function to format watch provider regions
  static formatWatchProviderRegions(results: Record<string, any>, title: string): string {
    const regions = Object.keys(results).join(", ");
    return `${title}:\n\n${regions}`;
  }

  // Get parameter mapping for specific endpoint
  static getParameterMapping(endpoint: 'movieDiscovery' | 'tvDiscovery'): Types.ParameterMapping {
    return PARAMETER_MAPPINGS[endpoint] || {};
  }
} 