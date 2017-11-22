<template>
	<transition enter-active-class='animated fadeInRight' leave-active-class='animated fadeOutRight'>
		<div class="detail" v-if='detailshow'>
			<div class="container">
				<div class="content">
					<p class="name">{{seller.name}}</p>
					<div class="score">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul v-if="seller.supports" class="supports">
						<li v-for="item in seller.supports" class="support-item">
							<span class="icon" :class="classMap[item.type]"></span>
							<span class="text">{{item.description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<span class="text">{{seller.bulletin}}</span>
					</div>
				</div>
				<i class="icon iconfont icon-guanbi-copy close-detail-icon" @click='hidedetail'></i>
			</div>
		</div>
	</transition>	

</template>

<script>
	import {mapGetters} from 'vuex'
	import animate from 'animate.css/animate.css'
	import star from '../star/star'
	const STAR_HALF = 0;
	const STAR_OFF = 1;
	const STAR_ON = 2;

	export default{
		data() {
			return {

			}
		},
		computed:{
			...mapGetters([
				'seller',
				'detailshow'	
			])
		},
		methods:{
			hidedetail(){
				this.$store.dispatch('hidedetail');
			}
		},
		components:{
			star
		},
		created() {
			this.classMap = ['discount','decrease','guarantee','invoice','special'];
		}
	}

</script>

<style lang='less' scoped>
	@import '../less/mixin';
	.detail{
		position: fixed;
		overflow: auto;
		top:0;
		left:0;
		width: 100%;
		height: 100%;
		background: rgba(7,17,27,0.8);
		backdrop-filter:blur(.1rem);
		.container{
			height: auto !important;
			height: 100%;
			min-height: 100%;
			position: relative;
			.content{
				padding-bottom: 1.2rem;
				.name{
					padding-top: 1.28rem;
					font-size: .32rem;
					font-weight: 700;
					color: rgb(255,255,255);
					line-height: .32rem;
					text-align: center;
				}
				.score{
					text-align: center;
					margin-top: .32rem;
				}
				.title{
					display: flex;
					margin:.56rem .72rem 0 .72rem;
					.line{
						flex:1;
						position: relative;
						top: -.12rem;
						border-bottom: 1px solid rgba(255,255,255,.2);
					}
					.text{
						padding: 0 .24rem;
						font-size: .28rem;
						font-weight: 700;
					}
				}
				.supports{
					margin:.48rem .96rem 0 .96rem;
					.support-item{
						margin-bottom: .24rem;
						font-size: 0;
						&:last-child{
							margin-bottom: 0;
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
						.bg-img('discount_2','../detail/');
					}
					.decrease{
						.bg-img('decrease_2','../detail/');
					}
					.guarantee{
						.bg-img('guarantee_2','../detail/');
					}
					.invoice{
						.bg-img('invoice_2','../detail/');
					}
					.special{
						.bg-img('special_2','../detail/');
					}
					.text{
						margin-left: .12rem;
						font-size: .24rem;
						line-height: .32rem;
						font-weight: 200;
						color:rgb(255,255,255);
					}
				}
				.bulletin{
					padding:.48rem .96rem 0 .96rem;
					.text{
						font-weight: 200;
						font-size: .24rem;
						color: rgb(255,255,255);
						line-height: .48rem;
					}
				}
			}
			.close-detail-icon{
				z-index: 100;
				width: .5rem;
				height: .5rem;
				position: absolute;
				left: 0;
				right: 0;
				bottom: .64rem;
				margin:auto;
				color: white;
				font-size: .64rem;
			}
		}
		
	}
</style>