
//EXPRESIONES REGULARES
const expresiones = {
    //usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    //nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    //apellidos: /^[a-zA-ZÀ-ÿ\s]{1,90}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{6,10}$/, // 6 a 10 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    //paquete: /^\d{1,2}$/ // 1 a 2 numeros.
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
    
        default:
            break;
    }
    
}


const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {//test: compara el value con la expresion regular
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
    input.addEventListener('keyup', validarFormulario);//tecla levantada
    input.addEventListener('blur', validarFormulario);//click fuera del input
});

