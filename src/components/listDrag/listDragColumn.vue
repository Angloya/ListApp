<template>
<div>
  <div v-if="!loading" class="holder">
    <h1 class="top">Список задач</h1>
    <div class="AddInfo">
      <input-task @addTask="addTask" />
      <input-column @addColumn="addColumn" />
    </div>
    <div>
      <Container :orientation = view class="container-main" @drop="onDropMain" :get-child-payload="getChildPayload2">
        <Draggable class="column" v-for="(col, index) in main" :key="col.id" :class="col.class" v-rainbow>
          <div class="columnTitle">
            <img src="../../assets/remove.png" alt="" class="removeAll cursor" v-on:click="removeColumn(col.name, index)">
            <h1>{{col.name}}</h1>
          </div>
          <Container class="container" :group-name="'item'" :get-child-payload="getChildPayload(col.id)" @drop="onDrop(index, 'items', $event)">
            <Draggable :class="{modalMask: item.showModal,'draggable-item': !item.showModal}" v-border v-rainbow v-for="(item, index) in col.items" :key="index" v-if="col.items.length">
              <transition name="modal">
                <div class="draggableGrid" :class="item.class" @dblclick="showModalOpen(col.id, index)">
                  <h2 title="Кликните два раза по названию чтобы отредактировать его"
                  @dblclick="changeTask(col.id, index, 'title')">
                      {{item.title}}
                  </h2>
                  <p title="Кликните два раза по содержанию чтобы отредактировать его"
                  @dblclick="changeTask(col.id, index, 'data')">
                    {{item.data}}</p>
                    <transition name="fade">
                      <div class="change" v-if='item.changeTitle || item.changeTask'>
                        <form>
                          <input type="text" class="addTask" v-if='item.changeTitle' required v-model="title" maxlength="40" minlength="3" v-focus @blur="onBlur(col.id, index, 'title')">
                          <textarea type="text" class="addTask" v-if='item.changeTask' required v-model="task" maxlength="1000" minlength="3" v-focus @blur="onBlur(col.id, index, 'data')" />
                          <h3 class="cursor" @click="changeData(col.id, index, 'data')">Сохранить</h3>
                        </form>
                    </div>
                  </transition>
                  <div class="imgChange">
                    <img src="../../assets/remove.png" alt="" v-if="!item.showModal" class="removeAll cursor" v-on:click="remove(col.id, index)">
                    <img src="../../assets/edit.png" alt="" @click="changeTask(col.id, index, 'data')" class="removeAll cursor">
                    <img src="../../assets/remove.png" alt="" @click="showModalClose(col.id, index)" v-if="item.showModal" class="removeAll cursor">
                  </div>
                </div>
              </transition>
            </Draggable>
          </Container>
        </Draggable>
      </Container>
    </div>
</div>
<div v-if="loading">
  <h1>Loading...</h1>
</div>
</div>
</template>

<script>
import inputColumn from './inputColumn.vue'
import inputTask from './inputTask.vue'
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from '@/utils.js'

