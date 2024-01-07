import React, { useState, ChangeEvent } from 'react';
import Dish from '../../../Models/dish';
import { useNavigate, useParams } from 'react-router-dom';
import dishService from '../../../Services/DishesServise';
import notifyService from '../../../Services/NotifyService';

function DishUploader() {
  const [tempAttributeValues, setTempAttributeValues] = useState<{ [key: string]: string | number }[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [showSaveAttribute, setShowSaveAttribute] = useState<boolean>(false);
  const navigate = useNavigate();
  const { restaurantId, restaurantName } = useParams<{ restaurantId: string; restaurantName: string }>();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target?.result as string;
      const parsedDishes: Dish[] = JSON.parse(contents);
      const updatedDishes = parsedDishes.map((dish) => ({
        ...dish,
        restName: restaurantName,
        restaurantId: restaurantId,
      }));
      setDishes(updatedDishes);
      setTempAttributeValues(updatedDishes.map(() => ({}))); // Initialize with empty objects
    };

    reader.readAsText(file as Blob);
  };

  const isRequiredAttribute = (attribute: string): boolean => {
    const requiredAttributes: string[] = ['name', 'price', 'description', 'category', 'restName', 'restaurantId'];
    return requiredAttributes.includes(attribute);
  };

  const handleSaveAttribute = (dishIndex: number, attribute: string) => {
    const inputType = typeof tempAttributeValues[dishIndex][attribute];
    const missingAttributeType = typeof dishes[dishIndex][attribute];
    if (inputType !== missingAttributeType) {
      // Display an error message or handle the mismatch as needed
      alert("Input type does not match missing attribute type.");
      return;
    }

    // Save the attribute
    const updatedDishes = [...dishes];
    updatedDishes[dishIndex][attribute] = tempAttributeValues[dishIndex][attribute];
    setDishes(updatedDishes);
    setShowSaveAttribute(false);
  };

  const handleSaveDishes = async () => {
    try {
      const dishesWithMissingAttributes = dishes.map((dish) => {
        const dishWithMissingAttributes: Dish = { ...dish };
        Object.keys(dishWithMissingAttributes).forEach((attribute) => {
          if (dishWithMissingAttributes[attribute] === '' && isRequiredAttribute(attribute)) {
            // Add your logic for handling missing required attributes here
            // For example, you can show an error message or prevent saving
            console.log(`Missing required attribute: ${attribute}`);
            return;
          }
        });
        return dishWithMissingAttributes;
      });

      await dishService.addManyDish(dishesWithMissingAttributes);
      notifyService.success('Dishes were added');
      navigate(`/menu/${restaurantId}/${restaurantName}`);
    } catch (err: any) {
      notifyService.error(err.message + ' add the required attribute');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h3 className="text-3xl font-semibold mb-4">Upload JSON File of Dishes</h3>
      <input
        type="file"
        accept=".json"
        className="border rounded py-2 px-4 mb-4"
        onChange={handleFileUpload}
      />

      <h4 className="text-2xl font-semibold mb-2">Dishes:</h4>
      {dishes.map((dish, index) => (
        <div key={index} className="mb-4">
          <p className="text-lg font-semibold mb-1">{dish.name}</p>
          {Object.keys(dish).map((attribute) => (
            <div key={attribute} className="mb-2">
              {dish[attribute] === '' && (
                <>
                  <p>
                    missing attribute: {attribute}, type:
                    {dish[attribute] === "required" ? (
                      <span style={{ color: "red" }}>required</span>
                    ) : (
                      typeof dish[attribute]
                    )}
                  </p>
                  <input
                    type={(typeof dish[attribute] === 'number' ? 'number' : 'text').toLowerCase()}
                    placeholder={`${attribute} ${isRequiredAttribute(attribute) ? '(required)' : ''}`}
                    className="border rounded py-2 px-4 text-black"
                    value={tempAttributeValues[index][attribute] || ''}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      let parsedValue: number | string = inputValue;

                      // Parse the value as a number if the original attribute is a number
                      if (typeof dish[attribute] === 'number') {
                        const parsedNumber = parseFloat(inputValue);
                        if (!isNaN(parsedNumber)) {
                          parsedValue = parsedNumber;
                        }
                      }

                      // Update the correct tempAttributeValues entry for this dish
                      setTempAttributeValues((prevValues) => {
                        const updatedValues = [...prevValues];
                        updatedValues[index] = {
                          ...updatedValues[index],
                          [attribute]: parsedValue.toString(), // Convert back to string
                        };
                        return updatedValues;
                      });
                    }}
                  />

                  {showSaveAttribute && (
                    <span className="text-green-500 ml-2">Saved</span>
                  )}
                  {!showSaveAttribute && (
                    <button
                      onClick={() => {
                        // Get the input type from your input element
                        const inputType = typeof tempAttributeValues[index][attribute];

                        // Get the missing attribute's type
                        const missingAttributeType = typeof dish[attribute];

                        if (inputType === missingAttributeType) {
                          setShowSaveAttribute(true);
                          handleSaveAttribute(index, attribute);
                        } else {
                          // Display an error message or handle the mismatch as needed
                          alert("Input type does not match missing attribute type.");
                        }
                      }}
                      className="bg-blue-500 text-sm hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ml-2"
                    >
                      Save
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}

      <button
        className="bg-blue-500 text-sm hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={handleSaveDishes}
      >
        Save
      </button>
    </div>
  );
}

export default DishUploader;
