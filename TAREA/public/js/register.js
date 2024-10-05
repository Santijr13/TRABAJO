document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        const alertaError = document.querySelector('.alerta-error');
        const alertaExito = document.querySelector('.alerta-exito');

        if (data.message === 'Usuario registrado correctamente') {
            alertaError.style.display = 'none'; 
            alertaExito.style.display = 'block';  
            alertaExito.textContent = 'Te has registrado correctamente';
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
