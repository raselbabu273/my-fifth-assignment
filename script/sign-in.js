document.getElementById('sign-in-btn').addEventListener('click', function () {
    // 1. get the mobile number input
    const inputUsername = document.getElementById('input-username');
    const username = inputUsername.value;


    // 2. get the pin input
    const inputPassword = document.getElementById('input-password');
    const password = inputPassword.value;


    // 3. match pin & mobile number
    if (username === 'admin' && password === 'admin123') {

        // 3-1. true:::>> alert > homepage
        alert('Login Successful');
        // window.location.assign('/home.html');
    }
    else {
        // 3-2. false:::>> alert > return
        alert('Login Failed');
        return;
    }

    // clean input field
    inputNumber.value = '';
    inputPin.value = '';
})