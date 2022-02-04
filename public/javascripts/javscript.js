let limit = 10;
let pageCourante = 1;
let users=null;
let i=1;
function Remplir_list_users(){
    let  t= $('#usersList');
    t.empty();
        users.forEach(u=>{
        t.append(`<tr>
    <td> ${u.id} </td>
    <td> ${u.username} </td>
    <td> ${u.password} </td>
    <td> ${u.email} </td>
    <td> ${ u.role } </td>
    <td>
     
    <button class="btn btn-outline-danger" type="button" onclick="delete_user(${u.id})"> <span class="fa fa-trash"></span></button>
    <button type= button id=trois class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></button>
    <button type= button id=modifier class="edit" title="Modify" data-toggle="tooltip" ><i class="material-icons">&#xE254;</i></button> </td>
</tr>`);
    })  
   
}
$("#updateBtn").hide()
function showPaginatedUsers(){
    fetch(`http://127.0.0.1:3000/users?page=${currentPage}&limit=${limit}`,{headers:headers()})
       .then(handleErrors)
        .then(data => {
            $("#usersList").html("");
            usersData = getPagingData(data,currentPage,limit);
            nbElements = usersData.totalItems
            updateButtons()
            usersData.users.forEach(element => {
                createRow(element.id,element.username,element.email,element.password,element.role).appendTo("#usesData")
           });
        })
}

function get_page( page ){
    pageCourante = page;
    fetch_users();
    
}

function fetch_users(){
    $.get("/users", { limit: parseInt(limit), offset: parseInt( (pageCourante-1)*limit ) }).done(
        data=>{
            users = data;
            Remplir_list_users();
        }).fail(
        ()=>{
            let  t= $('#usersList');
            t.append(" <tr><td class='text-center bg-warning' colspan='5'> Erreur Servenue </td></tr> ")
        }
    );
}

function creerUser(){

    const username = $('#username').val();
    const email=$('#email').val();
    const role=$('#role').val();
    const password=$('#password').val();

    $.ajax({ 
        url: '/users',
        type: 'POST',
        data: JSON.stringify({ user : { "username" : username, "email":email , "role": role, "password": password} }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function( reponse){
            console.log("reponse")
            users.unshift(reponse)
            Remplir_list_users();
            
        },
        error : function (err){
            console.log(err);
        }
    })
}

function delete_user( id){
    if( !confirm("Voulez vous vraiment supprimer cet utilisateur ?") ) return;
    $.ajax({ 
        url: '/users/'+id,
        type: 'DELETE',
        success: function( reponse){
            console.log(reponse)  
            fetch_users();

        },
        error : function (err){
            console.log(err);
        }
    })
}

fetch_users();
        