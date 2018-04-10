import http from '@/lib/http.js'

export default {
   get: function () {
      return http.get('/data/user')
   }
}