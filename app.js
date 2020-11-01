// START ANIMATIONS

document.querySelector('.ni-mid').classList.add('anima');

document.querySelector('.bb').classList.add('bb-laser');

document.querySelector('.sb-2').classList.add('side-laser');
document.querySelector('.sb-1').classList.add('side-laser');

// DOM SELECTORS

const mainContainer = document.getElementById('main-container');
const sticky = document.getElementById('sticky');
const main = document.getElementById('main');
const menuPopOut = document.getElementById('menu-popout');
const sb2 = document.getElementById('sb-2');
const betSlipContainer = document.getElementById('betslip-container');
const openBetsContainer = document.getElementById('open-bets-container');
const straight = document.getElementById('straight');
const parlay = document.getElementById('parlay');
const placeBetsBtn = document.getElementById('place-bets-btn');
const clearBetsBtn = document.getElementById('clear-bets-btn');
const betslipToggle = document.getElementById('betslip-toggle');
const betConfirmation = document.getElementById('bet-confirmation');
const numOfOpenBets = document.getElementById('num-open-bets');
const matchDetailsContainer = document.getElementById(
  'match-details-container'
);
const nflContainer = document.getElementById('nfl-container');
const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel-btn');
const numOfBets = document.getElementById('num-of-bets');
const cashAmount = document.getElementById('cash-amount');
const cost = document.getElementById('cost');
const winnings = document.getElementById('winnings');
const cashWinnings = document.getElementById('cash-winnings');
const messageEl = document.getElementById('message');

// STATE NUMBERS

// MENU CLICK
document.querySelector('.fa-bars').addEventListener('click', menuClick);
document.querySelector('.exit-menu').addEventListener('click', menuClick);
function menuClick() {
  if (!mainContainer.classList.contains('shrink')) {
    mainContainer.classList.remove('grow');
    mainContainer.classList.add('shrink');
    menuPopOut.classList.remove('pop-out-anima');

    menuPopOut.classList.add('pop-in-anima');
  } else {
    menuPopOut.classList.remove('pop-in-anima');
    menuPopOut.classList.add('pop-out-anima');
    mainContainer.classList.remove('shrink');
    mainContainer.classList.add('grow');
  }
}
// MENU ITEM CLICK
// IN ARGUMENT ADD SPORTS TO SHOW IN MAIN CONTAINER
document.querySelectorAll('.mp-item').forEach(i => {
  i.addEventListener('click', mpItemSelect);
});
function mpItemSelect() {
  menuClick();
}

// BETSLIP CLICK
document.getElementById('betslip').addEventListener('click', () => {
  if (
    !betSlipContainer.classList.contains('bs-slide-in') &&
    !openBetsContainer.classList.contains('open-bets-slide-in')
  ) {
    betSlipContainer.classList.remove('bs-slide-out');
    betSlipContainer.classList.add('bs-slide-in');
  }
  if (
    !betSlipContainer.classList.contains('bs-slide-in') &&
    openBetsContainer.classList.contains('open-bets-slide-in')
  ) {
    openBetsContainer.classList.remove('open-bets-slide-in');
    openBetsContainer.classList.add('open-bets-slide-out');
    setTimeout(() => {
      betSlipContainer.classList.remove('bs-slide-out');
      betSlipContainer.classList.add('bs-slide-in');
    }, 350);
  }
});
document.getElementById('exit-betslip').addEventListener('click', () => {
  betSlipContainer.classList.remove('bs-slide-in');
  betSlipContainer.classList.add('bs-slide-out');
});

// BET TYPE CLICK
straight.addEventListener('click', () => {
  if (parlay.classList.contains('selected')) {
    parlay.classList.remove('selected');
    straight.classList.add('selected');
  }
  typeOfBet = 'straight';
  updateWinnings();
});
parlay.addEventListener('click', () => {
  if (straight.classList.contains('selected')) {
    straight.classList.remove('selected');
    parlay.classList.add('selected');
  }
  typeOfBet = 'parlay';
  updateWinnings();
});

// CANCEL BET
cancelBtn.addEventListener('click', () => {
  betSlipContainer.classList.remove('bs-slide-in');
  betSlipContainer.classList.add('bs-slide-out');
  cancelBet(500);
});

