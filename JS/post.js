
// ==================================================               =================================================================

/* const post = {
    'Id': Int32Array
    'Title': String,
    'Content': String,
    'Author': String,
    'Published': String,
    'CreatedAt': String,
    'UpdatedAt': String,
}; */

const post = [ Int32Array, String, String, String, String, String, String ];
const contentPost = [String];

const refreshPage = () => {
    window.location.reload();
};

const getDate = () => {
    let date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset(), date.getSeconds(), null);
    // date.setMilliseconds(null);
    return date.toISOString().slice(0, -1);
};

const changeUpdatedNull = (str) => {
    return str === '' ? 'No updated' : str;
};

// ==================================================               =================================================================

const openModal = (data) => {
    let text = getItem(data[2]).join(',');
    document.querySelector('#modal-title-user').innerText = data[1];
    document.querySelector('#modal-body-user').children[0].innerText = text;
};

const createPostsCards = () => {
    const posts = getArrayItems('posts');
    for (let i = posts.length - 1; i >= 0; i--) {
        if (posts[i][4] !== 'No') {
            let text = getItem(posts[i][2]).join(',');

            document.querySelector('#posts-container').innerHTML += `<div class="card col-md-4 p-2">
                        <div class="card-body">
                            <h5 class="card-title"> ${posts[i][1]} </h5>
                            <p class="card-text"> ${text.substring(0, 200)} </p>
                            <p class="card-text text-end">
                                <button type="button" id="openModal_${i}" class="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#modal_two">
                                    Open post
                                </button>
                            </p>
                        </div>
                    </div>`;
        }
    }
};

const giveFunctionButtonsModals = () => {
    const posts = getArrayItems('posts');
    for (let i = 0; i < posts.length; i++) {
        if (posts[i][4] !== 'No') {
            button = '#openModal_' + String(i);
            document.querySelector(button).addEventListener('click', () => {
                openModal(posts[i]);
            }, false);
        }
    }
};

// ==================================================               =================================================================

const btnCreateNew = document.querySelector('#container-btn-new-post').children[0];
const btnClose = document.querySelector('.modal-header').children[1];
const btnCancel = document.querySelector('.modal-footer').children[0]; // console.log(btnCancel);
const btnCreate = document.querySelector('.modal-footer').children[1]; // console.log(btnCreate);
const btnDeleteTable = document.querySelector('#delete-table');

const modal = document.querySelector('.modal');
const titleModal = document.querySelector('.modal-title');
const tableData = document.querySelector('.modal-body').children[0];


const thead = document.querySelector('.thead');
const tbody = document.querySelector('.tbody');

const resetValuesPost = () => {
    tableData.reset();

    return 'Ok';
};

const getValuesPost = () => {
    for (let i = 0; i < 7; i++) {
        post[i] = ( i === 4 ) ? (tableData.children[4].children[1].children[0].checked ? 'Yes' : 'No') : tableData.children[i].children[1].children[0].value;

        if ( i === 2 ) {
            post[2] = 'post#' + tableData.children[0].children[1].children[0].value + '_' + tableData.children[3].children[1].children[0].value;
            contentPost[0] = tableData.children[2].children[1].children[0].value;
        }

    }

    return 'Ok';
};

const getButtonsManager = () => {
    let login = getArrayItem('user', 0);

    if ( login.length === 0 ) {
        document.querySelector('#main-user-login').classList.add('d-none');
        document.querySelector('#container-btn-new-post').classList.add('d-none');
        document.querySelector('#container-btn-delete').classList.add('d-none');
        createPostsCards();
        giveFunctionButtonsModals();
    }
};

const getHeaderForTable = () => {
    let content = ``;
    let login = getArrayItem('user', 0);

    if ( login.length === 0 ) {
        content += `<tr> <th>Title</th> <th>Author</th> <th>Published</th> <th>CreatedAt</th> <th>UpdatedAt</th> </tr>`;
    } else {
        content += `<tr> <th>Title</th> <th>Author</th> <th>Published</th> <th>CreatedAt</th> <th>UpdatedAt</th> <th>Mantainers</th> </tr>`;
    }

    return content;
};

const getDataForTable = () => {
    let content = ``;
    let login = getArrayItem('user', 0);
    let data = getArrayItems('posts');

    if ( data.length === 0 ) {
        return `<tr>
                <td colspan="6"> <p class="text-center text-danger display-6 fw-bolder">No posts data</p> </td>
            </tr>`;
    }

    if ( login.length === 0 ) {
        for ( let i = 0; i < data.length; i++ ) {
            content += `<tr>
                <td> ${ data[i][1] } </td> <td> ${ data[i][3] } </td> <td> ${ data[i][4] } </td> <td> ${ data[i][5] } </td> <td> ${ changeUpdatedNull(data[i][6]) } </td>
            </tr>`;
        }
    } else {
        for ( let i = 0; i < data.length; i++ ) {
            content += `<tr>
                <td> ${ data[i][1] } </td> <td> ${ data[i][3] } </td> <td> ${ data[i][4] } </td> <td> ${ data[i][5] } </td> <td> ${ changeUpdatedNull(data[i][6]) } </td>
                <td> <button type="button"" id="btnEdit_${ i }" class="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#modal_one">Edit</button> |
                <button type="button" class="btn btn-danger" id="btnDelete_${ i }" onclick="">Delete</button> </td>
            </tr>`;
        }
    }

    return content;
};

