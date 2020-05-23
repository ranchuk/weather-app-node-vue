<template>
    <header class="header">
        <h1>Weather App</h1>
        <div class="">
        <input  class="button_home" type="button" value="Home" @click="redirectToHome"/>
        <input  class="button_favorites" type="button" value="Favorites" @click="redirectToFavorites"/>
        </div>
    </header>
</template>

<script>
import router from '../../router'

export default {
    name: "Header",
    methods: {
        redirectToFavorites() {
            router.push('favorites')
        },
        redirectToHome() {
            router.push('/')
        }
    }
}
</script>

<style scoped>
    .header {
        color:white;
        height: 50px;
        border-bottom: 1px solid black;
    }
    .button_home {
        width:50px;
        height: 25px;
    }
        .button_favorites {
        width:80px;
        height: 25px;
    }
</style>