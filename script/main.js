import gyms from '../data/gym.json' with { type: 'json' };

console.log('JS Cargado');
console.log(gyms);

localStorage.setItem("lista-gyms", JSON.stringify(gyms));
if(JSON.parse(localStorage.getItem('arrayGyms')) === null || JSON.parse(localStorage.getItem('arrayGyms')) === undefined){
    let arrayGyms = [];
    localStorage.setItem("arrayGyms", JSON.stringify(arrayGyms));
}

const gymList = document.querySelector('#gym-list');


gyms.forEach(gym => {
    const gymDiv = document.createElement('div');
    gymDiv.className = 'gym';
    const gymTitle = document.createElement('h3');
    gymTitle.textContent = gym.name;
    const gymImg = document.createElement('img');
    gymImg.src = `./img/${gym.name}.png`;
    gymImg.alt = 'FitFinder Logo';
    gymDiv.appendChild(gymTitle);
    gymDiv.appendChild(gymImg);
    gymList.appendChild(gymDiv);
});


document.querySelectorAll('.gym').forEach((gymSelector, index) => {
    gymSelector.addEventListener('click', () => {
        localStorage.setItem("gymSelector", `${gyms[index].name}`);
        window.location.href = './html/gyms.html';
    });
});