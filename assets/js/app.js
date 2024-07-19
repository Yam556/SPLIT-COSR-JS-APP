/* here user is a constructor function
and defining name, email are properties  */
function User(name, email, mobile, photo){
this.name = name;
this.email = email;
this.mobile = mobile;
this.photo = photo;
}

function Expense(description, amount){
    this.description = description;
    this.amount = amount;
    this.isSetteled = false;
    this.date = new Date
    /* here isSetteled and date id not defined in above brackets 
    coz this nis not changable function so we can pass them direnct below */
}
function SplitCostApp(){
    this.unsettledAmount = 0;
    this.users = [];
    /* these are properties of splitcostapp object
    [] these are arrays to hold multiple data 
     */
    this.expenses = [];
    
    this.displayUnsetteledAmount = function() {
        document.querySelector(".amount").textContent =  `$${this.unsettledAmount}`;
    /* here we have t */ 
    }
    this.addUser = function(name, email, mobile, photo) {
        const user = new User(name, email, mobile, photo);
        this.users.push(user);
        this.displayUsers();
    }
    this.displayUsers = function() {
        let userElements = '';
        for(let user of this.users){
            userElements += `<div><img src="${user.photo}" alt="${user.name}" /></div>`
        }
        document.querySelector(".user-wrapper").innerHTML = userElements;
    }
    this.addExpenses = function(event){
        event.preventDefault();
        console.log('Adding expenses...');
        const description = document.querySelector("#description").value;
        /* we use.value to push data we entered in form to show in js */
        const amount = document.querySelector('#amount').value;
        console.log({description, amount});
        const expense = new Expense(description, amount);
        this.expenses.unshift(expense);
        
        
        /*if (description === "" || amount === "") {
            alert("Please fill both fields.");
            
        }
        else{
            return;
        }
            this and below function is same */
        if(description && amount){
            this.displayExpenses();
            document.querySelector("form").reset();
            this.calculateUnsetteledAmount();
            this.displayUnsetteledAmount();

        }

    }
    this.calculateUnsetteledAmount = function(){
        let total = 0;
        for(let expense of this.expenses){
           if(!expense.isSetteled){
            total = total + Number(expense.amount);
           }
        }
        const unsettledAmount = total / this.users.length;
        this.unsettledAmount = unsettledAmount.toFixed(2);
        
    }
    this.addNewEventListener = function(){
        document.querySelector("form").addEventListener("submit", (event) => {
            this.addExpenses(event);
        });
    }
    this.displayExpenses = function(){
        let expenseElement = '';
        for(let expense of this.expenses){
            expenseElement += `
            <div class="expenses-item ${expense.isSetteled ? 'settled' : ''}">
            <div>
                <span>${expense.description}</span>
                <span> $${expense.amount}</span>
            </div>
            <div class="date">${expense.date}</div>
        </div>`
        }
        document.querySelector(".expenses-wrapper").innerHTML = expenseElement;
    }
    this.addSettleNowEventListener = function(){
        document.querySelector("#settlebtn").addEventListener("click", (event) =>{
            this.settleNow(event);
        })
    }
    this.settleNow = function(event){
        console.log('Settling now!');
        this.expenses = this.expenses.map(expense => {
            return {...expense, isSetteled: true};
        });
        this.displayExpenses();
        this.calculateUnsetteledAmount();
        this.displayUnsetteledAmount();
    }
    this.addNewUserEventListemenr = function(){
        document.getElementById("addNewUser").addEventListener('click', () => {
            const randomValue = parseInt(Math.random() * 100);
            this.addUser("suhana", "suhana456@gmail.com","042673564", `https://randomuser.me/api/portraits/men/${randomValue}.jpg`);
            this.calculateUnsetteledAmount();
            this.displayUnsetteledAmount();
        })
    }
}
const splitCostApp = new SplitCostApp();
console.log(splitCostApp);
splitCostApp.displayUnsetteledAmount();
splitCostApp.addUser("Alisa", "alisa123@gmail.com","042455324","https://randomuser.me/api/portraits/women/67.jpg");
splitCostApp.addUser("reena", "reena345@gmail.com","042673124","https://randomuser.me/api/portraits/women/90.jpg");
splitCostApp.addUser("punam", "adpnm414@gmail.com","0426738976","https://randomuser.me/api/portraits/women/57.jpg");
splitCostApp.addUser("suhana", "suhana456@gmail.com","042673564","https://randomuser.me/api/portraits/women/45.jpg");
splitCostApp.addUser("Alisa", "alisa123@gmail.com","042455324","https://randomuser.me/api/portraits/men/67.jpg");
splitCostApp.addUser("reena", "reena345@gmail.com","042673124","https://randomuser.me/api/portraits/men/90.jpg");
splitCostApp.addUser("punam", "adpnm414@gmail.com","0426738976","https://randomuser.me/api/portraits/men/57.jpg");
splitCostApp.addUser("suhana", "suhana456@gmail.com","042673564","https://randomuser.me/api/portraits/men/45.jpg");
splitCostApp.displayUsers();
splitCostApp.addNewEventListener();
splitCostApp.addSettleNowEventListener();
splitCostApp.addNewUserEventListemenr();