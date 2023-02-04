
// ==================================================               =================================================================

/* const user = {
    'Name': String,
    'Lastname': String,
    'Age': Int32Array,
    'Ocupation': String,
    'CivilStatus': String,
    'Email': String,
    'Password': String
}; */

const user = [ String, String, Int32Array, String, String, String, String ];

// ==================================================               =================================================================

const btnCreateNew = document.querySelector('#container-btn-new-user').children[0];
const btnClose = document.querySelector('.modal-header').children[1];
const btnCancel = document.querySelector('.modal-footer').children[0]; // console.log(btnCancel);
const btnCreate = document.querySelector('.modal-footer').children[1]; // console.log(btnCreate);
const btnDeleteTable = document.querySelector('#delete-table');

const modal = document.querySelector('.modal');
const titleModal = document.querySelector('.modal-title');
const tableData = document.querySelector('.modal-body').children[0];

const thead = document.querySelector('.thead');
const tbody = document.querySelector('tbody');

const resetValuesUser = () => {
    tableData.reset();

    return 'Ok';
};

const getValuesUser = () => {
    /* user['Name'] = document.querySelector('#Name').value; user['Lastname'] = document.querySelector('#Lastname').value; user['Age'] =  document.querySelector('#Age').value; user['Ocupation'] = document.querySelector('#Ocupation').value; user['CivilStatus'] = document.querySelector('#CivilStatus').value; user['Email'] = document.querySelector('#Email').value; user['Password'] = document.querySelector('#Password').value; */
    /* user[0] = document.querySelector('#Name').value; user[1] = document.querySelector('#Lastname').value; user[2] = document.querySelector('#Age').value; user[3] = document.querySelector('#Ocupation').value; user[4] = document.querySelector('#CivilStatus').value; user[5] = document.querySelector('#Email').value; user[6] = document.querySelector('#Password').value; */
    for (let i = 0; i < 7; i++) {
        user[i] = tableData.children[i].children[1].children[0].value;
    }

    return 'Ok';
};

const getButtonsManager = () => {
    let login = getArrayItem('user', 0);

    if ( login.length === 0 ) {
        document.querySelector('#container-btn-new-user').classList.add('d-none');
        document.querySelector('#container-btn-delete').classList.add('d-none');
    }
};

const getHeaderForTable = () => {
    let content = ``;
    let login = getArrayItem('user', 0);

    if ( login.length === 0 ) {
        content += `<tr> <th>Name Lastame</th> <th>Age</th> <th>Ocupation</th> <th>Civil Status</th> <th>Email</th> </tr>`;
    } else {
        content += `<tr> <th>Name Lastame</th> <th>Age</th> <th>Ocupation</th> <th>Civil Status</th> <th>Email</th> <th>Mantainers</th> </tr>`;
    }

    return content;
};

const getDataForTable = () => {
    let content = ``;
    let login = getArrayItem('user', 0);
    let data = getArrayItems('users');

    if ( data.length === 0 ) {
        return `<tr>
                <td colspan="6"> <p class="text-center text-danger display-6 fw-bolder">No user data</p> </td>
            </tr>`;
    }

    if ( login.length === 0 ) {
        for ( let i = 0; i < data.length; i++ ) {
            content += `<tr> <td> ${data[i][0]}  ${data[i][1]} </td> <td> ${data[i][2]} </td> <td> ${data[i][3]} </td> <td> ${data[i][4]} </td> <td> ${data[i][5]} </td> </tr>`;
        }
    } else {
        for ( let i = 0; i < data.length; i++ ) {
            content += `<tr>
                <td> ${data[i][0]}  ${data[i][1]} </td> <td> ${data[i][2]} </td> <td> ${data[i][3]} </td> <td> ${data[i][4]} </td> <td> ${data[i][5]} </td>
                <td> <button type="button"" id="btnEdit_${ i }" class="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#modal_one">Edit</button> | <button type="button" class="btn btn-danger" id="btnDelete_${i}" onclick="">Delete</button> </td>
            </tr>`;
        }
    }

    return content;
};

const giveValuesCreate = () => {};

const giveValuesUpdate = (pos) => {
    let data = getArrayItem('users', pos);

    for (let i = 0; i < data.length; i++) {
        tableData.children[i].children[1].children[0].value =  data[i]
    }
};

const giveValuesForDefault = (title, pos) => {
    let login = getArrayItem('user', 0);
    if ( login.length === 0 ) return;

    btnCreate.innerText = title;
    titleModal.innerText = title + ' post';

    if ( title === 'Create' && pos === null ) giveValuesCreate();

    if ( title === 'Update' && pos !== null ) giveValuesUpdate(pos);

};

const giveFunctionToButtons = () => {
    let login = getArrayItem('user', 0);
    let users = getArrayItems('users');

    if ( users.length === 0 ) return;

    if ( login.length !== 0 ) {
        for ( let i = 0; i < users.length; i++ ) {
            btnEdit = '#btnEdit_' + i;
            document.querySelector(btnEdit).addEventListener('click', () => {
                giveValuesForDefault('Update', i);
            });

            btnDelete = '#btnDelete_' + i;
            document.querySelector(btnDelete).addEventListener('click', () => {
                deleteArrayItem('users', i);
                tbody.innerHTML = getDataForTable();
            });

        }
    }

};

const createPost = () => {
    const getValue = getValuesUser();
    if ( getValue !== 'Ok' ) alert('Esta mal algo al momento de obtener los datos del usuari@');

    const result = insertItem('users', user);
    const reset = resetValuesUser();

    if ( result !== 'Ok' && reset !== 'Ok' ) alert('Esta mal algo al momento de crear el usuari@!!!');
    tbody.innerHTML = getDataForTable();
    giveValuesForDefault('Create', null);
    giveFunctionToButtons();
};

const updatePost = () => {
    const getValue = getValuesUser();
    if ( getValue !== 'Ok') alert('Esta mal algo al momento de obtener los datos del usuario');

    const result = updateItem('users', user);
    let pos = getArrayItemById('users', user[0]);
    const reset = resetValuesUser();

    if ( result !== 'Ok' && reset !== 'Ok' ) alert('Esta mal algo al momento de actualizar el usuario!!!');

    tbody.innerHTML = getDataForTable();
    giveValuesForDefault('Update', pos);
    giveFunctionToButtons();
};

// console.log(user);

btnCreateNew.addEventListener('click', () => {
    giveValuesForDefault('Create', null);
}, false);

btnClose.addEventListener('click', () => {
    const result = resetValuesUser();
    if (result !== 'Ok') alert('Esta mal algo al momento de restablecer los campos del formulario');
}, false);

btnCancel.addEventListener('click', () => {
    const result = resetValuesUser();
    if (result !== 'Ok') alert('Esta mal algo al momento de restablecer los campos del formulario');
}, false);

btnCreate.addEventListener('click', () => {
    if ( btnCreate.textContent.includes('Create') ) { createPost(); }
    if ( btnCreate.textContent.includes('Update') ) { updatePost(); }
}, false);

btnDeleteTable.addEventListener('click', () => {
    const result = deleteItem('users');
    if (result !== 'Ok') alert('Esta mal algo al momento de eliminar los usuari@s!!!');
    tbody.innerHTML = getDataForTable();

}, false);

window.addEventListener('load',() => {
    getButtonsManager();
    thead.innerHTML = getHeaderForTable();
    tbody.innerHTML = getDataForTable();
    giveFunctionToButtons();
},false);
