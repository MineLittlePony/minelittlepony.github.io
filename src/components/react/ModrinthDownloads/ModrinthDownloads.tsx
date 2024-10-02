import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModrinthDownloadsContent } from './ModrinthDownloadsContent';

const queryClient = new QueryClient();

export function ModrinthDownloads() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModrinthDownloadsContent />
    </QueryClientProvider>
  );
}
