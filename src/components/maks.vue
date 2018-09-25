<template>
  <div id="app">
    <Container 
      orientation="horizontal"
      class="container-main">
      <Draggable class="column">
        <Container>
           <Draggable v-for="item in items1" :key="item.id">
             <div 
              class="draggable-item">
                {{item.text}}
            </div>
           </Draggable>
        </Container>
      </Draggable>
      <Draggable class="column">
        <Container>
           <Draggable v-for="item in items2" :key="item.id">
             <div
              class="draggable-item">
                {{item.text}}
            </div>
           </Draggable>
        </Container>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd"
export default {
  name: 'app',
  data () {
    return {
      items1: [
        {
          id: 1,
          text: 'card1'
        },
        {
          id: 2,
          text: 'card2'
        }
      ],
      items2: [
        {
          id: 3,
          text: 'card3'
        },
        {
          id: 4,
          text: 'card4'
        }
      ]
    }
  },
  components: { 
    Container, 
    Draggable 
  }
}
</script>


<style>
.container-main {
  display: flex;
}
.column {
  padding: 10px;
  background: green;
  margin: 10px;
}
.draggable-item {
  display: block;
  width: 200px;
  height: 100px;
  background: silver;
  margin-bottom: 10px;
}
.draggable-item2 {
  display: block;
  width: 200px;
  height: 100px;
  background: red;
  margin-bottom: 10px;
}
</style>


items: []
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