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

  .fail(err => {
    console.log('err: ', err);
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
  .fail(err => {
    
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
  $("#todo-list-table tr").remove();

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

    response.forEach(element => {
 
      $("#todo-list-table").append(
        `<tr>
        <td>${element.id}</td>
        <td>${element.title}</td>
        <td>${element.due_date.slice(0,10)}</td>
        <td> <a> Update </a> | <a> Delete </a> </td>
        

        </tr>
        `
      )
    });
  })
  .fail(err => {
    console.log('err: ', err);
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
    checkLocalStorage();
  })
  .fail(err => {
    console.log('err: ', err);
  })
  .always(() => {
    $("#login-email, #login-password").val("");
  })

}