<template>
	<div class="ratings-wrapper" ref="ratings">
		<div class="ratings-content">
			<div class="grade-info">
				<div class="ultimate-grade">
					<span class="score">{{seller.score}}</span>
					<span class="title">综合评分</span>
					<span class="score-info">高于周边商家{{seller.rankRate}}％</span>
				</div>
				<div class="minute-grade">
					<div class="service">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="goods">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="reach-time">
						<span class="title">送达时间</span>
						<span class="text">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<div class="ratings">
				<ratingselect @filter="filter" :ratings="ratings.ratings"></ratingselect>
				<div class="ratings-list">
					<ul>
						<li v-for="item in getRatings" class="ratings-item">
							<div class="user-info">
								<div class="left">
									<img :src="item.avatar">
									<div class="user-star">
										<div class="user">{{item.username}}</div>
										<div class="order-info">
											<star :size="24" :score="item.score"></star>
											<span class="text">{{item.deliveryTime}}分钟送达</span>
										</div>
										
									</div>
								</div>
								<div class="right">{{item.rateTime | formatDate}}</div>
							</div>
							<div class="text">{{item.text}}</div>
							<div class="recommend" v-if="item.recommend.length>0">
								<i class="icon iconfont icon-icoratebad"></i>
								<div v-for="food in item.recommend">{{food}}</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '../star/star'
	import ratingselect from '../ratingselect/ratingselect'
	import BScroll from 'better-scroll'
	import { mapGetters,mapState } from 'vuex'
	export default {
		components:{
			star,
			ratingselect
		},
		computed:{
			...mapGetters([
				'seller'
			]),
			...mapState([
				'ratings'
			]),
			getRatings(){
				let temp = [];
				let ratings = this.ratings.ratings;
				let type = this.type;
				if(this.only){
					for(let i = 0;i<ratings.length;i++){
						if(ratings[i].text!==''){
							temp.push(ratings[i]);
						}
					}
				}else{
					temp = temp.concat(ratings);
				}
				if(type===2)
					return temp;
				for(let i=temp.length-1;i>=0;i--){
					if(temp[i].rateType!==type)
						temp.splice(i,1);
				}
				return temp;
			}
		},
		created(){
			this.$store.dispatch('getRatings',()=>{
				this.$nextTick(()=>{
					this.ratingsScroll = new BScroll(this.$refs.ratings,{
						click:true
					})
				})				
			});


		},
		methods:{
			filter(flag){
				this.only = flag.only;
				this.type = flag.type;
				this.$nextTick(()=>{
					this.ratingsScroll.refresh();
				})
			}
		},
		data(){
			return {
				only:true,
				type:2
			}
		}
	}
</script>

<style lang="less" scoped>
.ratings-wrapper{
	position: absolute;
	top: 3.48rem;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: -10;
	.ratings-content{
		background-color: #f3f5f7;
		overflow: hidden;
		.grade-info{
			display: flex;
			padding: .36rem 0;
			background: white;
			border-bottom: 1px solid rgba(147,153,159,.2);
			.ultimate-grade{
				width: 2.75rem;
				text-align: center;
				border-right: 1px solid rgba(147,153,159,.2);
				.score{
					display: block;
					font-size: .48rem;
					color:rgb(255,153,0);
					line-height: .56rem;
				}
				.title{
					margin-top: .12rem;
					display: block;
					font-size: .24rem;
					color:rgb(7,17,27);
					line-height: .24rem;
				}
				.score-info{
					margin-top: .16rem;
					display: block;
					font-size: .2rem;
					color:rgba(7,17,27,.2);
					line-height: .24rem;
				}
			}
			.minute-grade{
				width: 4.74rem;
				padding: 0 .48rem;
				font-size: 0;
				.title{
					font-size: .24rem;
					color:rgb(7,17,27);
					line-height: .36rem;
					margin-right: .24rem;
				}
				.score{
					font-size: .24rem;
					color:rgb(255,153,0);
					line-height: .36rem;
					margin-left: .2rem;
				}
				.service{
					display: flex;
					
				}
				.goods{
					display: flex;
					margin-top: .16rem;
				}
				.reach-time{
					display: flex;
					margin-top: .16rem;
					.text{
						font-size: .24rem;
						color:rgb(147,153,159);
						line-height: .36rem;
					}
				}
			}
		}
		.ratings{
			margin: .36rem 0;
			padding:0 .36rem;
			background-color: white;
			border-top: 1px solid rgba(7,17,27,.1);
			.ratings-item{
				padding:.36rem 0;
				border-bottom: 1px solid rgba(7,17,27,.1);
				.user-info{
					display: flex;
					justify-content:space-between;
					.left{
						display: flex;
						.user-star{
							margin-left: .24rem;
						}
						.user{
							font-size: .2rem;
							color: rgb(7,17,27);
							line-height: .24rem;
						}
						.order-info{
							display: flex;
							.text{
								margin-left: .12rem;
								font-size: .2rem;
								font-weight: 200;
								color: rgb(147,153,159);
								line-height: .24rem;
							}
						}
						img{
							display: inline-block;
							width: .56rem;
							height: .56rem;
							border-radius: 50%;
						}
					}
					.right{
						font-size: .2rem;
						font-weight: 200;
						color:rgb(147,153,159);
						line-height: .24rem;
					}
		
				}
				>.text{
					margin-top: .12rem;
					font-size: .24rem;
					color: rgb(7,17,27);
					line-height: .36rem;
					padding-left: .8rem;
				}
				.recommend{
					display: flex;
					padding-left: .8rem;
					margin-top: .16rem;
					flex-wrap:wrap;
					.icon-icoratebad{
						font-size: .24rem;
						color:rgb(0,160,220);
						line-height: .32rem;
						transform:rotate(180deg);
					}
					> div{
						padding:0 .12rem;
						margin-left: .16rem;
						border:1px solid rgba(7,17,27,.1);
						border-radius: .02rem;
						font-size: .18rem;
						color: rgb(147,153,159);
						line-height: .32rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow:ellipsis;
						max-width: 1rem;
					}
				}
			}
		}
	}
}
</style>