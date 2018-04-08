<template>
<v-ons-list-item 
   modifier="chevron" 
   tappable
   @click="select">
   <v-ons-icon :icon="icon" />
   <div v-if="!icon" class="spacer"/>
   &nbsp;
   {{owner}} {{story.summary}}
</v-ons-list-item>
</template>

<script>
export default {
   props: {
      story: Object
   },
   computed: {
      icon () {
         switch(this.story.status) {
            case 'sad':
               return 'stop';
            case 'active':
               return 'adjust';
            case 'done':
               return 'circle';
            case 'assigned':
            default:
               return;
         }
      },
      owner () {
         var val = this.story && this.story.owner;
         return val ? `@${val}:` : '';
      }
   },
   methods: {
      select () {
         this.$router.push(`/stories/${this.story.id}`);
      }
   }
}
</script>

<style>
.spacer {
   width: 16px;
}
</style>