let root = document.querySelector('#root');

import { pantalla1 } from './pantalla1.js'
import { publicaciones } from './post.js'

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
bttninicio.addEventListener('click', publicaciones);
}
// Hacer publicaciones, eliminación y borrado

let bodyTable= document.querySelector("#bodyTable");
const boxComment= document.querySelector("#contentComment");

//enviando publicaciones a la base de datos Firestore
boxComment.addEventListener("submit", (e) =>{
e.preventDefault(); 
    db.collection("publicaciones").add({
        post: boxComment.postShare.value
    })
    .then(function(docRef){
    console.log("Document written with ID: ", docRef.id);
    boxComment.postShare.value= "";
    })
    .catch(function(error){
    console.log("Error adding document: ", error);
  });

});

// leer datos /traerlos y pintarlos en intefaz
db.collection("publicaciones").onSnapshot((querySnapshot)=> {
    bodyTable.innerHTML= "";
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().post}`);
    bodyTable.innerHTML += 
        `
        <tr>
        <td>${doc.data().post}</td>
        <td><button id="delete" class="delete">Eliminar</button></td>
        <td><button id="editing" class="editing">Editar</button></td>
        
        </tr>
      `; 
      //listeners
      //let btnDelete= document.querySelector("#delete");
      //btnDelete.onclick = ()=>{console.log("mija")}
  });   
});

//borrando las publicaciones anteriormente realizadas
//function deletingPublish(){
//  db.collection("publicaciones").doc(id).delete().then(function() {
//      console.log("Document successfully deleted!");
//  }).catch(function(error) {
//      console.error("Error removing document: ", error);
// });
//}
