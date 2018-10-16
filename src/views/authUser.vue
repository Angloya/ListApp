<template>
<div class="authUser">
  <div class="auth">
<signin class="signin"/>
<signup class="signup"/>
</div>
<loginWithGoogle class="loginWithGoogle"/>
</div>
</template>

<script>
import signin from '../components/user/Signin.vue'
import signup from '../components/user/Signup.vue'
import loginWithGoogle from '../components/user/loginWithGoogle.vue'

export default {
  name: 'authUser',
  components: {
    signin,
    signup,
    loginWithGoogle

  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>
.authUser {
  min-height: 100vh;
  padding-top: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column
}

.auth {
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.signin {
  padding-right: 50px;
}

.signup {
  padding-left: 50px;
}

@media only screen and (max-width: 600px) {
  .authUser {
    min-height: 100vh;
    display: flex;
    padding: 10px;
    margin-top: 0px;
    background-color: rgba(237, 243, 243, 0.7)
}
  .auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
}
  .signin {
    padding-right: 0px;
}
  .signup {
    padding-left: 0px;
  }
}
</style>
