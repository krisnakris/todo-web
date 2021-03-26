// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
// const baseURL = 'https://fancy-todo-kris.herokuapp.com';
var baseURL = 'http://localhost:3000';
$(document).ready(function () {
  home();
  $("#login-btn").on('click', function (event) {
    event.preventDefault();
    login();
  });
  $("#register-register-btn").on('click', function (event) {
    register();
  });
  $("#login-register-btn").on('click', function (event) {
    event.preventDefault();
    $(".login-form").hide();
    $(".register-form").show();
  });
  $("#nav-todo-btn, #nav-home-btn").on('click', function (event) {
    event.preventDefault();
    home();
    $("#todo-list-table").show();
  });
  $("#nav-logout-btn").on('click', function (event) {
    event.preventDefault();
    logout();
  });
  $("#addTodoList").on('click', function (event) {
    event.preventDefault();
    $("#todo-list-table").hide();
    $("#add-todo-list").show();
  });
  $("#addForm-submit-btn").on('click', function (event) {
    event.preventDefault();
    createTodos();
  });
  $("#editForm-submit-btn").on('click', function (event) {
    event.preventDefault();
    updateTodo();
  });
});

function home() {
  $(".login-form").show();
  $(".register-form").hide();
  checkLocalStorage();
}

function register() {
  var email = $("#register-email").val();
  var password = $("#register-password").val();
  $.ajax({
    url: baseURL + '/register',
    method: "POST",
    data: {
      email: email,
      password: password
    }
  }).done(function (response) {
    home();
    swal("Success Register", "You can now login", "success");
  }).fail(function (xhr, text) {
    swal({
      icon: "error"
    });
  }).always(function () {
    $("#register-email, #register-password").val("");
  });
}

function login() {
  var email = $("#login-email").val();
  var password = $("#login-password").val();
  $.ajax({
    url: baseURL + '/login',
    method: "POST",
    data: {
      email: email,
      password: password
    }
  }).done(function (response) {
    localStorage.setItem('accessToken', response.accessToken);
    checkLocalStorage();
  }).fail(function (xhr, text) {
    swal({
      icon: "error",
      text: xhr.responseJSON.errors
    });
  }).always(function () {
    $("#login-email, #login-password").val("");
  });
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: baseURL + '/googleLogin',
    method: "POST",
    data: {
      googleToken: id_token
    }
  }).done(function (response) {
    localStorage.setItem('accessToken', response.accessToken);
    checkLocalStorage();
  }).fail(function (xhr, text) {
    swal({
      icon: "error",
      text: "Cannot login with google"
    });
  });
}

function checkLocalStorage() {
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

function logout() {
  localStorage.removeItem('accessToken');
  swal("Success Logout", "", "success");
  checkLocalStorage();
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function fetchTodos() {
  $("#todo-list-table td").remove();
  $.ajax({
    url: baseURL + '/todos',
    method: "GET",
    data: {},
    headers: {
      accessToken: localStorage.accessToken
    }
  }).done(function (response) {
    response.forEach(function (todo) {
      $("#todo-list-table").append("<tr>\n          <td>".concat(todo.id, "</td>\n          <td>").concat(todo.title, "</td>\n          <td>").concat(todo.description, "</td>\n          <td>").concat(todo.status, "</td>\n          <td>").concat(todo.due_date.slice(0, 10), "</td>\n          <td>").concat(todo.User.email, "</td>\n          <td> <a onclick= \"updateTodoForm(").concat(todo.id, ")\"> Update </a> | <a onclick= \"deleteTodo(").concat(todo.id, ")\"> Delete </a> | <a onclick= \"changeStatusTodoGet(").concat(todo.id, ")\"> Change Status </a></td>      \n        </tr>"));
    });
  }).fail(function (xhr, text) {
    swal({
      icon: "error",
      text: xhr.responseJSON.message
    });
  }).always(function () {
    $("#login-email, #login-password").val("");
  });
}

function createTodos() {
  var title = $("#addForm-title").val();
  var description = $("#addForm-description").val();
  var status = 'active';
  var due_date = $("#addForm-due-date").val();
  $.ajax({
    url: baseURL + '/todos',
    method: "POST",
    data: {
      title: title,
      description: description,
      status: status,
      due_date: due_date
    },
    headers: {
      accessToken: localStorage.accessToken
    }
  }).done(function (response) {
    var quote = response.Quotes.quote;
    var author = response.Quotes.author;
    var message = "".concat(quote, " ") + "(".concat(author, ")");
    swal("Success Create Todos", message, "success");
    checkLocalStorage();
    $("#todo-list-table").show();
  }).fail(function (xhr, text) {
    swal("Error", xhr.responseJSON.message, "error");
  }).always(function () {
    $("#login-email, #login-password").val("");
  });
}

function deleteTodo(id) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this todos!",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(function (willDelete) {
    if (willDelete) {
      $.ajax({
        url: baseURL + "/todos/".concat(id),
        method: "DELETE",
        headers: {
          accessToken: localStorage.accessToken
        }
      }).done(function (response) {
        checkLocalStorage();
        swal("Poof! Your todos has been deleted!", {
          icon: "success"
        });
      }).fail(function (xhr, text) {
        swal("Unauthorize", "You don't have permission to change this item", "error");
      }).always(function () {});
    } else {
      swal("Your todos is safe!");
    }
  });
}

