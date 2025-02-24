<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Cargar datos de gimnasios desde LocalStorage
const gyms = JSON.parse(localStorage.getItem("lista-gyms"));

// Estado para la posición del usuario
const userLocation = ref([38.3452, -0.4810]);
const zoom = ref(13);
const router = useRouter(); // Instancia de router
// Filtros
const maxDistance = ref(5); // en kilómetros
const selectedServices = ref([]);
const selectedPricingPlan = ref('one_month');
const maxPrice = ref(60);

// Función para calcular distancia usando fórmula Haversine
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Calcular el precio mínimo y máximo del JSON según el plan seleccionado
const pricingLimits = computed(() => {
  const prices = gyms.map(gym => gym.pricing[selectedPricingPlan.value]);
  const minPrice = Math.min(...prices); // Precio mínimo
  const maxPrice = Math.max(...prices); // Precio máximo

  // Ajustar el valor de maxPrice si está fuera del nuevo rango
  if (maxPrice.value < minPrice) maxPrice.value = minPrice;
  if (maxPrice.value > maxPrice) maxPrice.value = maxPrice;

  return { min: minPrice, max: maxPrice };
});

// Gimnasios filtrados
const filteredGyms = computed(() => {
  return gyms.filter(gym => {
    // Filtrar por distancia
    const distance = calculateDistance(
      userLocation.value[0],
      userLocation.value[1],
      gym.latitude,
      gym.longitude
    );
    
    // Filtrar por servicios
    const hasServices = selectedServices.value.length === 0 || 
      selectedServices.value.every(service => 
        gym.services.includes(service)
      );
    
    // Filtrar por precio
    const price = gym.pricing[selectedPricingPlan.value];
    
    return distance <= maxDistance.value && 
           hasServices && 
           price <= maxPrice.value;
  });
});

// Obtener todos los servicios únicos
const allServices = computed(() => {
  const services = new Set();
  gyms.forEach(gym => {
    gym.services.forEach(service => services.add(service));
  });
  return Array.from(services);
});

// Función para obtener la ubicación del usuario
const getUserLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = [
          position.coords.latitude,
          position.coords.longitude
        ];
      },
      (error) => {
        console.error("Error obteniendo la ubicación: ", error);
      }
    );
  } else {
    console.error("Geolocalización no está soportada en este navegador.");
  }
};

onMounted(getUserLocation);

// Iconos
const userIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1041/1041883.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const gymIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Navigation function
const goToGymDetail = (gymName) => {
  // Navegar a la vista de detalles del gimnasio
  router.push({ name: 'gyms', params: { name: gymName } });
};
</script>

<template>
  <div class="container">
    <div class="filters">
      <div class="filter-group">
        <label>Distancia máxima (km):</label>
        <input type="range" v-model="maxDistance" min="1" max="20" step="1">
        <span>{{ maxDistance }} km</span>
      </div>

      <div class="filter-group">
        <details class="dropdown">
          <summary class="dropdown-header">
            🏋️ Servicios ({{
              selectedServices.length === 0 ? 'Todos' : selectedServices.length + ' seleccionados'
            }})
            <span class="arrow">▼</span>
          </summary>
          <div class="dropdown-content">
            <div v-for="service in allServices" :key="service" class="service-checkbox">
              <input 
                type="checkbox" 
                :id="service" 
                :value="service" 
                v-model="selectedServices"
              >
              <label :for="service">{{ "  " + service }}</label>
            </div>
          </div>
        </details>
      </div>

      <div class="filter-group">
        <label>Plan de precios:</label>
        <select v-model="selectedPricingPlan" class="price-filter">
          <option value="one_day">Día</option>
          <option value="one_week">Semana</option>
          <option value="one_month">Mes</option>
        </select>
        
        <label>Precio máximo (€):</label>
        <input 
          type="range" 
          v-model="maxPrice" 
          :min="pricingLimits.min" 
          :max="pricingLimits.max" 
          step="1"
          class="price-slider"
        >
        <span>{{ maxPrice }} €</span>
      </div>
    </div>

    <l-map
      v-model:zoom="zoom" 
      :center="userLocation" 
      style="height: 500px; width: 100%;"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <l-marker 
        :lat-lng="userLocation"  
        :icon="userIcon"
      >
        <l-popup>Tu ubicación</l-popup>
      </l-marker>

      <l-marker
        v-for="gym in filteredGyms"
        :key="gym.name"
        :lat-lng="[gym.latitude, gym.longitude]"
        :icon="gymIcon"
      >
        <l-popup>
          <h3>{{ gym.name }}</h3>
          <p>Precios: 
            <br>Día: {{ gym.pricing.one_day }}€
            <br>Semana: {{ gym.pricing.one_week }}€
            <br>Mes: {{ gym.pricing.one_month }}€
          </p>
          <button 
          id="reserve-btn" 
          @click="goToGymDetail(gym.name)"
          >Detalles</button>

        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<style>
/* Estilos generales */
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  color: black !important;
}

.filters {
  margin-bottom: 20px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
#reserve-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#reserve-btn:hover {
  background-color: #0056b3;
}
/* Estilos para los filtros de precios */
.price-filter {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff; /* Fondo blanco */
  color: #333; /* Texto oscuro */
  font-size: 14px;
}

.price-filter:focus {
  outline: none;
  border-color: #007bff; /* Color azul al enfocar */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Sombra al enfocar */
}

/* Estilos para el dropdown de servicios (se mantienen igual) */
.dropdown {
  position: relative;
  margin: 10px 0;
}

.dropdown-header {
  cursor: pointer;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.dropdown-content .service-checkbox {
  padding: 5px 0;
}

.arrow {
  font-size: 0.8em;
  margin-left: 10px;
  transition: transform 0.2s;
}

details[open] .arrow {
  transform: rotate(180deg);
}

/* Ajustes para responsive */
@media (max-width: 768px) {
  .dropdown-content {
    position: fixed;
    left: 20px;
    right: 20px;
    max-height: 50vh;
  }
}
</style>