export default {
  name: 'Products',
  components: {
    inputTask,
    inputColumn,
    Container,
    Draggable
  },
  props: {
    view: String
  },
  data () {
    return {
      task: '',
      loading: false,
      addNewColumn: false,
      title: '',
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
    if (localStorage.length > 0 && !this.user) {
      try {
        this.main = JSON.parse(localStorage.getItem('main'))
      } catch (e) {
        localStorage.removeItem('items')
      }
      this.loading = false
    } else if (this.user) {
      this.loading = true
      this.$store.dispatch('getTasks')
      setTimeout(() => {
        this.getTask()
        this.loading = false
      }, 1000)
    } else {
      console.log('Данные созданы')
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    tasks () {
      return this.$store.state.tasks
    }
  },
  directives: {
    rainbow: {
    // определение директивы
      bind (el, binding, vnode) {
        el.style.backgroundColor = 'rgba(' + (Math.random() * 256) + ', ' + (Math.random() * 256) + ', ' + (Math.random() * 256) + ', 0.3)'
      }
    }
  },
  methods: {
    getTask () {
      if (!this.tasks) {
        if (localStorage.length > 1) {
          try {
            this.main = JSON.parse(localStorage.getItem('main'))
          } catch (e) {
            localStorage.removeItem('items')
          }
        }
      } else {
        this.main = this.tasks.data
      }
      this.loading = false
    },
    showModalClose (column, id) {
      this.main.filter(p => p.id === column)[0].items[id].showModal = !this.main.filter(p => p.id === column)[0].items[id].showModal
      this.saveitems()
    },
    showModalOpen (column, id) {
      this.main.filter(p => p.id === column)[0].items[id].showModal = true
    },
    changeTask (column, id, item) {
      if (item === 'data') {
        this.main.filter(p => p.id === column)[0].items[id].changeTask = true
        this.task = this.main.filter(p => p.id === column)[0].items[id].data
      } else {
        this.main.filter(p => p.id === column)[0].items[id].changeTitle = true
        this.title = this.main.filter(p => p.id === column)[0].items[id].title
      }
    },
    onBlur (column, id, item) {
      if (item === 'data') {
        if (this.task !== '') {
          this.main.filter(p => p.id === column)[0].items[id].data = this.task
          this.main.filter(p => p.id === column)[0].items[id].changeTask = false
          this.task = ''
        } else {
          this.main.filter(p => p.id === column)[0].items[id].changeTask = false
          this.task = ''
        }
      } else {
        if (this.title !== '') {
          this.main.filter(p => p.id === column)[0].items[id].title = this.title
          this.main.filter(p => p.id === column)[0].items[id].changeTitle = false
          this.title = ''
        } else {
          this.main.filter(p => p.id === column)[0].items[id].changeTitle = false
          this.title = ''
        }
      }
      this.saveitems()
    },
    changeData (column, id, item) {
      if (item === 'data') {
        if (this.task !== '') {
          this.main.filter(p => p.id === column)[0].items[id].data = this.task
          this.main.filter(p => p.id === column)[0].items[id].changeTask = false
          this.task = ''
        } else {
          this.main.filter(p => p.id === column)[0].items[id].changeTask = false
          this.task = ''
        }
      } else {
        if (this.title !== '') {
          this.main.filter(p => p.id === column)[0].items[id].title = this.title
          this.main.filter(p => p.id === column)[0].items[id].changeTitle = false
          this.title = ''
        } else {
          this.main.filter(p => p.id === column)[0].items[id].changeTitle = false
          this.title = ''
        }
      }
      this.saveitems()
    },
    addTask (item, title) {
      this.main.filter(p => p.name === 'New task')[0].items.push({data: item, showModal: false, title: title, changeTask: false, changeTitle: false})
      this.saveitems()
    },
    addColumn (columnName) {
      this.main.push({items: [], id: 'column' + this.main.length, name: columnName})
      this.saveitems()
    },
    remove (column, id) {
      this.main.filter(p => p.id === column)[0].items.splice(id, 1)
      this.saveitems()
    },
    removeColumn (name, id) {
      if (name !== 'New task' && name !== 'Done') {
        this.main.splice(id, 1)
      } else {
        alert('Эта колонка не может быть удалена')
      }
      this.saveitems()
    },
    saveitems () {
      if (localStorage.length > 0 && !this.user) {
        for (var x = 0; x < this.main.length; ++x) {
          localStorage.setItem('main', JSON.stringify(this.main))
        }
      } else {
        this.$store.dispatch('addTasks', this.main)
        for (x = 0; x < this.main.length; ++x) {
          localStorage.setItem('main', JSON.stringify(this.main))
        }
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
.holder {
  width: 100%;
}
.top h1{
  padding-top: 0;
  margin-bottom: -50px;
}
.Highlights {
  background: rgba(238, 121, 121, 0.6) !important;
  min-height: 200px;
}
.Active {
  background: rgba(139, 250, 148, 0.6) !important;
}
.Done {
  background: rgba(163, 163, 163, 0.6) !important;
}
.newTask {
  background: rgba(118, 239, 255, 0.6) !important;
}
.AddInfo {
  margin-top: -30px;
  display: flex;
  justify-content:space-around
}
.column {
  display: flex;
  border: 1px solid black;
  border-radius: 5px 5px 5px 5px/25px 25px 25px 5px;
  margin: 10px;
}
.Draggable{
  border: 1px solid black;
  padding: 20px;
}
.container {
  min-height: 400px;
  min-width: 300px;
  box-sizing: content-box;
}
.columnTitle {
  display: grid;
  height: 70px;
}
.columnTitle h1{
  grid-column: 3/5;
  grid-row: 2/2
}
.columnTitle img{
  grid-column: 5/5;
  grid-row: 1/3;
  justify-self: end;
}
.container-main {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.removeAll {
  width: 20px;
  height: 20px;
}
.draggable-item {
  margin: 20px;
  padding: 10px;
  border: 2px solid #333;
  min-width: 200px;
  max-width: 400px;
  word-wrap: break-word;
  box-sizing: border-box;
  background-clip: border-box;
}
.draggableGrid {
  display: grid;
  max-width: 300px;
  min-width: 200px;
  grid-template-columns: repeat(3, 30%);;
  grid-template-rows: repeat(4, 20%);
  grid-template-areas:
  "h2 h2 h2 img"
  "p p p p"
  "p p p p"
  "form form form form"

}
.draggable-item h2 {
  grid-area: h2;
  justify-self: center
}
.draggable-item p {
  grid-area: p
}
.draggable-item .change {
  grid-area: form;
}
.change form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
.change input, textarea {
  max-width: 280px;
  min-width: 200px;
  font-family: 'Neucha', cursive;
}
.draggable-item .imgChange {
  grid-area: img
}
.Done .draggable-item {
  background: rgba(49, 179, 107, 0.568) !important;
}
.Done p{
  text-decoration: line-through
}
.Done h2{
  text-decoration: line-through
}
input, textarea {
  border: 1px solid black;
  border-radius: 255px 25px 225px 25px/25px 225px 25px 255px;
  min-height: 40px;
  padding: 10px;
  margin: 5px;
}
.modalMask{
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  font-family: 'Neucha', cursive;
  background-color: rgba(0, 0, 0, .9);
  transition: opacity .3s ease;
  display: flex !important;
  align-items: center
}
.modalMask .draggableGrid {
  border: 2px solid black;
  border-radius: 5px 5px 5px 5px/25px 25px 25px 5px !important;
}
.modalMask h2 {
  grid-area: h2;
  justify-self: center
}
.modalMask p {
  grid-area: p
}
.modalMask .change {
  grid-area: form;
}
.modalMask .draggableGrid {
  max-width: 600px;
  min-width: 400px;
  min-height: 400px;
  max-height: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background:  rgb(253, 253, 229);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

@media screen and (max-width: 600px) {
.container-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  -webkit-box-orient: vertical !important;
}
}
</style>
