<template>
	<div class="rating">
		<div class="rating-type">
			<div class="all" @click='changeType(2)'>
				<span :class="['text',{active:selectType===2}]">全部<span class="count">{{getCount.mCount+getCount.sCount}}</span></span>
			</div>
			<div class="mention" @click='changeType(0)'>
				<span :class="['text',{active:selectType===0}]">推荐<span :class="['count',{active:selectType===0}]">{{getCount.mCount}}</span></span>
			</div>
			<div class="spitslot" @click='changeType(1)'>
				<span :class="['text',{active:selectType===1}]">吐槽<span :class="['count',{active:selectType===1}]">{{getCount.sCount}}</span></span>
			</div>
		</div>
		<div class="filter-btn" @click='containText'>
			<i class="icon iconfont icon-gouhao" :class="{active:onlyContainText}"></i>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const MENTION = 0;
	const SPITSLOT = 1;
	const ALL = 2;
	export default {
		methods:{
			changeType(type){
				this.selectType = type;
				this.$emit('filter',{type:this.selectType,only:this.onlyContainText})
			},
			containText(){
				this.onlyContainText = !this.onlyContainText;
				this.$emit('filter',{type:this.selectType,only:this.onlyContainText})
			}
		},
		data(){
			return {
				selectType:ALL,
				onlyContainText:true
			}
		},
		props:{
			ratings:{
				type:Array
			}
		},
		computed:{
			getCount(){
				let mCount = 0;
				let sCount = 0;
				let ratings = this.ratings;
				for(let i = 0;i<ratings.length;i++){
					if(ratings[i].rateType===MENTION)
						mCount++;
					else if(ratings[i].rateType===SPITSLOT)
						sCount++;
				}
				return {mCount,sCount};
			}
		}
	}
</script>

<style scoped lang="less">
	.rating{
		margin-top: .48rem;
		.rating-type{
			display: flex;
			border-bottom: 1px solid rgba(7,17,27,.1);
			padding-bottom: .52rem;
			.all{
				font-size: .24rem;
				color: rgb(77,85,93);
				line-height: .32rem;
				.text{
					padding: .16rem .24rem;
					background-color: rgba(0,160,220,.2);
					.count{
						font-size: .16rem;
					}
					&.active{
						background-color: rgb(0,160,220);
						color: rgb(255,255,255);
					}
				}
			}
			.mention{
				font-size: .24rem;
				color: rgb(77,85,93);
				line-height: .32rem;
				margin-left: .16rem;
				.text{
					padding: .16rem .24rem;
					background-color: rgba(0,160,220,.2);
					.count{
						font-size: .16rem;
					}
					&.active{
						background-color: rgb(0,160,220);
						color: rgb(255,255,255);
					}
				}
			}
			.spitslot{
				font-size: .24rem;
				color: rgb(77,85,93);
				line-height: .32rem;
				margin-left: .16rem;
				.text{
					padding: .16rem .24rem;
					background-color: rgba(77,85,93,.2);
					.count{
						font-size: .16rem;
					}
					&.active{
						background-color: rgba(77,85,93,.4);
					}
				}

			}
		}
		.filter-btn{
			padding: .24rem .36rem;
			margin:0 -.36rem;
			font-size: 0;
			border-bottom: 1px solid rgba(7,17,27,.1);
			.icon{
				font-size: .48rem;
				color: rgb(147,153,159);
				line-height: .48rem;
				&.active{
					color: rgb(0,200,80);
				}
			}
			.text{
				font-size: .24rem;
				color: rgb(147,153,159);
				line-height: .48rem;
				margin-left: .08rem;
				vertical-align: top;

			}
		}
	}
</style>