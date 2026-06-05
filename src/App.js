import { useState } from "react";
import { getRoot } from "react-dom/client";

export default function Page() {
  const [curDice, setCurDice] = useState(GetNewDiceValues());
  const [selectedDie, setSelectedDie] = useState(-1);
  const [selectedSquare, setSelectedSquare] = useState(-1);
  const gridSize = 9;
  const defaultPlayedDice = [
    { x: -1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: -1 },
  ];
  const [playedDice, setPlayedDice] = useState(defaultPlayedDice);
  const [playedSquares, setPlayedSquares] = useState(DefaultPlayedSquares());
  function GetNewDiceValues() {
    let NewCurDice = [];
    for (let i = 0; i < 12; i++) {
      let RandomNum = randomNumberInRange(0, 5);
      NewCurDice[i] = dice[i][RandomNum];
    }
    return NewCurDice;
  }
  function DefaultPlayedSquares() {
    let NewGridVals = [];
    for (let i = 0; i < gridSize; i++) {
      NewGridVals[i] = [];
      for (let j = 0; j < gridSize; j++) {
        NewGridVals[i][j] = { idx: -1, val: "" };
      }
    }
    return NewGridVals;
  }
  function ClearBoard() {
    setSelectedDie(-1);
    setPlayedDice(defaultPlayedDice);
    setPlayedSquares(DefaultPlayedSquares());
  }
  function StartRestartGame() {
    setCurDice(GetNewDiceValues());
    ClearBoard();
  }
  function LetterButton({ diceIdx, children }) {
    return (
      <div className="letter-div">
        <button
          className={IsPlayed(diceIdx) ? "played-letter" : "unplayed-letter"}
          disabled={diceIdx == selectedDie}
          onClick={() => {
            setSelectedDie(diceIdx);
          }}
        >
          {curDice[diceIdx]}
        </button>
      </div>
    );
  }
  function SquareButton({ x, y }) {
    return (
      <button
        className={playedSquares[x][y].idx < 0 ? "square" : "square"}
        disabled={selectedDie < 0 && playedSquares[x][y].idx < 0}
        onClick={() => {
          PlayDieInSquare(x, y);
        }}
      >
        {playedSquares[x][y].val}
      </button>
    );
  }
  function PlayDieInSquare(x, y) {
    let TmpPlayedSquares = JSON.parse(JSON.stringify(playedSquares));
    let TmpPlayedDice = JSON.parse(JSON.stringify(playedDice));
    if (selectedDie < 0 && TmpPlayedSquares[x][y].idx >= 0) {
      TmpPlayedDice[TmpPlayedSquares[x][y].idx].x = -1;
      TmpPlayedDice[TmpPlayedSquares[x][y].idx].y = -1;
      TmpPlayedSquares[x][y].idx = -1;
      TmpPlayedSquares[x][y].val = "";
    } else {
      if (
        TmpPlayedDice[selectedDie].x >= 0 &&
        TmpPlayedDice[selectedDie].y >= 0
      ) {
        TmpPlayedSquares[TmpPlayedDice[selectedDie].x][
          TmpPlayedDice[selectedDie].y
        ].idx = -1;
        TmpPlayedSquares[TmpPlayedDice[selectedDie].x][
          TmpPlayedDice[selectedDie].y
        ].val = "";
      }
      TmpPlayedDice[selectedDie].x = x;
      TmpPlayedDice[selectedDie].y = y;
      if (TmpPlayedSquares[x][y].idx >= 0) {
        TmpPlayedDice[TmpPlayedSquares[x][y].idx].x = -1;
        TmpPlayedDice[TmpPlayedSquares[x][y].idx].y = -1;
      }
      TmpPlayedSquares[x][y].idx = selectedDie;
      TmpPlayedSquares[x][y].val = curDice[selectedDie];
      setSelectedDie(-1);
    }

    setPlayedDice(TmpPlayedDice);
    setPlayedSquares(TmpPlayedSquares);
  }
  function HasValueOrIsDiceSelected(x, y) {
    return selectedDie >= 0 || playedSquares[x][y] >= 0;
  }
  function IsPlayed(diceIdx) {
    return playedDice[diceIdx].x >= 0 && playedDice[diceIdx].y >= 0;
  }
  function CanShift(x, y) {
    let MinX = gridSize;
    let MaxX = -1;
    let MinY = gridSize;
    let MaxY = -1;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (playedSquares[i][j].idx >= 0) {
          if (i < MinX) {
            MinX = i;
          }
          if (i > MaxX) {
            MaxX = i;
          }
          if (j < MinY) {
            MinY = j;
          }
          if (j > MaxY) {
            MaxY = j;
          }
        }
      }
    }
    return (
      MinX + x >= 0 &&
      MaxX + x < gridSize &&
      MinY + y >= 0 &&
      MaxY + y < gridSize
    );
  }
  function ShiftLetters(x, y) {
    let TmpSquares = JSON.parse(JSON.stringify(DefaultPlayedSquares()));
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (i - x >= 0 && i - x < gridSize && j - y >= 0 && j - y < gridSize) {
          TmpSquares[i][j].idx = playedSquares[i - x][j - y].idx;
          TmpSquares[i][j].val = playedSquares[i - x][j - y].val;
        }
      }
    }
    setPlayedSquares(TmpSquares);
  }
  function CurrentLetters() {
    return (
      <>
        <div className="page-row">
          <LetterButton diceIdx={0}></LetterButton>
          <LetterButton diceIdx={1}></LetterButton>
          <LetterButton diceIdx={2}></LetterButton>
          <LetterButton diceIdx={3}></LetterButton>
          <LetterButton diceIdx={4}></LetterButton>
          <LetterButton diceIdx={5}></LetterButton>
        </div>
        <div className="page-row">
          <LetterButton diceIdx={6}></LetterButton>
          <LetterButton diceIdx={7}></LetterButton>
          <LetterButton diceIdx={8}></LetterButton>
          <LetterButton diceIdx={9}></LetterButton>
          <LetterButton diceIdx={10}></LetterButton>
          <LetterButton diceIdx={11}></LetterButton>
        </div>
        <div className="page-row">
          <button
            disabled={selectedDie < 0}
            onClick={() => {
              setSelectedDie(-1);
            }}
          >
            Clear Selected Letter
          </button>
        </div>
        <div className="page-row">
          <button
            onClick={() => {
              ClearBoard();
            }}
          >
            Clear Letters on Board
          </button>
        </div>
      </>
    );
  }
  function ShiftButtons() {
    return (
      <>
        <div className="page-row">
          <div className="shift-div">
            <button
              disabled={!CanShift(0, -1)}
              onClick={() => {
                ShiftLetters(0, -1);
              }}
            >
              Shift Up
            </button>
          </div>
          <div className="shift-div">
            <button
              disabled={!CanShift(0, 1)}
              onClick={() => {
                ShiftLetters(0, 1);
              }}
            >
              Shift Down
            </button>
          </div>
          <div className="shift-div">
            <button
              disabled={!CanShift(-1, 0)}
              onClick={() => {
                ShiftLetters(-1, 0);
              }}
            >
              Shift Left
            </button>
          </div>
          <div className="shift-div">
            <button
              disabled={!CanShift(1, 0)}
              onClick={() => {
                ShiftLetters(1, 0);
              }}
            >
              Shift Right
            </button>
          </div>
        </div>
      </>
    );
  }
  // TODO: Dynamically create based on grid size.
  function Board() {
    return (
      <>
        <div className="page-row">
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
        </div>
      </>
    );
  }
  return (
    <section>
      <h1>Q-Less</h1>
      <h3>About</h3>
      To practice/learn React, I recreated one of my favorite word games,
      Q-Less. Check out the repository&nbsp;
      <a target="_blank" href="https://github.com/JSchoenbachler/Q-LessReact">
        here.
      </a>
      <br />
      <b>
        DISCLAIMER: I am merely a fan of Q-Less, and do not own it in any way,
        shape or form. If you enjoy the game, please consider purchasing
        it&nbsp;
        <a target="_blank" href="https://qlessgame.com/">
          here.
        </a>
      </b>
      <br />
      <br />
      <h3>Rules</h3>
      <div>
        <ul>
          <li>
            You must use ALL 12 letters to make words that connect. (Like
            Scrabble)
          </li>
          <li>Words must have at least 3 letters.</li>
          <li>No proper nouns.</li>
          <li>No time limit.</li>
          <li>Most rolls are solvable, but not all.</li>
          <li>Caution: Q-Less can be addictive.</li>
        </ul>
      </div>
      <h3>Instructions</h3>
      <div>
        <ul>
          <li>
            Click a letter to select it, then click a spot on the board to place
            it.
          </li>
          <li>
            Click a space on the board without a letter selected to delete that
            letter.
          </li>
          <li>
            The "Shift" buttons will move each letter one square in the selected
            direction. NOTE: Shift buttons are unavailable if the shift would
            move letters off the grid.
          </li>
          <li>
            "New Game" clears the board and re-rolls the dice for a new game.
          </li>
        </ul>
      </div>
      <Board />
      <ShiftButtons />
      <CurrentLetters />
      <Toolbar onStartRestart={() => StartRestartGame()} />
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
      <Button onClick={onStartRestart}>New Game</Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
