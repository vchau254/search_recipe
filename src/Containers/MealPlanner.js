import React, { Component } from 'react';

class MealPlanner extends Component {
  state = {
    diet: '',
    timeFrame: 'week',
    totalCals: '',
    mealPlan: {},
    isLoading: false,
    error: null,
  };
  handleInputChange = (e) => {
    this.setState({ totalCals: e.target.value });
  };
  handleTimeFrameChange = (e) => {
    this.setState({ timeFrame: e.target.value });
  };
  handleDietChange = (e) => {
    this.setState({ diet: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { diet, timeFrame, totalCals } = this.state;
    this.getMealPlanner(diet, timeFrame, totalCals);
  };
  getMealPlanner = async (diet, timeFrame, totalCals) => {
    try {
      this.setState({ isLoading: true });
      const meals = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?timeFrame=${timeFrame}&targetCalories=${totalCals}&diet=${diet}&exclude=<string>?&apiKey=4817974c0a5d4fe5b928123f9bed6654`
      );
      const mealPlanJson = await meals.json();
      this.setState({
        isLoading: false,
        mealPlan: mealPlanJson,
      });
      console.log(mealPlanJson, 'here');
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err,
      });
    }
  };

  render() {
    const { isLoading, error, diet, timeFrame, totalCals } = this.state;
    console.log({ diet, timeFrame });
    return (
      <div>
        <div className="form__message">
          {error && <h2>Error:{error.message}</h2>}
          {isLoading && <h2>Loading...</h2>}
        </div>

        <div>
          <h1>Let prepare meals for a week</h1>
          <h1>What is your diet?</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="total calories..."
              value={totalCals}
              // onChange={(e) => ({
              //   totalCals: e.target.value,
              // })} doesnt work?????
              onChange={this.handleInputChange}
            ></input>

            <label>Day or Week Plan </label>
            <select
              value={timeFrame}
              onChange={(e) => this.handleTimeFrameChange}
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
            </select>
            <label>Diet</label>
            <select value={diet} onChange={(e) => this.handleDietChange}>
              <option value="">Regular diet</option>
              <option value="Gluten Free">Gluten Free</option>
              <option value="Ketogenic">Ketogenic</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
              <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Paleo">Paleo</option>
              <option value="Pescetarian">Pescetarian</option>
              <option value="Primal">Primal</option>
              <option value="Whole30">Whole30</option>
            </select>
          </form>
        </div>
      </div>
    );
  }
}
export default MealPlanner;
