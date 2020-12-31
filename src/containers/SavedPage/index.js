import React, { useState } from 'react';

const SavedPage = () => {
    //get fav recipe from local storage
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipe'));

    return (
        <div>
            display fv list
        </div>
    );

}
export default SavedPage;

