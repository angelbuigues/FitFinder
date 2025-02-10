<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado reactivo
const gyms = ref([]); // Lista de gimnasios
const arrayGyms = ref([]); // Nombres de los gimnasios reservados
const noReservations = ref(false); // Bandera para mostrar mensaje si no hay reservas

// Propiedad computada para filtrar gimnasios reservados
const filteredGyms = computed(() => {
    return gyms.value.filter((gym) => arrayGyms.value.includes(gym.name));
});

// Cargar datos al montar el componente
onMounted(() => {
    gyms.value = JSON.parse(localStorage.getItem('lista-gyms') || '[]');
    arrayGyms.value = JSON.parse(localStorage.getItem('arrayGyms') || '[]');

    // Verificar si hay reservas
    noReservations.value = arrayGyms.value.length === 0;

    // Depuración (opcional)
    console.log('Gyms cargados:', gyms.value);
    console.log('Array de reservas cargado:', arrayGyms.value);
});

// Eliminar reserva
const eliminarReserva = (gymName) => {
    alert(`Has eliminado la reserva en ${gymName}`);
    arrayGyms.value = arrayGyms.value.filter((name) => name !== gymName);
    localStorage.setItem('arrayGyms', JSON.stringify(arrayGyms.value));
    noReservations.value = arrayGyms.value.length === 0;
};

// Navegar a la pantalla principal
const volverAtras = () => {
    router.push({ name: 'home' });
};
</script>

<template>
    <div class="gym-list-container">
        <div id="gym-list">
            <!-- Si no hay reservas -->
            <div v-if="noReservations">
                <h3>Aún no has reservado un gimnasio</h3>
                <button @click="volverAtras">Atrás</button>
            </div>

            <!-- Si hay reservas -->
            <div v-else>
                <div v-for="(gym, index) in filteredGyms" :key="index" class="gym">
                    <h3>{{ gym.name }}</h3>
                    <img :src="`/src/assets/img/${gym.name}.png`" alt="Imagen del gimnasio" />
                    <button @click="eliminarReserva(gym.name)">Eliminar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

.gym-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.gym {
  margin: 20px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.gym img {
  width: 70%;
  height: 70%;
  border-radius: 10px;
}

.gym h3 {
  margin-top: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
.gym h3,p{
  color: black !important;
}
</style>
