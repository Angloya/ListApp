<template>
  <div id="app">
    <headerPanel class="headerPanel"/>
    <router-view/>
  </div>
</template>

<script>
import headerPanel from '@/components/headerPanel.vue'
export default {
  components: {
    headerPanel
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Neucha&subset=cyrillic');
#app {
  font-family: 'Neucha', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  position: relative;
}
body::-webkit-scrollbar {
    width: 4px;
    background: #c4c4c4;
}
body::-webkit-scrollbar-thumb:vertical {
    width: 4px;
    background: #666565;
}
body::-webkit-scrollbar-thumb:horizontal  {
   width: 4px;
    background: #666565;
}
body::-webkit-scrollbar:horizontal {
    width: 4px;
    background: #c4c4c4;
}
input, textarea {
  border: 1px solid black;
  border-radius: 255px 25px 225px 25px/25px 225px 25px 255px;
  min-height: 40px;
  padding: 10px;
  margin: 5px;
}
button {
  border: 1px solid black;
  border-radius: 255px 25px 225px 25px/25px 225px 25px 255px;
  min-height: 20px;
  padding: 10px;
  margin: 5px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .9s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
#nav {
  padding: 10px;
  position: sticky;
  top: 0px;
  background: #fff;
  z-index: 1000
}
.cursor {
  cursor: pointer;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 26px;
  text-decoration: none
}
#nav img.router-link-exact-active {
  background: none;
}
</style>
