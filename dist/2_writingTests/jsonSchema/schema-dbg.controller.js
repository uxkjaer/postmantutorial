sap.ui.define(
  [
    "luigi/demo/common/BaseController",
    "luigi/demo/libs/luigi-client/luigi-client",
    "/sap/ui/model/json/JSONModel",
  ],
  function (Controller, client, JSONModel) {
    "use strict";

    return Controller.extend("qldh.jsonSchema.schema", {
      onInit: function () {
        var text = `const schema = 

        var result = tv4.validateResult(pm.response.json(), schema) 
                if(!result.valid){
                  console.log(result)
                }
                pm.expect(result.valid).to.be.false
                
        `;
        this.setModel(
          new JSONModel({
            text: text,
          })
        );
      },
      onValidate: function () {
        var text = "string";
        var myText = this.getView().byId("myText").getValue();

        if (myText === text) {
          this.byId("step1").setValidated(true);
        }
      },
      onValidateFinal: function () {
        if (this.byId("myExpect").getValue() === 'pm.expect(result.valid).to.be.true') {
          this.getView().byId("success").setVisible(true);
          this.getView().byId("failure").setVisible(false);
          this._showFireworks();
          setTimeout(() => {
            document.getElementById("content").classList.add("item-fade");
          }, 200);
        } else {
          this.getView().byId("failure").setVisible(true);
          this.getView().byId("success").setVisible(false);
        }
      },
    });
  }
);
