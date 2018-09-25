<template>
<div class="holder">
  <h1>List</h1>
  <form @submit.prevent="addProduct">
  <input type="text" class="heh" placeholder="Enter a products you have.." required v-model="item" maxlength="40" minlength="3">
  <img src="../assets/remove.png" alt="" class="removeAll" v-on:click="removeAll">
  </form>
  <div class="column">
     <Container class="container" :group-name="'item'" :get-child-payload="getChildPayload" @drop="onDrop('items', $event)">
                <Draggable v-for="(item, index) in items" :key="index">
                    <div class="draggable-item">
                        {{item.data}}
                    </div>
                </Draggable>
     </Container>
           <Container class="container highlights" :group-name="'item'" :get-child-payload="getChildPayload1" @drop="onDrop('itemsHighlights', $event)">
                <Draggable v-for="item in itemsHighlights" :key="item.id">
                    <div class="draggable-item">
                        {{item.data}}
                    </div>
             </Draggable>
            </Container>
            <Container class="container" :group-name="'item'" :get-child-payload="getChildPayload2" @drop="onDrop('itemsActive', $event)">
                <Draggable v-for="item in itemsActive" :key="item.id">
                    <div class="draggable-item">
                        {{item.data}}
                    </div>
                </Draggable>
            </Container>
            <Container class="container" :group-name="'item'" :get-child-payload="getChildPayload3" @drop="onDrop('itemsDone', $event)">
                <Draggable v-for="item in itemsDone" :key="item.id">
                    <div class="draggable-item">
                        {{item.data}}
                    </div>
                </Draggable>
            </Container>
            </div>
        </div>
</template>

<script>
import listActive from '@/components/listActive.vue'
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '@/utils.js'
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
      items: [
        {
          data: 'apple'
        },
        {
          data: 'apple'
        },
        {
          data: 'apple'
        }
      ],
      itemsHighlights: generateItems(0, i => ({
        id: 'a1' + i,
        data: []
      })),
      itemsActive: generateItems(0, i => ({
        id: 'b2' + i,
        data: []
      })),
      itemsDone: generateItems(0, i => ({
        id: 'c4' + i,
        data: []
      }))
    }
  },
  mounted () {
    if (localStorage.getItem('items')) {
      try {
        this.items = JSON.parse(localStorage.getItem('items'))
        this.itemsHighlights = JSON.parse(localStorage.getItem('itemsHighlights'))
        this.itemsActive = JSON.parse(localStorage.getItem('itemsActive'))
        this.itemsDone = JSON.parse(localStorage.getItem('itemsDone'))
      } catch (e) {
        localStorage.removeItem('items')
      }
    }
  },
  methods: {
    addProduct () {
      this.items.push({data: this.item})
      this.item = ''
      this.saveitems()
    },
    remove (id) {
      this.items.splice(id, 1)
      this.saveitems()
    },
    active (item) {
      item.active = !item.active
      this.saveitems()
    },
    removeAll (id) {
      this.items.splice(id)
      this.saveitems()
    },
    saveitems () {
      const parsedItems = JSON.stringify(this.items)
      const parseditemsHighlights = JSON.stringify(this.itemsHighlights)
      const parseditemsActive = JSON.stringify(this.itemsActive)
      const parseditemsDone = JSON.stringify(this.itemsDone)
      localStorage.setItem('items', parsedItems)
      localStorage.setItem('itemsHighlights', parseditemsHighlights)
      localStorage.setItem('itemsActive', parseditemsActive)
      localStorage.setItem('itemsDone', parseditemsDone)
    },
    onDrop (collection, dropResult) {
      this[collection] = applyDrag(this[collection], dropResult)
      this.saveitems()
    },
    getChildPayload: function (index) {
      return this.items[index]
    },
    getChildPayload1: function (index) {
      return this.itemsHighlights[index]
    },
    getChildPayload2: function (index) {
      return this.itemsActive[index]
    },
    getChildPayload3: function (index) {
      return this.itemsDone[index]
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
