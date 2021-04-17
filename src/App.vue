<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			
		},
		onShow: function() {
			console.log('App Show')
			uni.hideTabBar({
				//这里是为了不那么唐突
				animation:true,
				success() {
					console.debug('隐藏成功')
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
