<template>
<v-ons-page>
   <v-ons-toolbar>
      <div class="center">Circles</div>
   </v-ons-toolbar>
   <v-ons-list>
      <v-ons-list-item v-for="circle in uniqueCircles" :key="_id">
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
   }
}
</script>

<style scoped>

</style>