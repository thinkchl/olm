<template>
	<div :class="['star',starType]">
		<span v-for="item in starClasses" :class="[item,'star-item']"></span>
	</div>

</template>

<script>
	const LENGTH = 5;
	const STAR_OFF = 'off';
	const STAR_ON = 'on';
	const STAR_HALF = 'half';
	export default {
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			starType(){
				return 'star-'+this.size;
			},
			starClasses() {
				let starClasses = [];
				let score = Math.floor(this.score * 2) / 2;
				let hasDecimal = this.score % 1 !== 0;
				let integer = Math.floor(score);
				for(let i = 0;i<integer;i++){
					starClasses.push(STAR_ON);
				}
				if(hasDecimal){
					starClasses.push(STAR_HALF);
				}
				while(starClasses.length<LENGTH){
					starClasses.push(STAR_OFF);
				}
				return starClasses;
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../less/mixin';
	.star{
		.star-item{
			display: inline-block;
			background-size: cover;
		}
		&.star-24{
			.star-item{
				width: .2rem;
				height: .2rem;
				margin-right: .06rem;
				&:last-child{
					margin-right: 0;
				}
			}
			.half{
				.bg-img('star24_half','../star/')
			}
			.on{
				.bg-img('star24_on','../star/')
			}
			.off{
				.bg-img('star24_off','../star/')
			}
		}
		&.star-36{
			.star-item{
				width: .3rem;
				height: .3rem;
				margin-right: .12rem;
				&:last-child{
					margin-right: 0;
				}
			}
			.half{
				.bg-img('star36_half','../star/')
			}
			.on{
				.bg-img('star36_on','../star/')
			}
			.off{
				.bg-img('star36_off','../star/')
			}
		}
		&.star-48{
			.star-item{
				width: .4rem;
				height: .4rem;
				margin-right: .44rem;
				&:last-child{
					margin-right: 0;
				}
			}
			
			.half{
				.bg-img('star48_half','../star/')
			}
			.on{
				.bg-img('star48_on','../star/')
			}
			.off{
				.bg-img('star48_off','../star/')
			}
		}
	}

</style>