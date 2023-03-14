$(document).ready(function() {
        $('#addForm').on("submit",function(e){
            e.preventDefault();
            // console.log("Loading...");
            addNewUser();
        });
});

async function addNewUser() {
    // let newFirstName = document.getElementById('newFirstName').value;
    // let newLastName = document.getElementById('newLastName').value;
    // let newAge = document.getElementById('newAge').value;
    // let newEmail = document.getElementById('newEmail').value;
    // let newPassword = document.getElementById('newPassword').value;
    let newRoles = $('#newRoles').val();
    // alert(newFirstName+" "+newPassword+" "+newRoles)


    // let roles = $('#roles'+buttonNumber).val();


    function addToUserRoles(r) {
        let howManyRolesAdd = [];
        for (let howManyRolesAddElement of r) {
            howManyRolesAdd.push(howManyRolesAddElement);
        }
        return howManyRolesAdd;
    }


    // alert(id+" "+firstName+" "+lastName+" "+password+" "+roles);
    let user = {
        firstName: document.getElementById('newFirstName').value,
        lastName: document.getElementById('newLastName').value,
        age: document.getElementById('newAge').value,
        username: document.getElementById('newEmail').value,
        password: document.getElementById('newPassword').value,
        roles: addToUserRoles(newRoles)
    };

    // alert(user);
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