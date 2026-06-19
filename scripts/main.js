// Index Page 
const heroTitle = document.getElementById('hero-section-title');
const serviceContainer = document.querySelector("#services-card-container");
const numReview = document.querySelector(".summary-review-info");
const date = new Date();
// Admin Page 
const adminPage = document.getElementById("admin-dashboard");
const adminUserName = document.getElementById("userName");
// Sidebar Links 
const serviceSideBar = document.getElementById('service-sidebar');
const userSideBar = document.getElementById('user-sidebar');
// Dashboard main 
const mainWindowRender = document.querySelector('.main-page-view');
const currentViewName = document.getElementById('service-view');
// Dashboard Analytics
const nameOfEntity = document.getElementById('name-of-entity');
const numberOfEntity = document.getElementById("number-of-entity");
const lastTimeConnected = document.getElementById("last-time-connected");
// Modal forms 
const modifyForm = document.getElementById("modify-form-container");
const addForm = document.querySelector('.add-form-container');
// Modal form button
const addButton = document.getElementById('form-add-btn');
const tableAddButton = document.getElementById('table-add-btn');
const closeButton = document.querySelectorAll(".close-btn");
const applyChangeBtn = document.getElementById("apply-changes-btn");
const discardChangeBtn = document.getElementById("discard-changes-btn");
// Modal forms input 
const addFormTitle = document.getElementById("add-form-name-label")
const modifyFormTitle = document.getElementById("modify-form-name-label")

const addFormUserType = document.getElementById("select-user-type")
const addFormInput = document.getElementById('add-form-input');
const addFormTextarea = document.getElementById('add-form-textarea');
const modifyServiceTitle = document.getElementById("modify-form-input");
const modifyServiceDescription = document.getElementById("modify-form-textarea");
// User or Serice Table
const tableContainer = document.getElementById("table-container");
const tableCaption = document.getElementById('caption-title');
const tableAddBtnText = document.getElementById('add-btn-container-text');
const entityRoleOrDesc = document.getElementById('entity-role-or-description')
const tableData = document.getElementById("table-data");
// LocalStorage 
const servicesListName = 'myServices';
const usersListName = 'Users';

const servicesList = JSON.parse(localStorage.getItem('myServices')) || [];
const usersList = JSON.parse(localStorage.getItem('Users')) || [];
const adminUser = JSON.parse(localStorage.getItem('AdminUser')) || [];
const savedConnectedTime = JSON.parse(localStorage.getItem('LastConnectionTime')) || [];
// user form input and error message
const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailIput = document.getElementById('email');
// Accumulators and Counters
let lenOfTimeArray = savedConnectedTime.length;
let lenAdminUser = adminUser.length;
let lastindex = lenAdminUser - 1;
let countAccumulator = 0;

const ServiceAddFormHiddenInput = document.getElementById('for-service-form-input');
const UserAddFormHiddenInput = document.getElementById('for-user-form-input');
const view = (currentViewName.id === 'service-view') ? 'service-view' : 'user-view';
//                         --- FUNCTION ---

// Number Of Service Added (Analytics Logic)
function countNumEntity(list, accumVaraible, resultRender) {
        list.forEach(entity => {
            accumVaraible += 1;
        })
        resultRender.textContent = `${accumVaraible}`;
}

