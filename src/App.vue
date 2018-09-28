<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Список Задач          |</router-link>
      <router-link to="/list">        List</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Neucha&subset=cyrillic');
#app {
  font-family: 'Neucha', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .9s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
#nav {
  padding: 10px;
}
.cursor {
  cursor: pointer;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 26px
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
