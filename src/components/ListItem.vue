<template>
<v-ons-list-item 
   :class="storyClass"
   modifier="chevron" 
   tappable
   @click="select">
   <v-ons-row>
      <v-ons-col width="10%" style="text-align: center">
         <v-ons-icon :icon="icon" />
      </v-ons-col>
      <v-ons-col width="90%">
         {{owner}} {{story.summary}}
      </v-ons-col>
   </v-ons-row>
</v-ons-list-item>
</template>

<script>
export default {
   props: {
      story: Object,
      index: Number
   },
   data () {
      return {
         initialIndex: this.index
      }
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
               return null;
         }
      },
      owner () {
         var val = this.story && this.story.owner;
         return val ? `@${val}:` : '';
      },
      storyClass () {
         return {
            'milepost': this.story.isDeadline,
            'next-meeting': this.story.isNextMeeting
         }
      },
      // storyStyle () {
      //    if (!this.story.isDeadline && !this.story.isNextMeeting) {
      //       return {
      //          'background': 'rgba(255,231,176,' + this.backgroundAlpha + ')'
      //       }            
      //    }
      // },
      backgroundAlpha () {
         return 1 - (this.initialIndex * 0.12);
      }
   },
   methods: {
      select () {
         this.$router.push(`/stories/${this.story.id}`);
      }
   }
}
</script>

<style scoped>
.milepost {
   color: white;
   background: #068;
}
.next-meeting {
   color: white;
   background: black;
}
</style>