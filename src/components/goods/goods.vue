<template>
	<div class="goods">
		<div class="carte" ref="carte">
			<ul class="ul-hook">
				<li v-for="item,index in goods" :class="['carte-item','carte-hook',{current:currIndex===index}]" @click="selectCarte(index)">
					<span class="text">
						<span :class="['icon',mapClass[item.type]]" v-if="item.type>0"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="content" ref="content">
			<ul>
				<li v-for="item,typeIndex in goods" class="goods-item list-hook">
					<span class="title">{{item.name}}</span>
					<ul>
						<li v-for="food,foodIndex in item.foods" class="food-item" @click="select(food,''+typeIndex+'.'+foodIndex)">
							<img class="img" :src="food.icon"></img>
							<div class="food-desc">
								<span class="name">{{food.name}}</span>
								<span v-if="food.description" class="desc">{{food.description}}</span>
								<span class="desc">月售{{food.sellCount}}份<span class="rating">好评率{{food.rating}}%</span>
								</span>
								<span class="price">
									<span class="flag">¥</span>{{food.price}}
									<span v-if="food.oldPrice" class="old-price">
										<span class="flag">¥</span>{{food.oldPrice}}
									</span>
								</span>
								<cart-ctrl class="btn" :price="food.price" :goods-index="''+typeIndex+'.'+foodIndex" :food-name="food.name" @cart-add="cartAdd($event)"></cart-ctrl>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<food-detail :selected="showFoodDetail" v-if='showFoodDetail' v-on="{hide,add:cartAdd}"></food-detail>
		<shop-cart ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex'
	import BScroll from 'better-scroll'
	import shopCart from '../shopcart/shopcart'
	import cartCtrl from '../cartctrl/cartctrl'
	import foodDetail from '../foodDetail/foodDetail'
	import $ from 'jquery'
	export default {
		components:{
			shopCart,
			cartCtrl,
			foodDetail
		},
		data(){
			return {
				listHeight:[],
				scrollY:0,
				showFoodDetail:null
			}
		},
		computed : {
			...mapGetters([
				'goods',
				'seller'
			]),
			...mapState([
				'mapClass'
			]),
			currIndex() {
				let list = this.listHeight;
				for (let i=0;i<list.length;i++){
					let h1 = list[i];
					let h2 = list[i+1];
					let scrollY = this.scrollY;
					if(!h2 || scrollY >= h1 && scrollY<h2)
						return i;
				}
				return 0;
			}
		},
		watch : {
			currIndex : function(val, oldVal){
				try{
					let carteH = $(".carte").height();
					let ulH = $(".ul-hook").height();
					let liH = ulH/(this.listHeight.length-1);
					let carteEl = $(".carte-hook",this.$refs.carte);
					let offset = 0;
					if(val>oldVal){
						offset = -(liH - (carteH - parseFloat($(carteEl[val]).position().top)));
					}else{
						offset = liH - parseFloat($(carteEl[oldVal]).position().top);
					}
					if(carteH<liH*(val+1)&&val>oldVal || $(carteEl[val]).position().top<0)
						this.carte.scrollBy(0,offset,300);
				}catch(e){
					console.log(e);
				}
			}
		},
		created () {
			let obj;
			this.$store.dispatch('getGoods',()=>{
				this.$nextTick(()=>{
					this._initScroll();
					this._calcListHeight();
				});
			});
		},
		methods:{
			hide(){
				this.showFoodDetail = null;
			},
			select(food,type){
				food.type = type;
				this.showFoodDetail = food;
			},
			cartAdd(el){
				this.$refs.shopcart.drop(el);
			},
			selectCarte(index){
				let goodsEl = $(".list-hook",this.$refs.content);
				this.content.scrollToElement(goodsEl[index],300);
			},
			_initScroll() {
				this.carte = new BScroll(this.$refs.carte,{
					click:true
				});
				this.content = new BScroll(this.$refs.content,{
					probeType:3,
					click:true
				});
				this.content.on('scroll',(pos)=>{
					this.scrollY = Math.abs(Math.round(pos.y));
				})
				/*probeType:
					0:默认，不派发scroll事件
					1:非实时，滚动后派发
					2:实时，滚动时派发
					3:实时，滚动时和动画时均派发
				*/
			},
			_calcListHeight() {
				let goodsList = $('.list-hook',this.$refs.content);
				let height = 0;
				this.listHeight.push(height);
				for(let i = 0;i<goodsList.length;i++){
					let item = goodsList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../less/mixin';
	.goods{
		display: flex;
		position: absolute;
		top: 3.48rem;
		bottom: .92rem;
		overflow: hidden;
		.carte{
			flex:0 0 1.6rem;
			width: 1.6rem;
			background: #f3f5f7;
			.carte-item{
				display: table;
				height: 1.08rem;
				line-height: .28rem;
				padding:0 .24rem;
				.icon{
					display: inline-block;
					width: .24rem;
					height: .24rem;
					background-size: cover;
					vertical-align: top;
					margin-right: .04rem;
				}
				.discount{
					.bg-img('discount_3','../goods/');
				}		
				.decrease{
					.bg-img('decrease_3','../goods/');
				}		
				.guarantee{
					.bg-img('guarantee_3','../goods/');
				}
				.invoice{
					.bg-img('invoice_3','../goods/');
				}
				.special{
					.bg-img('special_3','../goods/');
				}
				.text{
					display: table-cell;
					font-size: .24rem;
					width: 1.12rem;
					vertical-align: middle;
					font-weight: 200;
					border-bottom: 1px solid rgba(7,17,27,.1);
				}
			}
			.current{
				background-color: white;
				font-weight: 700;
				position: relative;
				margin-top: -1px;
				.text{
					border-bottom: none;
				}
			}
		}
		.content{
			flex:1;
			.goods-item{
				.title{
					display: inline-block;
					height: .52rem;
					width: 100%;
					background:#f3f5f7;
					border-left: 2px solid #d9dde1;
					padding-left: .28rem;
					line-height: .52rem;
					font-size: .24rem;
					color: rgb(147,153,159);
				}
				.food-item{
					margin: .36rem;
					padding-bottom: .36rem;
					display: flex;
					position: relative;
					border-bottom: 1px solid rgba(7,17,27,.1);
					&:last-child{
						border-bottom: none;
						margin-bottom: 0;
					}
					.img{
						width: 1.14rem;
						height: 1.14rem;
					}
					.food-desc{
						padding-top: .04rem;
						padding-left: .2rem;
						.name{
							font-size: .28rem;
							color: rgb(7,17,27);
							line-height: .28rem;
						}
						.desc{
							display: block;
							padding-top: .16rem;
							color: rgb(147,153,159);
							line-height: .28rem;
							font-size: .2rem;
							.rating{
								padding-left: .24rem;
							}
						}
						.price{
							font-size: .28rem;
							color: rgb(240,20,20);
							padding-top: .16rem;
							line-height: .48rem;
							font-weight: 700;
							.flag{
								font-size: .2rem;
							}
							.old-price{
								font-size: .2rem;
								color:rgb(147,153,159);
								line-height: .48rem;
								font-weight: 700;
								text-decoration: line-through;
								.flag{
									font-weight: normal;
								}
							}
						}
						.btn{
							position: absolute;
							right: 0;
							bottom: .36rem;
						}
					}
				}
			}
		}
	}
</style>