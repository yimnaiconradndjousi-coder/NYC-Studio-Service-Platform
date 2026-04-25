const heroTitle = document.getElementById('hero-section-title');
const serviceContainer = document.querySelector("#services-card-container");
const numReview = document.querySelector(".summary-review-info")

// Login Variables
const loginForm = document.querySelector(".login-form");
const button = document.querySelector('.login-btn');
const showOrHidePassword = document.getElementById('show-or-hide-password');
const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('password-error');
const usernameError = document.querySelector('.username-error');
const hr1 = document.querySelector('.hr1');
const date = new Date();

// #Dashboard Variables
const adminPage = document.getElementById("admin-panel")
const adminUserName = document.getElementById("userName")
const addServiceTitle = document.getElementById('service-title');
const addServiceDescription = document.getElementById('service-description');
const adminTable = document.getElementById("admin-table");
const serviceTable = document.getElementById("service-table");
const modifyForm = document.getElementById("modify-form-container");
const addForm = document.querySelector('.addservice-form');
let lastTimeConnected = document.getElementById("last-time-connected");
let numServices = document.getElementById("numServices");
let services = 0;

// Button
const addServiceButton = document.getElementById('add-project-btn');
const closeButton = document.querySelectorAll(".close-btn");
const applyChangeBtn = document.getElementById("apply-changes-btn");
const discardChangeBtn = document.getElementById("discard-changes-btn");
const addServiceBtn = document.getElementById("add-service-btn");

                    // --- ADMIN PAGE LOGIC---


