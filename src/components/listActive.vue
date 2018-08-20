<template>
<transition name="slide-fade">
    <li @click="$emit('listClick', product)">
        <div :class="{ line: isActived(product) }"> {{product.product}} </div>
        <img src="../assets/remove.png" alt="" v-on:click="removeClick">
    </li>
     </transition>
</template>

<script>
export default {
  name: 'listActive',
  props: {
    product: Object,
    index: Number
  },
  methods: {
    removeClick () {
      this.$emit('removeClick', this.index)
    },
    isActived: function (product) {
      return product.active
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,300i');
.line{
  text-decoration: line-through;
}
li {
border: 1px solid #beb8b8;
padding: 10px;
padding-top: 17px;
padding-bottom: 15px;
text-align: left;
padding-left: 20px;
margin-bottom: 10px;
width: 400px;
list-style-type: none;
box-sizing: border-box;
text-transform:uppercase;
 align-content: center;
 font-size: 25px;
}
li img {
width: 10%;
height: 12%;
float: right;
margin-top: -33px;
margin-right: -5px;
cursor: pointer;
}

.slide-fade-enter-active {
  transition: all .44s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
   transition: all .44s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  opacity: 0;
}
</style>
