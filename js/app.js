//variables
//formulario de tweets
const formulario = document.querySelector('#formulario');
//lista de los tweets
const listaTweets = document.querySelector('#lista-tweets');
//arreglo de tweets
let tweets = [];

//eventlisteners
eventListeners();

function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet );
    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        //recuperar de localstroage los tweets
        //y al mismo tiempo convertirmos el string en un arreglo ú objeto
        //lo que se le dice es que intente traer los tweets de localstorage pero en caso de no haber
        //entonces tweets seria igual a vacio ---> []
        tweets = JSON.parse( localStorage.getItem('tweets')) || [] ;
        //console.log( tweets );
        //llamamos el crearHTML()
        crearHTML();
    });
}


//funciones
//funcion para gregar tweet
function agregarTweet( e ) {
    //prevenir la accion por default
    e.preventDefault();
    //TEXT AREA DONDE EL USUARIO ESCRIBE
    const tweet = document.querySelector('#tweet').value;
    
    //validacion 
    if ( tweet === '') {
        mostrarError('No puede ir vacio este campo');
        return;//se evita que se ejecuten las siguientes lineas de codigo
    }
    
    //crear un objeto con el id del tweet y el mismo tweet
    //en recientes versiones de javascript se puede hacer lo siguiente
    // tweet: tweet ---> es decir si el nombre de la llave es igual al del valor
    //se puede solamente uno y en automatico el navegador sabra que tanto llave como valor tienen 
    //el mismo nombre
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //Añadir al arreglo de tweets
    tweets = [ ...tweets, tweetObj ];
    //console.log( tweets );
    //una vez agregado vamos a crear el HTML()
    crearHTML();
    //resetear el formulario
    formulario.reset();
}
//mostrar mensaje de error
function mostrarError( error ) {
    //scripting
    //crear un elemento html
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    //definir donde ira el mensaje de error
    //variable local
    const contenido = document.querySelector('#contenido');
    contenido.appendChild( mensajeError );

    //eliminar la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}
//muestra un listado de los tweets
function crearHTML() {
    //liompiar html anterior
    limpiarHTML()

    //verificar que veng un tweet
    if ( tweets.length > 0 ) {
        tweets.forEach( tweet => {
            //agregar un boton para poder eliminar el tweet
            const btnEliminar = document.createElement('a');
            //añadir clases al boton
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            //añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                //funcion para eliminar tweet
                //le pasamos el id del tweet
                borrarTweet( tweet.id );
            }

            //crear el html
            const li = document.createElement('li');
            //añadir el texto
            li.innerText = tweet.tweet;
            //asignar el boton de eliminar a li
            li.appendChild( btnEliminar );
            //insertarlo en el html
            listaTweets.appendChild( li );
        });
    }

    //sincronizar el localstroage para mostrar los tweets guardados apenas se abra la aplicacion
    sincronizarStorage();
}

//agrega los tweets actuales a local storage
function sincronizarStorage() {
    //al ser un objeto tweets debemos convertir a un string con JSON.stringify()
    localStorage.setItem('tweets', JSON.stringify( tweets ));
}

//eliminar tweet
function borrarTweet( id ) {
    tweets = tweets.filter( tweet => tweet.id !== id );
    console.log( tweets );
    //llamar html para renderizar
    crearHTML();
}

//limpiar el html
function limpiarHTML() {
    while ( listaTweets.firstChild ) {
        listaTweets.removeChild( listaTweets.firstChild );
    }
}