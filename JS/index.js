function signupPage() {
    window.location.href = './signup.html'
}
function loginPage() {
    window.location.href = './index.html'
}

var userName = document.querySelector("#signupName");
var userEmail = document.querySelector("#signupEmail");
var userpass = document.querySelector("#signupPass");
var loginEmail = document.querySelector("#loginEmail");
var loginPass = document.querySelector("#loginPass");
var welcomeMassage = document.querySelector("#welcome");
var users = [];
if (localStorage.getItem("users") != null) {
    users = JSON.parse(localStorage.getItem("users"))
}

// signup

function createAccount() {
    if (validateName() == true && validateEmail() == true && validatePass() == true) {
        for (var i = 0; i < users.length; i++) {
            if (userEmail.value.toLowerCase() == users[i].email.toLowerCase()) {

                document.querySelector(".sucessMassega").innerHTML = 'Email is exist';
                document.querySelector(".sucessMassega").classList.remove('text-success');
                document.querySelector(".sucessMassega").classList.add('text-danger');

                return true;
            }
        }
        var newUser = {
            name: userName.value,
            email: userEmail.value,
            password: userpass.value
        };
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
        document.querySelector(".sucessMassega").classList.remove('d-none');

        console.log("Hello");
    }
    else {
        document.querySelector(".massage").classList.remove('d-none')
    }
}


function validateName() {
    var pattern = /^[a-z][\s|\S]{3,20}$/i;
    var name = userName.value;
    if (pattern.test(name) == true) {
        document.querySelector(".alertName").classList.add('d-none')
        userName.classList.add('is-valid')
        return true;
    }
    else {
        userName.classList.add('is-invalid')
        document.querySelector(".alertName").classList.remove('d-none')
        return false;
    }
}

function validateEmail() {
    var pattern = /^[a-z]*\d*@[a-z]*\.[a-z]{3,5}$/i;
    var email = userEmail.value;
    if (pattern.test(email) == true) {
        document.querySelector(".alertEmail").classList.add('d-none')
        return true;
    }
    else {
        document.querySelector(".alertEmail").classList.remove('d-none')
        return false;
    }
}
function validatePass() {
    var pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    var pass = userpass.value;
    if (pattern.test(pass) == true) {
        document.querySelector(".alertPass").classList.add('d-none')
        return true;
    }
    else {
        document.querySelector(".alertPass").classList.remove('d-none')
        return false;
    }
}

// login

function loginUser() {
    if (loginEmail.value == "" || loginPass.value == "") {
        document.querySelector(".massage").classList.remove('d-none')
    }
    else if (users.length == 0) {
        document.querySelector(".alertMassage").classList.remove('d-none')
    }
    else {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() == loginEmail.value.toLowerCase() && users[i].password == loginPass.value) {
                // console.log("Good")
                localStorage.setItem("name", JSON.stringify(users[i].name))
                window.location = './home.html'
                load()
            }
            else {
                document.querySelector(".validateMassage").classList.remove('d-none');
            }
        }
    }
}


// Home

function load() {
    welcomeMassage.innerHTML = "welcome" + " " + JSON.parse(localStorage.getItem("name"));
}
function logout() {
    localStorage.removeItem("name")
    window.location = "./index.html"
}
/* var news = [];
var httpReq = new XMLHttpRequest;
httpReq.open("get","https://jsonplaceholder.typicode.com/posts");
httpReq.send()
httpReq.addEventListener("readystatechange",function(){
    if(httpReq.readyState == 4){
        // console.log(httpReq.response)
        news = JSON.parse(httpReq.response)
        var cols="";
        for(var i = 0; i<news.length; i++)
        cols+=` <div class="col-12">
        <div class=" my-3">
            <h3 class="text-warning">${news[i].title}</h3>
            <p class="ms-3">${news[i].body}</p>
        </div>
    </div>
    `

    }
    document.querySelector(".row").innerHTML = cols;
}) */