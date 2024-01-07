import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import RestaurantModel from '../../../Models/restaurant';
import restService from '../../../Services/RestService';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Restaurant: React.FC = () => {
  const [singleRest, setSingleRest] = useState<RestaurantModel | undefined>(undefined);
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate(); // Use useNavigate to navigate

  useEffect(() => {
    restService
      .getAllRestaurants()
      .then((responseRest: RestaurantModel[]) => {
        const foundRest = responseRest.find((r) => r._id === restaurantId);
        setSingleRest(foundRest);
      })
      .catch((err) => alert(err.message));
  }, [restaurantId]);

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!singleRest) {
    // If the restaurant data is still being fetched, you can show a loading state here
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 w-fit items-center">
      <div className="restaurant-details">
      
        {/* תצוגת שם המסעדה */}
        <h2 className="text-2xl font-bold mb-2">{singleRest.name}</h2>

        {/* תצוגת תמונה של המסעדה */}
        <img className="w-3/4 md:w-1/2 h-32 object-cover mb-4 m-auto" src={singleRest.image} alt={singleRest.name} />

        <div className="justify-between">
          <p> description : </p> <p className="mb-2 text-amber-600"> {singleRest.desc}</p>
        </div>
        {/* תצוגת כתובת המסעדה */}
        <p className="mb-2 ">Address: {singleRest.address}</p>

        {/* תצוגת מספר הטלפון של המסעדה */}
        <p>Phone: {singleRest.phone}</p>
        <p>
          <a href="https://www.instagram.com/your_instagram_link" target="_blank" rel="noopener noreferrer" className="mr-4  text-amber-600">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.facebook.com/your_facebook_link" target="_blank" rel="noopener noreferrer" className="mr-4 text-amber-600">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </p>
          {/* Back Button */}
          <button  className=" w-1/5 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          onClick={handleGoBack}>
          Back
        </button>

      </div>
    </div>
  );
};

export default Restaurant;
