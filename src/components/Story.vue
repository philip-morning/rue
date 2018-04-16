<template>
<v-ons-page>
   <v-ons-toolbar>
      <v-ons-back-button @click.prevent="$router.go(-1)"/>
      <div class="center">{{storyType}}</div>
   </v-ons-toolbar>
   <div class="content">
      <v-ons-input v-model="summary" type="text"/>
      <div :class="descriptionClass"
         contenteditable="yes" 
         data-placeholder="Description"
         @input="updateDescription">{{initialStory.description}}</div>

      <v-ons-row class="owner-panel">
         <v-ons-col class="owner">
            <v-ons-input v-model="owner" placeholder="Owner" type="text"/>
         </v-ons-col>
         <v-ons-col class="status">
            <v-ons-select v-model="status">
               <option v-for="item in statusItems" :value="item.value" :key="item.value">
                  {{ item.text }}
               </option>
            </v-ons-select>
         </v-ons-col>
      </v-ons-row>


      <label>Comments:</label>
      <p v-for="comment in comments" :key="comment.timestamp">
         {{comment.createdBy.name}}, 
         {{new Date(comment.timestamp).toLocaleString()}}: 
         {{comment.text}}
      </p>

      <p v-if="createdBy">
         {{storyType}} created by {{createdBy.name}}
      </p>
   </div>
   <v-ons-fab position="bottom right" @click="save">
      <v-ons-icon icon="save"></v-ons-icon>
   </v-ons-fab>

   <v-ons-fab position="bottom left" @click="archive">
      <v-ons-icon icon="archive"></v-ons-icon>
   </v-ons-fab>
</v-ons-page>
</template>

<script>
import stories from '@/api/stories'
import archives from '@/api/archives'

export default {
   props: {
      storyId: String
   },
   data () {
      return {
         comments: [],
         createdBy: null,
         description: "",
         isDeadline: false,
         isNextMeeting: false,
         isSaving: false,
         owner: "",
         status: "",
         statusItems: [{
            text: "Help?", value: "sad" },{
            text: "New", value: "" },{
            text: "Committed", value: "assigned" },{
            text: "In progress", value: "active" },{
            text: "Done", value: "done"
         }],
         initialStory: {},
         summary: null
      }
   },
   computed: {
      descriptionClass () {
         if (!this.description) {
            return 'empty-description'
         }
      },
      storyType () {
         if (this.isNextMeeting || this.isDeadline) {
            return "Milepost"
         }
         else {
            return "Task"
         }
      }
   },

   created () {
      stories.get(this.storyId).then(res => {
         var story = res.data;

         this.initialStory = res.data;
         this.comments = story.comments;
         this.createdBy = story.createdBy;
         this.description = story.description;
         this.isDeadline = story.isDeadline;
         this.isNextMeeting = story.isNextMeeting;
         this.owner = story.owner;
         this.status = story.status;
         this.summary = story.summary;
      });
   },

   methods: {
      archive: function () {
         this.saveStory(this.initialStory).then(res => {
            archives.post(res.data).then(this.back);
         });
      },

      back: function () {
         this.$router.go(-1);
      },

      saveStory: function (story) {
         story.description = this.description;
         story.owner = this.owner;
         story.status = this.status;
         story.summary = this.summary;

         return stories.put(story);
      },

      save: function () {
         this.saveStory(this.initialStory).then(this.back);
      },
      updateDescription: function (e) {
         this.description = e.target.innerText;
      }
   }
}
</script>

<style scoped>
[contenteditable=true]:empty:before {
  content: attr(data-placeholder);
  display: block; /* For Firefox */
}

.content {
   text-align: left;
   display: flex;
   flex-direction: column;
   padding: 2ex;
}
.empty-description {
   color: #999;
}
.owner-panel {
   display: flex;
   justify-content: center;
   flex-direction: row;
   text-align: center;
}
.owner {
   font-size: 17px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   text-align: left;
}
.status {
   width: 100%;
}
</style>