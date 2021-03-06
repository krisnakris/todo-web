const baseURL = 'http://localhost:3000';

$(document).ready(() => {
  home();

  $("#login-btn").on('click', (event) => {
    event.preventDefault();
    login();
  });

  $("#register-register-btn").on('click', (event) => {
    register();
  });

  $("#login-register-btn").on('click', (event) => {
    event.preventDefault();
    $(".login-form").hide()
    $(".register-form").show()
  });

  $("#nav-todo-btn, #nav-home-btn").on('click', (event) => {
    event.preventDefault();
    home();
    $("#todo-list-table").show();
  })

  $("#nav-logout-btn").on('click', (event) => {
    event.preventDefault();
    logout();
  })

  $("#addTodoList").on('click', (event) => {
    event.preventDefault();
    $("#todo-list-table").hide();
    $("#add-todo-list").show();
  })

  $("#addForm-submit-btn").on('click', (event) => {
    event.preventDefault();
    createTodos();
  })

  $("#editForm-submit-btn").on('click', (event) => {
    event.preventDefault();
    updateTodo();
  })
})

function home() {
  $(".login-form").show()
  $(".register-form").hide()
  checkLocalStorage();
}

function register () {
  let email = $("#register-email").val();
  let password = $("#register-password").val();

  $.ajax({
    url : baseURL + '/register',
    method: "POST",
    data : {
      email,
      password
    }
  })
  .done(home)

  .fail((xhr, text) => {
    swal({
      icon: "error",
      text: xhr.responseJSON.message
    })
  })
  .always(() => {
    $("#register-email, #register-password").val("");
  })
}

function login () {
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  $.ajax({
    url : baseURL + '/login',
    method: "POST",
    data : {
      email,
      password
    }
  })
  .done((response) => {
    localStorage.setItem('accessToken', response.accessToken);
    checkLocalStorage();
  })
  .fail((xhr, text) => {
    swal({
      icon: "error",
      text: xhr.responseJSON.message
    })
  })
  .always(() => {
    $("#login-email, #login-password").val("");
  })
}

function checkLocalStorage () {
  if (localStorage.accessToken) {
    $("#before-login").hide();
    $("#after-login, #nav-logout-btn").show();
    fetchTodos();
    $("#add-todo-list").hide();
    $("#edit-todo-list").hide();
  } else {
    $("#before-login").show();
    $("#after-login, #nav-logout-btn").hide();
  }
}

function logout () {
  localStorage.removeItem('accessToken');
  checkLocalStorage();
}

function fetchTodos () {
  $("#todo-list-table td").remove();

  $.ajax({
    url : baseURL + '/todos',
    method: "GET",
    data : {
   
    },
    headers : {
      accessToken : localStorage.accessToken
    }
  })
  .done((response) => {
    response.forEach(todo => {
 
      $("#todo-list-table").append(
        `<tr>
          <td>${todo.id}</td>
          <td>${todo.title}</td>
          <td>${todo.description}</td>
          <td>${todo.status}</td>
          <td>${todo.due_date.slice(0,10)}</td>
          <td> <a onclick= "updateTodoForm(${todo.id})"> Update </a> | <a onclick= "deleteTodo(${todo.id})"> Delete </a> | <a onclick= "changeStatusTodo(${todo.id})"> Change Status </a></td>      
        </tr>`
      )
    });
  })
  .fail((xhr, text) => {
    swal({
      icon: "error",
      text: xhr.responseJSON.message
    })
  })
  .always(() => {
    $("#login-email, #login-password").val("");
  })
}

function createTodos () {
  let title = $("#addForm-title").val();
  let description = $("#addForm-description").val();
  let status = 'active'

  let due_date = $("#addForm-due-date").val();

  $.ajax({
    url : baseURL + '/todos',
    method: "POST",
    data : {
      title, description, status, due_date
    },
    headers : {
      accessToken : localStorage.accessToken
    }
  })
  .done((response) => {
    swal("Success Create Todos", "added todo to list", "success");
    checkLocalStorage();
    $("#todo-list-table").show();
  })
  .fail((xhr, text) => {
    swal(
      "Error",
      xhr.responseJSON.message,
      "error"
    )
  })
  .always(() => {
    $("#login-email, #login-password").val("");
  })
}

function deleteTodo (id) {
  $.ajax({
    url : baseURL + `/todos/${id}`,
    method: "DELETE",
    headers : {
      accessToken : localStorage.accessToken
    }
  })
  .done((response) => {
    checkLocalStorage();
  })
  .fail((xhr, text) => {
    swal({
      icon: "error",
      text: xhr.responseJSON.message[0]
    })
  })
  .always(() => {

  })
}

function changeStatusTodo (id) {
  $.ajax({
    url : baseURL + `/todos/${id}`,
    method: "PATCH",
    headers : {
      accessToken : localStorage.accessToken
    }
  })
  .done((response) => {
    swal("Success Change Status", "", "success");
    checkLocalStorage();
  })
  .fail((xhr, text) => {
    swal("Unauthorize", "You don't have permission to change this item", "error");
  })
  .always(() => {

  })

}

function updateTodoForm (id) {
  $("#todo-list-table").hide();
  $.ajax({
    url : baseURL + '/todos/' + id,
    method : "GET",
    headers : {
      accessToken : localStorage.accessToken
    }
  })
  .done((response) => {
    let responseStatus = response.status;
    if (responseStatus == "active") {
      $("#edit-active-check").prop("checked", true);
    } else {
      $("#edit-active-check").prop("checked", false);
    }
    $("#editForm-title").val(response.title)
    $("#editForm-description").val(response.description)
    $("#editForm-due-date").val(response.due_date.slice(0, 10))
    $("#editForm-id").val(`${id}`);
    $("#edit-todo-list").show();
  })
}

function updateTodo () {
  let id = $("#editForm-id").val();
  let due_date =  $("#editForm-due-date").val();
  let description = $("#editForm-description").val();
  let title = $("#editForm-title").val();
  let status = $("#edit-active-check").is(":checked");

  if (status) {
    status = 'active'
  } else {
    status = 'nonactive'
  }

  let object = {id, due_date, description, title, status}

  $.ajax({
    url : baseURL + '/todos/' + id,
    method : "PUT",
    headers : {
      accessToken : localStorage.accessToken
    },
    data : object
  })
    .done((response) => {
      swal("Success Edit Todos", "", "success");
      checkLocalStorage();
      $("#todo-list-table").show();
      $("#edit-todo-list").hide();
    })
    .fail((xhr, text) => {
      swal(
        "Error",
        xhr.responseJSON.message,
        "error"
      )
    })
    .always(() => {

    })
  
}