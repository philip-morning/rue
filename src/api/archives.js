import http from '@/lib/http.js'

export default {
   post: function (story) {
      // This API endpoint probably should have been a POST
      return http.put('/data/story/archive', story);
   }
}