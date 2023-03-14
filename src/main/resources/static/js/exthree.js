$(document).ready(function () {
    $('#addForm').on("submit", function (e) {
        e.preventDefault();
        addNewUser();
    });
});

async function addNewUser() {
    let newRoles = $('#newRoles').val();

    function addToUserRoles(r) {
        let howManyRolesAdd = [];
        for (let howManyRolesAddElement of r) {
            howManyRolesAdd.push(howManyRolesAddElement);
        }
        return howManyRolesAdd;
    }

    let user = {
        firstName: document.getElementById('newFirstName').value,
        lastName: document.getElementById('newLastName').value,
        age: document.getElementById('newAge').value,
        username: document.getElementById('newEmail').value,
        password: document.getElementById('newPassword').value,
        roles: addToUserRoles(newRoles)
    };


    await transformIntoJson(user);
    await mainPage();
    $('#myTabs a[href="#user_table"]').tab('show');
    await document.getElementById("addForm").reset();
}

async function transformIntoJson(u) {
    await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(u)
    });
}