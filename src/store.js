import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
// import fb from './firebase/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    tasks: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setTasks (state, task) {
      state.tasks = task
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            firebase.auth().currentUser.updateProfile({
              displayName: payload.displayName
            }).then(() => {
              console.log('successful')
              window.location.reload()
            })
            const newUser = {
              id: user.uid,
              email: user.email
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
      commit('setLoading', false)
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInGoogle ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit, state}, payload) {
      commit('setLoading', true)
      commit('setUser', {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email
      })
      commit('setLoading', false)
    },
    logout (context) {
      firebase.auth().signOut()
      context.commit('setUser', null)
      window.location.reload()
    },
    updateProfile (context, user) {
      context.commit('setLoading', true)
      if (firebase.auth().currentUser) {
        firebase.auth().currentUser.updateProfile({
          displayName: user.displayName
        }).then(() => {
          // Update successful
          console.log('successful')
          window.location.reload()
        })
          .catch(
            error => {
              context.commit('setLoading', false)
              context.commit('setError', error)
              console.log(error)
            }
          )
      }
      context.commit('setLoading', false)
    },
    resetPasswordWithEmail ({ commit }, payload) {
      const { email } = payload
      commit('setLoading', true)
      firebase.auth().sendPasswordResetEmail(email)
        .then(
          () => {
            commit('setLoading', false)
            console.log('Email Sent')
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          })
    },
    addTasks ({ commit, state }, data) {
      firebase.firestore().collection('UsersTasks').doc(state.user.id).set({
        data
      })
        .then(() => {
          console.log('Document successfully written!')
          commit('setTasks', data)
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
    },
    getTasks ({ commit, state }) {
      firebase.firestore().collection('UsersTasks').doc(state.user.id).get().then((doc) => {
        if (doc.exists) {
          commit('setTasks', doc.data())
        } else {
          console.log('No such document!')
        }
      }).catch((error) => {
        console.log('Error getting document:', error)
      })
    }
  }
})
