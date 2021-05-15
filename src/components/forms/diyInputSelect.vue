<template>
	<DiyPopup @popupclosed='popupclosed' popupTitle='比赛' ref="diyPopup" :styles='{top: "33%"}'>
		<slot></slot>
		<template slot='content'>
			<scroll-view :scroll-x="true">	
				<div class="confirm_box" >
					<!-- <div class="input_box"> -->
						<input class="uni-input" focus  placeholder="自动获得焦点"  @input="inputFn"/>
						<div class="btn" @click="searchInp">搜索</div>
					<!-- </div> -->
				</div>
			</scroll-view>
			<!-- picker  集合 -->
			<div class="list_box">
				<scroll-view class="list_i" :scroll-y="true">
					<div class="list_item" @click="checkItem(item)" v-for='(item, index) in datas' :key='index'>
						<div class="left" :style="{color: checkItems.id === item.id ? '#007aff': ''}">
							<div class="label">{{ item.label || '' }}</div>
							<div class="fLable">{{ item.city || '' }}</div>
						</div>
					</div>
				</scroll-view>
			</div>
		</template>
	</DiyPopup>
</template>
<script>
	import DiyPopup from '@/components/diyPopup'
	export default {
		name: 'diyPicker',
		components: {  DiyPopup },
		props: {
			popupTitle: {
				type: String,
				default: '请选择'
			},
			datas : {
				type: Array,
				default: ()=>[]
			},
			className:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isOpened: true,
				inpVal: '',
				checkItems: {}
			}
		},
		computed: {
		},
		mounted(){
		},
		methods: {
			// 选中某一选项
			checkItem(data, index, ind) {
				const { checkItems } = this
				if (checkItems.id === data.id) {
					this.checkItems = {}
				} else {
					this.checkItems = data
				}
			},
			popupclosed(flag) {
				const { checkItems, className } = this;
				const keys = Object.keys(checkItems);
				if(flag && keys.length) {
					this.$emit('popupclosed', { data: checkItems, code:className, type:'inpSel' })
				}
			},
			inputFn (e) {
				this.inpVal = e.target.value || '';
			},
			searchInp () {
				this.$emit('searchInp', '学'|| this.inpVal)
				if (!this.inpVal) {
					this.checkItems = {}
				}
			}
		},
		watch: {
		}
	}
</script>

<style scoped lang='scss'>

  // 选中项目
  .confirm_box{
    width:100%;
    padding: 10rpx 20rpx 0;
    display: flex;
    border-bottom: 2rpx solid #f5f5f5;
		input{
			border: 2rpx solid #f5f5f5;
			border-radius: 10rpx;
			padding: 10rpx 20rpx;
			width: 100%;
		}
		.btn{
			width: 100px;
			padding: 10rpx 20rpx;
			border: 2rpx solid #f5f5f5;
			text-align: center;
			margin-left: 10rpx;
		}
  }
	
		.list_box{
			width: 100%;
			height: 100%;
			display: flex;
			overflow: hidden;
			max-height: 50vh;
			>.list_i{
				flex-grow: 1;
				padding: 10rpx 20rpx;
				min-height: 100%;
				flex-basis: 20px;
				
				.list_item{
					@include flex_center;
					padding: 20rpx 0;
					border-bottom:  2rpx solid rgba(102, 102, 102,0.1);
				}
				.list_item:last-child{
					border: none;
				}
				.left{
					width: 100%;
					text-align: center;
					
				}
			}
		}
</style>
