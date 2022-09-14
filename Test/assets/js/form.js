const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success colour
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSucces(input)
    } else {
        showError(input, 'Email is not invalid');
    }
}

function checkPassword(input) {
    const upperCaseLetters = /[A-Z]/g;
    const lowerCaseLetters = /[a-z]/g;
    const numbers = /[0-9]/g;
    if (input.value.match(upperCaseLetters)) {
        if (input.value.match(lowerCaseLetters)) {
            if (input.value.match(numbers)) {
                showSucces(input)
            } else showError(input, 'Password must contain one number letter!');
        } else showError(input, 'Password must contain one lowercase letter!');
    } else {
        showError(input, 'Password must contain one uppercase letter!');
    }
}


//checkRequired fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            if (`${getFieldName(input)}`.match(password2)) {
                showError(input, `Confirm Password is required`)
            } else showError(input, `${getFieldName(input)} is required`)
        } else {
            showSucces(input);
        }
    });
}


//check input Length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be les than ${max} characters`);
    } else {
        showSucces(input);
    }
}

//get FieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check passwords match
function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}


//Event Listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([email, password, password2]);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPassword(password);
    checkPasswordMatch(password, password2);
});