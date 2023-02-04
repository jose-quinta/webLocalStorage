// alert('Hola buena tarde')

// ==================================================               =================================================================

const deleteItems = () => {
    window.localStorage.clear()
    return 'Ok';
};

const deleteItem = ( key ) => {
    window.localStorage.removeItem( key );
    return 'Ok';
};

const getSizeLocalStorageUser = () => {
    for (let i = 0; i < window.localStorage.length; i++) {
        console.log(window.localStorage.key(i));
    }
};

const getItem = ( key ) => {
    let response = window.localStorage.getItem(key);

    if ( response === '' || response === null ) {
        return [];
    }

    if ( response.indexOf('|') !== -1 ) {
        response = response.split('|');
        for (let i = 0; i < response.length; i++) {
            response[i] = response[i].split(',');
        }
        response = Array(response);

        return response[0];
    }
    response = response.split(',');

    response = Array(response);
    return response;
};

const getArrayItems = ( key ) => {
    let request = getItem(key);

    return request;
};

const getArrayItemById = ( key, id ) => {
    id = typeof(id) === String ? id : String(id);
    let pos = 0;
    let response = getArrayItems(key);
    if ( response.length === 0 ) return [];

    for (let i = 0; i < response.length; i++) {
        if ( response[i][0] === id ) pos = i;
    }

    return pos;
};

const getArrayItemLastId = ( key ) => {
    let response = getArrayItems(key);
    if ( response.length === 0 ) { return 1; }
    else { return parseInt(response[response.length - 1][0]) + 1; }
};

const getArrayItem = ( key, pos ) => {
    let response = getArrayItems(key);
    //console.log(response[pos]);
    return response.length === 1 ? response[pos] : response !== [] && response.length > 1 ? response[pos] : [];
};

const insertItem = ( key, request ) => {
    let response = getArrayItems(key);
    if ( response.length === 0 ) {
        window.localStorage.setItem(key, request.toString());
    } else {
        response = response.join('|') + '|' + request.toString();
        window.localStorage.setItem(key, response);
    }

    return 'Ok';
};

const updateItem = ( key, request ) => {
    let response = getArrayItems(key);

    let pos = getArrayItemById(key, request[0]);
    if ( pos === [] ) return 'No';

    response[pos] = request;
    deleteItem(key);

    return response.length > 1 ? insertItem(key, response.join('|')) : insertItem(key, response);
};

const deleteArrayItem = ( key, pos ) => {
    let response = getArrayItems(key);
    response.splice(pos, 1);
    deleteItem(key);

    return response.length > 1 ? insertItem(key, response.join('|')) : insertItem(key, response);
};

// ==================================================               =================================================================
const navbar = document.querySelector('nav.navbar');

const fixed_top_navbar = () => {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('opacity-75', window.scrollY > 0);
        navbar.classList.toggle('fixed-top', window.scrollY > 0);
    })
};


const dropdown_manager_content = () => {
    let login = getItem('user');

    if ( login.length === 0 ) {
        document.querySelector('#manager-content').classList.add('d-none');
        document.querySelector('#manager-content').nextElementSibling.classList.remove('d-none');
    } else {
        document.querySelector('#manager-content').classList.remove('d-none');
        document.querySelector('#manager-content').nextElementSibling.classList.add('d-none');
    }
};

const home = document.querySelector('.navbar-nav').children;
// console.log(home);

const active_link = () => {
    for (let i = 0; i < home.length; i++) {
        if (document.title === home[i].innerText) {
            let address = home[i].children;

            if (address.length > 2) {
                // nada por el momento

            } else {
                address[0].classList.add('active');
                address[0].setAttribute('area-current', 'page');
                // console.log(address);

            }
        }
    }
};

// ==================================================               =================================================================

const manager = document.querySelector('ul.navbar-nav.identity');
//console.log(manager);

const show_manager_identity = () => {
    const login = getArrayItem('user', 0);
    const user_name = login[0] + ' ' + login[1];

    const list_items = [
        `<li class="nav-item btn"> <a href="../Identity/manager.html#register" class="nav-link text-white">Register</a> </li>`,
        `<li class="nav-item btn"> <a href="../Identity/manager.html#login" class="nav-link text-white">Log in</a> </li>`,
        `<li class="nav-item btn"> <a href="../Identity/manager.html#profile" class="nav-link text-white">${ user_name }</a> </li>`,
        `<li class="nav-item btn"> <a href="../index.html" id="logout" class="nav-link text-white">Log out</a> </li>`
    ];

    if ( login.length === 0  ) {
        manager.innerHTML += list_items[0] + list_items[1];
    } else {
        manager.innerHTML += list_items[2] + list_items[3];
        document.querySelector('#logout').addEventListener('click', () => {
            let result = deleteItem('user');
            if ( result === 'Ok' ) {
             window.location = window.location.host + '/index.html';
            }
        }, false);
    }

};

