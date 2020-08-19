const state = {
	userDetail:{},
	userInfo:{},
	isLogin:undefined,
	level:undefined
}

const mutations = {
	SET_USERDETAIL:(state,userDetail)=>{
		state.userDetail = userDetail
	},
	SET_USERINFO:(state,userInfo)=>{
		state.userInfo = userInfo
	},
	SET_LEVEL:(state,level)=>{
		state.level = level
	}
}

const actions ={
	setUserDetail({commit},userDetail){
		commit('SET_USERDETAIL',userDetail)
	},
	
	setUserInfo({commit},userInfo){
		commit('SET_USERINFO',userInfo)
	},
	
	setLevel({commit},level){
		commit('SET_LEVEL',level)
	}
}

const getters = {
	userDetail:state => state.userDetail,
	userInfo:state => state.userInfo,
	level:state=>state.level
}

export default{
	state,
	mutations,
	actions,
	getters
}