<template>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Apod } from '../../Types/nasa/apod';
import { get_picture_of_the_day } from '../../services/nasa/apodService';

let data : Apod[] | null = null;
let isLoading : boolean | null = null;
let isError : boolean | null = null;
const error = "Erreure de chargement de l'API APOD";

let apod = ref<Apod | null>(null);

onMounted( async () => {
    try {
        isError = false;
        isLoading = true;
        
        data = await get_picture_of_the_day();
        apod.value = api_rep[0];  
    } catch {
        isError = true;
    } finally {
        isLoading = false;
    }
})
</script>

<style scoped>
</style>