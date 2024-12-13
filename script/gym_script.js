
// Mostrar los gimnasios
const gymInfo = document.querySelector('#gym-list');
const gyms = JSON.parse(localStorage.getItem('lista-gyms'));
const nameGym = localStorage.getItem("gymSelector");
const arrayGyms = JSON.parse(localStorage.getItem('arrayGyms'));

if (nameGym === null) {
    const gymDiv = document.createElement('div');
    gymDiv.className = 'gym';
    const h3 = document.createElement('h3');
    h3.textContent = 'Aun no has seleccionado un gimnasio';
    gymDiv.appendChild(h3);

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
        if (gym.name === nameGym) {
            const gymDiv = document.createElement('div');
            gymDiv.className = 'gym';
            const h3 = document.createElement('h3');
            h3.textContent = gym.name;
            gymDiv.appendChild(h3);
            
            const img = document.createElement('img');
            img.src = `../img/${gym.name}.png`;
            img.alt = 'FitFinder Logo';
            gymDiv.appendChild(img);
            
            const addressP = document.createElement('p');
            addressP.textContent = `Dirección: ${gym.address}, ${gym.city}`;
            gymDiv.appendChild(addressP);
            
            const ratingP = document.createElement('p');
            ratingP.textContent = `Calificación: ${gym.rating} ⭐`;
            gymDiv.appendChild(ratingP);
            
            const servicesP = document.createElement('p');
            servicesP.textContent = `Servicios: ${gym.services.join(', ')}`;
            gymDiv.appendChild(servicesP);
            
            const button = document.createElement('button');
            button.id = 'reserve-btn';
            button.textContent = 'Reservar';
            gymDiv.appendChild(button);
            gymInfo.appendChild(gymDiv);
        }

    });

    // Añadir eventos a los botones de reservar
    document.querySelector('#reserve-btn').addEventListener('click', () => {
        arrayGyms.push(nameGym);
        alert(`Has reservado en ${nameGym}`);
        console.log(arrayGyms);
        localStorage.setItem("arrayGyms", JSON.stringify(arrayGyms));
    });
}
