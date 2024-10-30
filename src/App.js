import React, { useState, useEffect } from 'react'; // Import React hooks

function App() {
  const [flipResult, setFlipResult] = useState(''); // Store the result
  const [loading, setLoading] = useState(false); // Track loading state
  const [animating, setAnimating] = useState(false); // Track animation state
  const [showMessage, setShowMessage] = useState(false); // Track message state

  // Function to fetch coin flip result from the API
  const flipCoin = async () => {
    setLoading(true);
    setAnimating(true); // Start animation
    setShowMessage(false); // Reset message visibility
    try {
      const response = await fetch('https://coin-flip3.p.rapidapi.com/Coin_Flip', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
          'x-rapidapi-host': 'coin-flip3.p.rapidapi.com',
        },
      });
      const data = await response.json();
      console.log('API Response:', data);

      // Wait for animation to complete before showing result
      setTimeout(() => {
        setFlipResult(data.flip); // Store result
        setAnimating(false); // Stop animation
      }, 3000); // Match animation duration
    } catch (error) {
      console.error('Error:', error);
      setFlipResult('Error occurred!');
      setAnimating(false); // Stop animation
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle "Still Not Sure?" button click
  const handleStillNotSure = () => {
    setShowMessage(true); // Show motivational message
  };

  // Log when the flip result updates
  useEffect(() => {
    if (flipResult) {
      console.log(`The coin landed on: ${flipResult}`);
    }
  }, [flipResult]);

  // CSS styles
  const appStyles = {
    textAlign: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
  };

  const coinStyles = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: flipResult === 'heads' ? 'gold' : 'silver',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '40px',
    animation: animating ? 'spin 3s ease-in-out' : 'none',
  };

  const buttonStyles = {
    backgroundColor: '#ff7f50',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    fontSize: '18px',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    marginTop: '20px',
  };

  const messageBoxStyles = {
    marginTop: '30px',
    padding: '15px',
    border: '2px dashed #ff7f50',
    borderRadius: '15px',
    backgroundColor: '#fff',
    color: '#333',
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
    fontSize: '18px',
  };

  return (
    <div className="App" style={appStyles}>
      <h1>Flip a Coin</h1>
      <button onClick={flipCoin} disabled={loading} style={buttonStyles}>
        {loading ? 'Flipping...' : 'Flip Coin'}
      </button>
      <div style={coinStyles}>
        {animating ? '🪙' : flipResult === 'heads' ? '🙂' : '🙃'}
      </div>
      {flipResult && !animating && (
        <>
          <p style={{ marginTop: '20px', fontSize: '24px' }}>
            The coin landed on: <strong>{flipResult.toUpperCase()}</strong>!
          </p>
          <button onClick={handleStillNotSure} style={buttonStyles}>
            Still Not Sure?
          </button>
        </>
      )}
      {showMessage && (
        <div style={messageBoxStyles}>
          Don’t be afraid to trust your instincts, you got this!
        </div>
      )}
    </div>
  );
}

export default App;
