import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function testWrapper(queryClient?: QueryClient) {
  const client = queryClient ?? new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}
