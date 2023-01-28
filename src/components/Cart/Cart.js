import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);


    const ctx = useContext(CartContext);

  const addSingleItemHandler = (item) =>{
    const oneItem = {...item, quantity: 1};
    ctx.addItem(oneItem);
  }

  const removeSingleItemHanlder = (id) =>{
     ctx.removeItem(id);
  }

  const orderHandler = ()=>{
    setIsCheckout(true);
  }

  const submitOrderHandler = async(userData) =>{
    setIsSubmitting(true);
    await fetch('https://react-http-5b603-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        body: JSON.stringify({
            orderedItems: ctx.items,
            user: userData
        }),
        headers: {'Content-Type': 'application/json'}
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    
    ctx.clearCart();

  }

  const modalContent = 
  <React.Fragment>
    <ul className={classes["cart-items"]}>
        {ctx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onAdd={addSingleItemHandler.bind(null, item)}
            onRemove={removeSingleItemHanlder.bind(null, item.id)}
          />
        ))}
      </ul>

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${ctx.totalAmount.toFixed(2)}</span>
      </div>

      <div>
      {isCheckout && <Checkout onClose={props.onCloseCart} onSubmitOrder={submitOrderHandler}/>}
      </div>
  </React.Fragment>

  return (
    <Modal onCloseCART={props.onCloseCart}>

      <div>
        {!isSubmitting && !didSubmit && modalContent}
        {isSubmitting && <p>Submitting your order...</p>}
        {didSubmit && !isSubmitting && <p>Sucessfully submit your order!</p>}
      </div>


      {!isCheckout && <div className={classes.actions}>
        <button onClick={props.onCloseCart}>Close</button>
        <button onClick={orderHandler}>Order</button>
      </div>}
    </Modal>
  );
}

export default Cart;



