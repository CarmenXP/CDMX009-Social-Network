

let root = document.querySelector('#root');
export const publicaciones = (user) => {
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
console.log(user);
function agregarPst(){
var db = firebase.firestore();
db.collection("posts").add({
    user: "Ada",
    body: "Lovelace",
    like : [user, contador]
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
})
}
}