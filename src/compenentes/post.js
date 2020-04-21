let root = document.querySelector('#root');
export const publicaciones = () => {
 let post = `
 <p class='head'></p>
<h2>Code Woman</h2>
<input class='inicio' type='button' value='inicio'/>
<input class='perfil' type='button' value='Perfil'/>
<input class='salir' type='button' value='Salir'/>
<div>

</div>
`
root.innerHTML = post;
}