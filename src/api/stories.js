import http from '@/lib/http.js'

export default {
   get: function (storyId) {
      return http.get(`/data/story/${storyId}`)
   },
   // The Circle Blvd 1.6 server is not quite capable
   // to add a task in an arbitrary spot in the list,
   // so we simulate it with two calls.
   post: function (story) {
      var nextId = story.nextId;
      story.nextId = null;
      return http.post('/data/story', story).then(res => {
         var savedStory = res.data;
         var move = http.put('/data/story/move', {
            story: savedStory,
            newNextId: nextId
         });
         return nextId ? move : savedStory;
      });
   }
}