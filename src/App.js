import { useState } from "react";
import { getRoot } from "react-dom/client";

export default function Page() {
  const [curDice, setCurDice] = useState(GetNewDiceValues());
  const [selectedDie, setSelectedDie] = useState(-1);
  const [selectedSquare, setSelectedSquare] = useState(-1);
  const defaultPlayedDice = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  const [playedDice, setPlayedDice] = useState(defaultPlayedDice);
  const defaultPlayedSquares = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  const [playedSquares, setPlayedSquares] = useState(defaultPlayedSquares);
  function GetNewDiceValues() {
    NewCurDice = [];
    for (let i = 0; i < 12; i++) {
      RandomNum = randomNumberInRange(0, 5);
      NewCurDice[i] = dice[i][RandomNum];
    }
    return NewCurDice;
  }
  function ClearBoard() {
    setSelectedDie(-1);
    setPlayedDice(defaultPlayedDice);
    setPlayedSquares(defaultPlayedSquares);
  }
  function StartRestartGame() {
    setCurDice(GetNewDiceValues());
    ClearBoard();
  }
  function GetSquareValueFromPlayedDice(x, y) {
    if (playedSquares[x][y] < 0) {
      return "";
    } else {
      return curDice[playedSquares[x][y]];
    }
  }
  function LetterButton({ diceIdx, children }) {
    return (
      <button
        className={IsPlayed(diceIdx) ? "played-letter" : ""}
        disabled={diceIdx == selectedDie}
        onClick={() => {
          setSelectedDie(diceIdx);
        }}
      >
        {curDice[diceIdx]}
      </button>
    );
  }
  function SquareButton({ x, y }) {
    return (
      <button
        className={playedSquares[x][y] < 0 ? "square" : "square"}
        disabled={selectedDie < 0 && playedSquares[x][y] < 0}
        onClick={() => {
          PlayDieInSquare(x, y);
        }}
      >
        {GetSquareValueFromPlayedDice(x, y)}
      </button>
    );
  }
  function PlayDieInSquare(x, y) {
    TmpPlayedSquares = playedSquares;
    TmpPlayedDice = playedDice;
    if (selectedDie < 0 && TmpPlayedSquares[x][y] >= 0) {
      TmpPlayedDice[TmpPlayedSquares[x][y]] = false;
      TmpPlayedSquares[x][y] = selectedDie;
    } else {
      if (TmpPlayedDice[selectedDie]) {
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (TmpPlayedSquares[i][j] == selectedDie) {
              TmpPlayedSquares[i][j] = -1;
            }
          }
        }
      }
      TmpPlayedDice[selectedDie] = true;
      if (TmpPlayedSquares[x][y] >= 0) {
        TmpPlayedDice[TmpPlayedSquares[x][y]] = false;
      }
      TmpPlayedSquares[x][y] = selectedDie;
    }

    setSelectedDie(-1);
    setPlayedDice(TmpPlayedDice);
    setPlayedSquares(TmpPlayedSquares);
  }
  function HasValueOrIsDiceSelected(x, y) {
    return selectedDie >= 0 || TmpPlayedSquares[x][y] >= 0;
  }
  function IsPlayed(diceIdx) {
    return playedDice[diceIdx];
  }
  function CurrentLetters() {
    return (
      <>
        <div className="board-row">
          <LetterButton diceIdx={0}></LetterButton>
          <LetterButton diceIdx={1}></LetterButton>
          <LetterButton diceIdx={2}></LetterButton>
          <LetterButton diceIdx={3}></LetterButton>
          <LetterButton diceIdx={4}></LetterButton>
          <LetterButton diceIdx={5}></LetterButton>
          <LetterButton diceIdx={6}></LetterButton>
          <LetterButton diceIdx={7}></LetterButton>
          <LetterButton diceIdx={8}></LetterButton>
          <LetterButton diceIdx={9}></LetterButton>
          <LetterButton diceIdx={10}></LetterButton>
          <LetterButton diceIdx={11}></LetterButton>
        </div>
        <div className="board-row">
          <button
            disabled={selectedDie < 0}
            onClick={() => {
              setSelectedDie(-1);
            }}
          >
            Clear Selected
          </button>
        </div>
        <div className="board-row">
          <button
            onClick={() => {
              ClearBoard();
            }}
          >
            Clear Board
          </button>
        </div>
      </>
    );
  }
  function Board() {
    return (
      <>
        <div className="board-row">
          <SquareButton x={0} y={0}></SquareButton>
          <SquareButton x={1} y={0}></SquareButton>
          <SquareButton x={2} y={0}></SquareButton>
          <SquareButton x={3} y={0}></SquareButton>
          <SquareButton x={4} y={0}></SquareButton>
          <SquareButton x={5} y={0}></SquareButton>
          <SquareButton x={6} y={0}></SquareButton>
          <SquareButton x={7} y={0}></SquareButton>
          <SquareButton x={8} y={0}></SquareButton>
        </div>
        <div className="board-row">
          <SquareButton x={0} y={1}></SquareButton>
          <SquareButton x={1} y={1}></SquareButton>
          <SquareButton x={2} y={1}></SquareButton>
          <SquareButton x={3} y={1}></SquareButton>
          <SquareButton x={4} y={1}></SquareButton>
          <SquareButton x={5} y={1}></SquareButton>
          <SquareButton x={6} y={1}></SquareButton>
          <SquareButton x={7} y={1}></SquareButton>
          <SquareButton x={8} y={1}></SquareButton>
        </div>
        <div className="board-row">
          <SquareButton x={0} y={2}></SquareButton>
          <SquareButton x={1} y={2}></SquareButton>
          <SquareButton x={2} y={2}></SquareButton>
          <SquareButton x={3} y={2}></SquareButton>
          <SquareButton x={4} y={2}></SquareButton>
          <SquareButton x={5} y={2}></SquareButton>
          <SquareButton x={6} y={2}></SquareButton>
          <SquareButton x={7} y={2}></SquareButton>
          <SquareButton x={8} y={2}></SquareButton>
        </div>
        <div className="board-row">
          <SquareButton x={0} y={3}></SquareButton>
          <SquareButton x={1} y={3}></SquareButton>
          <SquareButton x={2} y={3}></SquareButton>
          <SquareButton x={3} y={3}></SquareButton>
          <SquareButton x={4} y={3}></SquareButton>
          <SquareButton x={5} y={3}></SquareButton>
          <SquareButton x={6} y={3}></SquareButton>
          <SquareButton x={7} y={3}></SquareButton>
          <SquareButton x={8} y={3}></SquareButton>
        </div>
        <div className="board-row">
          <SquareButton x={0} y={4}></SquareButton>
          <SquareButton x={1} y={4}></SquareButton>
          <SquareButton x={2} y={4}></SquareButton>
          <SquareButton x={3} y={4}></SquareButton>
          <SquareButton x={4} y={4}></SquareButton>
          <SquareButton x={5} y={4}></SquareButton>
          <SquareButton x={6} y={4}></SquareButton>
          <SquareButton x={7} y={4}></SquareButton>
          <SquareButton x={8} y={4}></SquareButton>
        </div>
        <div className="board-row">
          <SquareButton x={0} y={5}></SquareButton>
          <SquareButton x={1} y={5}></SquareButton>
          <SquareButton x={2} y={5}></SquareButton>
          <SquareButton x={3} y={5}></SquareButton>
          <SquareButton x={4} y={5}></SquareButton>
          <SquareButton x={5} y={5}></SquareButton>
          <SquareButton x={6} y={5}></SquareButton>
          <SquareButton x={7} y={5}></SquareButton>
          <SquareButton x={8} y={5}></SquareButton>
        </div>
        <div className="board-row">
          <SquareButton x={0} y={6}></SquareButton>
          <SquareButton x={1} y={6}></SquareButton>
          <SquareButton x={2} y={6}></SquareButton>
          <SquareButton x={3} y={6}></SquareButton>
          <SquareButton x={4} y={6}></SquareButton>
          <SquareButton x={5} y={6}></SquareButton>
          <SquareButton x={6} y={6}></SquareButton>
          <SquareButton x={7} y={6}></SquareButton>
          <SquareButton x={8} y={6}></SquareButton>
        </div>
        <div className="board-row">
          <SquareButton x={0} y={7}></SquareButton>
          <SquareButton x={1} y={7}></SquareButton>
          <SquareButton x={2} y={7}></SquareButton>
          <SquareButton x={3} y={7}></SquareButton>
          <SquareButton x={4} y={7}></SquareButton>
          <SquareButton x={5} y={7}></SquareButton>
          <SquareButton x={6} y={7}></SquareButton>
          <SquareButton x={7} y={7}></SquareButton>
          <SquareButton x={8} y={7}></SquareButton>
        </div>
        <div className="board-row">
          <SquareButton x={0} y={8}></SquareButton>
          <SquareButton x={1} y={8}></SquareButton>
          <SquareButton x={2} y={8}></SquareButton>
          <SquareButton x={3} y={8}></SquareButton>
          <SquareButton x={4} y={8}></SquareButton>
          <SquareButton x={5} y={8}></SquareButton>
          <SquareButton x={6} y={8}></SquareButton>
          <SquareButton x={7} y={8}></SquareButton>
          <SquareButton x={8} y={8}></SquareButton>
        </div>
      </>
    );
  }
  return (
    <section>
      <h1>Q-Less</h1>
      <Board />
      <Toolbar onStartRestart={() => StartRestartGame()} />
      <CurrentLetters />
    </section>
  );
}

const dice = [
  ["C", "C", "T", "T", "M", "S"],
  ["B", "L", "M", "Y", "M", "L"],
  ["N", "R", "H", "R", "N", "H"],
  ["R", "G", "D", "R", "L", "R"],
  ["V", "P", "G", "P", "K", "F"],
  ["N", "K", "Z", "S", "X", "B"],
  ["T", "J", "C", "D", "C", "B"],
  ["W", "D", "L", "R", "L", "F"],
  ["H", "W", "P", "T", "H", "T"],
  ["N", "I", "N", "Y", "O", "I"],
  ["E", "O", "E", "A", "A", "O"],
  ["I", "U", "E", "O", "A", "U"],
];

const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function Toolbar({ onStartRestart }) {
  return (
    <div>
      <Button onClick={onStartRestart}>Start/Restart</Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
