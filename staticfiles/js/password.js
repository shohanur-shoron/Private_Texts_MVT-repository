function showPassword() {
    // Get the password input field element
    const password = document.getElementById('password');
    // Get the image element that shows or hides the password
    const passImage = document.getElementById('showOrHide');

    // Check if the password is currently hidden
    if (password.type === 'password') {
        // If the password is hidden, show it
        password.type = 'text';
        // Change the image to indicate that the password is visible
        passImage.src = passImage.getAttribute('data-show-src');
    } else {
        // If the password is visible, hide it
        password.type = 'password';
        // Change the image to indicate that the password is hidden
        passImage.src = passImage.getAttribute('data-hide-src');
    }
}
