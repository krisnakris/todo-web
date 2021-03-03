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
  })

  $("#nav-home-btn").on('click', (event) => {
    event.preventDefault();
    home();
  })

  $("#nav-logout-btn").on('click', (event) => {
    event.preventDefault();
    logout();
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
    fetchTodos();
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
  $("#todo-list").empty();

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
    console.log('response: ', response);
    response.forEach(element => {
      $("#todo-list").append(
        `<li id=${element.id} >${element.title}</li>`
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