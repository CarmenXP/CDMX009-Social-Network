import { pantalla1 } from './pantalla1.js'

let root = document.querySelector('#root');
export const registros = () =>{
let template = `
 <p class='head'></p>
 <h2>Code Woman</h2>
 <p class='p1'>¡Hola! para  formar parte de la comunidad de programadoras de América Latina, llena el formulario que se encuentra en la parte de abajo y da click en crear cuenta. </p>
 <input type="text" id="name" class="name" placeholder="Nombre completo" required>
 <input type="email" id="email" class="mail" placeholder="Correo electronico" required>
 <input type="password" id="password" class="acs" placeholder="Contraseña" minlength="6" required>
 <input type="password" id="confirmPassword" class="confirm" placeholder="Confirma tu contraseña" minlength="6" required>
 <input type="checkbox" class="polit" value="2" checked><p class='acept'>'Acepto  las condiciones  de servicio  y la 
 política de privacidad de Code Woman.'</p>
 <input type="button" id="createAccount" value='Crear' class="creat">
 <p class='ctn'>¿Ya tiene cuenta?</p>
 <p id='iniciar' class='iniciar'>Iniciar sesión</p>
 `;
root.innerHTML = template;
let db = firebase.firestore();
//boton de iniciar sesion que manda a la primera pantalla
let bttnInnit = document.querySelector('#iniciar');
bttnInnit.addEventListener('click', pantalla1);

//Creando una cuenta de usuario con correo electrónico
let newUser= document.querySelector('#createAccount');
newUser.addEventListener('click', createUser)
function createUser(){
    let name = document.querySelector("#name").value;
    let email= document.querySelector("#email").value;
    let password= document.querySelector("#password").value;
    let confPassword = document.querySelector("#confirmPassword").value;
    if (password == confPassword)
    {
        console.log('contraseña confirmada');

              firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function(){
            let user = {
              name : name,
              email : email
            }
            console.log('cuenta creada!');
            verifyAccount() ;
          })
          .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode);
              console.log(errorMessage);
              // ...
            });   
    }else{
        alert('Las contraseñas no coinciden');
    }
}

// Después de registro con correo se envía un correo de email para confirmación
function verifyAccount(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      console.log("enviando correo...");
      alert('Te enviamos un correo verificalo y puedes continuar !');
            document.querySelector("#name").value ='';
            document.querySelector("#email").value = '';
            document.querySelector("#password").value = '';
            document.querySelector("#confirmPassword").value = '';
    }).catch(function(error) {
      console.log(error);
      // An error happened.
    });
    }
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
}