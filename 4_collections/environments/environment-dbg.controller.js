
sap.ui.define(
  ["luigi/demo/common/BaseController", 'luigi/demo/libs/luigi-client/luigi-client',     "/sap/ui/model/json/JSONModel",
],
  function(Controller,client, JSONModel) {
    'use strict';

    return Controller.extend('qldh.environment.environment', {
      onInit: function(){
        this.setModel(new JSONModel({
          code: `
          const auth = 'Basic ' + btoa(pm.environment.get("Username") + ":" + pm.environment.get("Password"));
          headers['Authorization'] =  auth;
          pm.environment.set('auth', auth);`,
          test: `
          pm.test("Work item is not Zero", function () {
            var jsonData = pm.response.json();
            pm.expect(jsonData.Workitem).not.eql("0000000000000");
        });
        `
        
        }));
      },
      onValidate: function () {
        if (this.byId("2").getSelected() === true) {
          
          this.getView().byId("success").setVisible(true);
          this.getView().byId("failure").setVisible(false);
          this._showFireworks();
          setTimeout(() => {
            document.getElementById("myFrame").style.visibility = "visible"
          }, 200)
        } else {
          this.getView().byId("failure").setVisible(true);
          this.getView().byId("success").setVisible(false);
        }
      }
  });
}
);

