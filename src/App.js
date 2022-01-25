import './App.css';
import Characters from './Components/Characters';
import { QueryClientProvider, QueryClient } from 'react-query'


function App() {
 
  return (
    <div className="App">
      <QueryClientProvider client = {new QueryClient()}>
        <Characters />
      </QueryClientProvider>
    </div>
  )

}

export default App;
