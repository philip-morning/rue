import http from '@/lib/http.js'

export default {
   get: function (listId) {
      return http.get(`/data/${listId}/stories`)
   },
   getFirstStory: function (listId) {
      return http.get(`/data/${listId}/first-story`)
   }
}