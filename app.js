document.querySelector('.ni-mid').classList.add('anima');

document.querySelector('.bb').classList.add('bb-laser');

document.querySelector('.sb-2').classList.add('side-laser');
document.querySelector('.sb-1').classList.add('side-laser');

// DOM SELECTORS

import { loggedIn } from './forms.js';
import { signedUp } from './forms.js';
import { signUpUsername } from './forms.js';
import { signUpPass } from './forms.js';
console.log(signedUp);
let money;
// import { money } from './forms.js';

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
const nbaContainer = document.getElementById('nba-container');
const ufcContainer = document.getElementById('ufc-container');
const mlbContainer = document.getElementById('mlb-container');
const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel-btn');
const numOfBets = document.getElementById('num-of-bets');
const cashAmount = document.getElementById('cash-amount');
const cost = document.getElementById('cost');
const winnings = document.getElementById('winnings');
const cashWinnings = document.getElementById('cash-winnings');
const messageEl = document.getElementById('message');
const chooseBetType = document.getElementById('choose-bet-type');
const changeType = document.getElementById('change-type');
const parlayInput = document.getElementById('parlay-input');
const niAccount = document.getElementById('ni-account');

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
function mpItemSelect(e) {
  let target = e.target.id.slice(0, 3);
  target === 'nfl'
    ? filterSportFunc(nbaContainer, ufcContainer, mlbContainer, nflContainer)
    : null;
  target === 'nba'
    ? filterSportFunc(nflContainer, ufcContainer, mlbContainer, nbaContainer)
    : null;
  target === 'ufc'
    ? filterSportFunc(nbaContainer, nflContainer, mlbContainer, ufcContainer)
    : null;
  target === 'mlb'
    ? filterSportFunc(nbaContainer, ufcContainer, nflContainer, mlbContainer)
    : null;
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
  setTimeout(() => {
    chooseBetType.style.display = 'block';
  }, 500);
});

// CONFIRM BET
confirmBtn.addEventListener('click', () => {
  document.getElementById('confirm-icon').classList.add('confirmed');
  numOfBets.classList.add('transfer');
  betsSelected.map(i => openBets.push(i));
  betsSelected.map(i => openBetStorage.push(i));
  if (typeOfBet === 'parlay') {
    console.log(openBets);
    console.log(winningsState);
    openBets.map(i => {
      i.winnings = parseFloat(winningsState);
    });
  }
  betsSelected = [];
  setTimeout(() => {
    numOfBets.classList.remove('transfer');
    numOfBets.style.display = 'none';
    betSlipContainer.classList.remove('bs-slide-in');
    betSlipContainer.classList.add('bs-slide-out');
    document.getElementById('confirm-icon').classList.remove('confirmed');
    openBetsNum += openBets.length;
    numOfOpenBets.innerText = JSON.parse(
      localStorage.getItem('open bets')
    ).length;
    addOpenBetHTML();
    cancelBet(0);
    winningsState = 0;
    unChanged = true;
    if ((numOfOpenBets.style.display = 'none')) {
      numOfOpenBets.style.display = 'block';
    }
  }, 1000);
  setTimeout(() => {
    chooseBetType.style.display = 'block';
    typeOfBet = 'straight';
  }, 1500);
  updateWinnings();
  updateFunds();
  localStorage.setItem('open bets', JSON.stringify(openBetStorage));
  console.log(openBets);
  console.log(openBetStorage);
});

// CLEAR BETSLIP
clearBetsBtn.addEventListener('click', () => {
  cancelBet(0);
});

