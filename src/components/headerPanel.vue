<template>
  <nav id="nav">
      <router-link v-border class="link" to="/">Список Задач</router-link>
      <router-link v-border class="userLog" v-if="!user" to="/authUser"><img src="../assets/login.png"></router-link>
      <h3 v-if="!user"> Зарегистрируйтесь, чтобы сохранить данные</h3>
      <router-link v-border class="link profile" v-if="user" to="/profile">Профиль</router-link>
      <logout class="userLog logout" v-if="user"/>
  </nav>
</template>

<script>
import logout from '@/components/user/logout.vue'
export default {
  components: {
    logout
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>
nav {
  max-height: 50px;
  width: 100%;
  display: grid;
  grid-row: auto;
  grid-gap: 10px;
  grid-auto-flow: column;
  position: relative;
  border-bottom:1px solid black;
}
nav h3 {
  justify-self: flex-end;
  max-width: 400px;
  padding-right: 100px;
  max-height: 30px;
}
nav .profile {
justify-self: right;
margin-right: 100px;
}
.link {
  padding: 10px;
  max-width: 150px;
  height: 30px;
}
.link.router-link-exact-active {
  background: #42b983;
}
.userLog {
  position: absolute;
  right: 3%;
  top: 10px;
}
.logout {
  top: 20px;
}
@media screen and (max-width: 600px) {
  nav {
    font-size: 15px;
    max-height: 80px;
  }
  .link {
    height: 50px;
  }
}
</style>
