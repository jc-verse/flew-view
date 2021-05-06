<template>
	<DiyPopup @popupclosed='popupclosed' popupTitle='1111的比赛' ref="diyPopup" :styles='{top: "40%"}'>
		<slot></slot>
		<template slot='content'>
			<scroll-view :scroll-x="true">	
				<div class="confirm_box" >
					<!-- <div class="input_box"> -->
						<input class="uni-input" focus placeholder="自动获得焦点" />
						<div class="btn">搜索</div>
					<!-- </div> -->
				</div>
			</scroll-view>
			<!-- picker  集合 -->
			<div class="list_box">
				<scroll-view class="list_i" v-for="(ite, ind) in lists" :key='ind' :scroll-y="true">
					<div class="list_item" @click="checkItem(ite, index, ind)" v-for='(item, index) in ite' :key='index'>
						<div class="left" :style="{color:item.check ? '#007aff': ''}">{{ item.label }}</div>
						<i class="iconfont iconjiahao" style="color: #007aff" v-show='ind === 2'></i>
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
				checks:['', '', ''], // 各级被选中的下标
				checkList: [], // 备选项
				checkItems: [] // 已选中的
			}
		},
		computed: {
			lists() {
				const { datas, checks } = this;
				const [a, b, c] = checks ;
				let arr = [ datas ]
				// if ((a || a===0) && datas[a]) {
				// 	arr[1]= datas[a].children
				// } else {
				// 	arr[1] = []
				// }
				// if ((b || b === 0) && datas[a] && datas[a].children && datas[a].children[b]) {
				// 	arr[2]= datas[a].children[b].children
				// } else {
				// 	arr[2] = []
				// }
				return arr
			},
		},
		mounted(){
			this.$refs.diyPopup.show();
		},
		methods: {
			// 选中某一选项
			checkItem(data, index, ind) {
				// 修改数据
				data = data.map((item, indx)=>{
					if (index === indx) {
						item.check = !item.check;
						if (item.check) {
							const { label, id } = item
							this.checkList[ind] = {label, id}
						}
					} else {
						item.check = false;
					}
					return item;
				});
				// 初始化选中
				this.checks = this.checks.map((item, inde) => {
					if (ind === inde){
						return index;
					} else if (ind < inde) {
						return ''
					} else {
						return item
					}
				})
				// 重复判断
				let flag = this.checkItems.some(item => {
					const [i, c] = [ item[2] || {} , this.checkList[2] || {} ];
					const bol = i.id === c.id && i.label === c.label;
					return bol
				})
				// add
				if (ind === 2 && !flag) {
					const arr = [...this.checkList]
					this.checkItems.push(arr)
				}
			},
			deleteItem(ind) {
				this.checkItems = this.checkItems.filter((item, index) =>index !== ind)
			},
			popupclosed(flag) {
				const { checks, checkItems, className: code } = this;
				if (flag && checkItems.length) {
					const data = [...checkItems];

					this.checkItems = [];
					this.checkItem(this.lists[0],checks[0], 0)
					this.checks =['', '', '']

					this.$emit('addList', { data, code, type: 'join' }
					)
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
			>.list_i:not(:first-child){
				border-left: 2rpx solid #f5f5f5;
			}
			>.list_i{
				flex-grow: 1;
				padding: 10rpx 20rpx;
				min-height: 100%;
				flex-basis: 20px;
				
				.list_item{
					@include flex_center;
					padding: 20rpx 0;
				}
				.left{}
				.right{
					margin-right: 5px;
					border: 2px solid #007aff;
					border-left: 0;
					border-top: 0;
					height: 12px;
					width: 6px;
					text-align: center;
					transform-origin: center;
					/* #ifndef APP-NVUE */
					transition: all 0.3s;
					/* #endif */
					transform: rotate(45deg);
				}
			}
			>.list_i:nth-child(1){
				flex-grow: .8;
			}
			>.list_i:nth-child(2){
				flex-grow: .5;
			}
			>.list_i:last-child{
				flex-grow: 1.5;
			}
		}
</style>
