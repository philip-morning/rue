<template>
	<div>
		{{msg}}
		<div>
			<input v-model="username" type="text"/>
		</div>
		<div>
			<input v-model="password" type="password"/>
		</div>
		<button @click="signin">Sign in</button>
	</div>
</template>

<script>
import auth from '@/api/auth.js'

export default {
	name: 'HelloWorld',
	data () {
		return {
			username: null,
			password: null,
			msg: 'Please sign in'
		}
	},
	created () {
		
	},
	methods: {
		signin: function () {
			auth.signin(this.username, this.password)
			.then(res => {
				this.msg = res.data;
			})
		}
	}
}
</script>

<style scoped>
</style>
