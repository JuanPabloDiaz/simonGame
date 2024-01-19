import { useState, useEffect, useCallback, useMemo } from "react";
import Button from "./Components/Button";
import Layout from "./Components/Layout";

const App = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Create Audio objects for each sound
  const sounds = useMemo(
    () => [
      new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
      new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
      new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
      new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
    ],
    [],
  );

  // Add a new random button to the sequence
  const addToSequence = useCallback(() => {
    const newButton = Math.floor(Math.random() * 4) + 1;
    setSequence((prevSequence) => [...prevSequence, newButton]);
    sounds[newButton - 1].play(); // Play the sound (commented out for now to avoid sound when clicking the start new game buttons)
  }, [setSequence, sounds]);

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
  }, [userSequence, sequence, addToSequence]);

  // Start a new game
  const startNewGame = () => {
    setSequence([]);
    setUserSequence([]);
    setGameOver(false);
    addToSequence();
  };

  return (
    <Layout>
      <div className="wrap flex flex-col items-center justify-center">
        <div className="grid grid-flow-col grid-rows-2 rounded-full bg-[#292929] p-4">
          <Button color="green" onPress={() => handleButtonPress(1)} />
          <Button color="yellow" onPress={() => handleButtonPress(2)} />
          <Button color="red" onPress={() => handleButtonPress(3)} />
          <Button color="blue" onPress={() => handleButtonPress(4)} />
        </div>

        <div className="absolute left-[50%] top-[50%] m-[-122px] h-[250px] w-[250px] rounded-full border-8 border-gray-800 bg-[#ece7ee]">
          <h1 className="mt-9 text-5xl font-extrabold text-gray-800">
            Simon
            <span className="relative top-[-20px] text-2xl font-semibold">
              ®
            </span>
          </h1>
          <div className="">
            <div className="w-15 relative mx-3 mb-1 mt-4 inline-block text-center">
              <h1 className="count text-[#430710]">--</h1>
              <h3 className="font-oswald mt-1 text-center text-xs ">COUNT</h3>
            </div>
            <div className="relative inline-block w-[50px]">
              <div
                className="full-red but active:shadow-6xl pointer-events-auto relative -top-1 m-auto h-8 w-10 cursor-pointer rounded-full border-4 border-[#444] bg-yellow-400 shadow-md active:top-[0.15px] active:bg-yellow-100 active:shadow-[#292929]"
                id="start"
              ></div>
              <h3 className="font-oswald mt-1 text-center text-xs ">START</h3>
            </div>
          </div>
          {gameOver && <p className="h-18 text-2xl text-red-500">Game Over!</p>}
        </div>
      </div>
      {/* <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={startNewGame}
      >
        Start New Game
      </button> */}
      {/* <section>
        <div className="wrap">
          <div className="wrap-in">
            <div className="rw">
              <div className="t-l push green unclickable inline" id="3"></div>
              <div className="t-r push red but unclickable inline" id="2"></div>
            </div>
            <div className="rw">
              <div className="b-l push yellow unclickable inline" id="1"></div>
              <div
                className="b-r push blue but unclickable inline"
                id="0"
              ></div>
            </div>
          </div>
          <div className="center">
            <h1 className="brand">
              Simon<span className="small">®</span>
            </h1>
            <div className="rw">
              <div className="display inline">
                <h1 className="count led-off">--</h1>
                <h3 className="label">COUNT</h3>
              </div>
              <div className="btn-box inline">
                <div
                  className="round-btn full-red but clickable"
                  id="start"
                ></div>
                <h3 className="label">START</h3>
              </div>
              <div className="btn-box inline">
                <div className="round-btn but clickable" id="mode"></div>
                <h3 className="label">STRICT</h3>
                <div className="led" id="mode-led"></div>
              </div>
            </div>
            <div className="rw bot">
              <h3 className="label inline">OFF</h3>
              <div className="sw-slot inline">
                <div className="switch" id="pwr-sw"></div>
              </div>
              <h3 className="label inline">ON</h3>
            </div>
          </div>
        </div>
      </section> */}
    </Layout>
  );
};

export default App;
