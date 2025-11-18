/* Verificación inicial para confirmar que el archivo JS está cargado */
console.log("JS cargado correctamente");

/* Selección del formulario principal donde se ingresan los datos */
const ageForm = document.querySelector('#formAge');

/* Inputs del usuario para día, mes y año */
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

/* Campos contenedores para aplicar estilos de error cuando sea necesario */
const dayField = dayInput.parentElement;
const monthField = monthInput.parentElement;
const yearField = yearInput.parentElement;

/* Elementos donde se mostrarán los resultados finales */
const yearOutput = document.getElementById('years');
const monthOutput = document.getElementById('months');
const dayOutput = document.getElementById('days');

/* Evento principal: procesa el formulario al presionar el botón */
ageForm.addEventListener('submit', (event) =>{
    event.preventDefault();

    /* Conversión de los valores ingresados a números */
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    /* Validación completa de la fecha ingresada */
    const isValid = validateDate(day, month, year);

    if (isValid){

        /* Obtiene la fecha actual para calcular la edad */
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDay = today.getDate();

        /* Ajuste del mes de nacimiento al formato 0–11 */
        const birthMonth = month - 1;

        /* Cálculo inicial de años, meses y días */
        let ageYear = todayYear - year;
        let ageMonths = todayMonth - birthMonth;
        let ageDays = todayDay - day;

        /* Ajuste cuando los días aún no se cumplen este mes */
        if (ageDays < 0){
        ageMonths--;

        ageDays += new Date(todayYear, todayMonth, 0).getDate();
    }

        /* Ajuste cuando el mes de cumpleaños aún no ocurre este año */
        if (ageMonths < 0){
        ageYear--;
        ageMonths += 12;
    }

        /* Animación del conteo de resultados */
        animateCountUp(yearOutput, ageYear);
        animateCountUp(monthOutput,  ageMonths);
        animateCountUp(dayOutput, ageDays);

    } else {

        /* Limpia los resultados si la fecha es inválida */
        yearOutput.textContent = '--';
        monthOutput.textContent = '--';
        dayOutput.textContent = '--';

    }


});

/* Función que valida la fecha ingresada por el usuario */
function validateDate(day, month, year) {
    
    let isValid = true; 

    /* Elementos donde se mostrarán los errores */
    const dayError = document.getElementById('dayError');
    const monthError = document.getElementById('monthError');
    const yearError = document.getElementById('yearError');

    /* Limpieza previa de mensajes y estilos de error */
    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';

    dayField.classList.remove('field-error');
    monthField.classList.remove('field-error');
    yearField.classList.remove('field-error');

    /* Validación del DÍA (obligatorio y rango válido) */
    if (isNaN(day)) {
        dayError.textContent = 'This field is required';
        dayField.classList.add('field-error');
        isValid = false;
    } else if (day < 1 || day > 31) {
        dayError.textContent = 'Must be a valid day';
        dayField.classList.add('field-error');
        isValid = false;
    }

    /* Validación del MES (obligatorio y rango válido) */
    if (isNaN(month)) {
        monthError.textContent = 'This field is required';
        monthField.classList.add('field-error');
        isValid = false;
    } else if (month < 1 || month > 12) { 
        monthError.textContent = 'Must be a valid month';
        monthField.classList.add('field-error');
        isValid = false;
    }

    /* Validación del AÑO (obligatorio, pasado y aceptable) */
    const currentYear = new Date().getFullYear();

    if (isNaN(year)) {
        yearError.textContent = 'This field is required';
        yearField.classList.add('field-error');
        isValid = false;
    } else if (year > currentYear) { 
        yearError.textContent = 'Must be in the past';
        yearField.classList.add('field-error');
        isValid = false;
    } else if (year < 1930) {
        yearError.textContent = 'Must be greater than 1930';
        yearField.classList.add('field-error');
        isValid = false;
    }

    /* Validación cruzada: confirma que la fecha realmente existe */
    if (isValid) {
        const testDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        /* Verifica que el día existe en ese mes */
        if (testDate.getDate() !== day) {
            dayError.textContent = 'Must be a valid day';
            dayField.classList.add('field-error');
            isValid = false;
        }

        /* Evita fechas futuras, aunque sean válidas */
        if (testDate > today) {
            dayError.textContent = 'Must be in the past';
            dayField.classList.add('field-error');
            monthField.classList.add('field-error');
            yearField.classList.add('field-error');
            isValid = false;
        }
    }

    return isValid;
};

/**
 * Función que anima el conteo numérico hacia el resultado final
 * Usada para mostrar años, meses y días con efecto visual 
 * @param {HTMLElement} element
 * @param {number} target
 */
function animateCountUp(element, target) {
    /* Valores iniciales antes de la animación */
    let currentCount = 0;
    
    let currentOpacity = 0; 

    /* Configuración del tiempo total y cantidad de pasos */
    const duration = 1000; 
    const steps = 100; 
    const stepTime = duration / steps; 

    /* Incrementos por cada paso */
    const numberIncrement = target / steps;
    const opacityIncrement = 1 / steps;

    /* Asegura que la animación empiece invisible */
    element.style.opacity = 0;

    /* Intervalo que anima el número progresivamente */
    const timer = setInterval(() => {
        
        /* Aumento gradual del número y visibilidad */
        currentCount += numberIncrement;
        currentOpacity += opacityIncrement;

        
        element.style.opacity = Math.min(1, currentOpacity);

        /* Finaliza cuando se llega al valor objetivo */
        if (currentCount >= target) {
            element.textContent = target;
            element.style.opacity = 1;
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(currentCount);
        }

    }, stepTime);
}
