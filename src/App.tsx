import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchForm from './components/SearchForm';
import AddressList from './components/AddressList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchForm />
      <AddressList />
    </QueryClientProvider>
  );
}

export default App;
