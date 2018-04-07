<template>
<v-ons-page>
   <v-ons-toolbar>
      <div class="center">Circles</div>
   </v-ons-toolbar>
   <v-ons-list>
      <v-ons-list-item v-for="circle in uniqueCircles" 
         :key="circle._id"
         modifier="chevron" 
         tappable
         @click="select(circle)">
         {{circle.name}}
      </v-ons-list-item>
   </v-ons-list>
</v-ons-page>
</template>

<script>
import circles from '@/api/circles'

export default {
   data () {
      return {
         circles: []
      }
   },
   computed: {
      uniqueCircles () {
         var map = {};
         this.circles.forEach(function (circle) {
            map[circle._id] = circle;
         });
         return map;
      }
   },
   created () {
      circles.get().then(res => {
         this.circles = res.data;
      })
   },
   methods: {
      select: function (circle) {
         this.$router.push(`/lists/${circle._id}`);
      }
   }
}
</script>

<style scoped>

</style>