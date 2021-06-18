import React, { useRef } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameInput = useRef();
  const streetInput = useRef();
  const postalCodeInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostalCode = postalCodeInput.current.value;
    const enteredCity = cityInput.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = !isFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" ref={nameInput} id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" ref={streetInput} id="street" />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" ref={postalCodeInput} id="postal" />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" ref={cityInput} id="city" />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
