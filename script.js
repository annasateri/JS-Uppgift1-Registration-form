// en array med objekt i
let users = []

// deklarerar
const regForm = document.querySelector('#regForm');
const firstName = document.querySelector('#firstName');
const firstNameError = document.querySelector('#firstName-error');
const lastName = document.querySelector('#lastName');
const lastNameError = document.querySelector('#lastName-error');
const email = document.querySelector('#email');
const emailError = document.querySelector('#email-error');
const list = document.querySelector('#list');
const submit = document.querySelector('#btnSubmit');
let changeBtn = false;
let userId

// funktion för att addera användaren
const listUsers = () => {
    list.innerHTML = '';

// loopa igenom arrayen
    users.forEach(user => {
        list.innerHTML +=
        `<div id="${user.id}" class="listContent text-white">
            <div>​​​​${user.firstName} ${user.lastName}
                <br>
                <span id="emailUser">${user.email}</span>
            </div>
            <div>
                <button class="btn text-white changeBtn">Edit</button>
                <button class="btn text-white removeBtn">Delete</button>
            </div>
        </div>`
    })
}

listUsers();


// validerar förnamn genom en funktion
const validateFirstName = () => {

    if(firstName.value === '') {
        firstNameError.innerText = 'You must enter a first name';
        firstName.classList.add('is-invalid');
    }
    else if(firstName.value.length < 2) {
        firstNameError.innerText = 'You must enter at least two characters';
        firstName.classList.add('is-invalid');
    }
    else {
        firstName.classList.remove('is-invalid');
        firstName.classList.add('is-valid');
        firstNameError.innerText = ''
        return true
    }
}

// validerar efternamn genom en funktion
const validateLastName = () => {

    if(lastName.value === '') {
        lastNameError.innerText = 'You must enter a last name';
        lastName.classList.add('is-invalid');
    }
    else if(lastName.value.length < 2) {
        lastNameError.innerText = 'You must enter at least two characters';
        lastName.classList.add('is-invalid');
    }
    else {
        lastName.classList.remove('is-invalid');
        lastName.classList.add('is-valid');
        lastNameError.innerText = ''
        return true
    }
}

// validerar email genom en funktion
const validateEmail = () => {
    const regularExpression = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    const check = regularExpression.test(email.value)

    if(email.value === '') {
        emailError.innerText = 'You must enter a valid email address';
        email.classList.add('is-invalid');
    }
    else if(check == false) {
        emailError.innerText = 'This email address is not valid';
        email.classList.add('is-invalid');
    }
    else {
        emailError.innerText = ''
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
        return true
    }
}

// funktion för ändra knappen
const changeUser = (id) => {
    return users.map(user => {
        if(user.id === id)
        return {
            id: user.id,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value
        }
        return user
    })
}


// när du trycker på submit så kör vi funktionerna som görs ovanför
regForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(changeBtn === true) {
        users = changeUser(userId);
        changeBtn = false
        submit.innerText = 'Register'
        listUsers();
        // gör fälten tomma efter submit
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        return
    }

    validateFirstName();
    validateLastName();
    validateEmail();

// kollar så att email adressen inte redan finns i listan
    if(users.some(user => user.email === email.value)) {
        emailError.innerText = 'This email address already exists'
        email.classList.add('is-invalid');
        return false
    }

// om validering stämmer så kommer en ny användare läggas till i listan
    if(validateFirstName() == true && validateLastName() == true && validateEmail() == true) {
        // tar bort grön ruta efter submit
        firstName.classList.remove('is-valid');
        lastName.classList.remove('is-valid');
        email.classList.remove('is-valid');
        let newUser = {
            id: Date.now().toString(),
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value
        }
        users.push(newUser);
        listUsers();
        // gör fälten tomma efter submit
        firstName.value = '';
        lastName.value = '';
        email.value = '';
    }

})

list.addEventListener('click', (e) => {
    if(e.target.classList.contains('removeBtn')) {
        users = users.filter(deleteUser => deleteUser.id !== e.target.parentNode.parentNode.id)
        listUsers();
    }

    if(e.target.classList.contains('changeBtn')) {
        submit.innerText = 'Save'
        changeBtn = true
        userId = e.target.parentNode.parentNode.id
        let user = users.find(user => user.id == e.target.parentNode.parentNode.id)
        let changeFirstName = user.firstName;
        let changeLastName = user.lastName;
        let changeEmail = user.email;
        firstName.value = changeFirstName;
        lastName.value = changeLastName;
        email.value = changeEmail;
    }

})