sap.ui.define(["luigi/demo/common/BaseController","luigi/demo/libs/luigi-client/luigi-client"],function(e,t){"use strict";return e.extend("qldh.environment.environment",{onValidate:function(){var e=JSON.stringify({userId:1,id:1,title:"sunt aut facere repellat provident occaecati excepturi optio reprehenderit",body:"quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"});var t=this.getView().byId("myText").getValue();try{t=JSON.stringify(JSON.parse(t))}catch(e){this.getView().byId("failure").setVisible(true);return}if(t===e){this.getView().byId("success").setVisible(true);this.getView().byId("failure").setVisible(false);this._showFireworks();setTimeout(()=>{document.getElementById("content").classList.add("item-fade")},200)}else{this.getView().byId("failure").setVisible(true);this.getView().byId("success").setVisible(false)}}})});