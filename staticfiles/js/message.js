const copyImage = document.getElementById('copyImage')
let copyBtn = document.querySelector('.copyBtn');
const checkBox = document.getElementById('isTime')
const time = document.getElementById('time');

function copyTextToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(function() {
            // Clipboard API failed, nothing will be copied
        });
        copyImage.src = copyImage.getAttribute('data-copied-src');
        copyBtn.setAttribute('data-info', 'Copied!');
    }
}

checkBox.addEventListener('change', function() {
    if (checkBox.checked) {
        time.style.display = 'block';
    } else {
        time.style.display = 'none';
    }
});

// Initially hide the password input box if the checkbox is not checked
if (!checkBox.checked) {
    time.style.display = 'none';
}


// cheacking password
function checkPassword(password) {
    const passwordMessage = document.getElementById('passwordMessage')
    if (password.length < 6) {
        passwordMessage.innerText = 'Password must be 6 character long'
        document.getElementById('password').style.borderColor = 'black'
        return;
    }
    if (password.length > 10) {
        passwordMessage.innerText = 'Password must be equal or less then 10 character'
        document.getElementById('password').style.borderColor = 'black'
        return;
    }

    // Check for at least one number
    if (!/\d/.test(password)) {
        passwordMessage.innerText = 'Password must contain at least one number.'
        document.getElementById('password').style.borderColor = 'black'
        return;
    }

    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        passwordMessage.innerText = 'Password must contain at least one special character.'
        document.getElementById('password').style.borderColor = 'black'
        return;
    }

    // If all conditions are met
    document.getElementById('password').style.borderColor = '#2ecc71'
    passwordMessage.innerText = ' '
}

//event listener to the password input field
document.getElementById('password').addEventListener('input', function() {
    checkPassword(this.value);
});


function showPassword() {
    const password = document.getElementById('password');
    const passImage = document.getElementById('showOrHide');

    if (password.type === 'password') {
        password.type = 'text';
        passImage.src = passImage.getAttribute('data-show-src');
    } else {
        password.type = 'password';
        passImage.src = passImage.getAttribute('data-hide-src');
    }
}