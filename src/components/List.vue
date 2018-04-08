<template>
<v-ons-page>
   <v-ons-toolbar>
      <v-ons-back-button @click.prevent="$router.go(-1)"/>
      <div class="center">{{circleName}}</div>
   </v-ons-toolbar>
   <v-ons-list>
      <list-item v-for="story in stories" 
         :key="story.id"
         :story="story"/>
   </v-ons-list>
</v-ons-page>
</template>

<script>
import lists from '@/api/lists'
import circles from '@/api/circles'
import ListItem from '@/components/ListItem'

export default {
   components: { ListItem },
   props: {
      listId: String
   },

   data () {
      return {
         rawStories: null,
         firstStory: null,
         circles: null
      }
   },

   created () {
      lists.get(this.listId).then(res => {
         this.rawStories = res.data;
      });

      lists.getFirstStory(this.listId).then(res => {
         this.firstStory = res.data;
      });

      circles.get().then(res => {
         this.circles = res.data;
      })
   },

   computed: {
      stories () {
         if (!this.firstStory || !this.rawStories)
            return [];

         var stories = [];
         var next = this.firstStory;

         while (next) {
            let story = this.rawStories[next.id];
            stories.push(story);
            next = this.rawStories[story.nextId];
         }

         return stories;
      },

      circleName () {
         if (!this.circles) {
            return '';
         }
         let name = '';
         this.circles.forEach(circle => {
            if (circle._id === this.listId) {
               name = circle.name;
            }
         });
         return name;
      }
   }
}
</script>