placeBetsBtn.addEventListener('click', () => {
  let proceed = true;
  let msg = '';
  if (!loggedIn) {
    proceed = false;
    msg = 'must be signed in to place a bet!';
  }
  if (betsSelected.length === 0) {
    proceed = false;
    msg = 'No bets have been added!';
  }
  betsSelected.map(i => {
    if (i.amount === 0) {
      proceed = false;
      msg = 'No amount has been placed on some bet/bets!';
    }
  });
  if (parseFloat(localStorage.getItem('money')) < parseFloat(costState)) {
    proceed = false;
    msg = 'insufficient funds!';
  }
  console.log(costState);

  if (costState > 0 && proceed) {
    betslipToggle.style.display = 'none';
    betConfirmation.style.display = 'block';
  } else {
    message(msg);
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

// GET TEAM SPORT DATA
fetchTeamSportData('nfl', nflContainer);
fetchTeamSportData('nba', nbaContainer);
fetchTeamSportData('ufc', ufcContainer);
fetchTeamSportData('mlb', mlbContainer);

function fetchTeamSportData(sport, cont) {
  fetch(`./data/${sport}.json`)
    .then(response => response.json())
    .then(data =>
      data.map(game => {
        if (data !== []) {
          cont.innerHTML += `
        <div class='date-time'>
        ${game.date.date} ${game.date.time}
        </div>
        <div class="nfl-game" id='nfl-game'>
        <div class="pholder">
          <div class="empty"></div>
          <div class="moneyline-pholder">Money</div>
          <div class="spread-pholder">Spread</div>
          <class="total-pholder">Total</>
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
          document.getElementById(`no-matches-${sport}`).style.display = 'none';
        }
      })
    );
}

// BET SLIP STATE
let openBets = [];
let openBetsNum = 0;
let nflGames;
let betsSelected = [];
let numberOfBets = 0;
let costState = 0;
let winningsState = 0;
let parlayAmount = 0;
let typeOfBet = 'straight';
let inner = ``;
let openBetStorage = [];

// BET EVENT FUNCTION
function betEventFunc(e) {
  if (e.target.parentNode.classList[0] === 'team-1') {
    console.log(typeOfBet);
    let betSelect = {
      id: betsSelected.length,
      field: 'away',
      betType: e.target.classList,
      parlayOrStraight: typeOfBet,
      odds: e.target.innerText,
      selectedTeam: e.target,
      selectedTeamName: e.target.parentNode.children[0].innerText,
      oponentName:
        e.target.parentNode.nextSibling.nextSibling.children[0].innerText,
      amount: 0,
      winnings: 0
    };

    if (betsSelected.length < 10) {
      if (typeOfBet === 'straight') {
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
      }
      if (typeOfBet === 'parlay') {
        betsSelected.push(betSelect);
        matchDetailsContainer.innerHTML += `
        <div class="match-details" id=${betsSelected.length}>
        <div class="match-details-odds dark">
        <span class='remove-bet' id='remove-bet'><i class='fas fa-minus' id=${betsSelected.length -
          1}></i></span>
        ${betSelect.selectedTeamName} ${betSelect.odds}
        </div>
        </div>
        `;
        numberOfBets++;
        numOfBets.innerText = numberOfBets;
        numOfBets.style.display = 'block';
        numOfBets.classList.add('bet-num-animation');
        parlayInput.style.display = 'block';
        updateWinnings();

        setTimeout(() => {
          numOfBets.classList.remove('bet-num-animation');
        }, 350);
        let removeBetIcons = document.querySelectorAll('.remove-bet');
        removeBetIcons.forEach(i => {
          i.addEventListener('click', e => {
            removeBetNum(e.target.id);
          });
        });
      }
    } else {
      message('10 Bet max per slip');
    }
  } else {
    console.log(typeOfBet);
    let betSelect = {
      id: betsSelected.length,
      field: 'home',
      betType: e.target.classList,
      parlayOrStraight: typeOfBet,
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
      if (typeOfBet === 'straight') {
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
      }
      if (typeOfBet === 'parlay') {
        betsSelected.push(betSelect);
        matchDetailsContainer.innerHTML += `
        <div class="match-details" id=${betsSelected.length}>
        <div class="match-details-odds dark">
        <span class='remove-bet' id='remove-bet'><i class='fas fa-minus' id=${betsSelected.length -
          1}></i></span>
        ${betSelect.selectedTeamName} ${betSelect.odds}
        </div>
        </div>
        `;
        numberOfBets++;
        numOfBets.innerText = numberOfBets;
        numOfBets.style.display = 'block';
        numOfBets.classList.add('bet-num-animation');
        parlayInput.style.display = 'block';
        updateWinnings();
        setTimeout(() => {
          numOfBets.classList.remove('bet-num-animation');
        }, 350);
        let removeBetIcons = document.querySelectorAll('.remove-bet');
        removeBetIcons.forEach(i => {
          i.addEventListener('click', e => {
            removeBetNum(e.target.id);
          });
        });
      }
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
    parlayInput.style.display = 'none';
    cashAmount.innerText = `$0.00`;
    setTimeout(() => {
      numOfBets.style.display = 'none';
    }, 1000);
  }
  if (typeOfBet === 'straight') {
    updateBetAmount();
  }
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
      cashWinnings.innerText = `${winningsState}`;
    } else {
      cashWinnings.innerText = `$0.00`;
    }
  } else {
    let allWinnings = [];
    betsSelected.map(i => {
      if (i.betType.value === 'money') {
        let line;
        if (i.odds[0] === '+') {
          i.amount = costState;
          line = parseInt(i.odds.slice(1)) / 100;
          let betFave = parseFloat(line * i.amount).toFixed(2);
          let add = parseFloat(betFave) + parseFloat(i.amount);
          i.winnings = add;
          allWinnings.push(add);
        } else {
          i.amount = costState;
          line = 100 / parseInt(i.odds.slice(1));
          let betFave = parseFloat(line * i.amount).toFixed(2);
          let add = parseFloat(betFave) + parseFloat(i.amount);
          allWinnings.push(add);
          i.winnings = add;
        }
      } else {
        i.amount = costState;
        allWinnings.push(parseFloat((i.amount * 2).toFixed(2)));
        i.winnings = parseFloat((i.amount * 2).toFixed(2));
      }
    });
    if (betsSelected.length > 0) {
      winningsState = allWinnings.reduce((acc, curr) => acc + curr).toFixed(2);
      cashWinnings.innerText = `$${winningsState}`;
    } else {
      cashWinnings.innerText = `$0.00`;
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

function updateFunds() {
  money = parseFloat(localStorage.getItem('money')).toFixed(2);
  let newFunds = parseFloat(money - costState);
  document.getElementById('funds').innerText = `$${parseFloat(newFunds).toFixed(
    2
  )}`;
  localStorage.setItem('money', parseFloat(newFunds));
  money = parseFloat(localStorage.getItem('money')).toFixed(2);
  console.log(costState);
  console.log(money);
  console.log(newFunds);
  console.log(localStorage);
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
  cashWinnings.innerText = `$0.00`;
  document.getElementById('parlay-amount').value = 0;
  parlayInput.style.display = 'none';
  costState = 0;
  updateWinnings();
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
  document.getElementById('ob-grid-games').style.display = 'block';
  let subBetType;
  if (typeOfBet === 'straight') {
    subBetType = 'S';
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
    openBets = [];
  } else {
    subBetType = 'P';
    openBets.map(i => {
      if (i.field === 'home') {
        document.getElementById('ob-grid-games').innerHTML += `
        <div class="ob-grid-game">
        <div class="ob-game dark">
        ${i.oponentName} @ <span class="ob-pick">${i.selectedTeamName} </span>
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
        <span class="ob-pick">${i.selectedTeamName}</span> @ ${i.oponentName}
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

// WHEN CHOOSING BET TYPE - IF PARLAY/REMOVE INPUT FROM EACH GAME

let unChanged = true;

document.getElementById('choose-straight').addEventListener('click', () => {
  chooseBetType.style.display = 'none';
  typeOfBet = 'straight';
  straight.classList.add('selected');
  parlay.classList.remove('selected');
  betslipToggle.style.display = 'block';
  unChanged = false;
});
document.getElementById('choose-parlay').addEventListener('click', () => {
  chooseBetType.style.display = 'none';
  typeOfBet = 'parlay';
  straight.classList.remove('selected');
  parlay.classList.add('selected');
  if (betsSelected.length > 0) {
    parlayInput.style.display = 'block';
  }
  if (!unChanged) {
    removeInp();
  }
  if (betsSelected.length > 0 && unChanged) {
    removeSingleBetInputs();
    betsSelected.map(i => {
      i.parlayOrStraight = 'parlay';
    });
  }
  unChanged = false;
  betslipToggle.style.display = 'block';
});

function removeSingleBetInputs() {
  document.querySelectorAll('.match-details-odds').forEach(i => {
    i.removeChild(document.getElementById('single-bet'));
    i.removeChild(document.querySelector('.bet-label'));
  });
}

// DISABLE BUTTONS

straight.disabled = true;
parlay.disabled = true;

// PARLAY INPUT
document.getElementById('parlay-amount').addEventListener('change', e => {
  if (e.target.value > 0) {
    parlayAmount = parseInt(e.target.value).toFixed(2);
    let multiplyer = 0;
    betsSelected.map(i => {
      i.amount = parseInt(e.target.value);
      let parseOdds = parseInt(i.odds.slice(1));
      if (i.betType[0] === 'money') {
        if (i.odds[0] === '+') {
          multiplyer += parseOdds / 100 + 1;
        }
        if (i.odds[0] === '-') {
          multiplyer += 100 / parseOdds + 1;
        }
      } else {
        multiplyer += 2;
      }
    });
    costState = parseInt(e.target.value);
    winningsState = (costState * multiplyer).toFixed(2);
    cashAmount.innerText = `$${parlayAmount}`;
    cashWinnings.innerText = `$${winningsState}`;
  } else {
    message('invalid amount');
  }
});

// CHANGE TYPE FUNC
changeType.addEventListener('click', changeTypeFunc);
function changeTypeFunc() {
  betsSelected = [];
  chooseBetType.style.display = 'block';
  cancelBet(0);
}

// REMOVE INP FUNCTIONS
function removeInp() {
  document.querySelectorAll('.match-details').forEach(i => {
    let getInputs = document.getElementById('single-bet');
    let label = document.querySelector('label');
    i.children[0].removeChild(getInputs);
    i.children[0].removeChild(label);
  });
}

// FILTER SPORTS MENU

function filterSportFunc(s1, s2, s3, t) {
  s1.style.display = 'none';
  s2.style.display = 'none';
  s3.style.display = 'none';
  t.style.display = 'block';
  t.classList.add('filtered');
}

// HOME DISPLAY ALL SPORTS
document.getElementById('home').addEventListener('click', () => {
  nflContainer.style.display = 'block';
  nbaContainer.style.display = 'block';
  ufcContainer.style.display = 'block';
  mlbContainer.style.display = 'block';
});

function changeToFighting(s1) {
  let cont = document.getElementById(`${s1}`);
  cont.childNodes.forEach(i => {
    if (i.id === 'nfl-game') {
      let changeText1 = i.children[1].children[2].innerText.slice(1);
      let changeText2 = i.children[2].children[2].innerText.slice(1);
      i.children[0].children[2].innerText = 'Over';
      i.children[0].children[3].innerText = 'Under';
      i.children[1].children[2].innerText = `ov-${changeText1} rds`;
      i.children[2].children[2].innerText = `ov-${changeText2} rds`;
      i.children[1].children[3].innerText = `u-${changeText1} rds`;
      i.children[2].children[3].innerText = `u-${changeText2} rds`;
    }
  });
}
setTimeout(() => {
  changeToFighting('ufc-container');
}, 140);

// ACCOUNT LOGIN/SIGN UP/LS
const signUpForm = document.getElementById('sign-up-form');
const signUpItem = document.getElementById('sign-up-btn');
const loginForm = document.getElementById('login-form');
const loginItem = document.querySelectorAll('#login-item');
const dim = document.getElementById('dim');
const exitForm = document.querySelectorAll('#exit-form');

loginItem.forEach(i => {
  i.addEventListener('click', () => {
    dim.style.display = 'block';
    loginForm.style.display = 'block';
  });
});
signUpItem.addEventListener('click', () => {
  loginForm.style.display = 'none';
  signUpForm.style.display = 'block';
});

exitForm.forEach(i => {
  i.addEventListener('click', closeForm);
});
function closeForm() {
  loginForm.style.display = 'none';
  signUpForm.style.display = 'none';
  dim.style.display = 'none';
}

// ADD OPEN BETS TO LS

// SEARCH LOCAL STORAGE BETS
// let lsOpenBets;
if (localStorage.getItem('open bets')) {
  openBetStorage = JSON.parse(localStorage.getItem('open bets'));
  document.getElementById('ob-grid-games').style.display = 'block';
  addOpenBetLsHTML();
  console.log(openBetStorage);
  numOfOpenBets.innerText = openBetStorage.length;
} else {
  console.log('no open bets');
}

function addOpenBetLsHTML() {
  document.getElementById('ob-grid-games').style.display = 'block';
  openBetStorage.map(i => {
    console.log(i);
    if (i.parlayOrStraight === 'straight') {
      if (i.field === 'home') {
        document.getElementById('ob-grid-games').innerHTML += `
          <div class="ob-grid-game">
          <div class="ob-game dark">
          ${i.oponentName}
           @ <span class="ob-pick">${i.selectedTeamName} </span>
            <span class="ob-bet-type s" id='ob-bet-type'>(S)</span>
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
            <span class="ob-bet-type s" id='ob-bet-type'>(S)</span>
          </div>
          <div class="ob-odds dark">${i.odds}</div>
          <div class="ob-cost dark">$${i.amount}</div>
          <div class="ob-winnings dark">$${i.winnings.toFixed(2)}</div>
        </div>
          `;
      }
    }

    if (i.parlayOrStraight === 'parlay') {
      if (i.field === 'home') {
        document.getElementById('ob-grid-games').innerHTML += `
        <div class="ob-grid-game">
        <div class="ob-game dark">
        ${i.oponentName} @ <span class="ob-pick">${i.selectedTeamName} </span>
          <span class="ob-bet-type p" id='ob-bet-type'>(P)</span>
        </div>
        <div class="ob-odds dark">${i.odds}</div>
        <div class="ob-cost dark">$${i.amount}</div>
        <div class="ob-winnings dark">$${i.winnings}</div>
      </div>
        `;
      } else {
        document.getElementById('ob-grid-games').innerHTML += `
        <div class="ob-grid-game">
        <div class="ob-game dark">
        <span class="ob-pick">${i.selectedTeamName}</span> @ ${i.oponentName}
          <span class="ob-bet-type p" id='ob-bet-type'>(P)</span>
        </div>
        <div class="ob-odds dark">${i.odds}</div>
        <div class="ob-cost dark">$${i.amount}</div>
        <div class="ob-winnings dark">$${i.winnings}</div>
      </div>
        `;
      }
    }
  });
}

if (!loggedIn) {
  document.getElementById('ob-grid-games').style.display = 'none';
}

// OPEN BET STORAGE KEEPS ADDING UP WHEN NEW ACCOUNTS ARE CREATED

const signupForm1 = document.getElementById('sign-up-form-1');
var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
signupForm1.addEventListener('submit', e => {
  e.preventDefault();
  if (
    signUpUsername.length > 5 &&
    signUpUsername.length < 16 &&
    signUpPass.match(passw)
  ) {
    openBetStorage = [];
    document.getElementById('ob-grid-games').innerHTML = '';
  }
});
