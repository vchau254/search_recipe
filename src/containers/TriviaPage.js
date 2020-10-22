import React, { useEffect, useState } from 'react';

const Trivia = () => {
  const [trivia, setTrivia] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getData(){
    console.log('calling')
    try {
      setIsLoading(true)
      const text = await fetch(
        'https://api.spoonacular.com/food/trivia/random?&apiKey=4817974c0a5d4fe5b928123f9bed6654'
      );
      const triviaJson = await text.json();
      setTrivia(triviaJson)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error)
    }
   
  }

  useEffect(() => {
    getData()
  }, [counter]);



  if (error === null) {
    return <h2>{trivia.text}</h2>;
  } else {
    return (
      <div>
        <div className="form__message">
          {error && <div>Error:{error.message}</div>}
          {isLoading && <div>Loading...</div>}
        </div>
      </div>
    );
  }
}



export default Trivia;