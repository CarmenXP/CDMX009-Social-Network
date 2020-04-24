import { pantalla1 } from './pantalla1.js'

let root = document.querySelector('#root');
export const publicaciones = (user) => {
 let post = `
 <p class='head'></p>
<h2>Code Woman</h2>
<input class='inicio' type='button' value='inicio'/>
<input class='perfil' type='button' value='Perfil'/>
<input class='salir' type='button' value='Salir'/>
<div>
<h1 class='userName'>${user.displayName}</h1>
<input type='text' id='txt' class='txt' placeholder='¿Que quieres compartir?'>
<input type='button' value='Compartir' class='compartir' id='Compartir'>
<img class="inputImg" id='file' src="/img/file.png">
<div id='root1'>
</div>
<div id='root2'></div>
`;

root.innerHTML = post;

let root2 = document.querySelector('#root2');
let text = document.querySelector('#txt');
let addBtn = document.querySelector('.compartir');
let db = firebase.firestore();

addBtn.addEventListener('click', enviar);
function enviar(){
    db.collection("posts").add({
        name : user.displayName,
        texto : text.value,
    })
    .then(function(docRef) {
        console.log(docRef.id)
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

function eliminar(id){
    db.collection("posts").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}

db.collection("posts").onSnapshot((querySnapshot)=> {
    root2.innerHTML ='';
    querySnapshot.forEach((doc) => {
        let post = `
        <p>${doc.data().name}</p>
        <p>${doc.data().texto}</p>
        <button id="delete" class="delete">Eliminar</button>
        <button  id="edit" class="edit">Editar</button>
        `
    let nodo = document.createElement('div');
    nodo.classList.add('card')
    nodo.innerHTML = post;
    root2.appendChild(nodo);
    let idbttn = document.querySelector('#delete');
    idbttn.addEventListener('click', function(){
          eliminar(doc.id)
    });
});
});


let salir = document.querySelector('.salir');
salir.addEventListener('click' , pantalla1 );

let bttninicio = document.querySelector('.inicio');
bttninicio.addEventListener('click', pos);
function pos(){
    publicaciones(user);

}
}