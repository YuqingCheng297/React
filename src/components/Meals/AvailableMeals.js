import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import { useEffect, useState } from 'react';

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//       },
//       {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//       },
//       {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//       },
//       {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//       }
// ]



function AvailableMeals () {

  //remember to set the default state as [] !!!!!!!!
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{

    const fetchMeals = async() =>{
      setIsLoading(true);
      const response = await fetch('https://react-http-5b603-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok){
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

  
      const loadedMeals = [];
  
      for(const key in data){
         loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
         });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    }
  
    fetchMeals().catch((error)=>{
      //should also set loading to false, otherwise it will show loading...and error msg together
      setIsLoading(false);
      setError(error.message);
    });
    
  }, []);


const mealList = meals.map((item)=> <MealItem key={item.id} id={item.id} name={item.name} description={item.description} price={item.price} />);

    return (
        <div className={classes.meals}>
          {/* remember write this code outside of the <Card>, otherwise it won't be shown */}
            {isLoading && <p className={classes.MealsLoading}>Loading...</p>}
            {error && <p className={classes.MealsError}>{error}</p>}
            {!isLoading && !error && 
            <Card>
            <ul >
            {mealList}
            </ul>
            </Card>}
        </div>
    )
}

export default AvailableMeals;