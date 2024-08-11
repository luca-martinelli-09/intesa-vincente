const socket = io();

const remainTimeStatus = document.getElementById("remaintime");
const playStatus = document.getElementById("playIcon");
const scoreStatus = document.getElementById("totalscore");
const wordStatus = document.getElementById("word");
const passHearts = document.getElementsByClassName("pass-icon");
const doublePoints = document.getElementsByClassName("double-icon");

const playButton = document.getElementById("play");
const addPointButton = document.getElementById("addpoint");
const removePointButton = document.getElementById("removepoint");
const passButton = document.getElementById("pass");
const doubleButton = document.getElementById("double");
const resetButton = document.getElementById("reset");

let remainTime = DEFAULT_TIME;
let totalScore = DEFAULT_SCORE;
let remainPasses = passHearts.length;
let remainDoubles = doublePoints.length;
let currentWord = DEFAULT_WORD;
let currentWordPoints = 1;

let timer;
let timerGoing = false;
let canPerformActions = false;

function setRemainTime(time) {
  remainTime = time >= 0 ? (time <= DEFAULT_TIME ? time : DEFAULT_TIME) : 0;
}

function setScore(score) {
  totalScore = score >= 0 ? score : 0;
}

function setPasses(passes) {
  remainPasses =
    passes >= 0
      ? passes <= passHearts.length
        ? passes
        : passHearts.length
      : 0;
}

function setDoubles(doubles) {
  remainDoubles =
    doubles >= 0
      ? doubles <= doublePoints.length
        ? doubles
        : doublePoints.length
      : 0;
}

function startTimer() {
  playStatus.setAttribute("name", "pause-outline");
  timerGoing = true;
  canPerformActions = true;
  timer = setInterval(function () {
    setRemainTime(remainTime - 1);
    remainTimeStatus.innerText = remainTime;
    if (remainTime <= 0) {
      updateStatus("stopGame", null, true);
    }
  }, 1000);
}

function stopTimer() {
  playStatus.setAttribute("name", "play-outline");
  timerGoing = false;
  clearInterval(timer);
}

function updatePasses(numPass) {
  for (let i = 0; i < passHearts.length; i++) {
    const heartIcon = passHearts[i];
    if (i < numPass) {
      heartIcon.setAttribute("name", "heart");
    } else {
      heartIcon.setAttribute("name", "heart-outline");
    }
  }
}

function updateDoubles(numDoubles) {
  for (let i = 0; i < doublePoints.length; i++) {
    const doubleIcon = doublePoints[i];
    if (i < numDoubles) {
      doubleIcon.setAttribute("name", "sparkles");
    } else {
      doubleIcon.setAttribute("name", "sparkles-outline");
    }
  }
}

function play(double = false) {
  if (remainTime > 0) {
    let wordWeight = 1;

    if (double) {
      wordWeight = 2;
      setDoubles(remainDoubles - 1);
      updateDoubles(remainDoubles);
    }

    const word = randomWord(wordWeight);
    updateStatus(
      "newWord",
      { word: word, weight: wordWeight, remainDoubles: remainDoubles },
      true,
    );
  }
}

socket.emit("getGameStatus", GAME_ID);

socket.on("getGameStatus", () => {
  stopTimer();
  canPerformActions = false;
  socket.emit("setGameStatus", GAME_ID, {
    remainTime: remainTime,
    totalScore: totalScore,
    remainPasses: remainPasses,
    remainDoubles: remainDoubles,
    currentWord: currentWord,
    displayedWords: displayedWords,
  });
});

socket.on("setGameStatus", (data) => {
  if (data) {
    canPerformActions = false;

    setRemainTime(data.remainTime);
    setScore(data.totalScore);
    setPasses(data.remainPasses);
    setDoubles(data.remainDoubles);
    currentWord = data.currentWord;
    displayedWords = data.displayedWords;

    wordStatus.innerText = currentWord;
    remainTimeStatus.innerText = remainTime;
    scoreStatus.innerText = totalScore;
    updatePasses(remainPasses);
    updateDoubles(remainDoubles);
  }
});

socket.on("updateStatus", updateStatus);

playButton.addEventListener("click", () => {
  if (!timerGoing) {
    play();
  } else {
    updateStatus("stopGame", null, true);
  }
});

addPointButton.addEventListener("click", () => {
  updateStatus("addPoint", null, true);
});

removePointButton.addEventListener("click", () => {
  updateStatus("removePoint", null, true);
});

passButton.addEventListener("click", () => {
  updateStatus("passWord", null, true);
});

resetButton.addEventListener("click", () => {
  updateStatus("resetGame", null, true);
});

doubleButton.addEventListener("click", () => {
  if (remainDoubles > 0 && !timerGoing) play(true);
});

function updateStatus(command, data = null, emit = false) {
  if (command == "newWord") {
    displayedWords.push(data.word);
    currentWord = data.word;
    currentWordPoints = data.weight;
    wordStatus.innerText = data.word;

    setDoubles(data.remainDoubles);
    updateDoubles(remainDoubles);

    startTimer();
  }

  if (command == "stopGame") {
    stopTimer();
  }

  if (command == "addPoint") {
    if (canPerformActions) {
      stopTimer();
      setScore(totalScore + currentWordPoints);
      scoreStatus.innerText = totalScore;
    }
    canPerformActions = false;
  }

  if (command == "removePoint") {
    if (canPerformActions) {
      stopTimer();
      setScore(totalScore - currentWordPoints);
      scoreStatus.innerText = totalScore;
    }
    canPerformActions = false;
  }

  if (command == "passWord") {
    if (canPerformActions) {
      stopTimer();
      if (remainPasses > 0) {
        setPasses(remainPasses - 1);
        updatePasses(remainPasses);
      } else {
        updateStatus("removePoint");
      }
    }
    canPerformActions = false;
  }

  if (command == "resetGame") {
    stopTimer();

    setRemainTime(DEFAULT_TIME);
    setScore(DEFAULT_SCORE);
    currentWord = DEFAULT_WORD;
    setPasses(passHearts.length);
    setDoubles(doublePoints.length);
    canPerformActions = false;
    displayedWords = [];

    wordStatus.innerText = currentWord;
    remainTimeStatus.innerText = remainTime;
    scoreStatus.innerText = totalScore;
    updatePasses(remainPasses);
    updateDoubles(remainDoubles);
  }

  if (emit) {
    socket.emit("updateStatus", GAME_ID, command, data);
  }
}
