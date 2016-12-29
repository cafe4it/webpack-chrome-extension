module.exports = {
	state: {
		time: new Date()
	},
	reducers: {
		update(state, data){
			return data
		}
	},
	effects: {
		updateData(state, data, send, done){
			data = {
				time: new Date()
			}
			send('update', data, done)
		}
	},
	subscriptions: {
		init(send, done){
			setInterval(function () {
				send('updateData', done)
			}, 1000)
		}
	}
}