<template>
  <div class="list">
      <list view="vertical" class="mobile"/>
      <list view="horizontal" class="desktop"/>
  </div>
</template>
<script>
// @ is an alias to /src
import list from '@/components/listDrag/listDragColumn.vue'
export default {
  name: 'newList',
  components: {
    list
  }
}
</script>

<style scoped>
.desktop {
  display: block
}
.mobile {
  display: none
}
@media screen and (max-width: 600px) {
.desktop {
  display: none
}
.mobile {
  display: block
}
}
</style>