// ==================================================               =================================================================

const initial_local_storage = () => {

    const users = getArrayItem('users', 0);
    if ( users.length === 0 ) {
        const initial_user =[
            ['Max', 'Smith', '22', 'Student', 'Single', 'max.smith@gmail.com', 'maxsmith']
        ];
        insertItem('users', initial_user);
    }

    const posts = getArrayItem('posts', 0);
    if ( posts.length === 0 ) {
        const initial_posts = [
            ['1', 'Integer (computer science)', 'post#1_Max Smith', 'Max Smith', 'No', '2023-02-03T12:17:53', '2023-02-03T19:04:03'],
            ['2', 'Floating Number', 'post#2_Max Smith', 'Max Smith', 'No', '2023-02-03T12:25:46', '2023-02-03T19:03:57'],
            ['3', 'Double is a wrapper class', 'post#3_Max Smith', 'Max Smith', 'Yes', '2023-02-03T13:37:40', ''],
            ['4', 'Array', 'post#4_Max Smith', 'Max Smith', 'Yes', '2023-02-03T13:38:47', ''],
            ['5', 'String', 'post#5_Max Smith', 'Max Smith', 'Yes', '2023-02-03T13:38:56', ''],
            ['6', 'Object', 'post#6_Marcus Smith', 'Marcus Smith', 'No', '2023-02-03T18:13:15', ''],
            ['7', 'Classes', 'post#7_Marcus Smith', 'Marcus Smith', 'Yes', '2023-02-03T18:15:06', '2023-02-03T18:20:19'],
            ['8', 'constructor', 'post#8_Marcus Smith', 'Marcus Smith', 'Yes', '2023-02-03T18:16:10', '']
        ];

        const initial_posts_content = [
            ['In computer science', ' an integer is a datum of integral data type', ' a data type that represents some range of mathema…in a computer as a group of binary digits (bits).'],
            ['What can I do to avoid this problem?\n\nThat depends…If you really need your results to add up exactly', ' especially when you work with money: use a specia…ing it.\nIf you have no decimal datatype available', ' an alternative is to work with integers', ' e.g. do money calculations entirely in cents. But this is more work and has some drawbacks.'],
            ['The Double class wraps a value of the primitive ty…a single field whose type is double.\n\nIn addition', ' this class provides several methods for converting a double to a String and a String to a double', ' as well as other constants and methods useful when dealing with a double.'],
            ['The Array object', ' as with arrays in other programming languages', ' enables storing a collection of multiple items under a single variable name', ' and has members for performing common array operations.\n\nDescription\nIn JavaScript', " arrays aren't primitives but are instead Array ob…ypes. (When those characteristics are undesirable", ' use typed arrays instead.)\nJavaScript arrays are not associative arrays and so', ' array elements cannot be accessed using arbitrary strings as indexes', ' but must be accessed using nonnegative integers (…exed: the first element of an array is at index 0', ' the second is at index 1', ' and so on — and the last element is at the value …with any JavaScript objects create shallow copies', ' rather than deep copies).'],
            ['The String object is used to represent and manipul…d operations on strings are to check their length', ' to build and concatenate them using the + and += string operators', ' checking for the existence or location of substrings with the indexOf() method', ' or extracting substrings with the substring() method.'],
            ["The Object type represents one of JavaScript's dat…perties (including methods) from Object.prototype", ' although these properties may be shadowed (a.k.a.…om Object.prototype are those with null prototype', ' or descended from other null prototype objects.\n\n…re seen by all objects through prototype chaining', ' unless the properties and methods subject to thos…or extend object behavior. To make it more secure', ' Object.prototype is the only object in the core J…ject.prototype is always null and not changeable.'],
            ['Classes are a template for creating objects. They …e to classes.\n\nFor more examples and explanations', ' see the Using classes guide.\n\nDescription\nDefining classes\nClasses are in fact "special functions"', ' and just as you can define function expressions and function declarations', ' a class can be defined in two ways: a class expression or a class declaration.'],
            ['The constructor method is a special method of a cl…lass method called constructor cannot be a getter', ' setter', ' async', ' or generator.\nA class cannot have more than one c… methods can be called on an instantiated object.']
        ];

        for (let i = 0; i < initial_posts.length; i++) {
            insertItem('posts', initial_posts[i]);
            insertItem(initial_posts[i][2], initial_posts_content[i]);
        }
    }

};

// ==================================================               =================================================================

window.addEventListener('load',() => {
    initial_local_storage();
    fixed_top_navbar();
    dropdown_manager_content();
    active_link();
    show_manager_identity();

}, false);
