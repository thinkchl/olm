<template>
	<div class="header">
		<div class="back">
			<img :src="seller.avatar" alt="">
		</div>
		<div class="header-top">
			<div class="avatar">
				<img :src="seller.avatar" alt="">
			</div>
			<div class="foodwrap">
				<div class="name">
					<span class="brand"></span>
					<span class="title">{{seller.name}}</span>
				</div>
				<p class="desc">{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
				<div class="supports" v-if='seller.supports'>
					<span :class="[classMap[seller.supports[0].type],'support-img']"></span>
					<span class="support-text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if='seller.supports' @click='showdetail'>
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon iconfont icon-iconfontyoujiantou14eps"></i>
			</div>
		</div>	
		<div class="header-bottom" @click='showdetail'>
			<span class="header-bottom-img"></span>
	        <span class="header-bottom-text">{{seller.bulletin}}</span>
            <i class="icon iconfont icon-iconfontyoujiantou14eps"></i>
		</div>	
		<detail class="detail"></detail>
	</div>
</template>
<script>

	import {mapGetters} from 'vuex'
	import detail from '../detail/detail.vue'

	export default{
		computed:{
			...mapGetters([
				'seller'
			])
		},
		components:{
			detail
		},
		methods:{
			showdetail(){
				this.$store.dispatch('showdetail');
			}
		},
		created() {
			this.classMap = ['discount','decrease','guarantee','invoice','special'];
		}
	}
</script>

<style lang='less' scoped>
	@import '../less/mixin';
	.header{
        background: rgba(7,17,27,0.5);
        width: 100%;
        height: 2.68rem;
        position: relative;
        overflow: hidden;
        color: white;
		.back{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -9;
			filter:blur(.03rem);
			img{
				width: 100%;
				height: 100%;
			}
		}
		.header-top{
			height: 2.12rem;
			box-sizing: border-box;
			padding: 0.48rem 0.24rem 0.36rem 0.48rem;
			display: flex;
			position: relative;
			.avatar{
				flex-shrink:0;
				width: 1.28rem;
				height: 1.28rem;
				img{
					width: 100%;
					height: 100%;
					border-radius: .04rem;
				}
			}
			.foodwrap{
				box-sizing: border-box;
				font-size: 0;
				height: 1.28rem;
				padding:.04rem .32rem .04rem 0;
				margin-left: .32rem;
				position: relative;
				.name{
					color: rgb(255,255,255);
					display: flex;
					margin-right: .24rem;
					.brand{
						flex-shrink:0;
						vertical-align: top;
						display: inline-block;
						width: .6rem;
						height: .36rem;
						.bg-img('brand');
						background-size: .6rem .36rem;
					}
					.title{
						display: inline-block;
						font-size: .32rem;
						margin-left: .12rem;
						line-height: .36rem;
					}
				}
				.desc{
					font-size: .24rem;
					color: rgb(255,255,255);
					font-weight: 200;
					line-height: .24rem;
					margin-top: .16rem;

				}
				.supports{
					margin-top: .2rem;	
					font-size: 0;
					.discount{
						.bg-img('discount_1');
					}		
					.decrease{
						.bg-img('decrease_1');
					}		
					.guarantee{
						.bg-img('guarantee_1');
					}
					.invoice{
						.bg-img('invoice_1');
					}
					.special{
						.bg-img('special_1');
					}
					.support-img{
						display: inline-block;
						width: .24rem;
						height: .24rem;
						background-size: cover;
						background-position: center;
						vertical-align: top;
					}
					.support-text{
						font-size: .2rem;
						color: rgb(255,255,255);
						font-weight: 200;
						line-height: .24rem;
						margin-left: .08rem;
					}

				}
			}
			.support-count{
				position: absolute;
				right: .48rem;
				bottom: .36rem;
				height: .48rem;
				border-radius: .28rem;
				font-size: 0;
				background-color: rgba(0,0,0,0.2);
				padding:0 .16rem;
				text-align: center;
				.count{
					font-size: .2rem;
					color: rgb(255,255,255);
					font-weight: 200;
					line-height: .48rem;
					vertical-align: top;
				}
				.icon{
					font-size: .2rem;
					padding-left: .04rem;
					line-height: .48rem;
					font-weight: bold;
				}
			}

		}
		.header-bottom{
			background: rgba(7,17,27,0.2);
			height: 0.56rem;
			padding: 0 0.64rem 0 0.24rem;
			font-size: 0;
			position: relative;
			overflow: hidden;
			.header-bottom-img{
				display: block;
				width: 0.44rem;
				height: 0.24rem;
				float: left;
				.bg-img('bulletin');
				//background:url('') no-repeat 5px 5px / 5px 5px; 
				//   背景	 图片路径    平铺      位置   /   大小
				background-repeat: no-repeat;
				background-position: center center ;
				background-size: 0.45rem 0.25rem;
				margin-top: 0.16rem;
			}
			.header-bottom-text{
				padding-left: .08rem;
				display: block;
				height: 0.56rem;
				line-height: 0.56rem;
				font-size: 0.2rem;
				color:rgb(255,255,255);
				font-weight: 200;
				overflow: hidden;		//溢出隐藏
				white-space: nowrap;	//不换行
				text-overflow: ellipsis;//折行出现...
			}
			.icon{
				position: absolute;
				right: 0.48rem;
				top: 0.01rem;
				font-size: .2rem;
				font-weight: bold;
				line-height: .56rem;
			}
		}
		.detail{
			z-index: 100;
		}

	}
</style>
























