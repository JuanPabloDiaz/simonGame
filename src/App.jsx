import { useState, useRef, useEffect } from "react";
import GameBtn from "./Components/simonYoutube/GameBtn";
import Layout from "./Components/Layout";

const colors = ["green", "red", "yellow", "blue"];

function SimonGame() {
  // states
  const [sequence, setSequence] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [playingIdx, setPlayingIdx] = useState(0);

  // refs
  const greenRef = useRef(null);
  const redRef = useRef(null);
  const yellowRef = useRef(null);
  const blueRef = useRef(null);

  // functions
  const resetGame = () => {
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
  };

  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  const handleNextLevel = () => {
    if (!playing) {
      setPlaying(true);
      addNewColor();
    }
  };

  const handleColorClick = (e) => {
    if (playing) {
      e.target.classList.add("opacity-50");

      setTimeout(() => {
        e.target.classList.remove("opacity-50");

        const clickColor = e.target.getAttribute("color");

        // clicked the correct color of the sequence
        if (sequence[playingIdx] === clickColor) {
          // clicked the last color of the sequence
          if (playingIdx === sequence.length - 1) {
            setTimeout(() => {
              setPlayingIdx(0);
              addNewColor();
            }, 250);
          }

          // missing some colors of the sequence to be clicked
          else {
            setPlayingIdx(playingIdx + 1);
          }
        }

        // clicked the incorrect color of the sequence
        else {
          resetGame();
          // alert("You Lost!");
        }
      }, 250);
    }
  };

  // useEffect
  useEffect(() => {
    // show sequence
    if (sequence.length > 0) {
      const showSequence = (idx = 0) => {
        let ref = null;

        if (sequence[idx] === "green") ref = greenRef;
        if (sequence[idx] === "red") ref = redRef;
        if (sequence[idx] === "yellow") ref = yellowRef;
        if (sequence[idx] === "blue") ref = blueRef;

        // highlight the ref
        setTimeout(() => {
          ref.current.classList.add("brightness-[2.5]");

          setTimeout(() => {
            ref.current.classList.remove("brightness-[2.5]");
            if (idx < sequence.length - 1) showSequence(idx + 1);
          }, 250);
        }, 250);
      };

      showSequence();
    }
  }, [sequence]);

  return (
    <>
      <Layout>
        {/* Main container */}
        <div className="flex h-[500px] w-[500px] items-center justify-center rounded-full bg-neutral-800 text-white">
          {/* Game container */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Green and red container */}
            <div>
              {/* Green button */}
              <GameBtn
                color="green"
                border="rounded-tl-full"
                bg="bg-green-500"
                onClick={handleColorClick}
                ref={greenRef}
              />

              {/* Red button */}
              <GameBtn
                color="red"
                border="rounded-tr-full"
                bg="bg-red-500"
                onClick={handleColorClick}
                ref={redRef}
              />
            </div>

            {/* Yellow and blue container */}
            <div>
              {/* Yellow button */}
              <GameBtn
                color="yellow"
                border="rounded-bl-full"
                bg="bg-yellow-400"
                onClick={handleColorClick}
                ref={yellowRef}
              />

              {/* Blue button */}
              <GameBtn
                color="blue"
                border="rounded-br-full"
                bg="bg-blue-500"
                onClick={handleColorClick}
                ref={blueRef}
              />
            </div>

            {/* Play button */}
            <button
              className="absolute h-[150px] w-[150px] rounded-full bg-neutral-900 text-xl font-bold text-white duration-200 hover:scale-105 sm:h-[175px] sm:w-[175px] sm:text-2xl"
              onClick={handleNextLevel}
            >
              {sequence.length === 0 ? "Play" : sequence.length}
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default SimonGame;
