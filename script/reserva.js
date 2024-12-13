
// Mostrar los gimnasios
const gymInfo = document.querySelector('#gym-list');
const gyms = JSON.parse(localStorage.getItem('lista-gyms'));
let arrayGyms = JSON.parse(localStorage.getItem('arrayGyms'));


if (arrayGyms.length === 0) {
    const gymDiv = document.createElement('div');
    gymDiv.className = 'gym';
    const heading = document.createElement('h3');
    heading.textContent = 'Aun no has reservado un gimnasio';
    gymDiv.appendChild(heading);

    const button = document.createElement('button');
    button.id = 'voler-btn';
    button.textContent = 'Atras';
    gymDiv.appendChild(button);
    gymInfo.appendChild(gymDiv);
    document.querySelector('#voler-btn').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}
else {
    gyms.forEach(gym => {
        arrayGyms.forEach(gymName => {
            if (gym.name === gymName) {
                const gymDiv = document.createElement('div');
                gymDiv.className = 'gym';
                const heading = document.createElement('h3');
                heading.textContent = gym.name;
                gymDiv.appendChild(heading);

                const image = document.createElement('img');
                image.src = `../img/${gym.name}.png`;
                image.alt = 'FitFinder Logo';
                gymDiv.appendChild(image);

                const button = document.createElement('button');
                button.id = 'eliminar-btn';
                button.textContent = 'Eliminar reserva';
                button.setAttribute('data-name', gym.name);
                gymDiv.appendChild(button);
                gymInfo.appendChild(gymDiv);
            }
        })


    });

    // Añadir eventos a los botones de reservar
    document.querySelectorAll('#eliminar-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const nameGym = e.target.getAttribute('data-name'); // Obtener el nombre del gimnasio
            alert(`Has eliminado la reserva en ${nameGym}`);

            // Actualizar el array y el Local Storage
            arrayGyms = arrayGyms.filter(gymName => gymName !== nameGym);
            localStorage.setItem("arrayGyms", JSON.stringify(arrayGyms));
            window.location.href = './reservas.html';
        });
    });


}
