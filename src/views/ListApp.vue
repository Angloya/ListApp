<template>
  <div class="ListApp">
    <list></list>
  </div>
</template>
<script>
// @ is an alias to /src
import list from '@/components/list.vue'
export default {
  name: 'newList',
  components: {
    list
  }
}
</script>
