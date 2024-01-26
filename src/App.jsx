import { useState, useEffect, useMemo } from "react";
import Button from "./Components/Button";
import Layout from "./Components/Layout";
// import "./js/index.js";
const Game = () => {
  // let variables:
  const [order, setOrder] = useState([]);
  const [playerOrder, setPlayerOrder] = useState([]);
  const [flash, setFlash] = useState(0);
  const [turn, setTurn] = useState(1);
  const [good, setGood] = useState(false);
  const [computerTurn, setComputerTurn] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [strict, setStrict] = useState(false);
  const [noise, setNoise] = useState(true);
  const [on, setOn] = useState(false);
  const [win, setWin] = useState(false);

  // const variables:
  const [turnCounter, setTurnCounter] = useState("");
  const [color, setColor] = useState({
    topLeft: "green",
    topRight: "red",
    bottomLeft: "yellow",
    bottomRight: "blue",
  });

  const clearColor = () => {
    setColor({
      topLeft: "darkGreen",
      topRight: "darkRed",
      bottomLeft: "darkYellow",
      bottomRight: "darkBlue",
    });
  };

  const flashColor = () => {
    setColor({
      topLeft: "lightGreen",
      topRight: "lightRed",
      bottomLeft: "lightYellow",
      bottomRight: "lightBlue",
    });
  };

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

  const play = () => {
    setWin(false);
    setOrder([]);
    setPlayerOrder([]);
    setFlash(0);
    setIntervalId(null);
    setTurn(1);
    setTurnCounter(1);
    setGood(true);
    for (var i = 0; i < 20; i++) {
      setOrder((order) => [...order, Math.floor(Math.random() * 4) + 1]);
    }
    setComputerTurn(true);

    setIntervalId(setInterval(gameTurn, 800));
  };

  const gameTurn = () => {
    setOn(false);

    if (flash === turn) {
      clearInterval(intervalId);
      setComputerTurn(false);
      clearColor();
      setOn(true);
    }

    if (computerTurn) {
      clearColor();
      setTimeout(() => {
        if (order[flash] === 1) one();
        if (order[flash] === 2) two();
        if (order[flash] === 3) three();
        if (order[flash] === 4) four();
        setFlash(flash + 1);
      }, 200);
    }
  };

  const one = () => {
    if (noise) {
      sounds[0].play();
    }
    setNoise(true);
    setColor((prevColor) => ({ ...prevColor, topLeft: "lightGreen" }));
  };

  const two = () => {
    if (noise) {
      sounds[1].play();
    }
    setNoise(true);
    setColor((prevColor) => ({ ...prevColor, topRight: "lightRed" }));
  };

  const three = () => {
    if (noise) {
      sounds[2].play();
    }
    setNoise(true);
    setColor((prevColor) => ({ ...prevColor, bottomLeft: "lightYellow" }));
  };

  const four = () => {
    if (noise) {
      sounds[3].play();
    }
    setNoise(true);
    setColor((prevColor) => ({ ...prevColor, bottomRight: "lightBlue" }));
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleStrictChange = (event) => {
    setStrict(event.target.checked);
  };

  useEffect(() => {
    // This will be called whenever `strict` changes
    console.log("Strict mode is", strict ? "enabled" : "disabled");
  }, [strict]);

  const check = () => {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
      setGood(false);

    if (playerOrder.length == 3 && good) {
      winGame();
    }

    if (good == false) {
      flashColor();
      setTurnCounter("NO!");
      setTimeout(() => {
        setTurnCounter(turn);
        clearColor();

        if (strict) {
          play();
        } else {
          setComputerTurn(true);
          setFlash(0);
          setPlayerOrder([]);
          setGood(true);
          setIntervalId(setInterval(gameTurn, 800));
        }
      }, 800);

      setNoise(false);
    }

    if (turn == playerOrder.length && good && !win) {
      // turn++;
      setTurnCounter(turn);
      setPlayerOrder([]);
      setComputerTurn(true);
      setFlash(0);
      setTurnCounter(turn);
      setIntervalId(setInterval(gameTurn, 800));
    }
  };

  const winGame = () => {
    flashColor();
    setTurnCounter("WIN!");
    setOn(false);
    setWin(true);
  };

  return (
    <Layout>
      <div className="wrap flex flex-col items-center justify-center">
        <div
          id="outer-circle"
          className="grid grid-flow-col grid-rows-2 rounded-full bg-[#292929] p-4"
        >
          <Button
            color={color.topLeft === "lightGreen" ? "darkGreen" : "green"}
            onPress={() => {
              if (on) {
                setPlayerOrder([...playerOrder, 1]);
                check();
                one();
                if (!win) {
                  setTimeout(() => {
                    clearColor();
                  }, 300);
                }
              }
            }}
            id="topleft"
          />
          <Button
            color={color.bottomLeft === "lightYellow" ? "darkYellow" : "yellow"}
            onPress={() => {
              if (on) {
                setPlayerOrder([...playerOrder, 3]);
                check();
                three();
                if (!win) {
                  setTimeout(() => {
                    clearColor();
                  }, 300);
                }
              }
            }}
            id="bottomleft"
          />
          <Button
            color={color.topRight === "lightRed" ? "darkRed" : "red"}
            onPress={() => {
              if (on) {
                setPlayerOrder([...playerOrder, 2]);
                check();
                two();
                if (!win) {
                  setTimeout(() => {
                    clearColor();
                  }, 300);
                }
              }
            }}
            id="topright"
          />
          <Button
            color={color.bottomRight === "lightBlue" ? "darkBlue" : "blue"}
            onPress={() => {
              if (on) {
                setPlayerOrder([...playerOrder, 4]);
                check();
                four();
                if (!win) {
                  setTimeout(() => {
                    clearColor();
                  }, 300);
                }
              }
            }}
            id="bottomright"
          />
        </div>

        <div
          id="inner-circle"
          className="absolute left-[50%] top-[50%] m-[-122px] h-[250px] w-[250px] rounded-full border-8 border-gray-800 bg-[#ece7ee]"
        >
          <h1 id="title" className="mt-7 text-5xl font-extrabold text-gray-800">
            Simon
            <span className="relative top-[-20px] text-2xl font-semibold">
              ®
            </span>
          </h1>
          <div className="">
            <div className="w-15 relative mx-3 mb-1 mt-4 inline-block text-center">
              <h1 id="turn" className="count text-[#430710]">
                {turnCounter === "1" ? "" : "--"}
              </h1>
              <h3 className="mt-1 text-center font-oswald text-xs ">COUNT</h3>
            </div>
            <div className="relative inline-block w-[50px]">
              <button
                className="full-red but active:shadow-6xl pointer-events-auto relative -top-1 m-auto h-8 w-10 cursor-pointer rounded-full border-4 border-[#444] bg-yellow-400 text-xs text-gray-500 shadow-md active:top-[0.15px] active:bg-yellow-100 active:shadow-[#292929]"
                id="start"
                onClick={() => {
                  if (on || win) {
                    play();
                  }
                }}
              >
                Play
              </button>
              <h3 className="mt-1 text-center font-oswald text-xs">START</h3>
            </div>
            <div id="switches" className="flex justify-around">
              <input
                type="checkbox"
                className="toggle w-2"
                id="on"
                onChange={(event) => {
                  setOn(event.target.checked);
                  if (event.target.checked) {
                    play();
                  } else {
                    clearColor();
                    clearInterval(intervalId);
                  }
                }}
              />
              <input
                type="checkbox"
                className="toggle w-2"
                id="strict"
                checked={strict}
                // onChange={(event) => setStrict(event.target.checked)}
                onChange={handleStrictChange}
              />
            </div>
            <div className="flex justify-around text-xs">
              <span>POWER</span>
              <span>STRICT</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Game;
