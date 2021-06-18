import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const DATABASE_URL =
  "https://react-http-39702-default-rtdb.firebaseio.com/Orders.json";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `£${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          {...item}
          key={item.id}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrder = () => {
    let data = {};
    cartCtx.items.forEach((item) => {
      data[item.name] = { ...item, price: +item.amount * +item.price };
    });

    data.total = totalAmount;
    data = JSON.stringify(data);

    try {
      fetch(DATABASE_URL, {
        method: "POST",
        headers: {
          "content-type": "Application/JSON",
        },
        body: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel = {props.onClose} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
