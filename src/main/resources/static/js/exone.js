$(document).ready(function () {

    mainPage();

    $('#formEdit').on("submit", function (e) {
        e.preventDefault();
        effectEditButton();
    });

});


// ***********************Creates a table with users**************************************
async function mainPage() {
    $("tbody#my_table").empty();
    let users = await fetch('/api/users')
        .then(response => response.json());
    for (let i = 0; i < users.length; i++) {
        $("tbody#my_table").append("" +
            "<tr>\n" +
            "<td><span>" + users[i].id + "</span></td>\n" +
            "<td><span>" + users[i].firstName + "</span></td>\n" +
            "<td><span>" + users[i].lastName + "</span></td>\n" +
            "<td><span>" + users[i].age + "</span></td>\n" +
            "<td><span>" + users[i].username + "</span></td>\n" +
            "<td><span >" + someRoles(users[i].roles) + "</span></td>" +
            "<td><button type='button' class='btn btn-info' " +
            "onclick='modalEdF(" + users[i].id + ")' data-toggle='modal'>" +
            "Edit</button></td>" +
            "<td><button type='button' class='btn btn-danger' " +
            "onclick='modalDelF(" + users[i].id + ")' data-toggle='modal'>" +
            "Delete</button></td>" +
            "</tr>"
        )

    }
}


// ***********************Opens the edit form modal**************************************
async function modalEdF(x) {
    $("#largeModal").find('.modal-title').text('Edit user');
    $('#largeModal').modal('show');
    $('div#thereForm').empty();
    $('div#formButton').empty();
    let users = await fetch('/api/users')
        .then(response => response.json());
    for (let usersKey in users) {
        if (users[usersKey].id === x) {
// alert(x)
            formBuilder(users[usersKey], false);
            editButton(users[usersKey].id);
        }
    }
}


// ***********************Opens the delete form modal**************************************
async function modalDelF(x) {
    $("#largeModal").find('.modal-title').text('Delete user');
    $('#largeModal').modal('show');
    $('div#thereForm').empty();
    $('div#formButton').empty();
    let users = await fetch('/api/users')
        .then(response => response.json());
    for (let usersKey in users) {
        if (users[usersKey].id === x) {
            formBuilder(users[usersKey], true);
            deleteButton(users[usersKey].id);
        }
    }
}


// ***********************Gives roles as text**************************************
function someRoles(x) {
    let y = "";
    for (let i of x) {
        y += i.role + " ";
    }
    return y
}


// ***********************Builds a form**************************************
function formBuilder(editUser, isDisabled) {
    $("div#thereForm").append(
        "        <label for='id'>Id</label>\n" +
        "        <input type='text' class='form-control' value='" + editUser.id + "' id='id' placeholder='Id' " + isDisabledForm(isDisabled) + " readonly>\n" +
        "        <label for='firstName'>First Name</label>\n" +
        "        <input type='text' class='form-control' value='" + editUser.firstName + "' id='firstName' placeholder='First Name' " + isDisabledForm(isDisabled) + " " +
        "pattern='.{3,}' required title=\"minimum 3 characters\">\n" +
        "        <label for='lastName'>Last Name</label>\n" +
        "        <input type='text' class='form-control' value='" + editUser.lastName + "' id='lastName' placeholder='Last Name' " + isDisabledForm(isDisabled) + " " +
        "pattern='.{3,}' required title=\"minimum 3 characters\">\n" +
        "        <label for='age'>Age</label>\n" +
        "        <input type='number' class='form-control' value='" + editUser.age + "' id='age' placeholder='Age' " + isDisabledForm(isDisabled) + " required>\n" +
        "        <label for='email'>Email</label>\n" +
        "        <input type='text' class='form-control' value='" + editUser.username + "' id='email' placeholder='Email' " + isDisabledForm(isDisabled) + " " +
        "pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$\" required title=\"Example: yourmail@mail.com\">\n" +

        thereIsPasswordField(isDisabled) +

        "        <label for='roles'>Roles</label>\n" +
        "        <select multiple class='form-control' id='roles' size=\"2\" " + isDisabledForm(isDisabled) + ">\n" +
        "          " + optionRoles()
    );
}


// ***********************Builds for the role options form**************************************
function optionRoles() {
    let roles = "";
    roles += "<option value='USER'>USER</option>";
    roles += "<option value='ADMIN'>ADMIN</option>";

    return roles;
}

// ***********************Checking for disabled forms**************************************
function isDisabledForm(is) {
    let isDis = "";
    if (is === true) {
        isDis = "disabled";
    }
    return isDis
}


// ***********************Edit button**************************************
function editButton() {
// <button type="button" className="btn btn-primary">Save changes</button>
    $("div#formButton").append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
        "<button type=\"submit\" class=\"btn btn-primary\">Edit</button>")
}


// ***********************Edit button effect**************************************
async function effectEditButton() {

    let roles = $('#roles').val();

    function addToUserRoles(r) {
        let howManyRolesAdd = [];
        for (let howManyRolesAddElement of r) {
            howManyRolesAdd.push(howManyRolesAddElement);
        }
        return howManyRolesAdd;
    }

    let user = {
        id: document.getElementById('id').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        username: document.getElementById('email').value,
        password: document.getElementById('password').value,
        roles: addToUserRoles(roles)
    };
// alert("2 point");


    let response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
// alert("3 point");

    $('#largeModal').modal('hide');
    mainPage();
}


// ***********************Delete button**************************************
function deleteButton() {
// <button type="button" className="btn btn-primary">Save changes</button>
    $("div#formButton").append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
        "<button type=\"button\" class=\"btn btn-danger\" onclick='effectDeleteButton()'>Delete</button>")
}


// ***********************Delete button effect**************************************
async function effectDeleteButton() {
    let id = document.getElementById('id').value;
    await fetch('/api/users/' + id, {method: 'DELETE'});
    $('#largeModal').modal('hide');

    mainPage();
}


// ***********************Password field**************************************
function thereIsPasswordField(isField) {
    if (!isField) {
        return "        <label for='password'>Password</label>\n" +
            "        <input type='password' class='form-control' id='password' placeholder='Password' " + isDisabledForm(isField) + ">\n";
    } else {
        return "";
    }
}
