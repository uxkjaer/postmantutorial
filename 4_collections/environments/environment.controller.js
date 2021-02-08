sap.ui.define(["luigi/demo/common/BaseController","luigi/demo/libs/luigi-client/luigi-client","/sap/ui/model/json/JSONModel"],function(e,t,i){"use strict";return e.extend("qldh.environment.environment",{onInit:function(){this.setModel(new i({code:`\n          const auth = 'Basic ' + btoa(pm.environment.get("Username") + ":" + pm.environment.get("Password"));\n          headers['Authorization'] =  auth;\n          pm.environment.set('auth', auth);`,test:`\n          pm.test("Work item is not Zero", function () {\n            var jsonData = pm.response.json();\n            pm.expect(jsonData.Workitem).not.eql("0000000000000");\n        });\n        `}))},onValidate:function(){if(this.byId("2").getSelected()===true){this.getView().byId("success").setVisible(true);this.getView().byId("failure").setVisible(false);this._showFireworks();setTimeout(()=>{document.getElementById("myFrame").style.visibility="visible"},200)}else{this.getView().byId("failure").setVisible(true);this.getView().byId("success").setVisible(false)}}})});