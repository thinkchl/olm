import types from '../types.js'
import axios from 'axios'

const state = {
	ratings:[]
}

const getters ={

}

const actions = {
	getRatings( { commit,state } ,callback){
		axios.get('http://localhost:2017/api/ratings').then( resp => {
			if( resp.data.errno === 0 ){
				commit( types.GET_RATINGS , resp.data.data );
				// state.ratings = resp.data.data;
				callback();
			}
		});
	}
}

const mutations ={
	[types.GET_RATINGS](state,data){
		state.ratings = data;
	}
}

export default{
	state,
	getters,
	actions,
	mutations
}