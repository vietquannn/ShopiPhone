import './App.css';
import { Routes, Route } from 'react-router-dom';
import PhonePage from './pages/PhonePage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/Dashboard/OrderPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PhonePage />} />
        <Route path='/shoe' element={<PhonePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/dashboard/order-list' element={<OrderPage />} />
      </Routes>
    </>
  );
}

export default App;
