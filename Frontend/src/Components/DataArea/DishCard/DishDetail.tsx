import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dishStore } from '../../../Redux/dishesState';
import DishModel from '../../../Models/dish';
import dishService from '../../../Services/DishesServise';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAllergies, faEgg, faBreadSlice, faCheese } from '@fortawesome/free-solid-svg-icons';
import AddToOrderButton from './AddTOrderB';
import { authStore } from '../../../Redux/AuthState';
import User from '../../../Models/user';
const DishDetail: React.FC = () => {
  const navigate = useNavigate();
  const { dishId, restaurantId } = useParams<{ dishId: string; restaurantId: string }>();

  // Define a default icon for unknown allergens (e.g., Nuts)
  const defaultAllergenIcon = faAllergies;

  // Use local state to store the selected dish and the list of dishes
  const [selectedDish, setSelectedDish] = useState<DishModel | undefined>(undefined);
  const [dishes, setDishes] = useState<DishModel[]>([]);
  const [user,setUser]= useState<User>();
 
  useEffect(() => {
      setUser(authStore.getState().user);
      const unsubscribeOrder = authStore.subscribe(() => {
        setUser(authStore.getState().user);
        
      });
      unsubscribeOrder()
    })
  useEffect(() => {
    // Fetch the list of dishes for the restaurant
    dishService
      .getAllDishedByRestId(restaurantId)
      .then((responseDishes) => {
        setDishes(responseDishes);
      })
      .catch((err) => {
        console.error(err);
        setDishes([]); // Set an empty array if there's an error
      });
  }, [restaurantId]);

  useEffect(() => {
    // Find the selected dish based on dishId
    const foundDish = dishes.find((d) => d._id === dishId);
    setSelectedDish(foundDish);
  }, [dishes, dishId]);

  const getRandomAllergens = (): string[] => {
    const allergens = ['Eggs', 'Gluten', 'Milk', 'Nuts'];
    const randomAllergens: string[] = [];

    while (randomAllergens.length < 2) {
      const randomIndex = Math.floor(Math.random() * allergens.length);
      const randomAllergen = allergens[randomIndex];

      if (!randomAllergens.includes(randomAllergen)) {
        randomAllergens.push(randomAllergen);
      }
    }

    return randomAllergens;
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!selectedDish) {
    return <div>Dish not found.</div>;
  }

  const randomAllergens = getRandomAllergens();

  // Define allergen icons with defaults
  const allergenIcons: Record<string, any> = {
    Milk: faCheese,
    Eggs: faEgg,
    Gluten: faBreadSlice,
    Nuts: defaultAllergenIcon,
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-2">{selectedDish.name}</h2>
      <img
        className="w-fit min-w-screen-lg h-auto mx-auto mb-4 object-contain" src={selectedDish.image}
        alt={selectedDish.name}
      />

      <div className="justify-between">
        <p className="text-sm md:text-base">Description:</p>
        <p className="mb-2 text-amber-600 text-sm md:text-base">{selectedDish.description}</p>
        <p className="text-sm md:text-base">
          Allergens: {randomAllergens.map((allergen, index) => (
            <span key={index}>
              {index > 0 ? ', ' : ''}
              <FontAwesomeIcon icon={allergenIcons[allergen] || defaultAllergenIcon} className="mr-1 text-amber-600" />
              {allergen}
            </span>
          ))}
        </p>
      </div>
      {user?.authLevel === "user" &&  <>
    <div className="px-4 pt-2 pb-1">
      <AddToOrderButton dish={selectedDish} />
    </div>
    </>}
      <button
        className="w-full md:w-1/5 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
        onClick={handleGoBack}
      >
        Back
      </button>
    </div>
  );
};

export default DishDetail;
