const getRandomMove = () => {
    const moves = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  };
  
  const getOutcome = (moveOne, moveTwo) => {

    if (moveOne === moveTwo) {
      return "It's a draw!";
    }
 
    const beats = {
      "scissors": "paper",
      "rock": "scissors",
      "paper": "rock"
    }

    return  beats[moveOne] === moveTwo ? "Player One wins!" : "Player Two wins!";
  };
  
  // Removing elements (nodes) from the DOM
  const resetGame = () => {
    if (document.getElementById("outcome")) {
      const outcome = document.body.lastChild;
      document.body.removeChild(outcome);
    }
  };
  
  const playGame = () => {
    resetGame();
    const playerOneMove = getRandomMove();
    const playerTwoMove = getRandomMove();
    const outcome = getOutcome(playerOneMove, playerTwoMove);
    updateDOM(playerOneMove, playerTwoMove, outcome);
  };
  
  function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const updateDOM = async (moveOne, moveTwo, outcome) => {
    
    const moveLookup = {
      "scissors": "./images/scissors.png",
      "rock": "./images/rock.png",
      "paper": "./images/paper.png"
    };

    document.getElementById("player-one-move__img").src = moveLookup[moveOne];
    document.getElementById("player-one-move__name").innerHTML = moveOne;

    document.getElementById("player-two-move__img").src = moveLookup[moveTwo];
    document.getElementById("player-two-move__name").innerHTML = moveTwo;

    const result = getOutcome(moveOne, moveTwo);
    document.getElementById("match-results").innerHTML = result;

    if (result !== "It's a draw!" ) {
      if (result === "Player One wins!"){
        document.getElementById("player-one-move").style.animation = "";
        await sleep(0);
        document.getElementById("player-one-move").style.borderColor = "green";
        document.getElementById("player-two-move").style.borderColor = "red";
        document.getElementById("player-one-move").style.animation = "bulge 1s ease";
        document.getElementById("player-two-move").style.animation = "";
      }
      else {
        document.getElementById("player-two-move").style.animation = "";
        await sleep(0);
        document.getElementById("player-two-move").style.animation = "bulge 1s ease";
        document.getElementById("player-one-move").style.animation = "s";
        document.getElementById("player-two-move").style.borderColor = "green";
        document.getElementById("player-one-move").style.borderColor = "red";
      }
    } else {
      document.getElementById("player-one-move").style.borderColor = "yellow";
      document.getElementById("player-two-move").style.borderColor = "yellow";
      document.getElementById("player-one-move").style.animation = "";
      document.getElementById("player-two-move").style.animation = "";
    }

  };
  
  const playButton = document.getElementById("play-btn");
  playButton.addEventListener("click", playGame);
  