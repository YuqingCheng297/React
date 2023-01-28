import classes from './Header.module.css';
import React from 'react';
import BackgroundImg from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

function Header (props){
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onShowCART={props.onShowCart}/>
            </header>
            
            <div className={classes['main-image']}>
                <img src={BackgroundImg} alt='This is a meal' />
            </div>

        </React.Fragment>
    )
}

export default Header;