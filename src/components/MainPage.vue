<template>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn
          id="mi-boton"
          density="compact"
          icon="mdi-plus"
          @click="toggleLogin"
        ></v-btn>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  import { useLoginStore } from '@/stores/login'
  
  const loginStore = useLoginStore()
  
  function toggleLogin() {
    console.log('isLoginSuccess actual:', loginStore.isLoginSuccess)
    loginStore.setLoginSuccess(!loginStore.isLoginSuccess)
  }
  </script>
  