import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import seller from './modeles/seller'
import ratings from './modeles/ratings'
import goods from './modeles/goods'
import shopcart from './modeles/shopcart'


Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		mapClass:['discount','decrease','guarantee','invoice','special']
	},
	getters,
	actions,
	modules:{
		seller,
		goods,
		ratings,
		shopcart
	}
});