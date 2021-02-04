sap.ui.define(
  ["luigi/demo/common/BaseController", 'luigi/demo/libs/luigi-client/luigi-client', '/sap/ui/model/json/JSONModel'],
  function(Controller, client, JSONModel) {
    'use strict';

    return Controller.extend('qldh.importRequest.Sample2', {

      onInit: function(){
        this.setModel(new JSONModel({
          failure: 'Fail, find more info '
        }))
      },
      onValidate: function () {
     
      var myChoice = this.getView().byId("rbg2").getSelectedIndex();
     
      if (myChoice === 1) {
        this.getView().byId("success").setVisible(true);
        this.getView().byId("failure").setVisible(false);
        this._showFireworks();
        setTimeout(() => {
          document.getElementById("content").classList.add("item-fade")
        }, 200)
      } else {
        this.getView().byId("failure").setVisible(true);
        this.getView().byId("success").setVisible(false);
      }
    }
  });
}
);
