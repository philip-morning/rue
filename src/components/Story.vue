<template>
<v-ons-page>
   <v-ons-toolbar>
      <v-ons-back-button @click.prevent="$router.go(-1)"/>
      <div class="center">{{storyType}}</div>
   </v-ons-toolbar>
   <div class="content">
      <h3>{{story.summary}}</h3>

      <v-ons-row class="owner-panel">
         <v-ons-col class="owner">
            <label>@{{story.owner}}</label> 
         </v-ons-col>
         <v-ons-col class="status">
            <v-ons-select v-model="story.status">
               <option v-for="item in statusItems" :value="item.value" :key="item.value">
                  {{ item.text }}
               </option>
            </v-ons-select>
         </v-ons-col>
      </v-ons-row>

      <p>{{story.description}}</p>

      <label>Comments:</label>
      <p v-for="comment in story.comments" :key="comment.timestamp">
         {{comment.createdBy.name}}, 
         {{new Date(comment.timestamp).toLocaleString()}}: 
         {{comment.text}}
      </p>

      <p v-if="story && story.createdBy">
         {{storyType}} created by {{story.createdBy.name}}
      </p>
   </div>
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
            description: null,
            isDeadline: false,
            isNextMeeting: false
         },
         statusItems: [{
            text: "Help?", value: "sad" },{
            text: "Uncommitted", value: "" },{
            text: "Will do", value: "assigned" },{
            text: "On it", value: "active" },{
            text: "Done", value: "done"
         }]
      }
   },
   computed: {
      storyType () {
         if (this.story.isNextMeeting || this.story.isDeadline) {
            return "Milepost"
         }
         else {
            return "Task"
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

<style scoped>
.content {
   text-align: left;
   display: flex;
   flex-direction: column;
   padding: 2ex;
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