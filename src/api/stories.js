import http from '@/lib/http.js'

export default {
   get: function (storyId) {
      return http.get(`/data/story/${storyId}`)
   }
}