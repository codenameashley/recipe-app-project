/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import * as from "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import RecipeInfo from "./RecipeInfo";
import NavBar from "./NavBar";
import ReplacementImage from "../images/replacement-image.png";
import FoodleProfile from "./FoodleProfile";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import RequireAuth from "./RequireAuth";
// import PrivateRoute from "./PrivateRoute";

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState({
    title: "oh no! It seems like the title didn't load!",
    image: ReplacementImage,
    instructions: "the robots have lost all information!",
    summary: "the summary has disappeared",
  });

  const [randomRecipe, setRandomRecipe] = useState([]);

  const key = process.env.REACT_APP_MY_API_KEY;

  useEffect(async () => {
    try {
      axios
        .get(
          `https://api.spoonacular.com/recipes/random?number=6&apiKey=${key}`
        )
        .then((response) => {
          const randomResults = response.data.recipes.map((recipe) => {
            const basicInfo = {
              cuisines: recipe.cuisines,
              id: recipe.id,
              title: recipe.title,
              image: recipe.image,
              dairyFree: recipe.dairyFree,
              glutenFree: recipe.glutenFree,
              occasions: recipe.occasions,
              readyInMinutes: recipe.readyInMinutes,
              pricePerServing: recipe.pricePerServing,
              vegan: recipe.vegan,
              vegetarian: recipe.vegetarian,
            };
            return basicInfo;
          });
          return setRandomRecipe(randomResults);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <SearchBar setSearchResults={setSearchResults} />
                {searchResults ? (
                  <SearchResults
                    results={searchResults}
                    selectRecipe={setSelectedRecipe}
                  />
                ) : (
                  <SearchResults
                    results={randomRecipe}
                    selectRecipe={setSelectedRecipe}
                  />
                )}
              </>
              }
          />
          <Route
            path="/recipeinfo"
            element={<RecipeInfo result={selectedRecipe} />}
          />
          <Route exact path="/logout" element={<LogOut />} />
          <Route element={<RequireAuth />}>
            <Route exact path="/foodleprofile" element={<FoodleProfile />} />
          </Route>

          {/* <Route
            path="*"
            element={(<PrivateRoute>
              <Routes>
                <Route path="/" element={<FoodleProfile />} />
              </Routes>
                      </PrivateRoute>)}
          /> */}
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
