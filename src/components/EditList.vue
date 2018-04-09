<template>
<v-ons-page>
   <v-ons-toolbar>
      <v-ons-back-button @click.prevent="$router.go(-1)"/>
      <div class="center">{{circleName}}</div>
   </v-ons-toolbar>
   <v-ons-list>
      <div v-for="story in stories" :key="story.id">
         <insert-story :story="story" @update="prep($event, story)"/>
         <div class="story">
            {{story.summary}}
         </div>
      </div>
   </v-ons-list>
   <v-ons-fab position="bottom right" @click="save">
      <v-ons-icon icon="save"></v-ons-icon>
   </v-ons-fab>
   <v-ons-modal :visible="isSaving">
      <div style="text-align: center">
         <div>
            <v-ons-progress-circular indeterminate/>
         </div>
         <div>Saving ...</div>
      </div>
    </v-ons-modal>
</v-ons-page>
</template>

<script>
import List from './List.vue'
import InsertStory from './InsertStory.vue'
import stories from '@/api/stories'
import series from 'async/series'

export default {
   extends: List,
   components: { InsertStory },
   data () {
      return {
         isSaving: false,
         pendingStories: {}
      }
   },
   methods: {
      prep: function (stories, nextStory) {
         this.pendingStories[nextStory.id] = stories;
      },
      save () {
         var tasks = [];
         for (var key in this.pendingStories) {
            let nextId = key;

            while (this.pendingStories[key].length > 0) {
               let summary = this.pendingStories[key].shift();
               if (summary.trim() === "") {
                  continue;
               }

               let story = {
                  summary: summary,
                  listId: this.listId,
                  projectId: this.listId,
                  nextId: nextId
               };

               tasks.push(function (callback) {
                  stories.post(story).then(res => {
                     callback(null, res.data);
                  });
               });               
            }
         }

         this.isSaving = true;
         series(tasks, () => {
            this.$router.go(-1);
            this.isSaving = false;
         });
      }
   }
}
</script>

<style scoped>
.story {
   padding: 1ex;
   /*border: solid 1px blue;*/
}
</style>