const giveValuesCreate = (name) => {
    tableData.children[3].children[1].children[0].value = name;

    tableData.children[5].classList.contains('d-none') ? tableData.children[5].classList.remove('d-none') : '';
    tableData.children[6].classList.contains('d-none') ? '' : tableData.children[6].classList.add('d-none');

    tableData.children[5].children[1].children[0].value = getDate();

    let data = getArrayItemLastId('posts');

    data === 1
        ? tableData.children[0].children[1].children[0].value = 1
        : tableData.children[0].children[1].children[0].value = data;

};

const giveValuesUpdate = (pos) => {
    tableData.children[5].classList.contains('d-none') ? '' : tableData.children[5].classList.add('d-none');
    tableData.children[6].classList.contains('d-none') ? tableData.children[6].classList.remove('d-none') : '';

    tableData.children[6].children[1].children[0].value = getDate();

    let data = getArrayItem('posts', pos);

    for (let i = 0; i < data.length - 1; i++) {
        if ( i !== 2 && i !== 4 )tableData.children[i].children[1].children[0].value =  data[i];
        if ( i === 2 ) (tableData.children[2].children[1].children[0].value = getItem(data[2]).join(','));
        if ( i === 4 ) (tableData.children[4].children[1].children[0].checked = data[4] === 'Yes' ? true : false);
    }
};

const giveValuesForDefault = (title, pos) => {
    let login = getArrayItem('user', 0);
    if ( login.length === 0 ) return;

    btnCreate.innerText = title;
    titleModal.innerText = title + ' post';

    if ( title === 'Create' && pos === null ) giveValuesCreate(login[0] + ' '+ login[1]);

    if ( title === 'Update' && pos !== null ) giveValuesUpdate(pos);

};

const giveFunctionToButtons = () => {
    let login = getArrayItem('user', 0);
    let posts = getArrayItems('posts');

    if ( posts.length === 0 ) return;
    if ( login.length === 0 ) return;

    for ( let i = 0; i < posts.length; i++ ) {
        btnEdit = '#btnEdit_' + i;
        document.querySelector(btnEdit).addEventListener('click', () => {
            giveValuesForDefault('Update', i);
        }, false);

        btnDelete = '#btnDelete_' + i;
        document.querySelector(btnDelete).addEventListener('click', () => {
            let aux = getArrayItem('posts', i);
            deleteItem(aux[2]);
            deleteArrayItem('posts', i);
            // window.location.reload();
            tbody.innerHTML = getDataForTable();
            giveFunctionToButtons();
        }, false);

    }

};

const createPost = () => {
    const getValue = getValuesPost();
    if ( getValue !== 'Ok') alert('Esta mal algo al momento de obtener los datos del post');

    const postResult = insertItem('posts', post);
    const contentResult = insertItem(post[2], contentPost[0]);
    const reset = resetValuesPost();

    if ( postResult !== 'Ok' && contentResult !== 'Ok' && reset !== 'Ok' ) alert('Esta mal algo al momento de crear el post!!!');

    tbody.innerHTML = getDataForTable();
    giveValuesForDefault('Create', null);
    giveFunctionToButtons();
};

const updatePost = () => {
    const getValue = getValuesPost();
    if ( getValue !== 'Ok') alert('Esta mal algo al momento de obtener los datos del post');

    const postResult = updateItem('posts', post);
    const removeContentResult = deleteItem(post[2]);
    const contentResult = insertItem(post[2], contentPost[0]);
    let pos = getArrayItemById('posts', post[0]);
    const reset = resetValuesPost();

    if ( postResult !== 'Ok' && removeContentResult !== 'Ok' && contentResult !== 'Ok' && reset !== 'Ok' ) alert('Esta mal algo al momento de actualizar el post!!!');

    tbody.innerHTML = getDataForTable();
    giveValuesForDefault('Update', pos);
    giveFunctionToButtons();
};

// console.log(user);

btnCreateNew.addEventListener('click', () => {
    giveValuesForDefault('Create', null);
}, false);

btnClose.addEventListener('click', () => {
    const result = resetValuesPost();
    if (result !== 'Ok') alert('Esta mal algo al momento de restablecer los campos del formulario');
}, false);

btnCancel.addEventListener('click', () => {
    const result = resetValuesPost();
    if (result !== 'Ok') alert('Esta mal algo al momento de restablecer los campos del formulario');
}, false);

btnCreate.addEventListener('click', () => {
    if ( btnCreate.textContent.includes('Create') ) { createPost(); }
    if ( btnCreate.textContent.includes('Update') ) { updatePost(); }
}, false);

btnDeleteTable.addEventListener('click', () => {
    const result = deleteItem('posts');
    if (result !== 'Ok') alert('Esta mal algo al momento de eliminar los posts!!!');
    tbody.innerHTML = getDataForTable();
}, false);

window.addEventListener('load',() => {
    getButtonsManager();
    thead.innerHTML = getHeaderForTable();
    tbody.innerHTML = getDataForTable();
    giveFunctionToButtons();
},false);