// CONFIRM BET
confirmBtn.addEventListener('click', () => {
  document.getElementById('confirm-icon').classList.add('confirmed');
  numOfBets.classList.add('transfer');
  betsSelected.map(i => openBets.push(i));
  betsSelected.map(i => openBetStorage.push(i));
  betsSelected = [];
  setTimeout(() => {
    numOfBets.classList.remove('transfer');
    numOfBets.style.display = 'none';
    betSlipContainer.classList.remove('bs-slide-in');
    betSlipContainer.classList.add('bs-slide-out');
    document.getElementById('confirm-icon').classList.remove('confirmed');
    openBetsNum += openBets.length;
    numOfOpenBets.innerText = openBetsNum;
    addOpenBetHTML();
    cancelBet(0);
    winningsState = 0;
    if ((numOfOpenBets.style.display = 'none')) {
      numOfOpenBets.style.display = 'block';
    }
  }, 1000);
  console.log(openBetStorage);
  updateWinnings();
});

// CLEAR BETSLIP
clearBetsBtn.addEventListener('click', () => {
  cancelBet(0);
});

placeBetsBtn.addEventListener('click', () => {
  let proceed = true;
  betsSelected.map(i => {
    if (i.amount === 0) {
      proceed = false;
    }
  });
  if (costState > 0 && proceed) {
    betslipToggle.style.display = 'none';
    betConfirmation.style.display = 'block';
  } else {
    message('No amount has been placed on some bet/bets!');
  }
});

// OPEN BETS CLICK

document.getElementById('open-bets').addEventListener('click', () => {
  if (
    !openBetsContainer.classList.contains('open-bets-slide-in') &&
    !betSlipContainer.classList.contains('bs-slide-in')
  ) {
    openBetsContainer.classList.remove('open-bets-slide-out');
    openBetsContainer.classList.add('open-bets-slide-in');
  }
  if (
    !openBetsContainer.classList.contains('open-bets-slide-in') &&
    betSlipContainer.classList.contains('bs-slide-in')
  ) {
    betSlipContainer.classList.remove('bs-slide-in');
    betSlipContainer.classList.add('bs-slide-out');
    setTimeout(() => {
      openBetsContainer.classList.remove('open-bets-slide-out');
      openBetsContainer.classList.add('open-bets-slide-in');
    }, 350);
  }
});
document.getElementById('exit-open-bets').addEventListener('click', () => {
  openBetsContainer.classList.remove('open-bets-slide-in');
  openBetsContainer.classList.add('open-bets-slide-out');
});

// GET NFL DATA FROM JSON
fetch('./data/nfl.json')
  .then(response => response.json())
  .then(data =>
    data.map(game => {
      nflContainer.innerHTML += `
      <div class='date-time'>
      ${game.date.date} ${game.date.time}
      </div>
      <div class="nfl-game" id='nfl-game'>
      <div class="pholder">
        <div class="empty"></div>
        <div class="moneyline-pholder">Money</div>
        <div class="spread-pholder">Spread</div>
        <div class="total-pholder">Total</div>
      </div>
      <div class="team-1">
        <div class="nfl-team-name">${game.away.name}</div>
        <div class="money">${game.away.moneyline}</div>
        <div class="spread">${game.away.spread}</div>
        <div class="total">${game.away.total.slice(5)}</div>
      </div>
      <div class="team-2">
        <div class="nfl-team-name">${game.home.name}</div>
        <div class="money">${game.home.moneyline}</div>
        <div class="spread">${game.home.spread}</div>
        <div class="total">${game.home.total.slice(5)}</div>
      </div>
    </div>
      `;
    })
  );

// BET SLIP STATE
let openBets = [];
let openBetsNum = 0;
let nflGames;
let betsSelected = [];
let numberOfBets = 0;
let costState = 0;
let winningsState = 0;
let typeOfBet = 'straight';
let inner = ``;
let openBetStorage = [];

