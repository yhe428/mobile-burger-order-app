import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import classes from './FilterMeals.module.css';

const FilterMeals = (props) => {

    const[keyword, setKeyword] = useState("");

    useEffect(()=>{
        const timer = setTimeout(()=>{
            props.onFilter(keyword)
        }, 1000)

        //excute before timer
        return ()=>{
            clearTimeout(timer);
        }

    }, [keyword]);

    const inputChangeHandler = e => {
        setKeyword(e.target.value.trim());

    };

    return (
        <div className={classes.FilterMeals}>
            <div className={classes.InputOuter}>
                <input
                    value={keyword}
                    onChange={inputChangeHandler}
                    className={classes.SearchInput}
                    type="text"
                    placeholder={"Please enter a search term"}/>
                <FontAwesomeIcon
                    className={classes.SearchIcon}
                    icon={faSearch}/>
            </div>
        </div>
    );
};

export default FilterMeals;