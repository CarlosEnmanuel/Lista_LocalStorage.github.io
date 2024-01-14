//variables globales
const formularioUI = document.querySelector('#formulario');
const listaUI = document.getElementById('lista');
let arrayActividades = [];

//funciones
const crearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: "Pendiente"
    }
    arrayActividades.push(item);
    return item;

}

GuardarDB = () => {
    localStorage.setItem('tarea', JSON.stringify(arrayActividades));
    PintarDB();
}

PintarDB = () =>{
    listaUI.innerHTML = ' ';

    arrayActividades  = JSON.parse(localStorage.getItem('tarea'));
   

    if(arrayActividades === null){
        arrayActividades = [];
    }else{
        arrayActividades.forEach(element => {
            
            if(element.estado === "Pendiente"){
            listaUI.innerHTML += `<div class="alert alert-danger" role="alert">
            <i class="fa-solid fa-pen-to-square mr-1"></i>
            <b>${element.actividad}  </b> - ${element.estado}
            <span class="float-right">
                <i class="material-icons control">done</i>
                <i class="material-icons control">delete</i>
            </span>
          </div>`
        }
        else{
            listaUI.innerHTML += `<div class="alert alert-success" role="alert">
            <i class="fa-solid fa-pen-to-square mr-1"></i>
            <b>${element.actividad}  </b> - ${element.estado}
            <span class="float-right">
                <i class="material-icons control">done</i>
                <i class="material-icons control">delete</i>
            </span>
          </div>`
        }
        });
    }
    
}

const EliminarDB = (actividad)=>{
    let indexArray = arrayActividades.findIndex((elemento)=> { 
        return elemento.actividad.trim() === actividad.trim(); 
        });
        arrayActividades.splice(indexArray, 1);
    GuardarDB();
  
}

const EditarDB = (actividad) => {
    let indexArray = arrayActividades.findIndex((elemento)=> { 
    return elemento.actividad.trim() === actividad.trim(); 
    });
    arrayActividades[indexArray].estado = "Realizada"
    GuardarDB();
}


//EventListener
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let actividadUI = document.querySelector('#actividad').value;
    
   crearItem(actividadUI);
   GuardarDB();
   formularioUI.reset();
   
});

document.addEventListener('DOMContentLoaded', PintarDB());

listaUI.addEventListener('click', (e) => {
    e.preventDefault;

    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
       const texto = (e.srcElement.offsetParent.childNodes[3].innerHTML);

       if(e.target.innerHTML === 'delete'){
        //Funcionalidad de eliminar
        EliminarDB(texto);
       }
       else if(e.target.innerHTML === 'done'){
        //Funcionalidad de cambio de estado a la tarea
        EditarDB(texto);
       }
    }
});