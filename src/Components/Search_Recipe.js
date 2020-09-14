import React, { Component } from 'react';
import Form from '../Components/Form'

class SearchRecipe extends Component {
    state = { recipesList: [] }
    addRecipes = (recipesJson) => {
        const { recipesList } = this.state;
        const updatedList = [...recipesList, ...recipesJson];
        this.setState({ recipesList: updatedList })
    }
    render() {
        const { recipesList } = this.setState;
        console.log(recipesList, 'here')
        //recipeList is undefined?????
        return (
            <div>
                <Form addRecipes={this.addRecipes} />
                {/* {recipesList.map(recipes => (
                    <div>recipes.recipesId</div>
                ))} */}
            </div>

        )
    }
}

export default SearchRecipe;