if (adminPage) {

    if (addServiceButton) {
        addServiceButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create an object for the new service
            const newService = {
                title: addServiceTitle.value,
                description: addServiceDescription.value
            };

            // Get existing services from localStorage or start an empty array
            const savedServices = JSON.parse(localStorage.getItem('myServices')) || [];
            
            // Add new service to the list and save back to localStorage
            savedServices.push(newService);
            localStorage.setItem('myServices', JSON.stringify(savedServices));
            alert("Service added! Check the Home page.");
            addServiceTitle.value = '';
            addServiceDescription.value = '';
            window.location.reload();
        });
    }

    // Analytics
    if (adminPage) {

        // Number Of Service Added (Analytics Logic)
        const savedServices = JSON.parse(localStorage.getItem('myServices')) || [];

        savedServices.forEach(service => {
            services += 1;
        })

        numServices.textContent = `${services}`;

        // Last Time Connected Logic
        const now = new Date;
        const englishhour = now.getHours() % 12 || 12;
        const hour = englishhour < 10 ? `0${englishhour}` : englishhour;
        const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
        const day = now.getDay() < 10 ? '0' + now.getDay() : now.getDay();
        const month = now.getMonth() < 10 ? '0' + now.getMonth() : now.getMonth();
        
        // function refreshTime() {
        //     let nowTime = `${hour}h : ${minute}m | ${day} / ${month} / ${now.getFullYear()}`;
            
        // }

        // setInterval(refreshTime, )
        
        let nowTime = `${hour}h : ${minute}m | ${day} / ${month} / ${now.getFullYear()}`;

        // lastTimeConnected.textContent = `${now.getHours()}h : ${now.getMinutes()}m : ${now.getSeconds()}s |  ${now.getDate()} / ${now.getMonth()} / ${now.getFullYear()}`;
        
        const savedConnectedTime = JSON.parse(localStorage.getItem('LastConnectionTime')) || [];
        savedConnectedTime.push(nowTime);

        localStorage.setItem('LastConnectionTime', JSON.stringify(savedConnectedTime));
        let lenOfTimeArray = savedConnectedTime.length;
        console.log(lenOfTimeArray);

        savedConnectedTime.forEach((time, index) =>{
            if (index > -1 && lenOfTimeArray > 2) {

                if (lenOfTimeArray > 5) {
                    savedConnectedTime.splice(5);
                    localStorage.setItem('LastConnectionTime', JSON.stringify(savedConnectedTime));
                }

                if (lenOfTimeArray == 1) {
                    lastTimeConnected.textContent = savedConnectedTime[0];
                }
                console.log("Last connection was on: ");

                lastTimeConnected.textContent = savedConnectedTime[1];
            }
        });

    }


    // Admin Service Table Logic
    if (adminTable) {
        const savedServices = JSON.parse(localStorage.getItem('myServices')) || [];
        
        savedServices.forEach(service => {
            const serviceCard = document.createElement('tr');
            serviceCard.innerHTML = `<td>${service.title}</td> <td>${service.description}</td>
                                    <td>
                                        <div class="table-buttons">
                                            <button class="modify-btn"><img src="../icons/edit.png" alt="Edit"></button>
                                            <button class="delete-btn"><img src="../icons/delete.png" alt="Delete"></button>
                                        </div>
                                    </td>`;
        serviceTable.appendChild(serviceCard);
        });

        const deleteButtons = document.querySelectorAll(".delete-btn");

        deleteButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                if (index > -1) {
                    savedServices.splice((index), 1);
                }
                console.log(index);
                localStorage.setItem('myServices', JSON.stringify(savedServices));
                window.location.reload();
            })
        });
        // console.log(savedServices)
        // console.log(localStorage.key(1))
        // console.log(localStorage.getItem("myServices"));

        
        // Modification Button Logic
        const modifyButton = document.querySelectorAll(".modify-btn");
        let modifyServiceTitle = document.getElementById("modify-service-title");
        let modifyServiceDescription = document.getElementById("modify-service-description");

        modifyButton.forEach((button, index) => {
            button.addEventListener('click',function(e) {
                e.preventDefault();

                if (index > -1) {
                    modifyForm.style.display = 'flex';

                    modifyServiceTitle.textContent = savedServices[index].title;
                    modifyServiceDescription.textContent = savedServices[index].description;
                    console.log(savedServices[index].title);

                    // console.log(`Title: ${modifyServiceTitle.value}\nDescription: ${modifyServiceDescription.value}`);
                    // console.log(`Service title: ${savedServices[index].title}\n Service Description: ${savedServices[index].description}`);
                    applyChangeBtn.addEventListener('click', function(e) {

                        savedServices[index].title = modifyServiceTitle.value;
                        savedServices[index].description = modifyServiceDescription.value;
                        localStorage.setItem('myServices', JSON.stringify(savedServices));                        
                    })
                }
                
            })
        });

        closeButton.forEach(button => {
            button.addEventListener('click', function(e) {
                if (modifyForm) {
                    modifyForm.style.display = 'none';
                    modifyServiceTitle.textContent = '';
                    modifyServiceDescription.textContent = '';
                }
            })
        });

        // Add Service Button and Close Button
        addServiceBtn.addEventListener('click', function(e) {
            addForm.style.display = 'flex';
        })

        closeButton.forEach(button => {
            button.addEventListener('click', function(e) {
                if (addForm) {
                    addForm.style.display = 'none';
                    modifyServiceTitle.textContent = '';
                    modifyServiceDescription.textContent = '';
                }
            })
        });

        applyChangeBtn.addEventListener('click', function(e) {

        })
    };
}

                    // LOGIN & SIGN-IN LOGIC

if (loginForm) {

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
}

                    // --- HOME PAGE LOGIC---


if (heroTitle) {
    const speed = 100;
    let text = 'BRING ALL OF YOUR IDEAS TO LIFE WITH US';
    let i = 0;
    heroTitle.textContent = '';

    function updateHeroTitle() {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(updateHeroTitle, speed);
        }
    }
    updateHeroTitle();
}
 
// --- LOAD SAVED SERVICES ON HOME PAGE ---
if (serviceContainer) {
    const savedServices = JSON.parse(localStorage.getItem('myServices')) || [];
    
    savedServices.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `<h2>${service.title}</h2><div class="service-card-description"><p>${service.description}</p></div>`;
        serviceContainer.appendChild(serviceCard);
    });
    // localStorage.removeItem('myServices');
    console.log(savedServices);
}
