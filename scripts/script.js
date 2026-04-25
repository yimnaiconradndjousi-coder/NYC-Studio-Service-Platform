const button = document.querySelector('.login-btn');
const showOrHidePassword = document.getElementById('show-or-hide-password');
const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('password-error');
const usernameError = document.querySelector('.username-error');
const hr1 = document.querySelector('.hr1');
const date = new Date();

showOrHidePassword.addEventListener('click', function(e) {   
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showOrHidePassword.src = './icons/hide-password.png';
    } else if (passwordInput.type === 'text') {
        passwordInput.type = 'password';
        showOrHidePassword.src = './icons/show-password.png';
    }
});

button.addEventListener('click', function(e) {
    e.preventDefault();
    const userName = userNameInput.value.trim();
    const password = passwordInput.value;
    console.log(`user name: ${userName}`);
    console.log(`password: ${password}`);

    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters.';
        passwordError.style.color = 'red';
        passwordError.style.fontSize = '14px';
        passwordError.style.margin = '5px';

        setTimeout( function() {
                passwordError.textContent = '';
        }, 3000)
        // return;
    }

    if (userName === '') {
        hr1.style.marginBottom = '5px';
        usernameError.textContent = 'Please enter your username.';
        usernameError.style.color = 'red';
        usernameError.style.fontSize = '14px';
        usernameError.style.margin = '5px';

        setTimeout( function() {
                usernameError.textContent = '';
        }, 3000)
    }

    if (userName === "yim25" && password === "password123") {
        console.log(`Welcome, ${userName}! You have successfully logged in.`);
        window.location.href = 'pages/admin.html';
    } else {
        console.log('Invalid username or password.');
    }
});

