import { pantalla1 } from './pantalla1.js'
import { publicaciones } from './posts.js'

let root = document.querySelector('#root');


export const welcome = (user) => {
let p = `
<p class='head'></p>
<h2>Code Woman</h2>
<input class='inicio' type='button' value='inicio'/>
<input class='perfil' type='button' value='Perfil'/>
<input class='salir' type='button' value='Salir'/>
<div>
<p class='welcom'>Bienveni@ a Code woman!</p>
<p class'welcom'>${user.displayName}</p>
<img class='photo' src=${user.photoURL} />
</div>
`;
root.innerHTML = p;
let salir = document.querySelector('.salir');
salir.addEventListener('click' , pantalla1 )

let bttninicio = document.querySelector('.inicio');
bttninicio.addEventListener('click', pos);
function pos(){
    publicaciones(user);
}
}