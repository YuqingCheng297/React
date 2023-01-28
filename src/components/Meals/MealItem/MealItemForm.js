import { useRef } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm (props) {
    
    const quantityInput = useRef();

    const submitHandler = (event) =>{
        event.preventDefault();

        const enteredQuantity = quantityInput.current.value;
        const enteredQuantityNmbr = +enteredQuantity;

        if(enteredQuantity.trim().length === 0 || enteredQuantityNmbr < 1 || enteredQuantityNmbr > 5){
            return;
        }

        props.onAddItem(enteredQuantityNmbr);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div>
               <Input ref={quantityInput} label="Quantity" input={{
                id: 'quantity'+props.id,
                type: 'number',
                max: '5',
                min: '1',
                step: '1',
                defaultValue: '1'
               }}/>
            </div>

            <button>+ ADD</button>
        </form>
    )
}

export default MealItemForm;
