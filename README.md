# CineTribe TMDB MCP Server

A Model Context Protocol (MCP) server that provides access to The Movie Database (TMDB) API, allowing AI assistants to search for movies, TV shows, people, and more.

## 🏗️ Architecture

This project follows a modular architecture for better maintainability and scalability:

```
src/
├── config/          # Configuration and constants
├── handlers/        # MCP request handlers
├── services/        # API service layer
├── tools/           # Tool definitions and implementations
├── types/           # TypeScript type definitions
├── utils/           # Utility functions and formatters
└── index.ts         # Main entry point
```

### Module Breakdown

#### 📁 `config/`
- **`index.ts`**: Contains all configuration constants, environment variables, and parameter mappings
- Centralizes all configuration for easy maintenance

#### 📁 `handlers/`
- **`resourceHandlers.ts`**: Handles MCP resource operations (list and read resources)
- Separates resource logic from tool logic

#### 📁 `services/`
- **`tmdbService.ts`**: Service layer that handles all TMDB API calls
- Provides a clean interface for all API operations
- Handles error handling and response formatting

#### 📁 `tools/`
- **`definitions.ts`**: Contains all MCP tool schemas and definitions
- **`implementations.ts`**: Contains the execution logic for all tools
- Separates tool definition from implementation

#### 📁 `types/`
- **`index.ts`**: All TypeScript interfaces and type definitions
- Ensures type safety across the application

#### 📁 `utils/`
- **`formatters.ts`**: Utility functions for formatting API responses
- Helper functions for parameter building and result formatting

## 🚀 Features

### Movie Operations
- Search and discover movies with advanced filters
- Get movie recommendations
- Access popular, top-rated, upcoming, and now-playing movies
- Get trending movies

### TV Show Operations
- Search and discover TV shows
- Access popular, top-rated, and currently airing shows
- Get trending TV shows

### People Operations
- Search for actors, directors, and other industry professionals
- Get popular people
- Get trending people

### Search Capabilities
- Multi-search across movies, TV shows, and people
- Search by collections, companies, and keywords
- Find content by external IDs (IMDB, etc.)

### Additional Features
- Genre information for movies and TV shows
- Watch provider information
- Change tracking for movies, TV shows, and people

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cinetribe-mcp-tmdb
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
export TMDB_API_KEY="your_tmdb_api_key_here"
```

4. Build the project:
```bash
npm run build
```

## 🔧 Usage

### As an MCP Server

The server can be used with any MCP-compatible client. The server provides:

- **Resources**: Access to movie information via URIs like `tmdb:///movie/{id}`
- **Tools**: 30+ tools for searching and discovering content

### Example Tool Usage

```typescript
// Search for movies
await callTool("mcp_tmdb_search_movies", {
  query: "action",
  year: 2023,
  vote_average_gte: 7.0
});

// Get trending movies
await callTool("mcp_tmdb_get_trending", {
  timeWindow: "week"
});

// Get movie recommendations
await callTool("mcp_tmdb_get_recommendations", {
  movieId: "550"
});
```

## 📋 Available Tools

### Movie Discovery & Search
- `mcp_tmdb_search_movies` - Discover movies with filters
- `mcp_tmdb_search_movie` - Search movies by title
- `mcp_tmdb_get_recommendations` - Get movie recommendations
- `mcp_tmdb_get_now_playing` - Currently in theaters
- `mcp_tmdb_get_popular_movies` - Popular movies
- `mcp_tmdb_get_top_rated_movies` - Top rated movies
- `mcp_tmdb_get_upcoming_movies` - Upcoming releases

### TV Show Operations
- `mcp_tmdb_search_tv_serials` - Discover TV shows
- `mcp_tmdb_search_tv` - Search TV shows by title
- `mcp_tmdb_get_airing_today` - Shows airing today
- `mcp_tmdb_get_on_the_air` - Currently on air
- `mcp_tmdb_get_popular_tv` - Popular TV shows
- `mcp_tmdb_get_top_rated_tv` - Top rated TV shows

### People Operations
- `mcp_tmdb_search_person` - Search for people
- `mcp_tmdb_get_popular_people` - Popular people

### Trending Content
- `mcp_tmdb_get_trending` - Trending movies
- `mcp_tmdb_get_trending_all` - All trending content
- `mcp_tmdb_get_trending_movies` - Trending movies
- `mcp_tmdb_get_trending_tv` - Trending TV shows
- `mcp_tmdb_get_trending_people` - Trending people

### Search & Discovery
- `mcp_tmdb_search_multi` - Multi-search
- `mcp_tmdb_search_collection` - Search collections
- `mcp_tmdb_search_company` - Search companies
- `mcp_tmdb_search_keyword` - Search keywords
- `mcp_tmdb_find_by_id` - Find by external ID

### Genres & Metadata
- `mcp_tmdb_get_movie_genres` - Movie genres
- `mcp_tmdb_get_tv_genres` - TV genres

### Watch Providers
- `mcp_tmdb_get_watch_provider_regions` - Available regions
- `mcp_tmdb_get_watch_provider_movies` - Movie providers
- `mcp_tmdb_get_watch_provider_tv` - TV providers

### Changes
- `mcp_tmdb_get_movie_changes` - Movie changes
- `mcp_tmdb_get_tv_changes` - TV changes
- `mcp_tmdb_get_person_changes` - Person changes

## 🔍 Development

### Adding New Tools

1. **Define the tool** in `src/tools/definitions.ts`
2. **Implement the tool** in `src/tools/implementations.ts`
3. **Add service method** in `src/services/tmdbService.ts` if needed
4. **Add formatter** in `src/utils/formatters.ts` if needed

### Project Structure Benefits

- **Separation of Concerns**: Each module has a specific responsibility
- **Maintainability**: Easy to locate and modify specific functionality
- **Testability**: Each module can be tested independently
- **Scalability**: Easy to add new features without affecting existing code
- **Type Safety**: Comprehensive TypeScript types throughout

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the modular architecture
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support or questions, please open an issue on the GitHub repository. 