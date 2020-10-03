const form = document.querySelector('#form');


function error(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.textContent = message;
}

function success(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


function inputs() {
    const usernameValue = form.username.value.trim();
    const emailValue = form.email.value.trim();
    const passwordValue = form.password.value.trim();
    const password2Value = form.password2.value.trim();

    if (usernameValue === '' || usernameValue.length < 4) {
        error(username, 'Name cannot be blank or less than 4 chars long');
    } else {
        success(username);
    }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    if (emailValue === '') {
        error(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        error(email, 'Not a valid email');
    } else {
        success(email);
    }

    if (passwordValue === '') {
        error(password, 'Password cannot be blank');
    } else {
        success(password);
    }

    if (password2Value === '') {
        error(password2, 'Password cannot be blank');
    } else if (passwordValue !== password2Value) {
        error(password2, 'Passwords do not match');
    } else {
        success(password2);
    }
}
form.addEventListener('submit', e => {
    e.preventDefault();

    inputs();
});

// Sending to Firebase

const firebaseConfig = {
    apiKey: "AIzaSyBapR2oI0RoNTZd00viIQE-kBL_dZUy7u0",
    authDomain: "formvalidation-3c7f2.firebaseapp.com",
    databaseURL: "https://formvalidation-3c7f2.firebaseio.com",
    projectId: "formvalidation-3c7f2",
    storageBucket: "formvalidation-3c7f2.appspot.com",
    messagingSenderId: "365541250397",
    appId: "1:365541250397:web:5375ce76e8b9e7d09184b4",
    measurementId: "G-BRT732SDFJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let contactInfo = firebase.database().ref("infos");

document.querySelector("#form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    //   Get input Values
    let name = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let password2 = document.querySelector("#password2").value;
    console.log(name, email, password, password2);

    saveContactInfo(name, email, password, password2);

    alert("Form successfully sent")
    document.querySelector("#form").reset();
}

// Save infos to Firebase
function saveContactInfo(name, email, password, password2) {
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name: name,
        email: email,
        password: password,
        password2: password2,
    });
}