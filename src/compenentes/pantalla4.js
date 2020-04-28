import { pantalla1 } from './pantalla1.js'

let root = document.querySelector('#root');
export const recoverPassword = () => {
    let templateRecover = 
    `
    <p class='head'></p>
    <h2>Code Woman</h2>
    <p class='enterEmail'>Obten un correo de recuperación</p>
    <input type="email" id="emailRecove" class="mail" placeholder="Correo electronico" required>
    <p id='iniciar' class='ini'>Iniciar sesión</p>
    <input id="Send" class="send" type="button" value="Enviar">
    `;
    root.innerHTML = templateRecover;
      
      let bttnSend = document.querySelector('#Send');
      bttnSend.addEventListener('click', clickSend);
    
    function clickSend(){
    var auth = firebase.auth();
    var emailAddress = document.querySelector('#emailRecove').value;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
       console.log('enviado');
       document.querySelector('#emailRecove').value = '';
    }).catch(function(error) {
    });
}
let logIn = document.querySelector('#iniciar');
logIn.addEventListener('click', pantalla1);
}