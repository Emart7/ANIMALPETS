
export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = 
        mostrarMensajeDeError(tipoDeInput, input);
    }
};

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío.",
    },
    email: {
        valueMissing: "Este campo no puede estar vacío.",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "Escriba al menos 1 letra mayuscula, 1 letra minuscula, 1 caracter especial, 1 numero, y de 8 a 30 caracteres.",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío.",
        customError: "Debes tener al menos 18 años.",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "Escriba un número de teléfono válido - 10 números.",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres.",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El nombre de la ciudad debe contener entre 5 a 25 caracteres.",
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El nombre del estado debe contener entre 5 a 25 caracteres.",
    }
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];            
        }
    });
    return mensaje;
};

function validarNacimiento(input){
    const fecha = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fecha)) {
        mensaje = "Debes tener mínimo 18 años de edad";
    }
    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getFullYear() + 18,
        fecha.getMonth(),
        fecha.getDate()
        );
    return diferenciaFechas <= fechaActual;
};
