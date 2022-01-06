
//EXPRESIONES REGULARES
const expresiones = {
    password: /^.{6,10}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    network: /^[a-zA-Z0-9\_\-\s]{1,20}$/,
    octet: /^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/
}

const validarFormulario = (e) =>{

    switch (e.target.name) {
        case 'email':
            validarCampo(expresiones.email, e.target, 'email');
            break;
        case 'password':
            validarCampo(expresiones.password, e.target, 'password');
            break;
        case 'password2':
            validarCampo(expresiones.password, e.target, 'password2');
            break;
        case 'network':
            validarCampo(expresiones.network, e.target, 'network');
            break;
        case 'fioctet':
            validarCampo(expresiones.octet, e.target, 'fioctet');
            break;
        case 'soctet':
            validarCampo(expresiones.octet, e.target, 'soctet');
            break;
        case 'toctet':
            validarCampo(expresiones.octet, e.target, 'toctet');
            break;
        case 'fooctet':
            validarCampo(expresiones.octet, e.target, 'fooctet');
            break;
    
        default:
            break;
    }
    
}


const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        //TRUE
        document.getElementById(`campo-${campo}`).classList.remove('campo-incorrecto');
        document.getElementById(`campo-${campo}`).classList.add('campo-correcto');
        document.querySelector(`#campo-${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#campo-${campo} i`).classList.add('fa-check-circle');
    }else{
        //FALSE
        document.getElementById(`campo-${campo}`).classList.add('campo-incorrecto');
        document.getElementById(`campo-${campo}`).classList.remove('campo-correcto');
        document.querySelector(`#campo-${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#campo-${campo} i`).classList.add('fa-times-circle');
    }
}

const formulario = document.querySelector('.formulario');
const inputs = document.querySelectorAll('.formulario input');

//RECORRER EL ARREGLO DE INPUTS Y DARLES EVENTOS
inputs.forEach( (input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

