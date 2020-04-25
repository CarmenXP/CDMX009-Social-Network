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
<input id="sendComment" type='button' value='Guardar' class='guardar'>
<img class="inputImg" id='file' src="/img/file.png">
<div id='root1'>
</div>
<div id='root2'></div>
<div id="counter" class="counter">
      <button id="like"  class="like">Me gusta</button><p class="cont" id="counting"></p> 
    </div>
`;

root.innerHTML = post;

let root2 = document.querySelector('#root2');
let text = document.querySelector('#txt');
let addBtn = document.querySelector('.compartir');
let db = firebase.firestore();
//funcion para enviar posts a base de datos
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
    document.querySelector('#txt').value = '';
}


db.collection("posts").onSnapshot((querySnapshot)=> {
    root2.innerHTML ='';
    querySnapshot.forEach((doc) => {
        let post = `
        <p>${doc.data().name}</p>
        <p>${doc.data().texto}</p>
        <button id="delete" value="${doc.id}" class="delete">Eliminar</button>
        <button  id="edit" name="${doc.data().texto}" value="${doc.id}" class="edit">Editar</button>
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
}));
let editbttn = document.querySelectorAll('#edit');
    editbttn.forEach(btnedit => btnedit.addEventListener('click', (valor, txt) => {
        txt = btnedit.name; 
        valor = btnedit.value;     
          document.querySelector('#txt').value = txt;
         document.querySelector('.guardar').style.display = 'block';
        document.querySelector('.compartir').style.display = 'none';
        let bttnsave = document.querySelector('.guardar');
        bttnsave.addEventListener('click',function(){
            let txt = document.querySelector('#txt').value;
            console.log(txt);
            let colection= db.collection("pots").doc(valor);
               colection.update({
                texto : txt
               }).then(function(){
                console.log("documents successfully uptade")
                text.innerHTML = '';
                document.querySelector('.guardar').style.display = 'none';
                document.querySelector('.compartir').style.display = 'block';
            })
            .catch(function(error){
                console.error("Error uptading document: ", error)
            });
        })
    })); 
});

let likeBttn= document.querySelector('#like');
let like =0;
likeBttn.addEventListener('click',()=>{
    document.querySelector('#counting').innerHTML = ++like;
})

let salir = document.querySelector('.salir');
salir.addEventListener('click' , pantalla1 );

let bttninicio = document.querySelector('.inicio');
bttninicio.addEventListener('click', pos);
function pos(){
    publicaciones(user);

}
}