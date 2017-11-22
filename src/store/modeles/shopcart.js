const state = {
	selectGoods:[]
};

const getters = {
	selectGoods(state){
		return state.selectGoods;
	},
	selectGoodsAndHeader(state){
		let temp = [{name:'header',content:[{style:'title',text:'购物车'},{style:'clear',text:'清空'}]}];
		temp = temp.concat(state.selectGoods);
		return temp;
	}
}

const action = {

};

const mutations = {
	clear(state){
		state.selectGoods = [];
	},
	addGoods(state,data){
		state.selectGoods.push(data);
	},
	countCtrl(state,{index,count=1,add}){
		let temp = state.selectGoods;
		for(let i = 0;i<temp.length;i++){
			if(temp[i].id == index){
				if(add)
					temp[i].count++;
				else{
					if(temp[i].count === 1){
						temp.splice(i,1);
						return;
					}
					temp[i].count--;
				}
				break;
			}
		}
	},
};

export default {
	state,
	action,
	getters,
	mutations
}