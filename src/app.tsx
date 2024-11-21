import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PragueForecast } from './pages/pragueForecast'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from './providers/errorBoundary'

const isDevelopment = import.meta.env.VITE_OPEN_WEATHER_MAP_API_URL === 'development'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <PragueForecast />
        {isDevelopment && <ReactQueryDevtools initialIsOpen={true} />}
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
