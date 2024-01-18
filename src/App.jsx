import { useState, useEffect } from "react";
import Button from "./Components/Button";

const App = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Add a new random button to the sequence
  const addToSequence = () => {
    const newButton = Math.floor(Math.random() * 4) + 1;
    setSequence([...sequence, newButton]);
  };

  // Handle user button press
  const handleButtonPress = (button) => {
    setUserSequence([...userSequence, button]);
  };

  // Check if the user's sequence is correct
  useEffect(() => {
    if (userSequence.length === sequence.length) {
      for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] !== userSequence[i]) {
          setGameOver(true);
          return;
        }
      }
      setUserSequence([]);
      addToSequence();
    }
  }, [userSequence]);

  // Start a new game
  const startNewGame = () => {
    setSequence([]);
    setUserSequence([]);
    setGameOver(false);
    addToSequence();
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-200">
      {gameOver && <p className="text-2xl text-red-500">Game Over!</p>}
      <div className="flex flex-wrap justify-center">
        <Button color="red" onPress={() => handleButtonPress(1)} />
        <Button color="green" onPress={() => handleButtonPress(2)} />
        <Button color="blue" onPress={() => handleButtonPress(3)} />
        <Button color="yellow" onPress={() => handleButtonPress(4)} />
      </div>
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={startNewGame}
      >
        Start New Game
      </button>
    </div>
  );
};

export default App;
