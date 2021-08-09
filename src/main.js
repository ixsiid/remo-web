import { createApp } from 'vue'
import App from './App.vue'

class NatureAPI {
	token;
	constructor() {
		this.token = '';
		this.call = [];
	}
	get(url) {
		// token
		if (!this.token) return new Promise((_, reject) => reject('No token'));
		// 呼び出し回数
		// No implments
		const now = new Date().getTime();
		this.call = this.call.filter(x => x > now - (now * 1000 * 60 * 5));
		if (this.call.length > 25) return new Promise((_, reject) => reject('Too many call api'));

		if (typeof (url) === 'string') {
			this.call.push(new Date().getTime());
			return new Promise((resolve, reject) => {
				fetch(`https://api.nature.global${url}`, {
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${this.token}`,
					},
				})
					.then(res => {
						console.log('---------------');
						console.log(res.status);
						if (res.status != 200) reject(res.json());
						for(const k of res.headers.keys()) console.log(`${k}: ${res.headers.get(k)}`);
						return res.json();
					})
					.then(resolve)
					.catch(reject);
			});
		} else if (url instanceof Array) {
			return new Promise((resolve, reject) => {
				Promise.all(url.map(u => {
					this.call.push(new Date().getTime());
					return fetch(`https://api.nature.global${u}`, {
						headers: {
							Accept: "application/json",
							Authorization: `Bearer ${this.token}`,
						},
					}).then(res => res.json())
				}))
					.then(resolve)
					.catch(reject);
			});
		} else {
			return new Promise((_, reject) => reject(`Invalid arguments ${url}`));
		}
	}
	post(url, body = '{}') {
		// token
		if (!this.token) return new Promise((_, reject) => reject('No token'));
		// 呼び出し回数
		// No implments
		const now = new Date().getTime();
		this.call = this.call.filter(x => x > now - (now * 1000 * 60 * 5));
		if (this.call.length > 25) return new Promise((_, reject) => reject('Too many call api'));
		
		this.call.push(new Date().getTime());
		return new Promise((resolve, reject) => {
			fetch(`https://api.nature.global${url}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${this.token}`,
				},
				body,
			})
				.then(res => {
					console.log('---------------');
					console.log(res.status);
					if (res.status != 200) reject(res.json());
					for(const k of res.headers.keys()) console.log(`${k}: ${res.headers.get(k)}`);
					return res.json();
				})
				.then(resolve)
				.catch(reject);
		});
	}
}

const app = createApp(App);
app.config.globalProperties.nature = new NatureAPI();
app.mount('#app')
