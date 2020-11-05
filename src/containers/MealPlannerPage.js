import React, { Component } from 'react';
import MealPlan from '../components/MealPlan';

const dietaryTypes = [
  { value: '', type: 'Regular diet' },
  { value: 'Gluten Free', type: 'Gluten Free' },
  { value: 'Ketogenic', type: 'Ketogenic' },
  { value: 'Vegetarian', type: 'Vegetarian' },
  { value: 'Lacto-Vegetarian', type: 'Lacto-Vegetarian' },
  { value: 'Ovo-Vegetarian', type: 'Ovo-Vegetarian' },
  { value: 'Vegan', type: 'Vegan' },
  { value: 'Paleo', type: 'Paleo' },
  { value: 'Pescetarian', type: 'Pescetarian' },
  { value: 'Primal', type: 'Primal' },
  { value: 'Whole30', type: 'Whole30' },
];
class MealPlanner extends Component {
  state = {
    diet: '',
    timeFrame: 'week',
    isDailyPlan: false,
    totalCals: '1500', //default calories
    mealPlan: [],
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
      });
      if (timeFrame === 'day') {
        this.setState({
          isDailyPlan: !this.state.isDailyPlan,
          mealPlan: mealPlanJson.meals,
        });
      } else {
        const weeklyPlan = Object.keys(mealPlanJson.week).map((key) => {
          return mealPlanJson.week[key]; //Convert object of objects to array of objects
        });
        this.setState({
          isDailyPlan: false,
          mealPlan: weeklyPlan,
        });
      }
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err,
      });
    }
  };

  render() {
    const {
      isLoading,
      error,
      diet,
      timeFrame,
      isDailyPlan,
      totalCals,
      mealPlan,
    } = this.state;
    console.log(mealPlan, 'day', isDailyPlan);
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
              onChange={this.handleInputChange}
            />

            <label>Day or Week Plan </label>
            <select value={timeFrame} onChange={this.handleTimeFrameChange}>
              <option value="day">Day</option>
              <option value="week">Week</option>
            </select>
            <label>Diet</label>
            <select value={diet} onChange={this.handleDietChange}>
              {dietaryTypes.map((diet) => (
                <option key={diet.value} value={diet.value}>
                  {diet.type}
                </option>
              ))}
            </select>
            <button>Search Meals Plan</button>
          </form>
          <div className="container">
            {/* day plan returns array of three objects */}
            <div className="row">
              {isDailyPlan &&
                mealPlan.map((recipe) => (
                  <MealPlan recipe={recipe} key={recipe.id} />
                ))}
            </div>
            {/* week plan return array of seven objects- each day,
                each day is a object contains array of three objects-each recipe */}
            <div className="row">
              {!isDailyPlan &&
                Array.isArray(mealPlan) &&
                mealPlan.map((eachDay) =>
                  eachDay.meals.map((recipe) => (
                    <MealPlan recipe={recipe} key={recipe.id} />
                  ))
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MealPlanner;
