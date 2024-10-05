 
const btnSignIn = document.getElementById("sign-in"),
      btnSignUp = document.getElementById("sign-up"),
      containerFormRegister = document.querySelector(".register"),
      containerFormLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", () => {
    containerFormRegister.classList.add("hide");
    containerFormLogin.classList.remove("hide");
});

btnSignUp.addEventListener("click", () => {
    containerFormLogin.classList.add("hide");
    containerFormRegister.classList.remove("hide");
});
