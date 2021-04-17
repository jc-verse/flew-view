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

<style lang='scss'>
	/*每个页面公共css */

/*搜索组件*/
.diy_search_box .uni-searchbar{
		padding: 4px 8px;
		.uni-searchbar__box{
			background-color: #F0F1F2 !important;
			// justify-content: start !important;
			border: none !important;
			height: 66rpx;
			.uni-input-input{
				color: #999999;
				font-size: 24rpx;
			}
		}
		.uni-searchbar__cancel{
			line-height: 66rpx;
		}
	}

</style>
