import { registros } from './pantalla2.js'
import { registrar } from './registro.js'
import { welcome } from './pantalla3.js/index.js'

// globas
//let user = {}

let root = document.querySelector('#root');
 export const pantalla1 = () => {
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
bttn.addEventListener('click', loginGmail);
  function loginGmail (){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        let user = {}
        user.displayName  = result.user.displayName
        user.email = result.user.email
        user.photoURL = result.user.photoURL
        welcome(user)
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      })
}
     
     let bttnfb = document.querySelector('.logoF');
     bttnfb.addEventListener('click', loginFb);
     function loginFb(){
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);

         }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      })
     }

let registro = document.querySelector('#registro');
registro.addEventListener('click', registra);
function registra(){
registros()
}
let ingreso = document.querySelector('#ingresa');
ingreso.addEventListener('click', ingresado);
function ingresado(){
registrar();
}
}