// BET EVENT FUNCTION
function betEventFunc(e) {
  if (e.target.parentNode.classList[0] === 'team-1') {
    let betSelect = {
      id: betsSelected.length,
      field: 'away',
      betType: e.target.classList,
      odds: e.target.innerText,
      selectedTeam: e.target,
      selectedTeamName: e.target.parentNode.children[0].innerText,
      oponentName:
        e.target.parentNode.nextSibling.nextSibling.children[0].innerText,
      amount: 0,
      winnings: 0
    };

    if (betsSelected.length < 10) {
      betsSelected.push(betSelect);
      matchDetailsContainer.innerHTML += `
      <div class="match-details" id=${betsSelected.length}>
      <div class="match-details-odds dark">
      <span class='remove-bet' id='remove-bet'><i class='fas fa-minus' id=${betsSelected.length -
        1}></i></span>
      ${betSelect.selectedTeamName} ${betSelect.odds}
      <label class='bet-label' for='#single-bet'>amount</label>
      <input type="number" name='single-bet' id="single-bet" class='single-bet' min='1' max='500' value=${
        betsSelected.value
      } placeholder=0>
      </div>
      </div>
      `;
      numberOfBets++;
      numOfBets.innerText = numberOfBets;
      numOfBets.style.display = 'block';
      numOfBets.classList.add('bet-num-animation');
      document.querySelectorAll('#single-bet').forEach(i => {
        i.addEventListener('change', e => {
          if (betsSelected.length > 1) {
            betsSelected[e.target.parentNode.parentNode.id - 1].amount =
              e.target.value;
            updateBetAmount();
            updateWinnings();
          } else {
            betsSelected[0].amount = e.target.value;
            updateBetAmount();
            updateWinnings();
          }
        });
      });
      setTimeout(() => {
        numOfBets.classList.remove('bet-num-animation');
      }, 350);
      let removeBetIcons = document.querySelectorAll('.remove-bet');
      removeBetIcons.forEach(i => {
        i.addEventListener('click', e => {
          removeBetNum(e.target.id);
        });
      });
      updateInput();
    } else {
      message('10 Bet max per slip');
    }
  } else {
    let betSelect = {
      id: betsSelected.length,
      field: 'home',
      betType: e.target.classList,
      odds: e.target.innerText,
      selectedTeam: e.target,
      selectedTeamName: e.target.parentNode.children[0].innerText,
      oponentName:
        e.target.parentNode.previousSibling.previousSibling.children[0]
          .innerText,
      amount: 0,
      winnings: 0
    };
    if (betsSelected.length < 10) {
      betsSelected.push(betSelect);
      matchDetailsContainer.innerHTML += `
      <div class="match-details" id=${betsSelected.length}>
      <div class="match-details-odds dark">
      <span class='remove-bet' id='remove-bet'><i class='fas fa-minus' id=${betsSelected.length -
        1}></i></span>
      ${betSelect.selectedTeamName} ${betSelect.odds}
      <label class='bet-label' for='#single-bet'>amount</label>
      <input type="number" name='single-bet' id="single-bet" class='single-bet' min='1' max='500' value=${
        betsSelected.amount
      } placeholder=0>
      </div>
      </div>
      `;
      numberOfBets++;
      numOfBets.innerText = numberOfBets;
      numOfBets.style.display = 'block';
      numOfBets.classList.add('bet-num-animation');
      setTimeout(() => {
        numOfBets.classList.remove('bet-num-animation');
      }, 350);

      document.querySelectorAll('#single-bet').forEach(i => {
        i.addEventListener('change', e => {
          if (betsSelected.length > 1) {
            if (e.target.value !== '') {
              betsSelected[e.target.parentNode.parentNode.id - 1].amount =
                e.target.value;
              updateBetAmount();
              updateWinnings();
            }
          } else {
            betsSelected[0].amount = e.target.value;
            updateBetAmount();
            updateWinnings();
          }
        });
      });

      let removeBetIcons = document.querySelectorAll('.remove-bet');
      removeBetIcons.forEach(i => {
        i.addEventListener('click', e => {
          removeBetNum(e.target.id);
        });
      });
      updateInput();
    } else {
      message('10 Bet max per slip');
    }
  }

  // UPDATE INPUT VALUE HTML
}

