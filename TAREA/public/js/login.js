document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();  
    const email = this.email.value;
    const password = this.password.value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
         if (!response.ok) {
            throw new Error('Error en el inicio de sesión');
        }
        return response.json();
    })
    .then(data => {
        const alertaError = document.querySelector('.alerta-error');
        const alertaExito = document.querySelector('.alerta-exito');

        console.log(data);  
        if (data.message === 'Inicio de sesión exitoso') {
            alertaError.style.display = 'none';  
            alertaExito.style.display = 'block';  
            alertaExito.textContent = 'Has iniciado sesión correctamente';
            
            setTimeout(() => {  
                window.location.href = "nueva_pagina.html";  
            }, 1000);  
        } else {
            alertaExito.style.display = 'none';  
            alertaError.style.display = 'block'; 
            alertaError.textContent = data.message;  
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error en el servidor');
    });
});
