# Deploying CineTribe MCP TMDB Server to Google Cloud Run

This guide will walk you through deploying the CineTribe MCP TMDB server to Google Cloud Run, allowing you to host your MCP server in the cloud for reliable access.

## Prerequisites

1. **Google Cloud Account**: You need a Google Cloud account with billing enabled
2. **Google Cloud CLI**: Install the `gcloud` CLI tool
3. **TMDB API Key**: Get your API key from [The Movie Database](https://www.themoviedb.org/settings/api)
4. **Docker**: Docker should be installed locally (optional, for local testing)

## Setup Instructions

### 1. Install Google Cloud CLI

If you haven't already, install the Google Cloud CLI:

- **macOS**: `brew install google-cloud-sdk`
- **Linux**: Follow the [official instructions](https://cloud.google.com/sdk/docs/install)
- **Windows**: Download from the [Google Cloud website](https://cloud.google.com/sdk/docs/install)

### 2. Authenticate with Google Cloud

```bash
gcloud auth login
gcloud auth application-default login
```

### 3. Create or Select a Google Cloud Project

```bash
# Create a new project (optional)
gcloud projects create your-project-id --name="CineTribe MCP TMDB"

# Set the project
gcloud config set project your-project-id
```

### 4. Quick Deployment

The easiest way to deploy is using Google Cloud Build with our configuration:

```bash
# Deploy using Cloud Build
gcloud builds submit --config cloudbuild.yaml --substitutions=_REGION=us-central1
```

This will:
- Build the Docker container
- Push to Google Container Registry
- Deploy to Cloud Run automatically

## Manual Deployment

If you prefer to deploy manually, follow these steps:

### 1. Enable Required APIs

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 2. Create TMDB API Key Secret

```bash
# Create the secret (you'll be prompted for the API key)
echo -n "your-tmdb-api-key" | gcloud secrets create tmdb-api-key --data-file=-
```

### 3. Build and Deploy

```bash
# Build and deploy using Cloud Build
gcloud builds submit --config cloudbuild.yaml --substitutions=_REGION=us-central1

# Alternative: Manual Docker build and push
PROJECT_ID=$(gcloud config get-value project)
docker build -t gcr.io/$PROJECT_ID/cinetribe-mcp-tmdb .
docker push gcr.io/$PROJECT_ID/cinetribe-mcp-tmdb

# Deploy to Cloud Run
gcloud run deploy cinetribe-mcp-tmdb \
  --image gcr.io/$PROJECT_ID/cinetribe-mcp-tmdb \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --cpu 1 \
  --memory 512Mi \
  --min-instances 0 \
  --max-instances 10 \
  --concurrency 100 \
  --timeout 300 \
  --set-env-vars NODE_ENV=production \
  --update-secrets TMDB_API_KEY=tmdb-api-key:latest
```

## Configuration Files

The deployment includes several configuration files:

### `cloudbuild.yaml`
Google Cloud Build configuration that:
- Builds the Docker container
- Pushes to Google Container Registry
- Deploys to Cloud Run

### `cloud-run-service.yaml`
Kubernetes-style service configuration for Cloud Run with:
- Resource limits and requests
- Health checks
- Environment variables
- Secret management

### `.gcloudignore`
Excludes unnecessary files from deployment to reduce build time and image size.

## Environment Variables

The service uses these environment variables:

- `TMDB_API_KEY`: Your TMDB API key (stored as a Google Secret)
- `NODE_ENV`: Set to "production" for Cloud Run
- `PORT`: Automatically set by Cloud Run (default: 8080)

## Monitoring and Troubleshooting

### View Logs

```bash
# View recent logs
gcloud logging read 'resource.type="cloud_run_revision" AND resource.labels.service_name="cinetribe-mcp-tmdb"' --limit 50

# Follow logs in real-time
gcloud logging tail 'resource.type="cloud_run_revision" AND resource.labels.service_name="cinetribe-mcp-tmdb"'
```

### Service Information

```bash
# Get service details
gcloud run services describe cinetribe-mcp-tmdb --region=us-central1

# Get service URL
gcloud run services describe cinetribe-mcp-tmdb --region=us-central1 --format="value(status.url)"
```

### Update the Service

To update the service with new code:

```bash
# Trigger a new build and deployment
gcloud builds submit --config cloudbuild.yaml
```

## Security Considerations

1. **API Key Security**: Your TMDB API key is stored as a Google Secret Manager secret
2. **Authentication**: The service is deployed with `--allow-unauthenticated` for MCP compatibility
3. **Network Security**: Consider using VPC connector for private networking if needed

## Cost Optimization

The deployment is configured for cost optimization:

- **CPU**: 1 vCPU allocated
- **Memory**: 512Mi allocated
- **Min Instances**: 0 (scales to zero when not in use)
- **Max Instances**: 10
- **Concurrency**: 100 requests per instance

## Regions

You can deploy to any Cloud Run supported region. Popular choices:

- `us-central1` (Iowa) - Default, lowest latency for North America
- `us-east1` (South Carolina)
- `europe-west1` (Belgium)
- `asia-northeast1` (Tokyo)

## Support

If you encounter issues:

1. Check the logs using the commands above
2. Verify your TMDB API key is correct
3. Ensure all required APIs are enabled
4. Check the [Cloud Run troubleshooting guide](https://cloud.google.com/run/docs/troubleshooting)

## Cleanup

To delete the deployed service and clean up resources:

```bash
# Delete the Cloud Run service
gcloud run services delete cinetribe-mcp-tmdb --region=us-central1

# Delete the TMDB API key secret
gcloud secrets delete tmdb-api-key

# Delete container images (optional)
gcloud container images delete gcr.io/PROJECT_ID/cinetribe-mcp-tmdb --force-delete-tags
```