// sidebar Render function
function switchView() {

    serviceSideBar.addEventListener('click', function(e) {
        e.preventDefault();
        switchAllText('service-view', serviceSideBar, userSideBar);
        countEntitySwitch('service-view');
        addFormSwitchView(UserAddFormHiddenInput, ServiceAddFormHiddenInput);
    })

    userSideBar.addEventListener('click', function(e) {
        e.preventDefault();
        currentViewName.id = 'user-view';
        switchAllText('user-view', userSideBar, serviceSideBar);
        countEntitySwitch('user-view');
        addFormSwitchView(ServiceAddFormHiddenInput, UserAddFormHiddenInput);
    })

    countEntitySwitch(view);

    function switchAllText(view, sidebar, sidebar2) {
        sidebar.style.background = 'rgba(28, 98, 217, 0.5)';
        sidebar2.style.background = 'none';

        function switchText(varToChange, ifService, ifuser) {
            varToChange.textContent = (view === 'service-view') ? `${ifService}` : `${ifuser}`;
        }
        switchText(nameOfEntity, 'services', 'users');
        switchText(tableCaption, 'Services', 'Users');
        switchText(tableAddBtnText, 'Service', 'User');
        switchText(entityRoleOrDesc, 'Description', 'Role');
    }

    function addFormSwitchView(serviceForm, userForm) {
        serviceForm.style.display = 'none';
        userForm.style.display = 'flex';
    }

    function countEntitySwitch(view) {
        if (view === 'service-view') {
            countNumEntity(servicesList, countAccumulator, numberOfEntity);
        } else if (view === 'user-view') {
            countNumEntity(usersList, countAccumulator, numberOfEntity);
        }
    }
}

