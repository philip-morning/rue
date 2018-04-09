<template>
<div class="pre-story" contenteditable="true" @input="update"/>
</template>

<script>
export default {
   data () {
      return {
         
      }
   },
   methods: {
      update (e) {
         var stories = e.target.innerText.split('\n');
         this.$emit('update', stories);
      }
   }
}
</script>

<style scoped>
.pre-story {
   padding: 1ex;
   background-color: #EEF;
}
</style>