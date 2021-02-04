sap.ui.define(
  ["luigi/demo/common/BaseController", "luigi/demo/libs/luigi-client/luigi-client"],
  function (Controller) {
    "use strict";

    return Controller.extend("qldh.settingProxy.Sample1", {
      onValidate: function () {
       
          this.getView().byId("success").setVisible(true);
         
          this._showFireworks();
          setTimeout(() => {
            document.getElementById("content").classList.add("item-fade")
          }, 200)
       
      }
    });
  }
);
