async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        sessionStorage.setItem('status', null)
        document.location.replace('/');
    } else {
        displayModal(response.statusText);
        // alert(response.statusText);
    }
}
  
document.querySelector('#logout').addEventListener('click', logout);