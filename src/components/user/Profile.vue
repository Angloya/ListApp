<template>
  <div class="profile">
    <h2>Hello</h2>
    <div class="UserInfo">
      <div class="user">
    <div class="UserInfo user">
    <img src="../../assets/user.png" alt="userIcon">
    <h1>{{ user.name }}</h1>
    </div>
    <h2><b>Email :</b> {{ user.email }}</h2>
    </div>
    <form >
      <h2>Update Profile</h2>
      <input v-model="displayName" placeholder="Your name">
      <h3 @click.prevent="updateProfile">НАЖМИ чтобы сохранить</h3>
    </form>
     </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      displayName: ''
    }
  },
  methods: {
    updateProfile () {
      if (this.displayName !== '') {
        this.$store.dispatch('updateProfile', {displayName: this.displayName})
      } else {
        alert('Введите имя')
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.show = false
      } else {
        this.$router.push('*')
      }
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center
}
.profile {
  display: flex;
  flex-direction: column;
  align-items: stretch
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}
h3 {
  cursor: pointer
}
.UserInfo {
  display: flex;
  align-items: center;
  justify-content: space-around
}
.UserInfo img{
  max-height: 40px;
}
.user {
  justify-content: center
}
.myPosts {
  font-size: 30px;
  padding: 10px 20px;
}
@media only screen and (max-width: 600px) {
  .profile {
    height: 100vh;
    background-color: rgba(237, 243, 243, 0.7)
  }
  .UserInfo {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column
}
}
</style>
