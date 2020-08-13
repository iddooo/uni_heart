import Vue from 'vue'
import MessageBoxComponent from './messageBox.vue'

//创建构造器
const MessageBoxConstruct = Vue.extend(MessageBoxComponent)

function MessageBox(option){
	const messageBox = new MessageBoxConstruct({
		el:document.createElement('div'),
		data(){
			return{
				visible: false,
				title: option.title,
				type: option.type || 'text',
				msg: option.msg,
				reverse: option.reverse || true,
				buttons: option.buttons || ['确认'],
				success: option.success || function(){},
				cancel: option.cancel || function(){}
			}
		},
		methods: {
			open(){
				this.visible = true;
			},
			close(){
				this.visible = false;
			},
			_success(){
				this.success();
				this.close();
			},
			_cancel(){
				this.cancel(); 
				this.close();
			}
		},
		mounted(){
			this.open();
		}
	})
	
	document.body.appendChild(messageBox.$el)
}

function install() {
    Vue.prototype.$MessageBox = MessageBox;
};

export default {
    MessageBox,
    install
}