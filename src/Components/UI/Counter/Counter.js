import React, {useContext} from 'react';
import classes from './Counter.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import CartContext from "../../../store/cart-context";

/*
* npm i --save @fortawesome/fontawesome-svg-core
* npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
* npm i --save @fortawesome/react-fontawesome@latest
* npm install @fortawesome/fontawesome-svg-core@fortawesome/free-solid-svg-icons@fortawesome/free-regular-svg-icons@fortawesome/react-fontawesome@latest
*
* */

const Counter = (props) => {

    const ctx = useContext(CartContext);

    //Add cart
    const addButtonHandler = ()=>{

        ctx.addItem(props.meal);
    }
    const subButtonHandler = ()=>{
        ctx.removeItem(props.meal);
    }

    return (
        <div className={classes.Counter}>
            {
                (props.meal.amount && props.meal.amount !== 0) ? (
                    <>
                        <button className={classes.Sub} onClick={subButtonHandler}><FontAwesomeIcon icon={faMinus}/></button>
                        <span className={classes.count}>{props.meal.amount}</span>
                    </>
                ) : null
            }
            <button className={classes.Add} onClick={addButtonHandler}><FontAwesomeIcon icon={faPlus}/>

            </button>
        </div>
    );
};

export default Counter;