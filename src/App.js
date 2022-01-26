import UseQuery from './useQuery';
import UseMutate from './useMutate';
import { QueryClientProvider, QueryClient } from 'react-query'

function App() {
 
  return (
    <div className="App">
      <QueryClientProvider client = {new QueryClient()}>
        <UseQuery />
        <UseMutate />
      </QueryClientProvider>
    </div>
  )

}

export default App;
