// Index Page Variables
const heroTitle = document.getElementById('hero-section-title');
const serviceContainer = document.querySelector("#services-card-container");
const numReview = document.querySelector(".summary-review-info");
const date = new Date();


// Admin Page Variables
const adminPage = document.getElementById("admin-panel");
const adminUserName = document.querySelectorAll(".userName");

const addServiceTitle = document.getElementById('service-title');
const addServiceDescription = document.getElementById('service-description');

const tableContainer = document.getElementById("table-container");
const serviceTable = document.getElementById("table-data");

// Modal forms
const modifyForm = document.getElementById("modify-form-container");
const addForm = document.querySelector('.add-form');

const lastTimeConnected = document.getElementById("last-time-connected");

// Sidebar Links 
const dashboardSideBar = document.getElementById('dashboard-sidebar');
const userSideBar = document.getElementById('user-sidebar');

// Dashboard Analytics
const dashboardPanel = document.getElementById('dashboard-panel');
const userPanel = document.getElementById('user-table');
let numServices = document.getElementById("number-services");
let services = 0;

// Button
const addButton = document.getElementById('form-add-btn');
const tableAddButton = document.getElementById('table-add-btn');
const closeButton = document.querySelectorAll(".close-btn");

const applyChangeBtn = document.getElementById("apply-changes-btn");
const discardChangeBtn = document.getElementById("discard-changes-btn");

                    // --- ADMIN PAGE LOGIC---
if (adminPage) {

    // add service button
    if (addButton) {
        addButton.addEventListener('click', function(e) {
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

        // Admin Name (Analytics Logic)
        const adminUser = JSON.parse(localStorage.getItem('AdminUser')) || [];
        let lenAdminUser = adminUser.length;
        
        adminUser.forEach((user, index) => {
            adminUserName.forEach(adminname => {
                let lastindex = lenAdminUser - 1;

                adminname.textContent = "yo buddy";
                if (lenAdminUser == 1) {
                    adminname.textContent = adminUser[0];
                ``};

                if (index > -1 && lenAdminUser > 2) {
                    adminname.textContent = adminUser[lastindex];
                };
            }) 
        });

        // Number Of Service Added (Analytics Logic)
        const savedServices = JSON.parse(localStorage.getItem('myServices')) || [];

        savedServices.forEach(service => {
            services += 1;
        })

        numServices.textContent = `${services}`;

        // Last connection time logic
        const savedConnectedTime = JSON.parse(localStorage.getItem('LastConnectionTime')) || [];

        let lenOfTimeArray = savedConnectedTime.length;
        let Lastindex = lenOfTimeArray - 1;

        savedConnectedTime.forEach((time, index) =>{
            if (index > -1 && lenOfTimeArray > 1) {
                lastTimeConnected.textContent = savedConnectedTime[Lastindex - 1];
            };
            
            if (lenOfTimeArray == 1) {
                lastTimeConnected.textContent = savedConnectedTime[0];
            };
            
        });

    }

    // Admin Service Table Logic
    if (tableContainer) {
        const savedServices = JSON.parse(localStorage.getItem('myServices')) || [];
        
        savedServices.forEach(service => {
            const serviceCard = document.createElement('tr');
            
            const titleCell = document.createElement('td');
            titleCell.textContent = service.title;

            const descCell = document.createElement('td');
            descCell.textContent = service.description;

            const actionCell = document.createElement('td');
            actionCell.innerHTML = ` <div class="table-buttons">
                                        <button class="modify-btn"><img src="../icons/edit.png" alt="Edit"></button>
                                        <button class="delete-btn"><img src="../icons/delete.png" alt="Delete"></button>
                                    </div>`;

            serviceCard.append(titleCell, descCell, actionCell);
        serviceTable.appendChild(serviceCard);
        });

        // Delete Button Logic
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

                    // Apply Changes for modal form
                    applyChangeBtn.addEventListener('click', function(e) {

                        savedServices[index].title = modifyServiceTitle.value;
                        savedServices[index].description = modifyServiceDescription.value;
                        localStorage.setItem('myServices', JSON.stringify(savedServices));                        
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
    const savedServices = JSON.parse(localStorage.getItem('myServices')) || [];
    
    savedServices.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `<h2>${service.title}</h2><div class="service-card-description"><p>${service.description}</p></div>`;
        serviceContainer.appendChild(serviceCard);
    });
    console.log(savedServices);
}


