import { registros } from './pantalla2.js'

let root = document.querySelector('#root');
 export const login = () => {
let p = `

     <img class='image' src="/img/portada.jpg">
     <h1> Bienvenida a nuestra comunidad  
     de programadoras </h1>
     <img class='logo' src="./img/logo.jpeg">
      <form class ='input'>
         <input type="text" id="email" class="email" placeholder="example@gmail.com">
         <input type="text" id="password" class="password" placeholder="Password">
         <input type="button" value="Ingresar" id="ingresa" class="acess">
      </form>
      <a class="pass">Olvide mi contraseña</a>
      <p class='options'> Ingresa con:</p>
           <img class="logoF" src="/img/F.jpg">
             <img class="logoG" src="/img/G.jpg">
      <p class="not">¿No tienes cuenta?</p>
      <a class="re" id="registro">Registrate</a>
      </div>
   <footer>
     <p class="dr">Developed © 2020 CW, Inc.</p>
   </footer> 
`;
root.innerHTML = p;

let bttn = document.querySelector('.logoG');
bttn.addEventListener('click', login);
function login (){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}


let bttn0 = document.querySelector('.logoF');
bttn0.addEventListener('click', loginF);
function loginF(){
var provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

let bttn1 = document.querySelector('.logoF');
bttn1.addEventListener('click', loginF);
function loginF(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
   }

let registro = document.querySelector('#registro');
registro.addEventListener('click', registra);
function registra(){
registros()
}
}

  