<template>
  <div class="onSignin">
    <form @submit.prevent="onSignin">
      <h2>Вход:</h2>
      <input
        name="email"
        label="Email"
        v-model="email"
        type="email"
        placeholder="Your email"
        required>
      <input
        name="password"
        label="Password"
        v-model="password"
        type="password"
        placeholder="Your password"
        required>
      <button>Вход</button>
    </form>
    <span v-if="error">{{error.message}}</span>
    <p>Forgot password? enter your email and reset your password!</p>
    <button class="" @click.prevent="onResetPassword">Reset</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/profile')
      }
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    onResetPassword () {
      if (this.email === '') {
        return this.$store.dispatch('setError', {message: 'Email can not be blnak'})
      }
      this.$store.dispatch('resetPasswordWithEmail', {email: this.email})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
}
form h2 {
  align-self: flex-start
}
button {
  width: 100px;
}
.onSignin {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
