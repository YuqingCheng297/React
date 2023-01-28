import { useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim()==='';
const isFiveChars = (value) => value.trim().length === 5;

function Checkout (props){

    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [postal, setPostal] = useState('');
    const [city, setCity] = useState('');

    const [nameTouched, setNameTouched] = useState(false);
    const [streetTouched, setStreetTouched] = useState(false);
    const [postalTouched, setPostalTouched] = useState(false);
    const [cityTouched, setCityTouched] = useState(false);


    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalIsValid = isFiveChars(postal);
    const cityIsValid = !isEmpty(city);

    const nameInValid = nameTouched && !nameIsValid;
    const streetInValid = streetTouched && !streetIsValid;
    const postalInValid = postalTouched && !postalIsValid;
    const cityInValid = cityTouched && !cityIsValid;

    const nameChangeHandler = (event)=>{
        setName(event.target.value);
    }

    const streetChangeHandler = (event)=>{
        setStreet(event.target.value);
    }
    const postalChangeHandler = (event)=>{
        setPostal(event.target.value);
    }
    const cityChangeHandler = (event)=>{
        setCity(event.target.value);
    }

    const nameBlurHandler = () =>{
        setNameTouched(true);
    }

    const streetBlurHandler = () =>{
        setStreetTouched(true);
    }
    const postalBlurHandler = () =>{
        setPostalTouched(true);
    }
    const cityBlurHandler = () =>{
        setCityTouched(true);
    }
    
    const confirmOrderHandler = (event) =>{
        event.preventDefault();
        //!!!!!!!!!!
        setNameTouched(true);
        setStreetTouched(true);
        setPostalTouched(true);
        setCityTouched(true);
        
        const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

        if(!formIsValid){
            return;
        }

        props.onSubmitOrder({
            name: name,
            street: street,
            postal: postal,
            city: city
        })

        
        setName('');
        setStreet('');
        setPostal('');
        setCity('');
        

        setNameTouched(false);
        setStreetTouched(false);
        setPostalTouched(false);
        setCityTouched(false);
    }

    const nameInputClass = `${classes.control} ${nameInValid ? classes.invalid : ''}`;
    const streetInputClass = `${classes.control} ${streetInValid ? classes.invalid : ''}`;
    const postalInputClass = `${classes.control} ${postalInValid ? classes.invalid : ''}`;
    const cityInputClass = `${classes.control} ${cityInValid ? classes.invalid : ''}`;

    return (
        <form className={classes.form} onSubmit={confirmOrderHandler}>
            <div className={nameInputClass}>
                <label htmlFor='name'>Your Name</label>
                <input value={name} id="name" type="text" onChange={nameChangeHandler} onBlur={nameBlurHandler}></input>
                {nameInValid && <p>Please enter a valid name!</p>}
            </div>

            <div className={streetInputClass}>
                <label htmlFor='street'>Street</label>
                <input value={street} id="street" type="text" onChange={streetChangeHandler} onBlur={streetBlurHandler}></input>
                {streetInValid && <p>Please enter a valid street!</p>}
            </div>


            <div className={postalInputClass}>
                <label htmlFor='postal'>Postal Code</label>
                <input value={postal} id="postal" type="text" onChange={postalChangeHandler} onBlur={postalBlurHandler}></input>
                {postalInValid && <p>Please enter a valid postal code(5 characters long)!</p>}
            </div>

            <div className={cityInputClass}>
                <label htmlFor='city'>City</label>
                <input value={city} id="city" type="text" onChange={cityChangeHandler} onBlur={cityBlurHandler}></input>
                {cityInValid && <p>Please enter a valid city!</p>}
            </div>
            
            <div className={classes.actions}>
                <button type='button' onClick={props.onClose}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>

        </form>
    )
}

export default Checkout;