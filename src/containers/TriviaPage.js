import React, { useEffect, useState } from 'react';

const Trivia = () => {
  const [trivia, setTrivia] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getTrivia() {
    console.log('calling');
    try {
      setIsLoading(true);
      const text = await fetch(
        'https://api.spoonacular.com/food/trivia/random?&apiKey=4817974c0a5d4fe5b928123f9bed6654'
      );
      const triviaJson = await text.json();
      setTrivia(triviaJson);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }
  useEffect(() => {
    getTrivia();
  }, []);
  return (
    <div>
      <div className="form__message">
        {error && <div>Error:{error.message}</div>}
        {isLoading && <div>Loading...</div>}
      </div>
      {/* How does it work?? */}
      <button onClick={getTrivia}>Find other trivia</button>
      <h2>{trivia.text}</h2>;
    </div>
  );
};

export default Trivia;
