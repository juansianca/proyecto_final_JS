/* SIMULADOR DE RECOLECCION DE CONSULTAS

El siguiente código tiene como finalidad recolestar consultas que puedan tener los pacientes o potenciales pacientes que visiten la web,
luego de que la consulta es enviada, la misma se almacena en el localStorage un array llamado "consultas".

Se incorporo una alerta que luego de que la consulta es enviada le muestra al usuario la información y confirma el envío de la misma. 

Debajo del formulario se encuentra un botón llamado "Mostrar Consultas", el cual a futuro sera visible solo para los que tengan
acceso de Administradores y al presional el mismo puedan ver las tarjetas con las consultas cargadas y pendientes de responder. 

Luego de que la consulta fue leida y la respuesta fue enviada, se puede presionar el botón "Eliminar Consulta" y la misma se borra 
del Dom y del localStorage. Nuevamente, es esperado que solo los Admistradores tengan acceso a esta información y botones. 

Respecto a la utilización de una API externa, se consulta la API de OpenWeather para mostrar el clima en la ciudad de Villa Ramallo, ciudad 
dodne se encuentra localizado el Laboratorio. 

*/

class Contacto { 
    constructor(nombre, apellido, email, consulta){
    this.nombre = nombre
    this.apellido = apellido
    this.email = email
    this.consulta = consulta
}}

let consultas = []

const formContactenos = document.getElementById("contactanosForm")

const divConsulta = document.getElementById("divConsulta")

const botonConsultas = document.getElementById("botonAdmin")


if (localStorage.getItem("consultas")){
    consultas = JSON.parse(localStorage.getItem("consultas"))
} else{
    localStorage.setItem("consultas", JSON.stringify(consultas))
}


formContactenos.addEventListener("submit", (event) => { 

    event.preventDefault() 
        
    let Nombre = document.getElementById("idNombre").value
    let Apellido = document.getElementById("idApellido").value
    let Email = document.getElementById("idEmail").value
    let Consulta = document.getElementById("idConsulta").value

    const consulta = new Contacto (Nombre, Apellido, Email, Consulta)

    if (consulta.consulta != "" && consulta.nombre != "" && consulta.apellido != "" && consulta.email != "")

    consultas.push(consulta)
    localStorage.setItem("consultas", JSON.stringify(consultas))

    if (consulta.consulta != "" && consulta.nombre != "" && consulta.apellido != "" && consulta.email != "")

    Swal.fire({
        title: '<h2>Consulta Enviada</h2>',
        icon: 'success',
        showCloseButton: true,
        showCancelButton: false,
        showconfirmButton: true,
        confirmButtonColor: '#AF2848',

        html:
        `       Nombre:<p>${consulta.nombre}</p><br>
                Apellido:<p>${consulta.apellido}</p><br>
                Email:<p>${consulta.email}</p><br>
                Consulta:<p>${consulta.consulta}</p>
        `,
           
      })

})

botonAdmin.addEventListener("click", () => {
        let arrayStorage = JSON.parse(localStorage.getItem("consultas"))
        divUsers.innerHTML= " "
        arrayStorage.forEach((consultas, indice) => {
        divUsers.innerHTML += `
        <div class="card" id="consulta${indice}" style="width: 18rem;">
            <div class="card-body">
             <div><h2 class="card-title">${consultas.nombre + " " + consultas.apellido}</h2></div>
                <p class="card-text">${consultas.email}</p>
                <p class="card-text">${consultas.consulta}</p><br>
                <button class="btn btn-danger">Eliminar Consulta</button>
            </div>
        </div>
        `
    })
    arrayStorage.forEach((consulta, indice) => {   
        let botonEliminar = document.getElementById(`consulta${indice}`).lastElementChild.lastElementChild
        botonEliminar.addEventListener("click", () =>{
            document.getElementById(`consulta${indice}`).remove()
            consultas.splice(indice,1)
            localStorage.setItem("consultas", JSON.stringify(consultas))
        })
})
})

const divClima = document.getElementById("weather")


const ApiKey = "7f717181f8a5fbcc98072a78bd5acc2e" //Api Key

//Api de geolocalizacion para encontrar la Lat y Long

fetch(`http://api.openweathermap.org/geo/1.0/direct?q="Ramallo","Buenos Aires","Arg"&appid=${ApiKey}`)
.then(response => response.json())
.then( data => {
    let {lat, lon, name, state, country} = data[0]

//Api de geolozalizacion

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=sp&appid=${ApiKey}`)
    .then(response => response.json())
    .then(({main, weather}) => { //Desgloce de la información
        let{feels_like: sensTermica, temp} = main 
        let desClima = weather[0].description
    

        //Muetro la info en el dom
        divClima.innerHTML = `
        <div>
        <p> <b>Temperatura Actual en Ramallo:</b> ${temp} °C - <b>Sensación Térmica en Ramallo:</b> ${sensTermica} °C - <b>Estado Actual:</b> ${desClima}</p>
      
        </div>
        `
    })
})

        