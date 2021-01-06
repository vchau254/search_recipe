import React, { Component } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { Container, Row, Form, FormControl, Button, Col, Nav } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import MealPlan from '../../components/MealPlan/index';
import { MealPlanWrapper, MealSearchContainer, MealPlanTitle } from './mealplanner.style';





const dietaryTypes = [
    { img: './diet-img/Anything.png', value: 'regular', type: 'Anything' },
    { img: './diet-img/GlutenFree.png', value: 'Gluten Free', type: 'Gluten Free' },
    { img: './diet-img/keto.png', value: 'Ketogenic', type: 'Ketogenic' },
    { img: './diet-img/Vegan.png', value: 'Vegan', type: 'Vegan' },
    { img: './diet-img/Paleo.png', value: 'Paleo', type: 'Paleo' },
    { img: './diet-img/Pescetarian.png', value: 'Pescetarian', type: 'Pescetarian' },

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
        loading: false,
    };
    handleInputChange = (e) => {
        this.setState({ totalCals: e.target.value });
    };
    handleTimeFrameChange = (e) => {
        this.setState({ timeFrame: e.target.value });
    };
    handleDietChange = (selectedKey) => {
        // if (!e) {
        //     this.setState({ diet: 'regular' });
        // }else{

        // }
        this.setState({ diet: selectedKey });

    };
    handleSubmit = (e) => {
        e.preventDefault();
        const { diet, timeFrame, totalCals } = this.state;
        this.getMealPlanner(diet, timeFrame, totalCals);
    };
    getMealPlanner = async (diet, timeFrame, totalCals) => {
        try {
            this.setState({ progress: 50, loading: true });
            const meals = await fetch(
                `https://api.spoonacular.com/mealplanner/generate?timeFrame=${timeFrame}&targetCalories=${totalCals}&diet=${diet}&exclude=<string>?&apiKey=${process.env.REACT_APP_API_KEY}`
            );
            const mealPlanJson = await meals.json();


            //send error notification when out of quotas to call API - 402 error
            if (!meals) {
                NotificationManager.error('You seem a bit hungry today, you don\'t have any more requests for our server');
                this.setState({
                    progress: 100,
                    loading: false
                })
                return;
            }

            if (timeFrame === 'day') {
                this.setState({
                    isDailyPlan: !this.state.isDailyPlan,
                    mealPlan: mealPlanJson.meals,
                    progress: 100,
                    loading: false,
                });
            } else {
                const weeklyPlan = Object.keys(mealPlanJson.week).map((key) => {
                    return mealPlanJson.week[key]; //Convert object of objects to array of objects
                });
                this.setState({
                    isDailyPlan: false,
                    mealPlan: weeklyPlan,
                    progress: 100,
                    loading: false
                });
            }
        } catch (err) {
            NotificationManager.error(err.message);
            this.setState({
                error: err,
                loading: false
            });
        }
    };

    render() {
        const {
            progress,
            loading,
            diet,
            timeFrame,
            isDailyPlan,
            totalCals,
            mealPlan,
        } = this.state;

        return (
            <MealPlanWrapper>

                <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => this.setState({ progress: 0 })} />
                {loading && 'Loading...'}

                <MealSearchContainer>
                    <MealPlanTitle>
                        Let prep the meals together!!!!!
                    </MealPlanTitle>

                    {/* render diet types*/}
                    <Nav as='ul'
                        className="justify-content-center no-gutters"
                        variant="pills"
                        onSelect={(selectedKey) => this.handleDietChange(selectedKey)}>
                        {dietaryTypes.map((type) => (
                            <Nav.Item as='li' key={type.value} className='col-4 col-sm-2' >
                                <Nav.Link eventKey={type.value}>
                                    <img src={type.img} alt={diet.value} />
                                    <br />
                                    {type.type}
                                </Nav.Link>
                            </Nav.Item>
                        )

                        )}
                    </Nav>

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} className='col-12 col-sm-9 col-md-6 col-lg-6 col-xl-5'>
                                <Form.Label>I want to eat</Form.Label>
                                <FormControl
                                    placeholder="total calories..."
                                    value={totalCals}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} className='col-12 col-sm-9 col-md-6 col-lg-6 col-xl-5'>
                                <Form.Label>in</Form.Label>
                                <FormControl as='select' defaultValue={timeFrame} onChange={this.handleTimeFrameChange}>
                                    <option value="day">Day</option>
                                    <option value="week">Week</option>
                                </FormControl>

                            </Form.Group>

                        </Form.Row>
                        <Form.Row className="justify-content-center">
                            <Button variant='outline-info' type='submit' className='col-12 col-sm-9 col-md-6 col-lg-6 col-xl-5'>Search</Button>
                        </Form.Row>

                    </Form>
                </MealSearchContainer>


                <Container>
                    {/* day plan returns array of three objects */}
                    <Row className="justify-content-center">
                        {isDailyPlan &&
                            mealPlan.map((recipe) => (
                                <MealPlan recipe={recipe} key={recipe.id} />
                            ))}
                    </Row>
                    {/* week plan return array of seven objects- each day,
                each day is a object contains array of three objects-each recipe */}
                    <Row className="justify-content-center">
                        {!isDailyPlan &&
                            Array.isArray(mealPlan) && mealPlan.map((eachDay) =>
                                eachDay.meals.map((recipe) => (
                                    <MealPlan recipe={recipe} key={recipe.id} />)
                                ))}
                    </Row>
                </Container>
                <NotificationContainer />
            </MealPlanWrapper>
        );
    }
}

export default MealPlanner;
