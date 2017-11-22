import types from '../types'
import axios from 'axios'

const state = {
	goods:{}
}

const getters ={
	goods(state){
		return state.goods;
	}
}

const actions = {
	getGoods( { commit,state } ,callback){
		axios.get('http://localhost:2017/api/goods').then( resp => {
			if( resp.data.errno === 0 ){
				commit( types.GET_GOODS , resp.data.data );
				callback();
			}
		});
	},
}

const mutations ={
	[types.GET_GOODS](state,data){
		state.goods = data;
	}
}

export default{
	state,
	getters,
	actions,
	mutations
}