//                      --- ADMIN PAGE LOGIC---
if (adminPage) {
    
    switchView();
    
    // add service button
    function addEntity(btn, entityList, localStorageKey) {

        if (entityList === usersList) {
            addFormTitle.textContent = "User Name";
            modifyFormTitle.textContent = "User Name";
            addButton.textContent = "Add User";
        }

        btn.addEventListener('click', function(e) {
            e.preventDefault();

            function saveEntity(entity) {
                entityList.push(entity);
                localStorage.setItem(localStorageKey, JSON.stringify(entityList));
                alert("Service added! Check the Home page.");
                window.location.reload();
            }

            function selectOption(usertype) {
                usertype.addEventListener("change", (event) => {
                    const chosenValue = event.target.value;
                    return chosenValue;
                })
            }

            // Create an object for the new service
            if (entityList === servicesList) {
                const entity = {
                    title: addFormInput.value,
                    description: addFormTextarea.value
                };
                saveEntity(entity);

            } else if (entityList === usersList) {
                // addFormTitle.textContent = "User Name";
                // modifyFormTitle.textContent = "User Name";
                const userType = selectOption(addFormUserType)

                const entity = {
                    Username: userNameInput.value.trim(),
                    Password: passwordInput.value,
                    Email: emailIput.value,
                    Role: userType,
                }
                saveEntity(entity);
            }
        });  
    }

    addEntity(addButton, usersList, usersListName);
    addEntity(addButton, servicesList, servicesListName);

    // function addButton(view, entityList) {
    //     addButton.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         // Create an object for the new service

    //         if (view === service) {
    //             const newService = {
    //                 title: addFormInput.value,
    //                 description: addFormTextarea.value
    //             }

    //             entityList.push(newService);
    //             localStorage.setItem('myServices', JSON.stringify(entityList));
    //             alert(`${view} added! Check the Home page.`);

    //         } else if (view == user) {
    //             const userType = addFormUserType.addEventListener("change", (event) => {
    //                 const chosenValue = event.target.value;
    //             })

    //             const newUser = {
    //                 Username: userNameInput.value.trim(),
    //                 Password: passwordInput.value,
    //                 Email: emailIput.value,
    //                 Role: userType,
    //             }
    //         }

            // Add new service to the list and save back to localStorage
    //         servicesList.push(newService);
    //         localStorage.setItem('myServices', JSON.stringify(entityList));
    //         alert(`${view} added! Check the Home page.`);
    //         // addFormInput.value = '';
    //         // addFormTextarea.value = '';
    //         window.location.reload();
    //     });
    // }


    // Admin Name (Analytics Logic)
    adminUser.forEach((user, index) => {
        adminUserName.textContent = "yo buddy";
        if (lenAdminUser == 1) {
            adminUserName.textContent = adminUser[0];
        }
        if (index > -1 && lenAdminUser > 2) {
            adminUserName.textContent = adminUser[lastindex];
        }
    })

    // Last connection time logic
    let LastindexTime = lenOfTimeArray - 1;
    savedConnectedTime.forEach((time, index) =>{
        if (lenOfTimeArray == 1) {
            lastTimeConnected.textContent = savedConnectedTime[0];
        }
        if (index > -1 && lenOfTimeArray > 1) {
            lastTimeConnected.textContent = savedConnectedTime[LastindexTime - 1];
        }
        if (lenOfTimeArray > 10) {
            savedConnectedTime.splice(0, 5);
        }
    })

    // Admin Service Table Logic
    if (tableContainer) {
        // Render the Services or Users Stored in the localstorage
        servicesList.forEach(service => {
            const tableRowRender = document.createElement('tr');
            
            const titleCell = document.createElement('td');
            titleCell.textContent = service.title;

            const descCell = document.createElement('td');
            descCell.textContent = service.description;

            const actionCell = document.createElement('td');
            actionCell.innerHTML = `<div class="table-buttons">
                                        <button class="modify-btn"><img src="../icons/edit.png" alt="Edit"></button>
                                        <button class="delete-btn"><img src="../icons/delete.png" alt="Delete"></button>
                                    </div>`;

            tableRowRender.append(titleCell, descCell, actionCell);
        tableData.appendChild(tableRowRender);
        });

        // Delete Button Logic
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                if (index > -1) {
                    servicesList.splice((index), 1);
                }
                localStorage.setItem('myServices', JSON.stringify(servicesList));
                window.location.reload();
            })
        });
        
        // Modification Button Logic
        const modifyButton = document.querySelectorAll(".modify-btn");
        modifyButton.forEach((button, index) => {
            button.addEventListener('click',function(e) {
                e.preventDefault();

                if (index > -1) {
                    modifyForm.style.display = 'flex';
                    modifyServiceTitle.textContent = servicesList[index].title;
                    modifyServiceDescription.textContent = servicesList[index].description;

                    // Apply Changes for modal form
                    applyChangeBtn.addEventListener('click', function(e) {
                        servicesList[index].title = modifyServiceTitle.value;
                        servicesList[index].description = modifyServiceDescription.value;
                        localStorage.setItem('myServices', JSON.stringify(servicesList));                        
                    })
                }
            })
        });

        // Modal Close Button Logic
        function modalBtnClose(btn, form) {
            function modalCloseStyling() {
                return form.style.display = 'none', modifyServiceTitle.textContent = '', modifyServiceDescription.textContent = '';
            }

            if (btn == discardChangeBtn) {
                btn.addEventListener('click', function(e) {
                    if (form) {
                        modalCloseStyling()
                    }
                })
            } else {
                btn.forEach(button => {
                    button.addEventListener('click', function(e) {
                        if (form) {
                            modalCloseStyling()
                        }
                    })
                }) 
            }
        }
        
        // Modal Close Function Call
        modalBtnClose(closeButton, modifyForm);
        modalBtnClose(closeButton, addForm);

        // Discharge changes Funtion call through modalBtnClose
        modalBtnClose(discardChangeBtn, modifyForm);

        // Add Service Button and Close Button
        tableAddButton.addEventListener('click', function(e) {
            addForm.style.display = 'flex';
        })

    };
}

                    // --- INDEX PAGE LOGIC---

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
    
    servicesList.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';

        // Protection against XSS through innerHTML
        const serviceTitle = document.createElement('h2');
        serviceTitle.textContent = service.title;
        const serviceDiv = document.createElement('div');
        serviceDiv.className = 'service-card-description';
        const serviceP = document.createElement('p');
        serviceP.textContent = service.description;
        serviceDiv.append(serviceP);

        serviceCard.append(serviceTitle, serviceDiv);
        serviceContainer.append(serviceCard);
    });
}