function changeStatusTodoGet(id) {
  console.log('id: ', id);
  $.ajax({
    url: baseURL + '/todos/' + id,
    method: "GET",
    headers: {
      accessToken: localStorage.accessToken
    }
  }).done(function (response) {
    var status = response.status;

    if (status == 'active') {
      status = 'nonactive';
    } else {
      status = 'active';
    }

    changeStatusTodo(id, status);
  }).fail(function (xhr, text) {
    swal("Unauthorize", "You don't have permission to change this item", "error");
  });
}

function changeStatusTodo(id, status) {
  $.ajax({
    url: baseURL + "/todos/".concat(id),
    method: "PATCH",
    headers: {
      accessToken: localStorage.accessToken
    },
    data: {
      status: status
    }
  }).done(function (response) {
    swal("Success Change Status", "", "success");
    checkLocalStorage();
  }).fail(function (xhr, text) {
    swal("Unauthorize", "You don't have permission to change this item", "error");
  }).always(function () {});
}

function updateTodoForm(id) {
  $.ajax({
    url: baseURL + '/todos/' + id,
    method: "GET",
    headers: {
      accessToken: localStorage.accessToken
    }
  }).done(function (response) {
    var responseStatus = response.status;

    if (responseStatus == "active") {
      $("#edit-active-check").prop("checked", true);
    } else {
      $("#edit-active-check").prop("checked", false);
    }

    $("#editForm-title").val(response.title);
    $("#editForm-description").val(response.description);
    $("#editForm-due-date").val(response.due_date.slice(0, 10));
    $("#editForm-id").val("".concat(id));
    $("#todo-list-table").hide();
    $("#edit-todo-list").show();
  }).fail(function (xhr, text) {
    swal("Unauthorize", "You don't have permission to change this item", "error");
  });
}

function updateTodo() {
  var id = $("#editForm-id").val();
  var due_date = $("#editForm-due-date").val();
  var description = $("#editForm-description").val();
  var title = $("#editForm-title").val();
  var status = $("#edit-active-check").is(":checked");

  if (status) {
    status = 'active';
  } else {
    status = 'nonactive';
  }

  var object = {
    id: id,
    due_date: due_date,
    description: description,
    title: title,
    status: status
  };
  $.ajax({
    url: baseURL + '/todos/' + id,
    method: "PUT",
    headers: {
      accessToken: localStorage.accessToken
    },
    data: object
  }).done(function (response) {
    swal("Success Edit Todos", "", "success");
    checkLocalStorage();
    $("#todo-list-table").show();
    $("#edit-todo-list").hide();
  }).fail(function (xhr, text) {
    swal("Error", xhr.responseJSON.message, "error");
  }).always(function () {});
}
},{}],"../../../../../../../../opt/homebrew/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49472" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../opt/homebrew/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map