const usernameLogin = document.getElementById('username-login');
const passLogin = document.getElementById('pass-login');
const usernameSignup = document.getElementById('username-sign-up');
const passSignup = document.getElementById('pass-sign-up');
const submitLogin = document.getElementById('submit-login');
const submitSignup = document.getElementById('submit-sign-up');
const loginForm1 = document.getElementById('login-form-1');
const signupForm1 = document.getElementById('sign-up-form-1');

let accounts = [];
let loginUsername = '';
let loginPass = '';
let signUpUsername = '';
let signUpPass = '';
let loggedIn = false;

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
  console.log(loginUsername);
  console.log(loginPass);
});

signupForm1.addEventListener('submit', e => {
  e.preventDefault();
  console.log(signUpUsername);
  console.log(signUpPass);
});

// ADD LS - ACCOUNT INFO
// TRANSFER LOGGED IN STATE TO MAIN TO ALLOW BETS
