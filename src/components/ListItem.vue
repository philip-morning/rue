<template>
<v-ons-list-item 
   modifier="chevron" 
   tappable
   @click="select">
   {{story.summary}}
</v-ons-list-item>
</template>

<script>
export default {
   props: {
      story: Object
   },
   methods: {
      select () {
         this.$router.push(`/stories/${this.story.id}`);
      }
   }
}
</script>