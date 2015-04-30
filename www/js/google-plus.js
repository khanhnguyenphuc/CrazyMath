
  function isAvailable() {
    window.plugins.googleplus.isAvailable(function(avail) {alert(avail)});
  }
  function login() {
    window.plugins.googleplus.login(
        {
          'iOSApiKey': '1078319040376-gv0bvmbks51m221ac47581ektbr1m1qc.apps.googleusercontent.com'
        },
        function (obj) {
          console.log(obj);
          document.querySelector("#image").src = obj.imageUrl;
          document.querySelector("#image").style.visibility = 'visible';
          document.querySelector("#feedback").innerHTML = "Hi, " + obj.displayName + ", " + obj.email;
          $('.btnLogin').hide();
          $('.btnLogout').show();
        },
        function (msg) {
          // document.querySelector("#feedback").innerHTML = "error: " + msg;
        }
    );
  }
  function trySilentLogin() {
    window.plugins.googleplus.trySilentLogin(
        {
          'iOSApiKey': '1078319040376-gv0bvmbks51m221ac47581ektbr1m1qc.apps.googleusercontent.com'
        },
        function (obj) {
          document.querySelector("#image").src = obj.imageUrl;
          document.querySelector("#image").style.visibility = 'visible';
          document.querySelector("#feedback").innerHTML = "Silent hi, " + obj.displayName + ", " + obj.email;
        },
        function (msg) {
          document.querySelector("#feedback").innerHTML = "error: " + msg;
        }
    );
  }
  function logout() {
    window.plugins.googleplus.logout(
        function (msg) {
          document.querySelector("#image").style.visibility = 'hidden';
          document.querySelector("#feedback").innerHTML = msg;
        }
    );
  }
  function disconnect() {
    window.plugins.googleplus.disconnect(
        function (msg) {
          document.querySelector("#image").style.visibility = 'hidden';
          document.querySelector("#feedback").innerHTML = '';
        }
    );
  }
  // window.onerror = function(what, line, file) {
  //   alert(what + '; ' + line + '; ' + file);
  // };
  function handleOpenURL (url) {
    document.querySelector("#feedback").innerHTML = "App was opened by URL: " + url;
  }