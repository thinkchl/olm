<template>
	<transition name="move">
		<div class="food-detail" ref="detail">
			<div class="wrapper">
				<div class="food-ctrl">
					<div @click="hide">
						<i class="icon iconfont icon-iconfontyoujiantou14eps"></i>
					</div>
					<div class="image">
						<img class="img" :src="selected.image" alt="">
					</div>
					<div class="food-desc">
						<span class="name">{{selected.name}}</span>
						<span class="desc">月售{{selected.sellCount}}份<span class="rating">好评率{{selected.rating}}%</span></span>
						<span class="price">
							<span class="flag">¥</span>{{selected.price}}
							<span v-if="selected.oldPrice" class="old-price">
								<span class="flag">¥</span>{{selected.oldPrice}}
							</span>
						</span>
						<cart-ctrl ref='cartCtrl' v-show="getCurrGoods" class="btn" :price="selected.price" :goods-index="selected.type" :food-name="selected.name" @cart-add="cartAdd($event)"></cart-ctrl>
						<transition name='fade'>
							<div class="btn add-cart" @click.stop="addGoods" v-show='!getCurrGoods'>加入购物车</div>
						</transition>
					</div>
				</div>
				<div class="introduce">
					<div class="title">商品介绍</div>
					<div class="text" v-if="selected.info">{{selected.info}}</div>
					<div class="text" v-else>无</div>
				</div>
				<div class="ratings">
					<div class="title">商品评价</div>
					<ratingselect @filter="ratingFilter" :ratings="selected.ratings"></ratingselect>
					<div class="ratings-list">
						<ul>
							<li v-for='item in getRatings' class="rating-item">
								<div class="rating-info">
									<div class="time">{{item.rateTime | formatDate}}</div>
									<div class="user-info">
										<span class="account">{{item.username}}</span>
										<img :src="item.avatar" class="img"></span>
									</div>
								</div>
								<div class="rating-desc">
									<div :class="['rating-icon',item.rateType===0?'mention':'spitslot']">
										<i class="icon iconfont icon-icoratebad"></i>
									</div>
									<span class="text">{{item.text}}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll'
	import cartCtrl from '../cartctrl/cartctrl'
	import ratingselect from '../ratingselect/ratingselect'
	import { mapState } from 'vuex'
	import $ from 'jquery'
	export default {
		components:{
			cartCtrl,
			ratingselect
		},
		props:{
			selected:{
				type:Object
			}
		},
		computed:{
			...mapState({
				selectGoods:state=>state.shopcart.selectGoods
			}),
			getCurrGoods(){
				let temp = this.selectGoods;
				for(let i =0;i<temp.length;i++){
					if(temp[i].id === this.selected.type){
						return temp[i];
					}
				}
				return false;
			},
			getRatings(){
				let temp = [];
				let ratings = this.selected.ratings;
				let type = this.ratingType;
				if(this.onlyContainText){
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
		data(){
			return {
				ratingType:2,
				onlyContainText:true
			}
		},
		watch:{
			getRatings(newVal,oldVal){
				this.$nextTick(()=>{
					this.detailScroll.refresh();
				})
			}
		},
		methods:{
			ratingFilter(flag){
				this.ratingType = flag.type;
				this.onlyContainText = flag.only;
			},
			addGoods(el){
				this.$refs.cartCtrl.add(el)		
			},
			hide(){
				this.$emit('hide');
			},
			cartAdd(el){
				this.$emit('add',el);
			}
		},
		created(){
			this.$nextTick(()=>{
				this.detailScroll = new BScroll(this.$refs.detail,{
					click:true
				});
			})

		}
	}

</script>

<style lang="less" scoped>
	.food-detail{
		background-color: #f3f5f7;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: .96rem;
		.icon-iconfontyoujiantou14eps{
			position: fixed;
			top: .1rem;
			left: .1rem;
			transform:rotate(180deg);
			z-index: 200;
			color: white;
			font-size: .8rem;
		}
		&.move-enter-active,&.move-leave-active{
			transition:all .3s linear;
		}
		&.move-enter,&.move-leave-to{
			opacity: 0;
			transform:scale(.1);
		}
		.image{
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 100%;
			.img{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}			
		}

		.food-desc{
			background-color: white;
			padding:.36rem;
			border-bottom: 1px solid rgba(7,17,27,.1);
			position: relative;
			.name{
				display: block;
				font-size: .28rem;
				font-weight: 700;
				color: rgb(7,17,27);
				line-height: .28rem;
			}
			.desc{
				display: block;
				margin-top: .16rem;
				font-size: .2rem;
				color:rgb(147,153,159);
				line-height: .2rem;
				.rating{
					margin-left: .24rem;
				}
			}
			.price{
				display: block;
				margin-top: .36rem;
				font-size: .28rem;
				font-weight: 700;
				color: rgb(240,20,20);
				line-height: .48rem;
				.flag{
					font-weight: normal;
					font-size: .2rem;
				}
				.old-price{
					font-size: .2rem;
					font-weight: 700;
					color: rgb(147,153,159);
					line-height: .48rem;
					.flag{
						font-weight: normal;
					}
				}

			}
			.btn{
				position: absolute;
				right: .36rem;
				bottom: .36rem;
			}
			.add-cart{
				width: 1.48rem;
				height: .48rem;
				border-radius: .24rem;
				background-color: rgb(0,160,220);
				font-size: .2rem;
				color: rgb(255,255,255);
				line-height: .48rem;
				text-align: center;
				transition:all .5s;
				&.fade-leave-to,&.fade-enter{
					opacity: 0;
				}
				&.fade-enter-to,&.fade-leave{
					opacity: 1;
				}
			}
		}
		.introduce{
			margin-top: .32rem;
			padding: .36rem;
			background-color: white;
			border-bottom: 1px solid rgba(7,17,27,.1);
			border-top: 1px solid rgba(7,17,27,.1);
			.title{
				font-size: .28rem;
				font-weight: 500;
				color: rgb(7,17,27);
				line-height: .28rem;
			}
			.text{
				padding: 0 .16rem;
				padding-top: .12rem;
				font-weight: 200;
				font-size: .24rem;
				color: rgb(77,85,93);
				line-height: .48rem;
			}

		}
		.ratings{
			margin: .32rem 0;
			padding:.36rem;
			background-color: white;
			border-top: 1px solid rgba(7,17,27,.1);
			.title{
				font-size: .28rem;
				font-weight: 500;
				color: rgb(7,17,27);
				line-height: .28rem;
			}
			.ratings-list{
				.rating-item{
					padding: .32rem 0;
					.rating-info{
						font-size: .2rem;
						color: rgb(147,153,159);
						line-height: .24rem;
						display: flex;
						justify-content:space-between;
						.account{
							vertical-align: top;
						}
						.img{
							width: .24rem;
							height: .24rem;
							border-radius: 50%;
							margin-left: .12rem;
						}
					}
					.rating-desc{
						margin-top: .12rem;
						display: flex;
						.rating-icon{
							&.mention{
								font-size: .24rem;
								color: rgb(0,160,220);
								line-height: .48rem;
								transform:rotate(180deg);
							}
						}
						.text{
							font-size: .24rem;
							color:rgb(7,17,27);
							line-height: .48rem;
							margin-left: .08rem;
						}

					}
				}
			}
		}
	}

</style>