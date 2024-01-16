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
        document.querySelector(".massage").classList.add('d-none')
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
        document.querySelector(".massage").classList.add('d-none')
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
                document.querySelector(".massage").classList.add('d-none')
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
    window.location.href = "./index.html"
}
async function getMovies(){
    var response = await fetch("https://api.themoviedb.org/3/movie/popular?&api_key=d9982e081012628595eddb21900bb7ca")
    response = await response.json()
    console.log(response.results);
    var movies = response.results
    var cols = "";
    for(var i = 0; i<movies.length; i++){
        cols +=`<div class="col-md-4 p-2">
        <div class="movies">
            <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" alt="" class = "w-100">
            <h2>${movies[i].title}</h2>
            <p>${movies[i].overview}</p>
        </div>
    </div>   `
    }
    document.querySelector(".row").innerHTML=cols
}
getMovies()