setTimeout(() => {
  document.querySelectorAll('.money').forEach(i => {
    i.addEventListener('click', betEventFunc);
  });
}, 200);

setTimeout(() => {
  document.querySelectorAll('.spread').forEach(i => {
    i.addEventListener('click', betEventFunc);
  });
}, 200);

setTimeout(() => {
  document.querySelectorAll('.total').forEach(i => {
    i.addEventListener('click', betEventFunc);
  });
}, 200);

setTimeout(() => {
  console.log(betsSelected);
}, 10000);

// REMOVE BET FNUCTION

function removeBetNum(r) {
  let addOneToR = parseInt(r) + 1;
  let stringR = addOneToR.toString();
  matchDetailsContainer.childNodes.forEach(i => {
    if (i.id === stringR) {
      i.remove();
    }
  });
  betsSelected.map((i, index) => {
    if (parseInt(r) === i.id) {
      betsSelected.splice(index, 1);
    }
  });
  numberOfBets--;
  numOfBets.innerText = numberOfBets;
  numOfBets.classList.add('bet-num-animation');
  setTimeout(() => {
    numOfBets.classList.remove('bet-num-animation');
  }, 350);
  if (numberOfBets === 0) {
    setTimeout(() => {
      numOfBets.style.display = 'none';
    }, 1000);
  }
  updateBetAmount();
  updateWinnings();
}

// UPDATE BET AMOUNT

function updateWinnings() {
  if (winnings.innerText === '$NaN.00') {
    winnings.innerText = '$0.00';
  }
  if (typeOfBet === 'straight') {
    let allWinnings = [];
    betsSelected.map(i => {
      if (i.betType.value === 'money') {
        let line;
        if (i.odds[0] === '+') {
          line = parseInt(i.odds.slice(1)) / 100;
          let betFave = parseFloat(line * i.amount).toFixed(2);
          let add = parseFloat(betFave) + parseFloat(i.amount);
          i.winnings = add;
          allWinnings.push(add);
        } else {
          line = 100 / parseInt(i.odds.slice(1));
          let betFave = parseFloat(line * i.amount).toFixed(2);
          let add = parseFloat(betFave) + parseFloat(i.amount);
          allWinnings.push(add);
          i.winnings = add;
        }
      } else {
        allWinnings.push(parseFloat((i.amount * 2).toFixed(2)));
        i.winnings = parseFloat((i.amount * 2).toFixed(2));
      }
    });
    if (betsSelected.length > 0) {
      winningsState = allWinnings.reduce((acc, curr) => acc + curr).toFixed(2);
      winnings.innerText = `Winnings - $${winningsState}`;
    } else {
      winnings.innerText = `Winnings - $0.00`;
    }
  } else {
    let allWinnings = [];
    betsSelected.map(i => {
      if (i.betType.value === 'money') {
        let line;
        if (i.odds[0] === '+') {
          line = parseInt(i.odds.slice(1)) / 100;
          let betFave = parseFloat(line * i.amount).toFixed(2);
          let add = parseFloat(betFave) + parseFloat(i.amount);
          i.winnings = add;
          allWinnings.push(add);
        } else {
          line = 100 / parseInt(i.odds.slice(1));
          let betFave = parseFloat(line * i.amount).toFixed(2);
          let add = parseFloat(betFave) + parseFloat(i.amount);
          allWinnings.push(add);
          i.winnings = add;
        }
      } else {
        allWinnings.push(parseFloat((i.amount * 2).toFixed(2)));
        i.winnings = parseFloat((i.amount * 2).toFixed(2));
      }
    });
    if (betsSelected.length > 0) {
      winningsState = allWinnings.reduce((acc, curr) => acc + curr).toFixed(2);
      winnings.innerText = `Winnings - $${winningsState}`;
    } else {
      winnings.innerText = `Winnings - $0.00`;
    }
  }
}

