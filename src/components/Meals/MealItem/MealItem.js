import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

function MealItem (props) {

    const price = `$${props.price.toFixed(2)}`;
    
    const ctx = useContext(CartContext);

    const addItemHandler = (quantity) =>{
        
        ctx.addItem(
            {
                id: props.id,
                name: props.name,
                price: props.price,
                description: props.description,
                quantity: quantity
            }
        )
    }

    return (

        <li className={classes.meal}>
            {/* group one item info with <div> */}
            <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
            </div>
            
            <div>
            <MealItemForm onAddItem={addItemHandler} id={props.id}/>
            </div>
        </li>

    )
}

export default MealItem;