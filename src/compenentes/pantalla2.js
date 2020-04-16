let root = document.querySelector('#root');
export const registros = () =>{
let template = `
 <p class='head'></p>
 <h2>Code Woman</h2>
 <p class='p1'>¡Hola! para  formar parte de la comunidad de programadoras de América Latina, llena el formulario que se encuentra en la parte de abajo y da click en crear cuenta. </p>
 <input type="text" id="name" class="name" placeholder="Nombre completo">
 <input type="text" id="mail" class="mail" placeholder="Correo electronico">
 <input type="text" id="acs" class="acs" placeholder="Contraseña">
 <input type="text" id="confirm" class="confirm" placeholder="Confirma tu contraseña">
 <input type="checkbox" class="polit" value="2" checked><p class='acept'>'Acepto  las condiciones  de servicio  y la 
 política de privacidad de Code Woman.'</p>
 <input type="button" id="creat" value='Crear' class="creat">
 <p class='ctn'>¿Ya tiene cuenta?</p>
 <p class='iniciar'>Iniciar sesión</p>
 `;
root.innerHTML = template;
}
