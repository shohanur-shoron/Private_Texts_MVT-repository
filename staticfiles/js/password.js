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