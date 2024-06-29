import React, {useContext, useEffect} from 'react';
import classes from './Cart.module.css';
import icoImage from'../../asset/bag.png';
import CartContext from "../../store/cart-context";
import CartDetails from "./CartDetails/CartDetails";
import {useState} from "react";
import Checkout from "./Checkout/Checkout";

const Cart = () => {

    const ctx = useContext(CartContext);

    const [showDetails, setShowDetails] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    useEffect(()=>{

        if(ctx.totalAmount === 0){
            setShowDetails(false);
            setShowCheckout(false);
        }
    },[ctx])

    const toggleDetailsHandler = () => {
        if(ctx.totalAmount === 0){
            setShowDetails(false);
            return;
        }
        setShowDetails(prevState => !prevState);
    }

    const showCheckoutHandler = () => {
        if(ctx.totalAmount === 0)return;
        setShowCheckout(true);
    }

    const hideCheckoutHandler=()=>{
        setShowCheckout(false);

    }

    return (
        <div className={classes.Cart} onClick={toggleDetailsHandler}>

            {showCheckout && <Checkout onHide = {hideCheckoutHandler}/>}

            {showDetails && <CartDetails/>}

            <div className={classes.Icon}>
                <img src={icoImage}/>
                {ctx.totalAmount === 0 ? null : <span className={classes.TotalAmount}>{ctx.totalAmount}</span>}
            </div>

            {ctx.totalAmount === 0 ? <p className={classes.NoMeal}>No item</p> : <p className={classes.Price}>{ctx.totalPrice}</p>}

            <button
                onClick={showCheckoutHandler}
                className={`${classes.Button} ${ctx.totalAmount === 0 ? classes.Disabled: ''}`}>Check out</button>

        </div>
    );
};

export default Cart;