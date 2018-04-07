<template>
<v-ons-page>
   <label>{{story.summary}}</label>
   <p>{{story.description}}</p>
</v-ons-page>
</template>

<script>
import stories from '@/api/stories'

export default {
   props: {
      storyId: String
   },
   data () {
      return {
         story: {
            summary: null,
            description: null
         }
      }
   },
   created () {
      stories.get(this.storyId).then(res => {
         this.story = res.data;
      });
   }
}
</script>