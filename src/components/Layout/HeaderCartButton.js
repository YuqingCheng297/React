import classes from './HeaderCartButton.module.css';
import CartIcon from './CartIcon';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

function HeaderCartButton (props) {
    
    const ctx = useContext(CartContext);

    const badge = ctx.items.reduce((sum, currItemObj) => {
        return sum = sum + currItemObj.quantity;
    },0)

    return (
        <button className={classes.button} onClick={props.onShowCART}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{badge}</span>
        </button>
    )
}

export default HeaderCartButton;