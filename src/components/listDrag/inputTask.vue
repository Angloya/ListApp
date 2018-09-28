<template>
 <div class="addNewTask">
    <h3 v-if="!addNewTask">Чтобы добавить новую задачy</h3>
    <h3 v-if="addNewTask">Если передумал</h3>
  <h1 class="cursor" @click="addNewTask = !addNewTask">Нажми</h1>
   <transition name="fade">
<form v-if="addNewTask" class='addNewTask'>
      <label> Название
      <input type="text"
        class="addTask"
        required v-model="title"
        maxlength="40"
        minlength="3">
        </label>
        <label class="addTask"> Ваша Задача
      <textarea type="text"
        class="addTask"
        required v-model="item"
        maxlength="1000"
        minlength="3"/>
        </label>
      <h3 class="cursor" @click="addTask">Добавить</h3>
    </form>
   </transition>
    </div>
</template>

<script>
export default {
  name: 'addNewTask',
  data () {
    return {
      item: '',
      addNewTask: false,
      title: ''
    }
  },
  methods: {
    addTask () {
      this.$emit('addTask', this.item, this.title)
      this.item = ''
      this.title = ''
    }
  }
}
</script>

<style scoped>
input, textarea {
  border: 1px solid black;
  border-radius: 255px 25px 225px 25px/25px 225px 25px 255px;
  min-height: 40px;
  padding: 10px;
  margin: 5px;
}
.addNewTask form{
  display: flex;
  align-items: center;
  justify-content: center
}
textarea {
   vertical-align: middle;
}
</style>
