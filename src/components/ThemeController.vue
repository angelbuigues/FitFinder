<template>
    <label
      for="AcceptConditions"
      class="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-yellow-500"
      >
      <input type="checkbox" id="AcceptConditions" class="peer sr-only" v-model="isDarkTheme"/>
    
      <span
        class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"
        >
      </span>
    </label>
  </template>
  <script>
  document.documentElement.classList.add('dark')
  export default {
    data() {
      return {
        isDarkTheme: true
      }
    },
    watch: {
      isDarkTheme(newValue) {
        if (newValue) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }
  }
  </script>