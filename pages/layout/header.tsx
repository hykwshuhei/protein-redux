import { Provider } from 'react-redux';
import { store, persistor } from '../../redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import Header from '../../components/Header';
import PrimarySearchAppBar from '../../components/HeaderMaterial';

export default function index() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PrimarySearchAppBar />
        {/* <Header /> */}
      </PersistGate>
    </Provider>
  );
}
