let modal = document.querySelector('#error-modal');
let text = document.querySelector('#error-text')
let closeBtn = document.querySelector('#close-modal');

const loginText = 'Either email or password is incorrect.';
const regsiterText = 'Either email or password is formatted incorrectly.';

const hideModal = () => {
    console.log('working');
    modal.setAttribute('hidden', true);
    text.setAttribute('hidden', true);
    closeBtn.setAttribute('hidden', true);
};
const displayModal = error => {
    console.log('running');
    text.innerHTML = error;
    modal.removeAttribute('hidden')
    text.removeAttribute('hidden')
    closeBtn.removeAttribute('hidden')
    closeBtn.addEventListener('click', hideModal);
};



async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            console.log(JSON.stringify(response.statusText));
            displayModal(loginText);
            // alert(response.statusText);
        }
    }
}

async function regsiterFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-regsiter').value.trim();
    const email = document.querySelector('#email-regsiter').value.trim();
    const password = document.querySelector('#password-regsiter').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            displayModal(regsiterText);
            // alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.regsiter-form').addEventListener('submit', regsiterFormHandler);
