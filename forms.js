const usernameLogin = document.getElementById('username-login');
const passLogin = document.getElementById('pass-login');
const usernameSignup = document.getElementById('username-sign-up');
const passSignup = document.getElementById('pass-sign-up');
const submitLogin = document.getElementById('submit-login');
const submitSignup = document.getElementById('submit-sign-up');
const loginForm1 = document.getElementById('login-form-1');
const signupForm1 = document.getElementById('sign-up-form-1');
const account = document.getElementById('account');
const logout = document.getElementById('logout');
const loginItem = document.getElementById('login-item');

let accounts = [];
let loginUsername = '';
let loginPass = '';
let signUpUsername = '';
let signUpPass = '';
let loggedIn = false;
let signedUp = false;
let money;

accountStart();

function accountStart() {
  if (localStorage.length > 0) {
    signedUp = true;
  }
  if (localStorage.length > 0 && loggedIn) {
    account.innerHTML = `
        <div class="account" id="account">
        ${localStorage.getItem(
          'username'
        )} <span class="funds" id='funds'>$${parseFloat(
      localStorage.getItem('money')
    ).toFixed(2)}</span>
      </div>
        `;
    loginItem.style.display = 'none';
    logout.style.display = 'block';
    document.getElementById('user-i').style.display = 'block';
    document.getElementById('user-i-1').style.display = 'none';
    document.getElementById('sign-up-btn').disabled = true;
    document.getElementById('sign-up-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('dim').style.display = 'none';
    money = parseFloat(localStorage.getItem('money')).toFixed(2);
    money = parseFloat(money);
  } else {
    loggedIn = false;
    account.innerHTML = `
          `;
    loginItem.style.display = 'block';
    logout.style.display = 'none';
    document.getElementById('user-i').style.display = 'none';
    document.getElementById('user-i-1').style.display = 'block';
    document.getElementById('sign-up-btn').disabled = false;
  }
  console.log(signedUp, loggedIn);
}

var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

usernameLogin.addEventListener('change', e => {
  loginUsername = e.target.value;
});
passLogin.addEventListener('change', e => {
  loginPass = e.target.value;
});
usernameSignup.addEventListener('change', e => {
  signUpUsername = e.target.value;
});
passSignup.addEventListener('change', e => {
  signUpPass = e.target.value;
});

loginForm1.addEventListener('submit', e => {
  e.preventDefault();
  if (
    localStorage.getItem('password') === loginPass &&
    localStorage.getItem('username') === loginUsername
  ) {
    loginFunc(loginUsername);
    loggedIn = true;
    document.getElementById('logged-in-message').classList.add('show');
    setTimeout(() => {
      document.getElementById('logged-in-message').classList.remove('show');
    }, 2000);
  } else {
    message('username and password do not match');
    document.getElementById('login-message').classList.add('show');
    setTimeout(() => {
      document.getElementById('login-message').classList.remove('show');
    }, 2000);
    // SHOW MESSAGE
  }
});

signupForm1.addEventListener('submit', e => {
  e.preventDefault();
  if (
    signUpUsername.length > 5 &&
    signUpUsername.length < 16 &&
    signUpPass.match(passw)
  ) {
    localStorage.clear();
    localStorage.setItem('username', signUpUsername);
    localStorage.setItem('password', signUpPass);
    localStorage.setItem('money', Math.random() * (500 - 1) + 1);
    loggedIn = true;
    money = parseFloat(localStorage.getItem('money')).toFixed(2);
    money = parseFloat(money);
    signUpFunction();
    document.getElementById('account-created').classList.add('show');
    setTimeout(() => {
      document.getElementById('account-created').classList.remove('show');
    }, 2000);
  } else {
    message('invalid username or passowrd');
    document.getElementById('signup-message').classList.add('show');
    setTimeout(() => {
      document.getElementById('signup-message').classList.remove('show');
    }, 2000);
  }
});

logout.addEventListener('click', () => {
  loggedIn = false;
  accountStart();
  resetVals();
  document.getElementById('ob-grid-games').style.display = 'none';
  document.getElementById('num-open-bets').style.display = 'none';
});

function loginFunc(username) {
  console.log(`${username} is logged in`);
  loggedIn = true;
  accountStart();
  resetVals();
  if (localStorage.getItem('open bets')) {
    document.getElementById('num-open-bets').style.display = 'block';
  }
  document.getElementById('ob-grid-games').style.display = 'block';
}

function signUpFunction() {
  loggedIn = true;
  signedUp = true;
  accountStart();
  resetVals();
}

function message(msg) {
  console.log(msg);
}

function resetVals() {
  usernameLogin.value = '';
  usernameSignup.value = '';
  passLogin.value = '';
  passSignup.value = '';
}

export { loggedIn };
export { money };
export { signedUp };
export { signUpUsername };
export { signUpPass };

// ADD MESSAGES FOR LOGIN AND SIGN UP
