console.log("JS cargado correctamente");

const ageForm = document.querySelector('#formAge');

const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

const dayField = dayInput.parentElement;
const monthField = monthInput.parentElement;
const yearField = yearInput.parentElement;

const yearOutput = document.getElementById('years');
const monthOutput = document.getElementById('months');
const dayOutput = document.getElementById('days');

ageForm.addEventListener('submit', (event) =>{
    event.preventDefault();

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const isValid = validateDate(day, month, year);

    if (isValid){

        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDay = today.getDate();

        const birthMonth = month - 1;

        let ageYear = todayYear - year;
        let ageMonths = todayMonth - birthMonth;
        let ageDays = todayDay - day;

        if (ageDays < 0){
        ageMonths--;

        ageDays += new Date(todayYear, todayMonth, 0).getDate();
    }

        if (ageMonths < 0){
        ageYear--;
        ageMonths += 12;
    }
        animateCountUp(yearOutput, ageYear);
        animateCountUp(monthOutput,  ageMonths);
        animateCountUp(dayOutput, ageDays);

    } else {

        yearOutput.textContent = '--';
        monthOutput.textContent = '--';
        dayOutput.textContent = '--';

    }


});

function validateDate(day, month, year) {
    
    let isValid = true; 

    const dayError = document.getElementById('dayError');
    const monthError = document.getElementById('monthError');
    const yearError = document.getElementById('yearError');


    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';

    dayField.classList.remove('field-error');
    monthField.classList.remove('field-error');
    yearField.classList.remove('field-error');

    // Validar DÍA
    if (isNaN(day)) {
        dayError.textContent = 'This field is required';
        dayField.classList.add('field-error');
        isValid = false;
    } else if (day < 1 || day > 31) {
        dayError.textContent = 'Must be a valid day';
        dayField.classList.add('field-error');
        isValid = false;
    }

    // Validar MES
    if (isNaN(month)) {
        monthError.textContent = 'This field is required';
        monthField.classList.add('field-error');
        isValid = false;
    } else if (month < 1 || month > 12) { 
        monthError.textContent = 'Must be a valid month';
        monthField.classList.add('field-error');
        isValid = false;
    }

    // Validar AÑO
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


    if (isValid) {
        const testDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Poner la hora a medianoche para comparar

        
        if (testDate.getDate() !== day) {
            dayError.textContent = 'Must be a valid day';
            dayField.classList.add('field-error');
            isValid = false;
        }

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
 * @param {HTMLElement} element
 * @param {number} target
 */
function animateCountUp(element, target) {
    // 1. Variables iniciales
    let currentCount = 0;
    
    let currentOpacity = 0; 

    // 2. Duración y pasos
    const duration = 1000; 
    const steps = 500; 
    const stepTime = duration / steps; 

    // 3. Cálculo de incrementos
    const numberIncrement = target / steps;
    
    // (Queremos ir de 0 a 1 en 'steps' pasos)
    const opacityIncrement = 1 / steps;

    // 4. Limpiamos cualquier opacidad anterior
    element.style.opacity = 0;

    // 5. El intervalo
    const timer = setInterval(() => {
        
        // 6. Aumentamos ambos valores
        currentCount += numberIncrement;
        currentOpacity += opacityIncrement;

        
        element.style.opacity = Math.min(1, currentOpacity);

        // 7. Revisamos si hemos llegado al final
        if (currentCount >= target) {
            // Ponemos los valores finales exactos
            element.textContent = target;
            element.style.opacity = 1;
            clearInterval(timer);
        } else {
            // Mostramos los valores actuales
            element.textContent = Math.ceil(currentCount);
        }

    }, stepTime); // 8. Ejecutar cada 'stepTime'
}
