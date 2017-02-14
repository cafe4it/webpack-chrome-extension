<template>
    <div id="app">
        <h3>{{now.toString()}}</h3>
    </div>
</template>

<script>
    export default{
    	name: 'app',
        data(){
    		return {now: new Date()}
        },
        mounted(){
        	console.log('1')
	        const self = this
	        setInterval(function () {
		        self.now = new Date()
	        }, 1000)
        }
    }
</script>

