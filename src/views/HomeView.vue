<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import gyms from '../data/gym.json' with { type: 'json' };
import.meta.url

localStorage.setItem("lista-gyms", JSON.stringify(gyms));
if(JSON.parse(localStorage.getItem('arrayGyms')) === null || JSON.parse(localStorage.getItem('arrayGyms')) === undefined){
    let arrayGyms = [];
    localStorage.setItem("arrayGyms", JSON.stringify(arrayGyms));
}

// Reactive data
const gymList = ref(gyms);
const router = useRouter(); // Instancia de router

// Navigation function
const goToGymDetail = (gymName) => {
  // Navegar a la vista de detalles del gimnasio
  router.push({ name: 'gyms', params: { name: gymName } });
};
</script>

<template>
  <div class = "gym-list-container">
    <div id="gym-list">
      <div
        v-for="(gym, index) in gymList"
        :key="index"
        class="gym"
        @click="goToGymDetail(gym.name)"
      >
        <h3>{{ gym.name }}</h3>
        <img :src="`/src/assets/img/${gym.name}.png`" alt="logo" />
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

#gym-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}


.gym {
  margin: 20px;
  width: calc(33.33% - 20px);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

.gym:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.gym img {
  width: 70%;
  height: 70%;
  border-radius: 10px;
  
}

.gym h3 {
  margin-top: 10px;
}

#gym-list h3,p{
  color: black !important;
}
</style>
