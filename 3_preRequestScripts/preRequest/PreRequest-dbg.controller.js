sap.ui.define(
  ["luigi/demo/common/BaseController", 'luigi/demo/libs/luigi-client/luigi-client'],
  function(Controller, JSONModel) {
    'use strict';

    return Controller.extend('qldh.PreRequest.PreRequest', {onValidate: function () {
      
      
      if (this.byId("1").getSelected() === true && this.byId("myExpect").getValue() === "2") {
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
    },

    onSelect: function(sId){
      this.byId(sId.toString()).setSelected(false)
    }
  });
}
);
