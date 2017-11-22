<template>
	<div class="shopcart">
		<div class="left" @click="listShow">
			<div :class="['icon-wrapper',{highlight:totalCount}]">
				<i class="icon iconfont icon-gouwuche"></i>
				<div class="count" v-show="totalCount>0">{{totalCount}}</div>
			</div>
			<div :class="['price',{highlight:totalPrice>0}]">¥{{totalPrice}}</div>
			<div class="desc">另需配送费¥{{deliveryPrice}}元</div>
		</div>
		<div :class="['right',{pay:remainMinPrice.click}]">
			<span class="text">{{remainMinPrice.tip}}</span>
		</div>
		<div class="ball-container">
			<transition name="drop" 
					v-for="ball,index in balls"
					@before-enter="beforeEnter"
					@enter="enter"
					@after-enter="afterEnter" :key="index">
				<div class="ball" v-show="ball.show" :key="index">
					<div class="inner" :key="'inner-'+index"></div>
				</div>
			</transition>
		</div>
		<transition name="cart-bg">
			<div class="bg" v-show="showCart"></div>
		</transition>
		<transition name="cart-list">
			<div class="list-wrapper" v-show="showCart">
				<div class="header">
					<span class="title">购物车</span>
					<span class="clear" @click="clear">清空</span>
				</div>
				<div class="content" ref="content">
					<transition-group name="cart-item" tag="ul">
						<li class="item-list" v-for="item,index in selectGoods" :key="item.name">
							<span class="name">{{item.name}}</span>
							<span class="price"><span class="symbol">¥</span>{{item.count*item.price}}</span>
							<cart-ctrl class="btn" :price="item.price" :goods-index="item.id" :food-name="item.name" @cart-add="drop($event)"></cart-ctrl>
						</li>
					</transition-group>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import cartCtrl from '../cartctrl/cartctrl'
	import BScroll from 'better-scroll'
	export default {

		components:{
			cartCtrl
		},
		methods:{
			clear(){
				this.$store.commit('clear');
			},
			listShow(){
				console.log(1)
				this.hold = !this.hold;
			},
			drop(el){
				for(let i = 0;i<this.balls.length;i++){
					let ball = this.balls[i];
					if(!ball.show){
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeEnter(el){
				let count = this.balls.length;
				while(count -- ){
					let ball = this.balls[count];
					if(ball.show){
						let fontSize = parseFloat(getComputedStyle(document.querySelector(":root")).fontSize);
						let rect = ball.el.getBoundingClientRect();//获取相当于视口的位置
						let x = rect.left-.64*fontSize;
						let y = -(innerHeight - rect.top - .44*fontSize);
						let inner = el.getElementsByClassName("inner")[0];
						el.style.display = '';
						el.style.webkitTransform = `translate3d(0,${y}px,0)`;
						el.style.Transform = `translate3d(0,${y}px,0)`;
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
						inner.style.Transform = `translate3d(${x}px,0,0)`;
					}
				}
			},
			enter(el,done){
				let rf = el.offsetHeight;
				this.$nextTick(()=>{
					Velocity(el,{
						transform:'translate3d(0,0,0)'
					},{duration:400})
					let inner = el.getElementsByClassName("inner")[0];
					Velocity(inner,{
						transform:'translate3d(0,0,0)'
					},{
						duration:400,
						complete:done
					})
				});
			},
			afterEnter(el){
				let ball = this.dropBalls.shift();
				if(ball){
					ball.show = false;
					el.style.display = 'none';
				}
			}
		},
		data () {
			return {
				balls:[
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					}
				],
				dropBalls:[],
				hold:true
			}
		},
		props:{
			minPrice:{
				type:Number,
				default:0
			},
			deliveryPrice:{
				type:Number,
				default:0
			}
		},
		computed:{
			showCart() {
				if(!this.totalCount){
					this.hold = true;
					return false;
				}
				let show = !this.hold;
				if(show){
					this.$nextTick(()=>{
						if(!this.listScroll){
							this.listScroll = new BScroll(this.$refs.content,{
								click:true
							})
						}else{
							this.listScroll.refresh();
						}
					})
				}
				return show;
			},
			...mapGetters([
				'selectGoods'
			]),
			totalPrice(){
				let temp = this.selectGoods;
				let price = 0;
				for(let i = 0;i<temp.length;i++){
					price += temp[i].price*temp[i].count;
				}
				return price;
			},
			totalCount(){
				let temp = this.selectGoods;
				let count = 0;
				for(let i = 0;i<temp.length;i++){
					count += temp[i].count;
				}
				if(!count)
					this.showShopCart = false;
				return count;
			},
			remainMinPrice(){
				if(!this.selectGoods.length)
					return {click:false,tip:'¥'+this.minPrice+'元起送'};
				else if(this.totalPrice>=this.minPrice)
					return {click:true,tip:'去结算'};
				else
					return {click:false,tip:'还差¥'+(this.minPrice-this.totalPrice)+'元起送'};
			}
		}
	}
</script>


<style scoped lang="less">
	.shopcart{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #141d27;
		height: .96rem;
		display: flex;
		.left{
			flex : 1;
			display: flex;
			z-index: 150;
			background-color: #141d27;
			.icon-wrapper{
				width: .88rem;
				height: .88rem;
				margin:0 .24rem;
				position: relative;
				top: -.20rem;
				border-radius: 50%;
				border:.12rem solid #141d27;
				text-align: center;
				.icon{
					display: inline-block;
					background-color: #2d343b;
					font-size: .48rem;
					width: 100%;
					color: rgba(255,255,255,.4);
					line-height: .88rem;
					border-radius: 50%;
				}
				.count{
					width: .48rem;
					height: .32rem;
					position: absolute;
					top:-.12rem;
					left: .54rem;
					font-weight: 700;
					font-size: .18rem;
					color: rgb(255,255,255);
					line-height: .32rem;
					background-color: rgb(240,20,20);
					box-shadow: 0 .04rem .08rem 0 rgba(0,0,0,.4);
					border-radius: .24rem;
				}
				&.highlight{
					.icon{
						background-color:rgb(0,160,220);
						color: rgb(255,255,255);
					}
				}
			}
			.price{
				margin: .24rem 0;
				padding-right: .24rem;
				font-size: .32rem;
				color: rgba(255,255,255,.4);
				font-weight: 700;
				line-height: .48rem;
				border-right: 1px solid rgba(255,255,255,.1);
				&.highlight{
					color: rgb(255,255,255);
				}
			}
			.desc{
				flex:1;
				margin:.24rem;
				margin-right: 0;
				font-size: .24rem;
				color: rgba(255,255,255,.4);
				font-weight: 200;
				line-height: .48rem;
			}
		}
		.right{
			flex:0 0 2.1rem;
			background-color: #2d343b;
			text-align: center;
			z-index: 150;
			.text{
				font-size: .24rem;
				color: rgba(255,255,255,.4);
				font-weight: 700;
				line-height: .96rem;
			}
			&.pay{
				background-color: #00b43c;
				.text{
					color: rgb(255,255,255);
				}
			}
		}
		.ball-container{
			.ball{
				position: fixed;
				left: .64rem;
				bottom: .44rem;
				z-index: 200;
				transition:all .4s cubic-bezier(.1,-0.34,.77,.68);
				.inner{
					width: .32rem;
					height: .32rem;
					border-radius: 50%;
					background-color: rgb(0,160,220);
					transition:all .4s linear;
				}
			}
		}
		.bg{
			width: 100%;
			height: 100%;
			background: rgba(7,17,27,.6);
			position: fixed;
			bottom: .96rem;
			backdrop-filter:blur(.1rem);
			&.cart-bg-enter,&.cart-bg-leave-to{
				opacity: 0;
			}
			&.cart-bg-enter-active,&.cart-bg-leave-active{
				transition:all .5s 
			}
		}
		.list-wrapper{
			position: fixed;
			bottom: .96rem;
			width: 100%;
			z-index: 10;
			transform:translate3d(0,0,0);
			.header{
				display: flex;
				padding:0 .36rem;
				justify-content:space-between;
				height: .8rem;
				background-color: #f3f5f7;
				border-bottom: 1px solid rgba(7,17,27,.1);
				.title{
					font-size: .28rem;
					font-weight: 200;
					color: rgb(7,17,27);
					line-height: .8rem;
				}
				.clear{
					font-size: .24rem;
					color: rgb(0,160,220);
					line-height: .8rem;
				}
			}
			.content{
				max-height: 5.31rem;
				background-color: white;
				overflow: hidden;
				.item-list{
					display: flex;
					margin:0 .36rem;
					padding: .24rem 0;
					border-bottom: 1px solid rgba(7,17,27,.1);
					transition:all .5s;
					.name{
						flex:1;
						font-size: .28rem;
						color: rgb(7,17,27);
						line-height: .48rem;
					}
					.price{
						font-size: .28rem;
						font-weight: 700;
						color: rgb(240,20,20);
						line-height: .48rem;
						padding-left: .36rem;
						.symbol{
							font-size: .2rem;
							font-weight: normal;
						}
					}
					.btn{
						margin-left: .24rem;
					}
				}
				.cart-item-leave-active{
					position: absolute;
				}
				.cart-item-leave-to{
					opacity: 0;
					transform:translate3d(20rem,-1rem,0);
				}
			}
			&.cart-list-enter-active,&.cart-list-leave-active{
				transition:all .5s;
			}
			&.cart-list-enter,&.cart-list-leave-to{
				transform:translate3d(0,100%,0);
			}
		}
	}
</style>