<template>
    <header class="header">
        <img v-bind:src="require('../../pictures/appLogo.png')" alt="logo" width="100px" height="100px"/>  
        <span v-if="currentRouteName === 'Home'"><SearchBar /></span>
        <div class="buttons">          
        <input class="button" type="button" value="Home" @click="redirectToHome"  v-if="currentRouteName === 'Favorites'"/>
        <input class="button" type="button" value="Favorites" @click="redirectToFavorites" v-if="currentRouteName === 'Home'"/>
        </div> 
    </header>
</template>

<script>
import router from '../../router'
import SearchBar from '../autoCompleteSearch/searchBar'

export default {
    name: "Header",
    components: {
        SearchBar
    },
    methods: {
        redirectToFavorites() {
            router.push('favorites')
        },
        redirectToHome() {
            router.push('/')
        }
    },
    computed: {
            currentRouteName() {
                return this.$route.name;
            }
    }
}
</script>

<style scoped>
    .header {
        font-size: 2.5rem;
        display: flex;
        flex-direction: row;
        color:white;
        /* border-bottom: 0.1rem solid black; */
        justify-content: space-between;
        align-items: center;
    }
    .buttons {
        display: flex;
        justify-content: space-between;
    }
    .button {
        padding: 1rem;
        border-radius: 0.2rem;
        cursor: pointer;
    }
</style>