function updateBetAmount() {
  let newAmount = 0;
  betsSelected.map(i => {
    newAmount += parseInt(i.amount);
  });
  if (newAmount > -1) {
    cashAmount.innerText = `$${newAmount}.00`;
  }
  if (cashAmount.innerText === '$NaN.00') {
    cashAmount.innerText = '$0.00';
  }
  const allAmounts = [];
  betsSelected.map(i => allAmounts.push(parseInt(i.amount)));
  if (betsSelected.length > 0) {
    costState = allAmounts.reduce((acc, curr) => acc + curr);
  }
}

function updateInput() {
  betsSelected.map((i, index) => {
    matchDetailsContainer.children[index].childNodes[1].children[2].value =
      betsSelected[index].amount;
  });
}

// CANCEL BETS
function cancelBet(time) {
  numberOfBets = 0;
  numOfBets.innerText = numberOfBets;
  setTimeout(() => {
    betslipToggle.style.display = 'block';
    betConfirmation.style.display = 'none';
    betsSelected = [];
    matchDetailsContainer.innerHTML = '';
  }, time);
  numOfBets.style.display = 'none';
  cashAmount.innerText = '$0.00';
}

// MESSAGE/ERROR FUNC
function message(msg) {
  messageEl.innerText = msg;
  messageEl.classList.add('show');
  setTimeout(() => {
    messageEl.classList.remove('show');
  }, 3000);
}

// ADD OPEN BET HTML
function addOpenBetHTML() {
  let subBetType;
  if (typeOfBet === 'straight') {
    subBetType = 'S';
    typeColor = 'rgb(119, 177, 145)';
    openBets.map(i => {
      if (i.field === 'home') {
        document.getElementById('ob-grid-games').innerHTML += `
          <div class="ob-grid-game">
          <div class="ob-game dark">
          ${i.oponentName}
           @ <span class="ob-pick">${i.selectedTeamName} </span>
            <span class="ob-bet-type s" id='ob-bet-type'>(${subBetType})</span>
          </div>
          <div class="ob-odds dark">${i.odds}</div>
          <div class="ob-cost dark">$${i.amount}</div>
          <div class="ob-winnings dark">$${i.winnings.toFixed(2)}</div>
        </div>
          `;
      } else {
        document.getElementById('ob-grid-games').innerHTML += `
          <div class="ob-grid-game">
          <div class="ob-game dark">
            <span class="ob-pick">${i.selectedTeamName}</span> @ ${
          i.oponentName
        }
            <span class="ob-bet-type s" id='ob-bet-type'>(${subBetType})</span>
          </div>
          <div class="ob-odds dark">${i.odds}</div>
          <div class="ob-cost dark">$${i.amount}</div>
          <div class="ob-winnings dark">$${i.winnings.toFixed(2)}</div>
        </div>
          `;
      }
    });
    // document
    //   .querySelectorAll('.ob-bet-type')
    //   .forEach(i => (i.style.color = typeColor));
    openBets = [];
  } else {
    subBetType = 'P';
    openBets.map(i => {
      if (i.field === 'home') {
        document.getElementById('ob-grid-games').innerHTML += `
        <div class="ob-grid-game">
        <div class="ob-game dark">
        ${i.selectedTeamName} @ <span class="ob-pick">${i.oponentName} </span>
          <span class="ob-bet-type p" id='ob-bet-type'>(${subBetType})</span>
        </div>
        <div class="ob-odds dark">${i.odds}</div>
        <div class="ob-cost dark">$${i.amount}</div>
        <div class="ob-winnings dark">$${winningsState}</div>
      </div>
        `;
      } else {
        document.getElementById('ob-grid-games').innerHTML += `
        <div class="ob-grid-game">
        <div class="ob-game dark">
          ${i.selectedTeamName} @ <span class="ob-pick">${i.oponentName}</span>
          <span class="ob-bet-type p" id='ob-bet-type'>(${subBetType})</span>
        </div>
        <div class="ob-odds dark">${i.odds}</div>
        <div class="ob-cost dark">$${i.amount}</div>
        <div class="ob-winnings dark">$${winningsState}</div>
      </div>
        `;
      }
    });
    openBets = [];
  }
}

// LOGIN / SIGN UP / CREATE ACCOUNT / LS?

// BETSLIP TOGGLE DISPLAY NONE

// GET PARLAY MATH
