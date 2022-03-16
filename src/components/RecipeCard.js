/* eslint-disable object-curly-newline */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-bitwise */
import React from "react";
import PropTypes, { number } from "prop-types";
import "../sass-styles/recipecard.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  formatCuisines,
  formatMissedIngredients,
  formatOccasions,
  formatPrice,
  formatTime,
  formatUsedIngredients,
} from "../formatting-functions/formattingFunctions";

export default function RecipeCard({
  cuisines,
  dairyFree,
  glutenFree,
  id,
  image,
  missedIngredientCount,
  occasions,
  pricePerServing,
  readyInMinutes,
  selectRecipe,
  title,
  usedIngredientCount,
  vegan,
  vegetarian,
}) {
  const recipeURL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&includeInstructions=true&apiKey=${process.env.REACT_APP_API_KEY}`;

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      axios.get(`${recipeURL}`).then((response) => {
        const details = {
          cheap: response.data.cheap,
          dairyFree: response.data.dairyFree,
          diets: response.data.diets,
          dishTypes: response.data.dishTypes,
          extendedIngredients: response.data.extendedIngredients,
          furtherInstructions: response.data.analyzedInstructions[0].steps,
          glutenFree: response.data.glutenFree,
          image: response.data.image,
          instructions: response.data.instructions,
          pricePerServing: response.data.pricePerServing,
          readyInMinutes: response.data.readyInMinutes,
          servings: response.data.servings,
          summary: response.data.summary,
          sustainable: response.data.sustainable,
          title: response.data.title,
          vegan: response.data.vegan,
          vegetarian: response.data.vegetarian,
          winePairing: response.data.winePairing,
        };
        window.scrollTo(0, 0);
        return selectRecipe(details);
      });
    } catch (err) {
      console.log(err);
    }
  };

  let dietaryInfo;

  if (vegetarian && glutenFree && dairyFree) {
    dietaryInfo = "🌱vegetarian, 🌾gluten free & 🧀dairy free";
  } else if (vegetarian && dairyFree) {
    dietaryInfo = "🌱vegetarian & 🧀dairy free";
  } else if (vegetarian && glutenFree) {
    dietaryInfo = "🌱vegetarian & 🌾gluten free";
  } else if (vegetarian) {
    dietaryInfo = "🌱vegetarian";
  } else if (vegan && glutenFree) {
    dietaryInfo = "🐄vegan & 🌾gluten free";
  } else if (vegan) {
    dietaryInfo = "🐄vegan";
  } else {
    dietaryInfo = null;
  }

  return (
    <div
      className="recipe-card__main"
      key={number.toString(id)}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex="0"
    >
      <Link to="/recipeinfo">
        <div className="recipe-card__image-info">
          <img className="recipe-card__image" src={image} alt={title} />
          <div className="recipe-card__title">{title.toLowerCase()}</div>
          <div className="recipe-card__extra-info">
            <p>{dietaryInfo}</p>
            <p>{formatTime(readyInMinutes)}</p>
            <p>{formatPrice(pricePerServing)}</p>
            <p>{formatCuisines(cuisines)}</p>
            <p>{formatOccasions(occasions)}</p>
            <p>{formatMissedIngredients(missedIngredientCount)}</p>
            <p>{formatUsedIngredients(usedIngredientCount)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  cuisines: PropTypes.arrayOf(PropTypes.string),
  dairyFree: PropTypes.string,
  glutenFree: PropTypes.string,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  missedIngredientCount: PropTypes.number,
  occasions: PropTypes.arrayOf(PropTypes.string),
  pricePerServing: PropTypes.number,
  readyInMinutes: PropTypes.number,
  selectRecipe: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  usedIngredientCount: PropTypes.number,
  vegan: PropTypes.string,
  vegetarian: PropTypes.string,
};

RecipeCard.defaultProps = {
  cuisines: [],
  dairyFree: "",
  glutenFree: "",
  missedIngredientCount: 0,
  occasions: [],
  pricePerServing: 0,
  readyInMinutes: 0,
  usedIngredientCount: 0,
  vegan: "",
  vegetarian: "",
};
