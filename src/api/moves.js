import http from '@/lib/http.js'

export default {
   post: function (story, newNextId) {
      var data = {
         story,
         newNextId
      };
      // This API endpoint probably should have been a POST
      return http.put('/data/story/move', data);
   }
}