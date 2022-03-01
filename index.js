// console.log("hello ");

const register = document.getElementById("regi");
const login = document.getElementById("log");

const registerForm = document.getElementById("register");
const loginForm = document.getElementById("login");

// console.log(registerForm, loginForm);

register.addEventListener("click", () => {
  loginForm.style.display = "none";
  registerForm.style.display = "flex";
  registerForm.style.visibility = "visible";
  register.style.backgroundColor = "honeydew";
  login.style.backgroundColor = "transparent";
});

log.addEventListener("click", () => {
  registerForm.style.display = "none";
  registerForm.style.visibility = "hidden";
  loginForm.style.display = "flex";
  loginForm.style.visibility = "visible";
  register.style.backgroundColor = "transparent";
  login.style.backgroundColor = "honeydew";
});

function showRegistor() {
  // registor style display - block
  // login style display - none

  loginForm.style.display = "none";
  registerForm.style.display = "flex";
  registerForm.style.visibility = "visible";
  register.style.backgroundColor = "honeydew";
  login.style.backgroundColor = "transparent";
}
function showLogin() {
  // registor style display - none
  // login style display - block

  console.log("showing login tab");
  registerForm.style.display = "none";
  registerForm.style.visibility = "hidden";
  loginForm.style.display = "flex";
  loginForm.style.visibility = "visible";
  register.style.backgroundColor = "transparent";
  login.style.backgroundColor = "honeydew";
}

// registration of user
class User {
  constructor(
    nameF,
    userEmailF,
    userPhoneF,
    userNameF,
    userPasswordF,
    userCPasswordF
  ) {
    (this.name = nameF),
      (this.email = userEmailF),
      (this.phone = userPhoneF),
      (this.username = userNameF),
      (this.password = userPasswordF),
      (this.confirmPassword = userCPasswordF);
  }
  insetToLocalStorage(user) {
    let userObj;

    let userData = localStorage.getItem("userData");
    if (userData == null) {
      userObj = [];
    } else if (JSON.parse(userData).length > 1) {
      alert("Admin already registered plz try to login");
      showLogin();
    } else {
      userObj = JSON.parse(userData);
    }
    userObj.push(user);
    localStorage.setItem("userData", JSON.stringify(userObj));

    // console.log(userObj.length);
  }

  clear() {
    console.log("we have to clear the registration form");

    let names = document.getElementById("name");
    let userEmail = document.getElementById("email");
    let userPhone = document.getElementById("phone");
    let userName = document.getElementById("usernames");
    let userPassword = document.getElementById("passwords");
    let userCPassword = document.getElementById("cpassword");

    console.log(
      names.value,
      userEmail.value,
      userPhone.value,
      userName.value,
      userPassword.value,
      userCPassword.value
    );

    names.value = "";
    userEmail.value = "";
    userPhone.value = "";
    userName.value = "";
    userPassword.value = "";
    userCPassword.value = "";

    console.log("form cleared");
  }
}

class Display {
  validate(user) {
    if (
      user.name.length > 3 &&
      user.email.includes("@") &&
      user.phone.length == 10 &&
      user.username.length > 4 &&
      user.password == user.confirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  }
}

let names = document.getElementById("name");
let userEmail = document.getElementById("email");
let userPhone = document.getElementById("phone");
let userName = document.getElementById("usernames");
let userPassword = document.getElementById("passwords");
let userCPassword = document.getElementById("cpassword");

let regSubmit = document.getElementById("regSubmit");
let display = new Display();

regSubmit.addEventListener("click", () => {
  let nameF = names.value;
  let userEmailF = userEmail.value;
  let userPhoneF = userPhone.value;
  let userNameF = userName.value;
  let userPasswordF = userPassword.value;
  let userCPasswordF = userCPassword.value;

  const user = new User(
    nameF,
    userEmailF,
    userPhoneF,
    userNameF,
    userPasswordF,
    userCPasswordF
  );
  // console.log(user);

  if (display.validate(user)) {
    // console.log("user is valid");
    user.insetToLocalStorage(user);
    user.clear();
    showLogin();
  } else {
    // console.log("user registration is not valid");
    alert("check password again");
    user.clear();
  }
});

// user login

const login_username = document.getElementById("username");
const login_password = document.getElementById("password");
// const login_username_entered = login_username.value;
// const login_password_entered = login_password.value;

const signinBtn = document.getElementById("signSubmit");
signinBtn.addEventListener("click", () => {
  // console.log(login_username_entered, login_password_entered);
  let login_validation = login_validate();
  // console.log(login_validation);
  if (login_validation) {
    // console.log("all set to login");
    login_username.value = "";
    login_password.value = "";
    let user_session = sessionStorage.setItem("user", "online");
    // showLogin();
    signinBtn.setAttribute("href", "./library.html");
  } else {
    alert("username or password incorrect");
    login_username.value = "";
    login_password.value = "";
  }
});

function login_validate() {
  let userObj = JSON.parse(localStorage.getItem("userData"));
  // console.log(userObj);
  if (userObj == null) {
    alert("Registor as Admin");
    showRegistor();
  }
  const login_username_entered = login_username.value;
  const login_password_entered = login_password.value;

  for (let i = 0; i < userObj.length; i++) {
    let data_username = userObj[i].username;
    let data_password = userObj[i].password;

    // console.log(data_username, data_password);

    if (
      data_username == login_username_entered &&
      data_password == login_password_entered
    ) {
      return true;
    } else {
      continue;
    }
  }

  // for-each loop is not the perfect way for this problem, there is no way to stop(break);
}
