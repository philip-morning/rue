<template>
<v-ons-page>
   <v-ons-toolbar>
      <div class="center">{{circleName}}</div>
   </v-ons-toolbar>
   <v-ons-list>
      <v-ons-list-item v-for="story in stories" 
         :key="story.id"
         modifier="chevron" 
         tappable
         @click="select(story)">
         {{story.summary}}
      </v-ons-list-item>
   </v-ons-list>
</v-ons-page>
</template>

<script>
import lists from '@/api/lists'
import circles from '@/api/circles'

export default {
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
   },

   methods: {
      select (story) {

      }
   }
}
</script>