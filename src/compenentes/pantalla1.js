import { registros } from './pantalla2.js'
import { welcome } from './pantalla3.js'
import { recoverPassword } from './pantalla4.js'
// globas
//let user = {}
let db = firebase.firestore();
let root = document.querySelector('#root');
 export const pantalla1 = () => {
let p = `
     <img class='image' src="/img/portada.jpg">
     <h1> Bienvenida a nuestra comunidad  
     de programadoras </h1>
     <img class='logo' src="./img/logo.jpeg">
      <form class ='input'>
         <input type="text" id="email" class="email" placeholder="example@gmail.com">
         <input type="password" id="password" class="password" placeholder="Contraseña" minlength="6" required>
         <input type="button" value="Ingresar" id="getInto" class="acess">
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
        saveUser(user)
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
           welcome(user)
           saveUser(user)
         }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      })
     }


     let signInWithEmail = document.querySelector('#getInto');
     signInWithEmail.addEventListener('click', signIn);
        function signIn(){
         let email= document.querySelector('#email').value;
         let password= document.querySelector('#password').value;
         firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
           console.log(result);
           let user = result.user;
          let userInfo = {}
          userInfo.displayName  = result.user.displayName
          userInfo.email = result.user.email
          userInfo.photoURL = result.user.photoURL
          console.log(userInfo);
          welcome(user)
          saveUser(userInfo)
         })
         .catch(function(error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
        console.log(errorCode);
         // ...
       });
     } 
  
     function observer(){
       firebase.auth().onAuthStateChanged(function(user) {
           if (user) {
             // User is signed in.
  
               let displayName= user.displayName;
               let email= user.email;
              // console.log(user);
               let emailVerified = user.emailVerified; 
               let photoURL = user.photoURL;
               let isAnonymous = user.isAnonymus;
               let uid = user.uid;
               let providerData= user.provideData;
  
           } else {
               console.log("no exite usuario activo")
             // No user is signed in.
           }
         });
     }
     observer();
     // Aquí irá la  función para pasar al perfil del usuario
     let registro = document.querySelector('#registro');
     registro.addEventListener('click', registra);
     function registra(){
     registros()
     }
     
  
     //Guarda en B.D cloud firestore usuarios registrados en la colleccion usersRef
     function saveUser (user){
       db.collection("user").add({
        uid: user.uid,
        nombre: user.displayName,
        email: user.email,
        foto: user.photoURL
    })
    .then(function(docRef) {
        console.log(docRef.id)
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
     }

     let pass = document.querySelector('.pass');
    pass.addEventListener('click', recupera);
    function recupera(){
     recoverPassword()
    }
}
