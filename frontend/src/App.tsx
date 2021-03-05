import { Provider } from 'react-redux';
import store from './store';
import GlobalStyles from './styles/globalStyles';
import Products from './pages/Products';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Products />
    </Provider>
  );
}

export default App;
