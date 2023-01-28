import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState ={
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) =>{
    if(action.type === 'ADD'){
        //无论如何 总价都等于已有价格+新加进来的物品的价格（用action的addeditem）
        const updatedTotalAmount = state.totalAmount + action.addedItem.price * action.addedItem.quantity;
        
        const existingItemIndex = state.items.findIndex((item) => item.id === action.addedItem.id);
        const existingItem = state.items[existingItemIndex];


        let updatedItems;

        if(existingItem){
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }

            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.addedItem);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
        
    }

    if(action.type === 'REMOVE'){
        const existingItemIndex = state.items.findIndex((item) => item.id === action.removedId);
        const existingItem = state.items[existingItemIndex];

        //此时默认购物车里已经有物品了，因为remove传进来的参数是id不是item，所以我们用existingitem减去已有物品的价格
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;

        if(existingItem.quantity === 1){
            updatedItems = state.items.filter((item) => item.id !== action.removedId);
        }else{
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1
            }

            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'CLEAR'){
        return defaultCartState;
    }

    return defaultCartState;
}

function CartProvider (props){

    const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) =>{
        dispatch({type: 'ADD', addedItem: item});
    }

    const removeItemFromCartHanlder = (id) =>{
        dispatch({type: 'REMOVE', removedId: id});
    }

    const clearCartHandler = () =>{
        dispatch({type: 'CLEAR'});
    }
    
    const cartContxt = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHanlder,
        clearCart: clearCartHandler
    }

    return (
        <CartContext.Provider value={cartContxt}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;