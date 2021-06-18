import { useState } from "react";
import Cart from "./components/Cart/Cart";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/cartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}></Cart>}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
