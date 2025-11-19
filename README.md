# Age Calculator App

Esta es una solución al desafío [Age calculator app challenge de Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-). Los desafíos de Frontend Mentor te ayudan a mejorar tus habilidades de codificación construyendo proyectos realistas.

## 📑 Tabla de contenidos

- [Descripción](#descripción)
  - [El desafío](#el-desafío)
  - [Capturas de pantalla](#capturas-de-pantalla)
  - [Enlaces](#enlaces)
- [Mi proceso](#mi-proceso)
  - [Tecnologías usadas](#tecnologías-usadas)
  - [Lo que aprendí](#lo-que-aprendí)
- [Autor](#autor)

## Descripción

### El desafío

Los usuarios deben poder:

- Ver la edad exacta calculada en años, meses y días al ingresar su fecha de nacimiento.
- Recibir mensajes de validación si:
  - Algún campo está vacío ("This field is required").
  - El número de día, mes o año no es válido (ej: mes 13).
  - La fecha es futura ("Must be in the past").
  - La fecha es lógicamente inválida (ej: 31 de abril).
- Ver el diseño óptimo dependiendo del tamaño de pantalla de su dispositivo (Diseño Responsivo para móviles y escritorio).
- Ver los estados "hover" y "focus" de todos los elementos interactivos en la página.
- **Bonus**: Ver los números de la edad animarse hasta el resultado final.

### Enlaces

- URL del Repositorio: https://github.com/AndyMendez1/Calculadora-de-Edad.git
- URL del Sitio en vivo: https://age-calculator-2000.netlify.app/

## Mi proceso

### Tecnologías usadas

- HTML5 Semántico
- CSS3 (Variables personalizadas, Flexbox, Media Queries)
- JavaScript (ES6+, DOM Manipulation, Date Logic)
- Google Fonts (Fuente "Poppins")
- Estrategia Mobile-first (adaptada a escritorio)

### Lo que aprendí

Durante este proyecto, profundicé en varios conceptos clave del desarrollo frontend:

#### 1. Validación de fechas y Lógica JavaScript
Aprendí cómo el objeto `Date` de JavaScript "autocorrige" las fechas (ej. convirtiendo el 31 de abril en 1 de mayo). Utilicé este comportamiento para validar fechas reales comparando el día ingresado con el día resultante del objeto Date.

```javascript
const testDate = new Date(year, month - 1, day);

// Si el día cambia (ej. de 31 a 1), la fecha original era inválida
if (testDate.getDate() !== day) {
    dayError.textContent = 'Must be a valid day';
    isValid = false;
}
```

2. Animaciones personalizadas con JS
En lugar de mostrar el resultado de golpe, creé una función animateCountUp que utiliza setInterval para incrementar los números y la opacidad progresivamente, creando un efecto visual suave.

```javascript
function animateCountUp(element, target) {
    // ... lógica de cálculo de pasos ...
    const timer = setInterval(() => {
        currentCount += increment;
        // Actualiza texto y opacidad
        element.textContent = Math.ceil(currentCount);
        element.style.opacity = Math.min(1, currentOpacity);
        
        if (currentCount >= target) {
            clearInterval(timer);
        }
    }, 20);
}
```
3. CSS Responsivo y Flexbox
Uno de los mayores desafíos fue adaptar los inputs de un diseño de columnas fijas en escritorio a un diseño fluido en móviles. Aprendí a usar flex-grow para que los campos ocupen el espacio disponible automáticamente.

```CSS
@media (max-width: 700px) {
    .container {
        width: auto; /* Elimina el ancho fijo */
    }
    
    .field {
        /* Permite que los inputs crezcan y compartan el espacio */
        flex-grow: 1;
        flex-basis: 0;
    }
}
```

Autor
GitHub - AndyMendez1

Frontend Mentor - @AndyMendez1


