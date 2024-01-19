import { useState, useEffect } from "react";
import Button from "./Components/Button";
import Layout from "./Components/Layout";

const App = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Create Audio objects for each sound
  const sounds = [
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  ];

  // Add a new random button to the sequence
  const addToSequence = () => {
    const newButton = Math.floor(Math.random() * 4) + 1;
    setSequence([...sequence, newButton]);
    sounds[newButton - 1].play(); // Play the sound
  };

  // Handle user button press
  const handleButtonPress = (button) => {
    setUserSequence([...userSequence, button]);
    sounds[button - 1].play(); // Play the sound
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
    <Layout>
      <div className="flex flex-col items-center justify-center">
        {gameOver && (
          <p className="h-18 rounded-lg border p-2 text-2xl text-red-500">
            Game Over!
          </p>
        )}
        <div className="grid grid-flow-col grid-rows-2">
          <Button color="green" onPress={() => handleButtonPress(1)} />
          <Button color="yellow" onPress={() => handleButtonPress(2)} />
          <Button color="red" onPress={() => handleButtonPress(3)} />
          <Button color="blue" onPress={() => handleButtonPress(4)} />
        </div>
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={startNewGame}
        >
          Start New Game
        </button>
      </div>
    </Layout>
  );
};

export default App;
