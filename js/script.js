// Select form input elements
const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const sendBtn = document.querySelector(".send");
const clearBtn = document.querySelector(".clear");
const popup = document.querySelector(".popup");

// Function to display error messages
const showError = (input, msg) => {
  const formBox = input.parentElement;
  const errorMsg = formBox.querySelector(".error-text");

  formBox.classList.add("error");
  errorMsg.textContent = msg;
};

// Function to remove error messages
const clearError = input => {
  const formBox = input.parentElement;
  formBox.classList.remove("error");
};

// Function to check if all fields are filled
const checkForm = input => {
  input.forEach(el => {
    if (el.value === "") {
      showError(el, el.placeholder);
    } else {
      clearError(el);
    }
  });
};

// Function to validate email format
const checkMail = mail => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (re.test(email.value)) {
    clearError(email);
  } else {
    showError(email, "E-mail jest niepoprawny");
  }
};

// Function to check minimum input length
const checkLength = (input, min) => {
  if (input.value.length < min) {
    showError(
      input,
      `${input.previousElementSibling.innerText.slice(
        0,
        -1
      )} składa się z min. ${min} znaków.`
    );
  }
};

// Function to check if passwords match
const checkPassword = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Hasła do siebie nie pasują.");
  }
};

// Function to validate form and display popup if successful
const checkErrors = () => {
  const allInputs = document.querySelectorAll(".form-box");
  let errorCount = 0;

  allInputs.forEach(el => {
    if (el.classList.contains("error")) {
      errorCount++;
    }
  });

  if (errorCount === 0) {
    popup.classList.add("show-popup");
  }
};

// Event listener for form submission
sendBtn.addEventListener("click", e => {
  e.preventDefault();

  checkForm([username, pass, pass2, email]);
  checkLength(username, 3);
  checkLength(pass, 8);
  checkPassword(pass, pass2);
  checkMail(email);
  checkErrors();
});

// Event listener for clearing the form
clearBtn.addEventListener("click", e => {
  e.preventDefault();

  [username, pass, pass2, email].forEach(el => {
    el.value = "";
    clearError(el);
  });
});
