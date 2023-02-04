
// ==================================================               =================================================================

const login = [String, String];
const user = [ String, String, Int32Array, String, String, String, String ];

const refreshPage = (str) => {
    let url = window.location.origin + window.location.pathname + str;
    // console.log(url);
    window.location = url.toString();
    window.location.reload();
};

const mainPage = () => {
    let url = window.location.origin + '/index.html';
    // console.log(url);
    window.location = url.toString();
};

// ==================================================               =================================================================

const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');

const submitLogin = document.querySelector('#lSubmit');
const submitRegister = document.querySelector('#rSubmit');

const resetLoginForm = () => {
    loginForm.reset();
    return 'Ok';
};

const getValuesFromLoginForm = () => {
    for (let i = 0; i < loginForm.children.length - 1; i++) {
        //console.log(loginForm.children[i].children[1].children[0].value);
        login[i] = loginForm.children[i].children[1].children[0].value;
    }
    // console.log(login);
    return 'Ok';
};

const resetRegisterForm = () => {
    registerForm.reset();
    return 'Ok';
};

const getValuesFromRegisterForm = () => {
    for (let i = 0; i < registerForm.children.length - 1; i++) {
        //console.log(registerForm.children[i].children[1].children[0].value);
        user[i] = registerForm.children[i].children[1].children[0].value;
    }
    // console.log(user);
    return 'Ok';
};


submitRegister.addEventListener('click', () => {
    const getValue = getValuesFromRegisterForm();
    if ( getValue === 'Ok' ) {
        // console.log(user);
    }

    const result = insertItem('users', user);
    const reset = resetRegisterForm();
    if ( result === 'Ok' || reset === 'Ok' ) {
        // console.log(result);
    }

    refreshPage('#login');

}, false);

submitLogin.addEventListener('click', () => {
    const getValue = getValuesFromLoginForm();
    if ( getValue === 'Ok' ) {
        // console.log(user);
    }

    let pos = 0;
    let data = getArrayItems('users');
    for (let i = 0; i < data.length; i++) {
        if ( data[i][5] === login[0] && data[i][6] === login[1] ) {
            pos = i;
            break;
        }
    }

    const result = insertItem('user', getArrayItem('users', pos));
    const reset = resetLoginForm();
    if ( result === 'Ok' && reset === 'Ok' ) {
        console.log(result);
    }

    mainPage();

}, false);


// ==================================================               =================================================================
const toCapitalizer = (str) => str.substr(0,1).toUpperCase() + str.substr(1);

const hidden_divs = () => {
    document.querySelector('#login').classList.add('d-none');
    document.querySelector('#register').classList.add('d-none');
    document.querySelector('#profile').classList.add('d-none');
};

const change_url = () => {
    let hash_url = document.location.hash.replace('#', '');
    document.title = toCapitalizer(hash_url);
    return document.location.hash;
};

const change_display = () => {
    hidden_divs();
    let hash = change_url();

    if ( document.URL.includes(hash) ) {
        document.querySelector(hash).classList.remove('d-none');
        console.log(hash);
    }
};

document.querySelector('#link-register').addEventListener('click', () => {
    refreshPage('#register');

}, false);


document.querySelector('#link-login').addEventListener('click', () => {
    refreshPage('#login');

}, false);

window.addEventListener('load', () => {
    let user_login = getArrayItem('user', 0);

    if ( user_login.length === 0 ) {
        document.querySelector('ul.navbar-nav.identity').children[0].children[0].addEventListener('click', () => {
            change_display();
        }, false);

        document.querySelector('ul.navbar-nav.identity').children[1].children[0].addEventListener('click', () => {
            change_display();
        }, false);

        ( document.URL.includes('#profile') ) ? mainPage() : change_display();

    } else {
        if ( document.URL.includes('#login') || document.URL.includes('#register') ) {
            mainPage();
        } else {
            change_display();
            document.querySelector('#pNameLastname').value = user_login[0] + ' ' + user_login[1];
            document.querySelector('#pAge').value = user_login[2];
            document.querySelector('#pOcupation').value = user_login[3];
            document.querySelector('#pEmail').value = user_login[5];
        }
    }

}, false);

// ==================================================               =================================================================



