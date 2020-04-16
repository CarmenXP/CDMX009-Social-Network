let div = document.querySelector('#root');
export const registrar = () => {
 let a = document.querySelector('#registro');
 a.addEventListener('click', forma);
 function forma(){   
 let inicio = `
<h1>Hola<h1>
 `
 div.innerHTML = inicio;
 }
}