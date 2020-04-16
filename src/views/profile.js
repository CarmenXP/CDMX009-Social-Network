let root = document.querySelector("#root");
    let profile = 
    `
    <div id="head">
    <h2> Code Woman </h2>
    <nav>
        <button id="/init" class="btn">Inico</button>
        <button id= "/profile" class= "btn">Perfil</button>
        <button id= "/signOut" class= "btn">Salir</button>
      </nav>
    </div>
    <div id= "generalInformation">
    <div id="photo"> Aquí va foto </div>
    </br>
    <div id= "information">
    <p>Name</p>
    <p>Age</p>

    </div>
    `;
    root.innerHTML= profile;
   
