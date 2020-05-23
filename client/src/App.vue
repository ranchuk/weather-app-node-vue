<template>
  <div id="app">
        <Header />
        <router-view/>
  </div>
</template>

<script>
import Header from './components/layout/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
*, *::before, *::after {
  border: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html {
  /* 1rem = 10px */
  font-size: 62.5%;
  height: 100%;
}
body {
   padding:1.5rem 2rem;
 height: 100%;
 background-image: linear-gradient(to right bottom,rgba(61, 185, 216, 0.842), #1863a8);
 background-size: cover;
 background-position: top;
 background-repeat: no-repeat;
 background-size: cover;
}
</style>
