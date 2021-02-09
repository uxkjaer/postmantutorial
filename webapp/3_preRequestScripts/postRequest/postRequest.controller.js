sap.ui.define(
  ["luigi/demo/common/BaseController", 'luigi/demo/libs/luigi-client/luigi-client',     "/sap/ui/model/json/JSONModel",
],
  function(Controller,client, JSONModel) {
    'use strict';

    return Controller.extend('qldh.postRequest.PreRequest', {
      onInit: function(){
        this.setModel(new JSONModel({
          code: `
          let headers = {};
          headers['Authorization'] =  'Basic ' + btoa('250004' + ":" + 'Myhr1234');
          headers['x-csrf-token'] = 'fetch';
          const echoPostRequest = {
            url: 'https://myhr-dev.health.qld.gov.au/sap/opu/odata/sap/ZHR_MV_ALLOW_CLAIM_SRV/hasValidWagetypes?sap-client=120&saml2=disabled',
            method: 'GET',
            header: headers,
          };
          pm.sendRequest(echoPostRequest, function (err, res) {
            let token = res.headers.find((oHeader) => oHeader.key === 'x-csrf-token')
            pm.variables.set('csrf-token', token.value)
          });
          `,
          test: `
          pm.test("Work item is not Zero", function () {
            var jsonData = pm.response.json();
            pm.expect(jsonData.Workitem).not.eql("0000000000000");
        });
        `
        
        }));
      },

      onValidateStep1: function(){
        if (this.byId("rbg2").getSelectedIndex() === 3){
          this.byId("step1").setValidated(true);
        }
        else {
          this.byId("step1").setValidated(false);

        }
      },
      onValidateEnd: function () {
     

      if (this.byId("mySwitch").getState()) {
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
