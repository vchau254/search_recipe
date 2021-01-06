import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { Button } from '../../components/Button/button.style';
import {FavPage,PageMessage} from './savedpage.style';

const SavedPage = () => {
    const [favRecipes, setFavRecipes] = useState([])

    //get fav recipe from local storage

    // setFavRecipes(savedRecipes);
    useEffect(() => {
        if (localStorage.getItem('favoriteRecipes')) {
            setFavRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
        }

    }, [])
    const removedFavRecipes = (fav) => {
        const newFavRecipes = favRecipes.filter(recipe => recipe.id !== fav.id);

        setFavRecipes(newFavRecipes);
        //update new list to local storage
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
        NotificationManager.info(`${fav.title} is removed`);
    }

    return (
        <FavPage>
            <Container>
            <Row>
                {favRecipes.length ? favRecipes.map(fav =>
                    <Col sm={10} md={4} lg={3} key={fav.id}>
                        <Card bg='light'>
                            <Card.Img src={fav.img} alt="recipe" />
                            <Card.Body>

                                <Card.Title>
                                    <Link to={`/recipe/${fav.id}`}>
                                        {fav.title.length < 20
                                            ? `${fav.title}`
                                            : `${fav.title.substring(0, 25)}...`}
                                    </Link>
                                </Card.Title>

                            </Card.Body>
                            <Button onClick={() => removedFavRecipes(fav)}>Remove</Button>
                        </Card>
                    </Col>


                ) : <PageMessage>No favorite recipes saved</PageMessage>}
            </Row>
            <NotificationContainer />
            </Container>
        </FavPage>
    );

}
export default SavedPage;

