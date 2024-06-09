// Get the image element with the id 'copyImage'
const copyImage = document.getElementById('copyImage');

// Get the button element with the class 'copyBtn'
let copyBtn = document.querySelector('.copyBtn');

// Get the checkbox element with the id 'isTime'
const checkBox = document.getElementById('isTime');

// Get the time input element with the id 'time'
const time = document.getElementById('time');

// Function to copy text to the clipboard
function copyTextToClipboard(text) {
    if (navigator.clipboard) {
        // Try to copy text to clipboard
        navigator.clipboard.writeText(text).catch(function() {
            // Clipboard API failed, nothing will be copied
        });
        // Change the image source to indicate that the text was copied
        copyImage.src = copyImage.getAttribute('data-copied-src');
        // Update the button text to indicate that the text was copied
        copyBtn.setAttribute('data-info', 'Copied!');
    }
}

// Add an event listener to the checkbox for when its state changes
checkBox.addEventListener('change', function() {
    if (checkBox.checked) {
        // Show the time input if the checkbox is checked
        time.style.display = 'block';
    } else {
        // Hide the time input if the checkbox is not checked
        time.style.display = 'none';
    }
});

// Initially hide the time input box if the checkbox is not checked
if (!checkBox.checked) {
    time.style.display = 'none';
}

// Function to check the password validity
function checkPassword(password) {
    const passwordMessage = document.getElementById('passwordMessage');
    
    // Check if the password is at least 6 characters long
    if (password.length < 6) {
        passwordMessage.innerText = 'Password must be 6 characters long';
        document.getElementById('password').style.borderColor = 'black';
        return;
    }
    // Check if the password is not more than 10 characters long
    if (password.length > 10) {
        passwordMessage.innerText = 'Password must be equal or less than 10 characters';
        document.getElementById('password').style.borderColor = 'black';
        return;
    }

    // Check for at least one number in the password
    if (!/\d/.test(password)) {
        passwordMessage.innerText = 'Password must contain at least one number.';
        document.getElementById('password').style.borderColor = 'black';
        return;
    }

    // Check for at least one special character in the password
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        passwordMessage.innerText = 'Password must contain at least one special character.';
        document.getElementById('password').style.borderColor = 'black';
        return;
    }

    // If all conditions are met, set the border color to green and clear the message
    document.getElementById('password').style.borderColor = '#2ecc71';
    passwordMessage.innerText = ' ';
}

// Add an event listener to the password input field to check the password as the user types
document.getElementById('password').addEventListener('input', function() {
    checkPassword(this.value);
});

// Function to show or hide the password
function showPassword() {
    const password = document.getElementById('password');
    const passImage = document.getElementById('showOrHide');

    if (password.type === 'password') {
        // Show the password and change the image to indicate that the password is visible
        password.type = 'text';
        passImage.src = passImage.getAttribute('data-show-src');
    } else {
        // Hide the password and change the image to indicate that the password is hidden
        password.type = 'password';
        passImage.src = passImage.getAttribute('data-hide-src');
    }
}
