<template>
<v-ons-page>
	<v-ons-toolbar>
		<div class="center">Circle St.</div>
	</v-ons-toolbar>
	<v-ons-card>
		<div class="content">
			<div>Please sign in with your Circle Blvd info:</div>
			<form>
				<v-ons-input 
					v-model="username" 
					placeholder="Email address" 
					type="text"
					autocapitalize="none"/>
				<v-ons-input 
					v-model="password" 
					placeholder="Secret password" 
					type="password"/>
				<div v-if="!working">
					<v-ons-button 
						@click="signin"
						class="signin" 
						modifier="large">Sign in</v-ons-button>
				</div>
				<div v-else>
					<v-ons-progress-circular indeterminate></v-ons-progress-circular>
				</div>
			</form>
		</div>
	</v-ons-card>
</v-ons-page>
</template>

<script>
import auth from '@/api/auth.js'
import user from '@/api/user.js'

export default {
	name: 'HelloWorld',
	props: {
		stay: Boolean
	},
	data () {
		return {
			working: null,
			username: null,
			password: null
		}
	},
	created () {
		if (this.$route.query.stay) {
			// Stay
			return;
		}

		user.get().then(res => {
			if (res.data) {
				this.$router.push('/circles');
			}
		})
		.catch(err => {
			// This is fine.
		})
	},
	methods: {
		signin: function () {
			this.working = true;
			auth.signin(this.username, this.password)
			.then(res => {
				this.msg = res.data;
				this.$router.push('/circles');
			})
		}
	}
}
</script>

<style scoped>
.content,
form {
	display: flex;
	flex-direction: column;
}
form, 
.signin {
	margin-top: 1em;
}
</style>
