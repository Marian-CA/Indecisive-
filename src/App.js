import React, { useState, useEffect } from 'react';

function App() {
  const [flipResult, setFlipResult] = useState(''); // Store the result
  const [loading, setLoading] = useState(false); // Loading state

  const flipCoin = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('https://coin-flip3.p.rapidapi.com/Coin_Flip', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
          'x-rapidapi-host': 'coin-flip3.p.rapidapi.com',
        },
      });

      const data = await response.json(); // Parse JSON response
      console.log('API Response:', data); // Log response to console
      setFlipResult(data.flip); // Use the correct key from the response
    } catch (error) {
      console.error('Error:', error);
      setFlipResult('Error occurred!');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  useEffect(() => {
    console.log('Flip Result Updated:', flipResult); // Log state changes
  }, [flipResult]);

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Flip a Coin</h1>
      <button onClick={flipCoin} disabled={loading}>
        {loading ? 'Flipping...' : 'Flip Coin'}
      </button>
      {/* Display the result */}
      <p>{flipResult ? `Result: ${flipResult}` : 'Press the button to flip the coin!'}</p>
    </div>
  );
}

export default App;
