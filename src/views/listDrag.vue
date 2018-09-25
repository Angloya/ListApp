<template>
<div class="holder">
  <h1>List</h1>
  <form @submit.prevent="addProduct">
  <input type="text"
  class="heh"
  placeholder="Enter a products you have.."
  required v-model="item"
  maxlength="40"
  minlength="3">
  <img src="../assets/remove.png" alt="" class="removeAll" v-on:click="removeAll">
  </form>
  <div class="column">
    <Container
      orientation="horizontal"
      class="container-main"
      @drop="onDropMain">
      <Draggable class="column" key="items">
     <Container class="container"
     :group-name="'item'"
     :get-child-payload="getChildPayload"
     @drop="onDrop('items', $event)">
                <Draggable v-for="(item, index) in main.items"
                :key="index">
                    <div class="draggable-item">
                        {{item.data}}
                    </div>
                </Draggable>
     </Container>
      </Draggable>
      <Draggable class="column" key="highlights">
           <Container class="container highlights"
           :group-name="'item'"
           :get-child-payload="getChildPayload1"
           @drop="onDrop('itemsHighlights', $event)">
                <Draggable v-for="(item, index)  in  main.itemsHighlights" :key="index">
                    <div class="draggable-item">
                        {{item.data}}
                    </div>
             </Draggable>
            </Container>
      </Draggable>
      <Draggable class="column" key="itemsActive">
            <Container class="container"
            :group-name="'item'"
            :get-child-payload="getChildPayload2"
            @drop="onDrop('itemsActive', $event)">
                <Draggable v-for="(item, index) in  main.itemsActive"
                :key="index">
                    <div class="draggable-item">
                        {{item.data}}
                    </div>
                </Draggable>
            </Container>
      </Draggable>
      <Draggable class="column" key="itemsDone">
            <Container class="container"
            :group-name="'item'"
            :get-child-payload="getChildPayload3"
            @drop="onDrop('itemsDone', $event)">
                <Draggable v-for="(item, index) in  main.itemsDone"
                :key="index">
                    <div class="draggable-item">
                        {{item.data}}
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
      main: {
        items: [],
        itemsHighlights: [],
        itemsActive: [],
        itemsDone: []
      }
    }
  },
  mounted () {
    if (localStorage.getItem('items')) {
      try {
        this.main.items = JSON.parse(localStorage.getItem('items'))
        this.main.vitemsHighlights = JSON.parse(localStorage.getItem('itemsHighlights'))
        this.main.itemsActive = JSON.parse(localStorage.getItem('itemsActive'))
        this.main.itemsDone = JSON.parse(localStorage.getItem('itemsDone'))
      } catch (e) {
        localStorage.removeItem('items')
      }
    }
  },
  methods: {
    addProduct () {
      this.main.items.push({data: this.item})
      this.item = ''
      this.saveitems()
    },
    remove (id) {
      this.main.items.splice(id, 1)
      this.saveitems()
    },
    active (item) {
      item.active = !item.active
      this.saveitems()
    },
    removeAll (id) {
      this.main.items.splice(id)
      this.saveitems()
    },
    saveitems () {
      const parsedItems = JSON.stringify(this.main.items)
      const parseditemsHighlights = JSON.stringify(this.main.itemsHighlights)
      const parseditemsActive = JSON.stringify(this.main.itemsActive)
      const parseditemsDone = JSON.stringify(this.main.itemsDone)
      localStorage.setItem('items', parsedItems)
      localStorage.setItem('itemsHighlights', parseditemsHighlights)
      localStorage.setItem('itemsActive', parseditemsActive)
      localStorage.setItem('itemsDone', parseditemsDone)
    },
    onDrop (collection, dropResult) {
      this.main[collection] = applyDrag(this.main[collection], dropResult)
      this.saveitems()
    },
    onDropMain (dropResult) {
      this.main = applyDrag(this.main, dropResult)
      this.saveitems()
    },
    getChildPayload: function (index) {
      return this.main.items[index]
    },
    getChildPayload1: function (index) {
      return this.main.itemsHighlights[index]
    },
    getChildPayload2: function (index) {
      return this.main.itemsActive[index]
    },
    getChildPayload3: function (index) {
      return this.main.itemsDone[index]
    }
  }
}
</script>

<style scoped>
.highlights {
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
