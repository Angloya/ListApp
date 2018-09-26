<template>
<div class="holder">
  <h1>List</h1>
  <form @submit.prevent="addProduct">
  <input type="text" class="heh" placeholder="Enter a products you have.." required v-model="product" maxlength="40" minlength="3">
  <img src="../assets/remove.png" alt="" class="removeAll" v-on:click="removeAll">
  </form>
    <ul>
      <template v-for="(product, index) in products">
      <listActive :key='index'
        :product="product"
        :index="index"
        @removeClick="remove"
        @listClick="active"/>
      </template>
        </ul>
        </div>
</template>

<script>
import listActive from '@/components/listActive.vue'
export default {
  name: 'Products',
  components: {
    listActive
  },
  data () {
    return {
      product: '',
      products: [
        {
          product: 'apple',
          active: false
        }
      ]
    }
  },
  mounted () {
    if (localStorage.getItem('products')) {
      try {
        this.products = JSON.parse(localStorage.getItem('products'))
      } catch (e) {
        localStorage.removeItem('products')
      }
    }
  },
  methods: {
    addProduct () {
      this.products.push({product: this.product, active: false})
      this.product = ''
      this.saveProducts()
    },
    remove (id) {
      this.products.splice(id, 1)
      this.saveProducts()
    },
    active (product) {
      product.active = !product.active
      this.saveProducts()
    },
    removeAll (id) {
      this.products.splice(id)
      this.saveProducts()
    },
    saveProducts () {
      const parsed = JSON.stringify(this.products)
      localStorage.setItem('products', parsed)
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,300i');
ul {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    font-family: 'Open Sans Condensed', sans-serif;
    color: black;
}
h1{
  font-size: 40px;
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: 300;
  color: black;
}
input{
    width: 600px;
    height: 50px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
    font-size: 20px;
}
 form img {
   position: absolute;
   cursor: pointer;
}
</style>
