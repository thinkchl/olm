import types from '../types'
import axios from 'axios'

const state = {
	seller : {},
	detailshow:false
}

const getters ={
	seller(state){
		return state.seller;
	},
	detailshow(state){
		return state.detailshow;
	},
}

const actions = {
	//获取商家数据
	getSeller( { commit,state } ){
		axios.get('http://localhost:2017/api/seller').then( resp => {
			if( resp.data.errno === 0 ){
				commit( types.GET_SELLER , resp.data.data )
			}
		})
	},

	// 展示详情页
	showdetail( { commit,state } ){
		commit( types.SHOW_DETAIL );
	},
	
	// 隐藏详情页
	hidedetail( { commit,state } ){
		commit( types.HIDE_DETAIL );
	}

	
}

const mutations ={
	// 执行具体操作
	[types.GET_SELLER](state,data){
		state.seller = data;
	},
	// 展示详情页
	[types.SHOW_DETAIL](state){
		state.detailshow = true;
	},
	// 隐藏详情页
	[types.HIDE_DETAIL](state){
		state.detailshow = false;
	}

}

export default{
	state,
	getters,
	actions,
	mutations
}