import React from 'react';
import Meals from "./Components/Meals/Meals";
import { useState, useEffect } from 'react';
import CartContext from "./store/cart-context";
import FilterMeals from "./Components/FilterMeals/FilterMeals";
import Cart from "./Components/Cart/Cart";
import Confirm from "./Components/UI/Confirm/Confirm";


const MEALS_DATA = [
    {
        id: '1',
        title: 'Cheeseburger',
        desc: '100% NZ beef with onion and pickle and delicious tomato sauce',
        price: 12,
        img: '/Img/Meals/1.png'
    },
    {
        id: '2',
        title: 'Double Cheeseburger',
        desc: 'Two 100% NZ beef patties topped with mouth-watering melted cheese',
        price: 20,
        img: '/Img/Meals/2.png'
    },
    {
        id: '3',
        title: 'Big Mac',
        desc: 'Take two 100% beef patties sourced from farmers in regions',
        price: 24,
        img: '/Img/Meals/3.png'
    }, {
        id: '4',
        title: 'McChicken',
        desc: 'Made with New Zealand chicken breast in a seasoned tempura coating',
        price: 21,
        img: '/Img/Meals/4.png'
    }, {
        id: '5',
        title: 'McRoastChicken',
        desc: 'Made with New Zealand chicken breast with roast sauce',
        price: 22,
        img: '/Img/Meals/5.png'
    }, {
        id: '6',
        title: 'McSpicy',
        desc: 'Made with a 100% New Zealand chicken fillet in a spicy crunchy coating',
        price: 14,
        img: '/Img/Meals/6.png'
    }, {
        id: '7',
        title: 'Hamburger',
        desc: 'The original. 100% beef patty, topped with onion, pickle',
        price: 12,
        img: '/Img/Meals/7.png'
    }
];

const App = () => {
    const [mealsData, setMealsData] = useState([]);
    const [filteredMeals, setFilteredMeals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/api/meals')
            .then(response => response.json())
            .then(data => {
                setMealsData(data);
                setFilteredMeals(data); 
            })
            .catch(err => console.error('Error fetching meals:', err));
    }, []);


    //Filter meals
    const FilterHandler = (keyword)=>{
        const newFilteredMeals = mealsData.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()));
        setFilteredMeals(newFilteredMeals);

    };

    // const [mealsData, setMealsData] = useState(MEALS_DATA);

    //store cart data 1. Meal[] 2. total amount 3. total price
    const [cartData, setCartData] = useState({
        items: [],
        totalAmount: 0,
        totalPrice: 0
    });

    //Add item to cart
    const addItem = (meal) =>{

        const newCart = {...cartData};
        if(newCart.items.indexOf(meal)=== -1){
            newCart.items.push(meal);
            meal.amount = 1;
        }else{
            meal.amount += 1;
        }

        newCart.totalAmount += 1;
        newCart.totalPrice += meal.price;
        setCartData(newCart);
    }

    const removeItem = (meal) =>{
        const newCart = {...cartData};
        meal.amount -= 1;

        if(meal.amount === 0){
            //remove item from cart
            newCart.items.splice(newCart.items.indexOf(meal), 1);
        }

        newCart.totalAmount -= 1;
        newCart.totalPrice -= meal.price;

        setCartData(newCart);
    }

    const clearCart = ()=>{

        const newCart ={...cartData}
        newCart.items.forEach(item => delete item.amount);
        newCart.items = [];
        newCart.totalAmount = 0;
        newCart.totalPrice = 0;
        setCartData(newCart);
    }

    return (
        <CartContext.Provider value={{...cartData, addItem, removeItem, clearCart}}>
            <div>
                <FilterMeals onFilter={FilterHandler}/>
                <Meals
                    mealsData={mealsData}
                />
                <Cart/>
            </div>
        </CartContext.Provider>

    );
};

export default App;