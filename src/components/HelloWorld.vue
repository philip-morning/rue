<template>
<v-ons-page>
	<v-ons-toolbar>
		<div class="center">Rue</div>
	</v-ons-toolbar>
	<v-ons-card>
		<div class="content">
			<v-ons-row>{{msg}}</v-ons-row>
			<v-ons-row>
				<v-ons-input v-model="username" placeholder="Email address" type="text"/>
			</v-ons-row>
			<v-ons-row>
				<v-ons-input v-model="password" placeholder="Secret password" type="password"/>
			</v-ons-row>
			<v-ons-button @click="signin" modifier="large">Sign in</v-ons-button>
		</div>
	</v-ons-card>
</v-ons-page>
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
