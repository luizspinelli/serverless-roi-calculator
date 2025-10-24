# ROI Calculator Web App

<div align="center">

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.x-CA4245?logo=react-router)](https://reactrouter.com/)

Modern React frontend for the Serverless ROI Calculator application.

[Features](#features) • [Getting Started](#getting-started) • [Development](#development) • [Building](#building)

</div>

---

## 🎯 Features

- ⚡ **Lightning Fast** - Vite for instant HMR and optimized builds
- ⚛️ **React 19** - Latest React with concurrent features
- 📝 **Type-Safe** - Full TypeScript with strict mode
- 🎨 **Modern UI** - Clean, responsive design with SCSS
- 📱 **Mobile First** - Responsive design for all devices
- 🔄 **Client-Side Routing** - React Router v7
- 📊 **Data Visualization** - Beautiful charts with Recharts
- 📋 **Form Management** - React Hook Form with Zod validation
- 🎯 **Code Quality** - ESLint with TypeScript and React rules
- 🚀 **Optimized Build** - Tree-shaking, code splitting, lazy loading

## 🏗️ Project Structure

```
src/
├── assets/           # Static assets (images, fonts)
├── components/       # Reusable UI components
│   ├── common/       # Common components (Button, Input, etc.)
│   ├── layout/       # Layout components (Header, Footer)
│   └── forms/        # Form components
├── pages/            # Page components
│   ├── Home/
│   ├── Calculator/
│   └── Results/
├── hooks/            # Custom React hooks
├── contexts/         # React Context providers
├── services/         # API clients and external services
│   └── api/          # API client setup
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── routes/           # Route configuration
├── styles/           # Global styles and SCSS
├── config/           # App configuration
├── App.tsx           # Root component
└── main.tsx          # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Install dependencies (from project root)
pnpm install

# Or install only web app dependencies
pnpm --filter @repo/web install
```

### Environment Variables

Create a `.env` file in the `apps/web` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# Optional: Enable debug mode
VITE_DEBUG=true
```

See `.env.example` for all available options.

### Development

```bash
# Start development server
pnpm dev

# Start with specific port
pnpm dev --port 3000

# Start with network access
pnpm dev --host
```

The app will be available at:
- **Local**: http://localhost:5173
- **Network**: http://[your-ip]:5173 (when using --host)

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server with HMR

# Building
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
pnpm lint --fix       # Auto-fix linting issues

# Type Checking
pnpm type-check       # Run TypeScript compiler check
```

### Hot Module Replacement (HMR)

Vite provides instant HMR for:
- React components (with Fast Refresh)
- CSS/SCSS files
- TypeScript files
- Assets

### Component Development

#### Creating a New Component

```bash
src/components/common/MyComponent/
├── MyComponent.tsx       # Component implementation
├── MyComponent.scss      # Component styles
├── types.ts              # Component-specific types
└── index.ts              # Public exports
```

**Example:**

```typescript
// MyComponent.tsx
import './MyComponent.scss';
import { MyComponentProps } from './types';

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <div className="my-component">
      <h2>{title}</h2>
      <button onClick={onClick}>Click me</button>
    </div>
  );
};
```

```typescript
// types.ts
export interface MyComponentProps {
  title: string;
  onClick: () => void;
}
```

```typescript
// index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './types';
```

### Custom Hooks

Create reusable logic with custom hooks:

```typescript
// src/hooks/useCalculator.ts
export function useCalculator() {
  const [result, setResult] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const calculate = async (data: CalculatorInput) => {
    setLoading(true);
    try {
      const response = await api.calculate(data);
      setResult(response.roi);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, calculate };
}
```

### Form Handling

Forms use React Hook Form with Zod validation:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  amount: z.number().positive('Must be positive'),
});

type FormData = z.infer<typeof schema>;

export const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="number" {...register('amount', { valueAsNumber: true })} />
      {errors.amount && <span>{errors.amount.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
};
```

### API Integration

API calls are centralized in the services layer:

```typescript
// src/services/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// src/services/api/calculator.ts
export const calculatorApi = {
  calculate: async (data: CalculatorInput) => {
    const response = await apiClient.post('/calculator', data);
    return response.data;
  },
};
```

### Routing

Routes are defined using React Router v7:

```typescript
// src/routes/Routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Calculator } from '@/pages/Calculator';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/calculator',
    element: <Calculator />,
  },
]);
```

## 🏗️ Building for Production

### Build Command

```bash
# Build for production
pnpm build

# Output location: dist/
```

### Build Optimization

Vite automatically:
- ✅ Minifies JavaScript and CSS
- ✅ Tree-shakes unused code
- ✅ Code splits by route
- ✅ Generates source maps
- ✅ Optimizes assets
- ✅ Creates manifest for PWA (if configured)

### Preview Production Build

```bash
pnpm preview
```

Serves the production build locally at http://localhost:4173

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Build Command**: `pnpm build`
   - **Publish Directory**: `dist`
3. Add environment variables in Netlify dashboard
4. Deploy!

### Static Hosting (S3, GitHub Pages, etc.)

```bash
# Build the app
pnpm build

# Upload the dist/ folder to your hosting provider
```

### Docker

```bash
# Build image
docker build -t roi-calculator-web .

# Run container
docker run -p 80:80 roi-calculator-web
```

## 🎨 Styling

### SCSS Architecture

```
src/styles/
├── _variables.scss   # SCSS variables (colors, sizes)
├── _mixins.scss      # Reusable SCSS mixins
├── _reset.scss       # CSS reset/normalize
└── global.scss       # Global styles
```

### Component Styles

Each component has its own SCSS file:

```scss
// MyComponent.scss
.my-component {
  padding: 1rem;
  background-color: var(--bg-color);

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
```

### CSS Variables

Use CSS custom properties for theming:

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --bg-color: #ffffff;
  --text-color: #212529;
}
```

## 📦 Dependencies

### Core Dependencies

- `react` - UI library
- `react-dom` - React rendering
- `react-router-dom` - Routing
- `typescript` - Type safety

### UI & Forms

- `react-hook-form` - Form management
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `lucide-react` - Icon library
- `recharts` - Charting library

### Utilities

- `axios` - HTTP client
- `date-fns` - Date manipulation
- `react-hot-toast` - Toast notifications

### Development Dependencies

- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `eslint` - Linting
- `sass` - SCSS support
- `typescript-eslint` - TypeScript linting

## 🔧 Configuration

### Vite Config

**File**: `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

### TypeScript Config

**File**: `tsconfig.json`

Strict mode enabled with path aliases configured.

### ESLint Config

**File**: `eslint.config.js`

Includes React and TypeScript specific rules.

## 🤝 Contributing

See the main [Contributing Guide](../../CONTRIBUTING.md) for details.

### Frontend-Specific Guidelines

1. Follow React best practices and hooks rules
2. Use functional components with hooks
3. Keep components small and focused
4. Extract reusable logic to custom hooks
5. Use TypeScript for all code
6. Follow the naming conventions
7. Write meaningful component tests
8. Keep styles modular and scoped

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 📝 License

MIT - See [LICENSE](../../LICENSE) file for details.

---

Part of the [Serverless ROI Calculator](../../README.md) project.
