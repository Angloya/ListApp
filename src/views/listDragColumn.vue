<template>
  <div class="holder">
  <h1>List</h1>
    <form>
      Добавить новую задачу
      <input type="text"
        class="addTask"
        placeholder="Enter your task.."
        required v-model="title"
        maxlength="40"
        minlength="3">
      <input type="text"
        class="addTask"
        placeholder="Enter your task.."
        required v-model="item"
        maxlength="40"
        minlength="3">
      <button @click="addTask">add</button>
    </form>
    <form>
    Добавить новую колонку
      <input type="text"
      class="heh"
      placeholder="Введите название.."
      required v-model="columnName"
      maxlength="40"
      minlength="3">
      <button @click="addColumn">add</button>
    </form>
    <div class="column">
      <Container
        orientation="horizontal"
        class="container-main"
        @drop="onDropMain" :get-child-payload="getChildPayload2">
          <Draggable class="column"
          v-for="(col, index) in main"
          :key="col.id">
              <img src="../assets/remove.png"
              alt="" class="removeAll"
              v-on:click="removeColumn(col.name, index)">
              <h1>{{col.name}}</h1>
              <Container class="container"
              :group-name="'item'"
              :get-child-payload="getChildPayload(col.id)"
              @drop="onDrop(index, 'items', $event)"
              :class="col.class">
                <Draggable v-for="(item, index) in col.items"
                :key="index" v-if="col.items.length" :class="item.class">
                    <div class="draggable-item">
                      {{item.title}}
                        {{item.data}}
                        <img src="../assets/remove.png" alt="" class="removeAll" v-on:click="remove(col.id, index)">
                    </div>
                </Draggable>
     </Container>
      </Draggable>
    </Container>
            </div>
        </div>
</template>

<script>
import listActive from '@/components/listActive.vue'
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from '@/utils.js'

export default {
  name: 'Products',
  components: {
    listActive,
    Container,
    Draggable
  },
  data () {
    return {
      item: '',
      title: '',
      columnName: '',
      main: [
        { id: 'column0',
          name: 'New task',
          class: 'newTask',
          items: []},
        { id: 'column1',
          name: 'Highlights',
          class: 'Highlights',
          items: []},
        { id: 'column2',
          name: 'Active',
          class: 'Active',
          items: []},
        { id: 'column3',
          name: 'Done',
          class: 'Done',
          items: []}
      ]
    }
  },
  mounted () {
    if (localStorage.length > 0) {
      try {
        this.main = JSON.parse(localStorage.getItem('main'))
      } catch (e) {
        localStorage.removeItem('items')
      }
    }
  },
  methods: {
    addTask () {
      this.main.filter(p => p.name === 'New task')[0].items.push({data: this.item, title: this.title})
      this.item = ''
      this.title = ''
      this.saveitems()
    },
    addColumn () {
      this.main.push({items: [], id: 'column' + this.main.length, name: this.columnName})
      this.columnName = ''
      this.saveitems()
    },
    remove (column, id) {
      this.main.filter(p => p.id === column)[0].items.splice(id, 1)
      this.saveitems()
    },
    removeColumn (name, id) {
      if (name !== 'New task') {
        this.main.splice(id, 1)
      } else {
        alert('Эта колонка не может быть удалена')
      }
      this.saveitems()
    },
    saveitems () {
      for (var x = 0; x < this.main.length; ++x) {
        localStorage.setItem('main', JSON.stringify(this.main))
      }
    },
    onDrop (id, collection, dropResult) {
      this.main[id][collection] = applyDrag(this.main[id][collection], dropResult)
      this.saveitems()
    },
    onDropMain (dropResult) {
      this.main = applyDrag(this.main, dropResult)
      this.saveitems()
    },
    getChildPayload (columnId) {
      return index => {
        return this.main.filter(p => p.id === columnId)[0].items[index]
      }
    },
    getChildPayload2 (index) {
      return this.main[index].items
    }
  }
}
</script>

<style scoped>
.Highlights {
    background: red;
    min-height: 200px;
}
.column {
  display: flex;
  padding: 20px
}
.Draggable{
  border: 1px solid black;
  padding: 20px;
}
.container {
  border: 1px solid black;
  padding: 20px;
  min-height: 200px;
  min-width: 200px;
}
.draggable-item {
  padding: 30px;
  border: 1px solid black;
  max-width: 200px;
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
</style>
