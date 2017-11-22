<template>
	<div class="seller" ref='seller'>
		<div class="seller-content">
			<div class="sell-info">
				<div class="top">
					<div class="left">
						<div class="name">{{seller.name}}</div>
						<div class="star">
							<star :size="36" :score="seller.score"></star>
							<span class="appraise-count">({{seller.ratingCount}})</span>
							<span class="sell-count">月售({{seller.sellCount}})单</span>
						</div>
					</div>
					<div class="right" :class="{active:favourite}" @click="garnerUp">
						<div class="heart-icon">
							<i class="icon iconfont icon-aixin"></i>
						</div>
						<div class="text"></div>
					</div>
				</div>
				<div class="bottom">
					<div class="min-price">
						<span class="title">起送价</span>
						<span class="content">{{seller.minPrice}}<span class="text">元</span></span>
					</div>
					<div class="delivery-price">
						<span class="title">商家配送</span>
						<span class="content">{{seller.deliveryPrice}}<span class="text">元</span></span>
					</div>
					<div class="delivery-time">
						<span class="title">平均配送时间</span>
						<span class="content">{{seller.deliveryTime}}<span class="text">分钟</span></span>
					</div>
				</div>
			</div>
			<div class="notice-activity">
				<div class="title">公告与活动</div>
				<div class="notice">{{seller.bulletin}}</div>
				<div class="activity">
					<ul>
						<li v-for="item in seller.supports" class="support-item">
							<span class="icon" :class="mapClass[item.type]"></span>
							<span class="text">{{item.description}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="scene">
				<span class="title">商家实景</span>
				<div class="img-wrapper" ref='scene'>
					<div class="img" ref='img'>
						<img v-for="item in seller.pics" :src="item">
					</div>
				</div>
			</div>
			<div class="seller-info">
				<span class="title">商家信息</span>
				<span v-for="item in seller.infos" class="item">{{item}}</span>
			</div>
		</div>
		<!-- <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>				 -->
	</div>
</template>

<script>
	import { mapGetters,mapState } from 'vuex'
	import BScroll from 'better-scroll'
	import shopcart from '../shopcart/shopcart'
	import star from '../star/star'
	import $ from 'jquery'
	export default {
		components:{
			shopcart,
			star
		},
		computed:{
			...mapGetters([
				'seller'
			]),
			...mapState([
				'mapClass'
			])
		},
		data(){
			return {
				favourite:false
			}
		},
		methods:{
			garnerUp(){
				this.favourite = !this.favourite;
			}
		},
		created(){
			if(this.seller.pics){
				this.$nextTick(()=>{
					this.sellerScroll = new BScroll(this.$refs.seller,{
						click:true
					})
					let rootSize = parseFloat($(":root").css('fontSize'));
					let picWidth = 2.4*rootSize;
					let margin = .12*rootSize;
					let picCount = this.seller.pics.length;
					let width = (picWidth+margin)*picCount - margin;
					this.$refs.img.style.width = width+'px';
					this.sceneScroll = new BScroll(this.$refs.scene,{
						scrollX:true
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../less/mixin';
	.seller{
		position: absolute;
		top: 3.48rem;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -10;
		.seller-content{
			background-color: #f3f5f7;
			.sell-info{
				background-color: white;
				padding:.36rem;
				border-bottom: 1px solid rgba(7,17,27,.1);
				.top{
					display: flex;
					justify-content:space-between;
					border-bottom: 1px solid rgba(7,17,27,.1);
					padding-bottom: .36rem;
					.left{
						.name{
							font-size: .28rem;
							color:rgb(7,17,27);
							line-height: .28rem;
						}
						.star{
							margin-top: .16rem;
							display: flex;
							font-size: .2rem;
							color: rgb(77,85,93);
							line-height: .36rem;
							.appraise-count{
								margin-left: .16rem;
								margin-top: .16rem;
							}
							.sell-count{
								margin-top: .16rem;
								margin-left: .24rem;
							}
						}
					}
					.right{
						text-align: center;
						min-width: .8rem;
						.heart-icon{
							font-size: .48rem;
							color: rgb(212,214,217);
							line-height: .48rem;
						}
						.text{
							margin-top: .08rem;
							font-size: .2rem;
							color: rgb(212,214,217);
							line-height: .2rem;
							&:after{
								content: '收藏';
							}
						}
						&.active{
							.heart-icon{
								color: rgb(240,20,20);
							}
							.text{
								color: rgb(77,85,93);
								&:after{
									content: '已收藏';
								}
							}
						}

					}
				}
				.bottom{
					display: flex;
					padding: .36rem 0;
					text-align: center;
					.title{
						font-size: .2rem;
						color: rgb(147,153,159);
						line-height: .2rem;
						display: block;
					}
					.content{
						display: inline-block;
						margin-top: .08rem;
						font-size: .48rem;
						font-weight: 200;
						color: rgb(7,17,27);
						line-height: .48rem;
						.text{
							font-size: .2rem;
						}
					}
					> div{
						flex:1;
						border-right: 1px solid rgba(7,17,27,.1);
						&:last-child{
							border: none;
						}
					}
				}
			}
			.notice-activity{
				margin-top: .36rem;
				background-color: white;
				border-top: 1px solid rgba(7,17,27,.1);
				border-bottom: 1px solid rgba(7,17,27,.1);
				padding: .36rem;
				.title{
					font-size: .28rem;
				}
				.notice{
					padding: .16rem .24rem .32rem .24rem;
					font-size: .24rem;
					font-weight: 200;
					color: rgb(240,20,20);
					line-height: .48rem;
					border-bottom: 1px solid rgba(7,17,27,.1);
				}
				.activity{
					.support-item{
						padding: .32rem .24rem;
						font-size: 0;
						border-bottom:1px solid rgba(7,17,27,.1);
						&:last-child{
							border:none;
						}
					}
					.icon{
						background-size: cover;
						display: inline-block;
						width: .32rem;
						height: .32rem;
						vertical-align: top;
					}
					.discount{
						.bg-img('discount_4','../seller/');
					}
					.decrease{
						.bg-img('decrease_4','../seller/');
					}
					.guarantee{
						.bg-img('guarantee_4','../seller/');
					}
					.invoice{
						.bg-img('invoice_4','../seller/');
					}
					.special{
						.bg-img('special_4','../seller/');
					}
					.text{
						margin-left: .12rem;
						font-size: .24rem;
						line-height: .32rem;
						font-weight: 200;
						color:rgb(7,17,27);
					}
				}
			}
			.scene{
				margin-top: .36rem;
				background-color: white;
				border-top: 1px solid rgba(7,17,27,.1);
				border-bottom: 1px solid rgba(7,17,27,.1);
				padding: .36rem;
				.title{
					font-size: .28rem;
				}
				.img-wrapper{
					width: 100%;
					overflow: hidden;
					.img{
						margin-top: .24rem;
						display: flex;
						img{
							display: inline-block;
							width: 2.4rem;
							height: 1.8rem;
							margin-right: .12rem;
							&:last-child{
								margin-right: 0;
							}
						}
					}
				}
			}
			.seller-info{
				margin-top: .36rem;
				background-color: white;
				border-top: 1px solid rgba(7,17,27,.1);
				padding: .36rem;
				.title{
					font-size: .28rem;
					display: block;
					border-bottom: 1px solid rgba(7,17,27,.1);
					padding-bottom: .24rem;
				}
				.item{
					display: block;
					padding: .32rem .24rem;
					border-bottom: 1px solid rgba(7,17,27,.1);
					font-size: .24rem;
					font-weight: 200;
					color: rgb(7,17,27);
					line-height: .32rem;
				}
			}
		}
	}
</style>