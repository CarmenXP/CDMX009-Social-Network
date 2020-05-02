import { pantalla1 } from './pantalla1.js'

let root = document.querySelector('#root');
export const publicaciones = (user) => {
 let post = `
<div class='head'>
 <h2>&lt;Code Woman&gt;</h2>
   <input class='inicio' type='button' value='Inicio'/>
   <input class='perfil' type='button' value='Perfil'/>
   <input class='salir' type='button' value='Salir'/>
<div>
<div class='containtPub'>
   <div id='crearP'> <p> Crear publicación </div>
   <div id='crearC'> 
     <input type='text' id="txt" class='txt' placeholder='¿Que deseas compartir, ${user.displayName}?' >
       <div id="conteintpost" class="conteintpost"></div>  
        <div id='myModal' class='myModal'> 
           <div class='modalContent'>
           <span class='close' id='close'> &times;</span>
           <input type='file' id='myfile' class='myfile' name='myfile'>
          </div>   
       </div>
   </div>
   <div id='CompartirPhoto'>
     <img class="inputImg" id='file' src="/img/camara.png">
     <input type='button' value='Compartir' class='compartir' id="Compartir">
     <input id="sendComment" type='button' value='Guardar' class='guardar'>
   </div>
</div>
<div id='root1'>
</div>
<div class='root2' id='root2'></div>
<div id="counter" class="counter">
      
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
        date: new Date(),
        texto : text.value,
        likes: [],
        image: url
    })
    .then(url => function(docRef) {
        console.log(docRef.id)
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        
    });
    document.querySelector('#txt').value = '';
    document.querySelector('#conteintpost').style.display = 'none';
}


db.collection("posts").onSnapshot((querySnapshot)=> {
    root2.innerHTML ='';
    querySnapshot.forEach((doc) => {
       let imgurl = doc.data().image;
       let imageTemplete = `<img src=${doc.data().image}>`;
       let div = `<div></div>`;
        let post = `
        <p>${doc.data().name}</p>
        <p>${doc.data().texto}</p>
        ${imgurl ? imageTemplete : div}
        <button id="delete" value="${doc.id}" class="delete">Eliminar</button>
        <button  id="edit" name="${doc.data().texto}" data-id="${doc.id}" class="edit">Editar</button>
        <button class="like" name="${doc.data().likes}" data-id="${doc.id}"> <p class="like" >${doc.data().likes}</p> Me gusta</button> 
        `
    let nodo = document.createElement('div');
    nodo.classList.add('card')
    nodo.innerHTML = post
    root2.appendChild(nodo);
});
//Boton para Eliminar
let idbttn = document.querySelectorAll('.delete');
    idbttn.forEach(btn => btn.addEventListener('click', (value) => {
        value = btn.value;
        db.collection("posts").doc(value).delete().then(function() {
        }).catch(function(error) {
          alert("Error removing document: ", error);
        });
}));
 //Boton para contar Me Gusta
 let like = document.querySelectorAll('.like');
 like.forEach(likes=> likes.addEventListener('click', (e, iddoc)=>{
     iddoc = likes.getAttribute('data-id');
    let docRef =  db.collection("posts").doc(iddoc);
    docRef.get().then(function(doc) {
       if (doc.exists) {
           console.log("Document data:", doc.data());
           let like = doc.data().likes;
           let increment = firebase.firestore.FieldValue.increment(1)
           console.log(like)
          return docRef.update({
               name: doc.data().name,
               texto: doc.data().texto,
               likes: increment
           })
       } else {
           // doc.data() will be undefined in this case
           console.log("No such document!");
       }
   }).catch(function(error) {
       console.log("Error getting document:", error);
   });
      
 }))
//Boton para Editar comentarios

let editbttn = document.querySelectorAll('#edit');
    editbttn.forEach(btnedit => btnedit.addEventListener('click', (valor, txt) => {
        txt = btnedit.name; 
        valor = btnedit.getAttribute('data-id');     
          document.querySelector('#txt').value = txt;
         document.querySelector('.guardar').style.display = 'block';
        document.querySelector('.compartir').style.display = 'none';
        let bttnsave = document.querySelector('.guardar');
        bttnsave.addEventListener('click',function(){
            let txt = document.querySelector('#txt').value;
            console.log(txt);
            let colection= db.collection("posts").doc(valor);
               colection.update({
                texto : txt
               }).then(function(){
                console.log("documents successfully uptade")
                text.innerHTML = '';
                document.querySelector('.guardar').style.display = 'none';
                document.querySelector('.compartir').style.display = 'block';
                document.querySelector('#txt').value = ''; //Deja el campo vacio
            })
            .catch(function(error){
                console.error("Error uptading document: ", error)
            });
        })
    })); 
});



let salir = document.querySelector('.salir');
salir.addEventListener('click' , pantalla1 );

let bttninicio = document.querySelector('.inicio');
bttninicio.addEventListener('click', pos);
function pos(){
    publicaciones(user);

}

//Carga de Fotos
     //Creando modal para cargar fotos
     let url

     //function upLoadPhoto(){
     let modal = document.querySelector('#myModal');
     let btn = document.querySelector('.inputImg');
     let span = document.querySelector('.close');
     
     btn.onclick = function (){
       modal.style.display = 'block';
     }
     
     span.onclick = function (){
       modal.style.display = 'none';
     }
     
     window.onclick = function (event){
       if (event.target == modal){
         modal.style.display = 'none';
       }
     }
        //Creando funcion para cargar imagenes a storage
        let fileInput = document.querySelector('#myfile');
        let insertimg = document.querySelector('#conteintpost')
        
        //Listeners
        if(!file){

        }else{
        fileInput.onchange = e => {
          let file = e.target.files[0]
          firebase.storage().ref("images").child(file.name).put(file)
          .then(snap => {
            console.log('Imagen cargada');
            return snap.ref.getDownloadURL()
          })
          .then (link =>{
              url = link
              let img = document.createElement('img')
              img.src = link
              //document.body.appendChild(img)
              insertimg.appendChild(img)
              document.querySelector('#conteintpost').style.display = 'block';
          })
          
         }
        }

     //}
     //upLoadPhoto();
}







































































































