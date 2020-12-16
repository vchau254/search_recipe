import React, { Component } from 'react';
import MealPlan from '../components/MealPlan';
import NavBar from '../components/NavBar';
import LoadingBar from 'react-top-loading-bar';
import Notifications from '../components/Notifications';
import {Container, Row, Form, FormControl, Button,Col} from 'react-bootstrap';


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
    progress: 0,
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
      this.setState({ progress: 50});
      const meals = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?timeFrame=${timeFrame}&targetCalories=${totalCals}&diet=${diet}&exclude=<string>?&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const mealPlanJson = await meals.json();
      if (timeFrame === 'day') {
        this.setState({
          isDailyPlan: !this.state.isDailyPlan,
          mealPlan: mealPlanJson.meals,
          progress: 100,
        });
      } else {
        const weeklyPlan = Object.keys(mealPlanJson.week).map((key) => {
          return mealPlanJson.week[key]; //Convert object of objects to array of objects
        });
        this.setState({
          isDailyPlan: false,
          mealPlan: weeklyPlan,
          progress: 100,
        });
      }
    } catch (err) {
      this.setState({
        error: err,
      });
    }
  };

  render() {
    const {
      progress,
      error,
      diet,
      timeFrame,
      isDailyPlan,
      totalCals,
      mealPlan,
    } = this.state;

    return (
      <div className='meal-planner'> 
        <header>
        <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => this.setState({progress:0})} />
        {error && <Notifications error={error}/>}
        <NavBar/>
        <Container>
          <h1>Let prepare meals for a week</h1>
          <h1>What is your diet?</h1>
          <Form onSubmit={this.handleSubmit}> 
          <Form.Row>
          <Form.Group as={Col}>
              <Form.Label>Total Calories</Form.Label>
              <FormControl
              placeholder="total calories..."
              value={totalCals}
              onChange={this.handleInputChange}
            />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Day or Week Plan</Form.Label>
              <FormControl as='select' defaultValue={timeFrame} onChange={this.handleTimeFrameChange}>
              <option value="day">Day</option>
              <option value="week">Week</option>
              </FormControl>
              
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Diet</Form.Label>
              <FormControl as='select' defaultValue={diet} onChange={this.handleDietChange}>
              {dietaryTypes.map((diet) => (
                <option key={diet.value} value={diet.value}>
                  {diet.type}
                </option>
              ))}
              </FormControl>
            </Form.Group>
            
          </Form.Row>
          <Button variant='primary' type='submit'>Search Meals Plan</Button>
          </Form>
          </Container>
        </header>

        <Container>
             {/* day plan returns array of three objects */}
             <Row>
          {isDailyPlan &&
              mealPlan.map((recipe) => (
                  <MealPlan recipe={recipe} key={recipe.id} />
          ))}
          </Row>
           {/* week plan return array of seven objects- each day,
                each day is a object contains array of three objects-each recipe */}   
           <Row>
           {!isDailyPlan &&
              Array.isArray(mealPlan) && mealPlan.map((eachDay, index) => (
                  <h3>Day {index}</h3>,
                  eachDay.meals.map((recipe) => (
                    <MealPlan recipe={recipe} key={recipe.id} />)
            )))}
           </Row>
        </Container>
         
      </div>
    );
  }
}

export default MealPlanner;
