<template>
  <div>
    <h3 v-if="!addNewColumn">Чтобы добавить новую колонку</h3>
    <h3 v-if="addNewColumn">Если передумал</h3>
    <h1 class="cursor" @click="addNewColumn = !addNewColumn">Нажми</h1>
    <transition name="fade">
      <form v-if="addNewColumn" class='addNewTask'>
        <label> Название
        <input type="text"
        class="heh"
        required v-model="columnName"
        maxlength="40"
        minlength="3">
        </label>
        <h3 class="cursor" @click="addColumn">Добавить</h3>
      </form>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'addNewTask',
  data () {
    return {
      addNewColumn: false,
      columnName: ''
    }
  },
  methods: {
    addColumn () {
      this.$emit('addColumn', this.columnName)
      this.columnName = ''
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
form {
  display: flex
}
@media screen and (max-width: 600px) {
form {
  flex-direction: column
}
}
</style>
