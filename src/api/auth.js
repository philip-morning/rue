import http from '@/lib/http.js'
import qs from 'qs'

export default {
	signin: function (email, password) {
		var params = qs.stringify({ email, password });
		return http.post('/auth/signin', params)
	}
}