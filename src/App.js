import React, { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {

  const [showCart, setShowCart] = useState(false);

  const displayCartHandler = () =>{
    setShowCart(true);
  }

  const closeCartHandler = () =>{
    setShowCart(false);
  }

  return (
   <CartProvider>
      {showCart && <Cart onCloseCart={closeCartHandler}/>}
      <Header onShowCart={displayCartHandler} />
      <main>
        <Meals />
      </main>
   </CartProvider>
  );
}

export default App;
