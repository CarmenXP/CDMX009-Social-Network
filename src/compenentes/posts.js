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
<input type='text' id="txt" class='txt' placeholder='¿Que quieres compartir?'>
<input type='button' value='Compartir' class='compartir' id="Compartir">
<input id="sendComment" type='button' value='Guardar' class='Guardar'>
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
function editar(id, post){
   
        document.querySelector("#txt").value= comment;
        document.querySelector("#compartir").style.display= "block";
        document.querySelector("#sendComment").style.display= "none";
        let editingButton = document.querySelector("Compartir");
    
    editingButton.onclick= ()=>{
        let editingComment = db.collection("pots").doc(id);
        let newComment= document.querySelector("#txt").value;
        return editingComment.set({
        post: newComment
    })
        .then(function() {
        console.log("Document successfully updated!");
        document.querySelector("#txt").value= "";
        document.querySelector("#compartir").style.display= "none";
        document.querySelector("#sendComment").style.display= "block";
    })
        .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    
     }
}

db.collection("posts").onSnapshot((querySnapshot)=> {
    root2.innerHTML ='';
    querySnapshot.forEach((doc) => {
        let post = `
        <p>${doc.data().name}</p>
        <p>${doc.data().texto}</p>
        <button id="delete" value="${doc.id}" class="delete">Eliminar</button>
        <button  id="edit" class="edit">Editar</button>
        `
    let nodo = document.createElement('div');
    nodo.classList.add('card')
    nodo.innerHTML = post;
    root2.appendChild(nodo);
});
let idbttn = document.querySelectorAll('#delete');
    idbttn.forEach(btn => btn.addEventListener('click', (value) => {
        value = btn.value;
        db.collection("posts").doc(value).delete().then(function() {
        }).catch(function(error) {
          alert("Error removing document: ", error);
        });
    
    }
    ));

});

let salir = document.querySelector('.salir');
salir.addEventListener('click' , pantalla1 );

let bttninicio = document.querySelector('.inicio');
bttninicio.addEventListener('click', pos);
function pos(){
    publicaciones(user);

}
}