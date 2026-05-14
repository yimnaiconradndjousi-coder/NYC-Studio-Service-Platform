// Login Variables
const loginForm = document.querySelector(".login-form");
const loginBtn = document.getElementById('login-btn');
const showOrHidePassword = document.getElementById('show-or-hide-password');
const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailIput = document.getElementById('email');
const passwordError = document.getElementById('password-error');
const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const hr = document.querySelector('.hr');
const date = new Date();

// SignUp Variables
const signupForm = document.querySelector('.signup-form');
const signupBtn = document.getElementById('signup-btn');

// Common Variables 
const userList = JSON.parse(localStorage.getItem('Users')) || [];


// Last Time Connected Logic
function registerTime() {

    let lastTimeConnected = document.getElementById("last-time-connected");
    const now = new Date;
    const englishhour = now.getHours() % 12 || 12;
    const hour = englishhour < 10 ? `0${englishhour}` : englishhour;
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const day = now.getDay() < 10 ? '0' + now.getDay() : now.getDay();
    const month = now.getMonth() < 10 ? '0' + now.getMonth() : now.getMonth();

    let nowTime = `${hour}h : ${minute}m , ${day} / ${month} / ${now.getFullYear()}`;

    const savedConnectedTime = JSON.parse(localStorage.getItem('LastConnectionTime')) || [];
    savedConnectedTime.push(nowTime);

    localStorage.setItem('LastConnectionTime', JSON.stringify(savedConnectedTime));
}

// Hide or Show logic

showOrHidePassword.addEventListener('click', function(e) {   
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showOrHidePassword.src = './icons/hide-password.png';
    } else if (passwordInput.type === 'text') {
        passwordInput.type = 'password';
        showOrHidePassword.src = './icons/show-password.png';
    }
});

function errorDisplay(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        let userName = null;
        userName = (signupForm) ? userNameInput.value.trim() : null;
        const password = passwordInput.value;
        const email = emailIput.value;

        function insertErrorMessage(inputError, hrline) {
            hrline.style.marginBottom = '5px';
            inputError.style.color = 'red';
            inputError.style.fontSize = '14px';
            inputError.style.margin = '5px';
        };

        if (password.length < 3) {
            passwordError.textContent = 'Password must be at least 8 characters.';
            insertErrorMessage(passwordError, hr);

            setTimeout( function() {
                    passwordError.textContent = '';
            }, 2000)
        };

        if (userName == '') {
            if (usernameError) {
                usernameError.textContent = 'Please enter your username.';
                insertErrorMessage(usernameError, hr);

                setTimeout( function() {
                        usernameError.textContent = '';
                }, 2000)
            }
        }

        if (email == '') {
            if (emailError) {
                emailError.textContent = 'Please enter your username.';
                insertErrorMessage(emailError, hr);

                setTimeout( function() {
                        emailError.textContent = '';
                }, 2000)
            }
        }
    });          
}

// Login Form Logic
if (loginForm) {
    
    errorDisplay(loginBtn);     
    
    const admin = {
        Username: "yims",
        Password: "admin123",
        Email: "yims@example.com",
        Role: 'admin',
    };

    const adminList = [admin];

    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const password = passwordInput.value;
        const email = emailIput.value;

        if (userList.length === 0 || adminList.length === 0) {
            alert("No account found. Please sign up first.");
        }

        for (let i = 0; i < adminList.length; i++) {
            console.log(adminList[0].Username);

            if (adminList[i].Email === email && adminList[i].Password === password) {
                alert(`Welcome, ${adminList[i].Username}! You have successfully logged in as an admin.`);
                registerTime();
                window.location.href = 'pages/admin.html';
                return;
            }
        } 

        for (let i = 0; i < userList.length; i++) {
            if (userList[i].Email === email && userList[i].Password === password) {
                alert(`Welcome, ${userList[i].Username}! You have successfully logged in.`);
                registerTime();
                window.location.href = 'home.html';
                return;
            }
        }

        // alert("Invalid username or password. Please try again.");
    })

}

// Sign Up Form Logic
if (signupForm) {

    errorDisplay(signupBtn);

    signupBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const user = {
            Username: userNameInput.value.trim(),
            Password: passwordInput.value,
            Email: emailIput.value,
            Role: 'user',
        };

        const userList = JSON.parse(localStorage.getItem('Users')) || [];

        for (let i = 0; i < userList.length; i++) {
            if (userList[i].Username === userNameInput.value.trim() || userList[i].Email === emailIput.value) {
                alert("You already have an account! Please log in.");
                window.location.href = 'login.html';
                return;
            }
        }

        userList.push(user);
        localStorage.setItem('Users', JSON.stringify(userList));
        alert("Sign up successful! You can now log in.");

        userNameInput.value = '';
        passwordInput.value = '';
        emailIput.value = '';
        window.location.href = 'home.html';
    });

}

// Shared Form Logic
if (loginForm || signupForm) {


    
    
}