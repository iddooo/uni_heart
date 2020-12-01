const state = {
	messageBox: {
		title: '',
		type: '',
		msg: '',
		buttons: [],
		reverse: false,
		visible: false,
		success:function(){},
		cancel:function(){}
	},
	loginBox:false
}

const mutations = {
	MessageBox({ messageBox }, option = {}){
		messageBox.title = option.title || '';
		messageBox.type = option.type || 'text';
		messageBox.msg = option.msg || '';
		messageBox.buttons = option.buttons || ['确认'];
		messageBox.reverse = option.reverse || false;
		messageBox.visible = true;
		messageBox.success = option.success || function(){},
		messageBox.cancel = option.cancel || function(){}
	},
	openLoginBox:(state)=>{
		state.loginBox = true
	},
	closeLoginBox:(state)=>{
		state.loginBox = false
	},
}

const actions = {
	
}

const getters = {
	messageBox: state => state.messageBox,
	loginBox: state => state.loginBox
}

export default{
	state,
	mutations,
	actions,
	getters
}