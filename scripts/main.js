// Index Page Variables
const heroTitle = document.getElementById('hero-section-title');
const serviceContainer = document.querySelector("#services-card-container");
const numReview = document.querySelector(".summary-review-info");
const date = new Date();
// Admin Page Variables
const adminPage = document.getElementById("admin-dashboard");
const adminUserName = document.querySelectorAll(".userName");
// Sidebar Links 
const serviceSideBar = document.getElementById('service-sidebar');
const userSideBar = document.getElementById('user-sidebar');
// Dashboard Analytics
const lastTimeConnected = document.getElementById("last-time-connected");
let numServices = document.getElementById("number-services");
let services = 0;
// Modal forms variables
const modifyForm = document.getElementById("modify-form-container");
const addForm = document.querySelector('.add-form-container');
// Modal form button variable
const addButton = document.getElementById('form-add-btn');
const tableAddButton = document.getElementById('table-add-btn');
const closeButton = document.querySelectorAll(".close-btn");
const applyChangeBtn = document.getElementById("apply-changes-btn");
const discardChangeBtn = document.getElementById("discard-changes-btn");
// Modal forms input variables
const addFormInput = document.getElementById('add-form-input');
const addFormTextarea = document.getElementById('add-form-textarea');
const modifyServiceTitle = document.getElementById("modify-form-input");
const modifyServiceDescription = document.getElementById("modify-form-textarea");
// Table varaible
const tableContainer = document.getElementById("table-container");
const tableData = document.getElementById("table-data");
// LocalStorage Variables
const servicesList = JSON.parse(localStorage.getItem('myServices')) || [];
const usersList = JSON.parse(localStorage.getItem('Users')) || [];
const adminUser = JSON.parse(localStorage.getItem('AdminUser')) || [];
const savedConnectedTime = JSON.parse(localStorage.getItem('LastConnectionTime')) || [];

                    // --- ADMIN PAGE LOGIC---
if (adminPage) {
    

    // add service button
    addButton.addEventListener('click', function(e) {
        e.preventDefault();
        // Create an object for the new service
        const newService = {
            title: addFormInput.value,
            description: addFormTextarea.value
        };
        
        // Add new service to the list and save back to localStorage
        servicesList.push(newService);
        localStorage.setItem('myServices', JSON.stringify(servicesList));
        alert("Service added! Check the Home page.");
        addFormInput.value = '';
        addFormTextarea.value = '';
        window.location.reload();
    });

    // Analytics
    if (adminPage) {
        // Admin Name (Analytics Logic)
        let lenAdminUser = adminUser.length;

        adminUser.forEach((user, index) => {
            adminUserName.forEach(adminname => {
                let lastindex = lenAdminUser - 1;
                adminname.textContent = "yo buddy";
                if (lenAdminUser == 1) {
                    adminname.textContent = adminUser[0];
                };
                if (index > -1 && lenAdminUser > 2) {
                    adminname.textContent = adminUser[lastindex];
                };
            }) 
        })

        // Number Of Service Added (Analytics Logic)
        servicesList.forEach(service => {
            services += 1;
        })
        numServices.textContent = `${services}`;

        // Last connection time logic
        let lenOfTimeArray = savedConnectedTime.length;
        let Lastindex = lenOfTimeArray - 1;

        savedConnectedTime.forEach((time, index) =>{
            if (index > -1 && lenOfTimeArray > 1) {
                lastTimeConnected.textContent = savedConnectedTime[Lastindex - 1];
            };
            
            if (lenOfTimeArray == 1) {
                lastTimeConnected.textContent = savedConnectedTime[0];
            };
            
        })
    }

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
            actionCell.innerHTML = ` <div class="table-buttons">
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
                console.log(index);
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
                    console.log(servicesList[index].title);

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
    console.log(servicesList);
}


