 import { pantalla1 } from './pantalla1.js'
 import { publicaciones } from './posts.js'

 let root = document.querySelector('#root');
 export const welcome = (user) => {
     let renderWelcome = `
     <div class='head'>
      <h2> &lt;Code Woman&gt; </h2>
        <input class='inicio' type='button' value='Inicio'/>
        <input class='perfil' type='button' value='Perfil'/>
        <input class='salir' type='button' value='Salir'/>
      </div>
          <div id='welcomeInit'>
             <p class='welcomB'> Bienvenida a Code Woman </p>
             <p class='welcomeName'> ${user.displayName} </p>
             <img class='photo' src=${user.photoURL} />
          </div>
     `;
     root.innerHTML = renderWelcome;  
  
     let salir = document.querySelector('.salir');
     salir.addEventListener('click', pantalla1)

     let bttninicio = document.querySelector('.inicio');
     bttninicio.addEventListener('click',pos);
     function pos (){
       publicaciones (user);
      }
     }
