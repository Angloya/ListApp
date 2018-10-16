<template>
  <div id="profile">
    <Profile/>
  </div>
</template>

<script>
import Profile from '../components/user/Profile.vue'

export default {
  name: 'AddBlog',
  components: {
    Profile
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>
#profile {
  min-height: 100vh;
}
</style>
