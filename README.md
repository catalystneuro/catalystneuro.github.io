# CatalystNeuro Website

[![Tests](https://github.com/catalystneuro/catalystneuro.github.io/actions/workflows/test.yml/badge.svg)](https://github.com/catalystneuro/catalystneuro.github.io/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/catalystneuro/catalystneuro.github.io/branch/main/graph/badge.svg)](https://codecov.io/gh/catalystneuro/catalystneuro.github.io)

Official website for CatalystNeuro, showcasing our services, funded projects, NWB conversions, team, and blog!

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (based on Radix UI)
- **Routing**: React Router
- **Content**: Markdown with front matter
- **Testing**: Vitest + React Testing Library
- **Deployment**: Netlify

## Project Structure

```
.
├── src/
│   ├── components/     # React components
│   ├── content/        # Markdown content (blog, projects, etc.)
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   └── hooks/         # Custom React hooks
├── public/            # Static assets
├── scripts/          # Build and maintenance scripts
└── netlify/          # Netlify serverless functions
```

## Development

### Prerequisites

- Node.js (LTS version recommended)
- npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/catalystneuro/catalystneuro.github.io.git
cd catalystneuro.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint

## Testing

Tests are written using Vitest and React Testing Library. Run the test suite:

```bash
npm run test
```

For coverage report:

```bash
npm run test:coverage
```

## Deployment

The site is automatically deployed to Netlify when changes are pushed to the main branch. The build process:

1. Builds the React application
2. Generates static HTML
3. Deploys to Netlify CDN

Manual deployment can be triggered through the Netlify dashboard or CLI.

### Environment Variables

Required environment variables for deployment:
- `NETLIFY_ACCESS_TOKEN` - For Netlify API access

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure they pass
5. Submit a pull request

## License

Copyright © CatalystNeuro. All rights reserved.
