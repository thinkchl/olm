<template>
	<div class="cartctrl">
		<transition name="move">
			<div class="addbtn" v-show="getCurrGoods" @click.stop="decrease">
				<div class="icon iconfont icon-jian inner"></div>
			</div>	
		</transition>
		<div class="count"  v-show="getCurrGoods">{{getCurrGoods.count}}</div>
		<i class="icon iconfont icon-jiahao-copy" @click.stop="add($event)"></i>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		props:{
			goodsIndex:{
				type:String
			},
			price:{
				type:Number
			},
			foodName:{
				type:String
			}
		},
		computed:{
			...mapState({
				selected:state=>state.shopcart.selectGoods
			}),
			getCurrGoods(){
				let temp = this.selected;
				for(let i =0;i<temp.length;i++){
					if(temp[i].id === this.goodsIndex){
						return temp[i];
					}
				}
				return false;
			}
		},
		methods:{
			add(e){
				if(this.getCurrGoods)
					this.$store.commit('countCtrl',{
						index:this.goodsIndex,
						add:true
					});
				else{
					let temp = {
						id:this.goodsIndex,
						price:this.price,
						count:1,
						name:this.foodName
					};
					this.$store.commit('addGoods',temp);
				}
				this.$emit('cart-add',e.target);
			},
			decrease(){
				this.$store.commit('countCtrl',{
					index:this.goodsIndex,
					add:false
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.cartctrl{
		display: flex;
		.addbtn{
			transition: all .5s linear;
			&.move-enter-active,&.move-leave-active{
				opacity: 1;
				transform:translate3D(0,0,0);
			}
			&.move-enter,&.move-leave-to{
  				opacity: 0;
  				transform:translate3D(.48rem,0,0);
  				.inner{
					transform:rotate(180deg);
  				}
			}
			.inner{
				display: inline-block;//要实现动画，必须具有宽高
				font-size: .43rem;
				color:rgb(0,160,220);
				line-height: .48rem;
				transition:all .4s linear;
				transform:rotate(0deg);
			}

		}

		.count{
			width: .48rem;
			text-align: center;
			font-size: .2rem;
			line-height: .48rem;
		}
		.icon-jiahao-copy{
			font-size: .48rem;
			color:rgb(0,160,220);
			line-height: .48rem;			
		}
	}
</style>