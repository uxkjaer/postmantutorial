sap.ui.define(
  ["luigi/demo/common/BaseController", 'luigi/demo/libs/luigi-client/luigi-client'],
  function(Controller, JSONModel) {
    'use strict';

    return Controller.extend('qldh.firstTest.Sample2', {onValidate: function () {
      var text = JSON.stringify({
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body:
          "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      });
      var myText = this.getView().byId("myText").getValue();
      try {
        myText = JSON.stringify(JSON.parse(myText));
      } catch (error) {
        this.getView().byId("failure").setVisible(true);
        return;
      }

      if (myText === text){
        this.byId("step1").setValidated(true)
      }
    },

    onValidateStep1: function(){
      this.byId("step2").setValidated(true)
    },

    onValidateEnd: function(){
      var bValidated;
      for (let i = 1; i < 6; i++){
        let bSelected = this.byId(i.toString()).getSelected();
        if (i % 2 === 1 && bSelected === true){
          bValidated = true
        }
        else if (bSelected === false){
          bValidated = true
        } 
        else {
          bValidated = false
          i = 6
        }

      }

      if (bValidated){
        this.getView().byId("success").setVisible(true);
        this.getView().byId("failure").setVisible(false);
        this._showFireworks();
        setTimeout(() => {
          document.getElementById("content").classList.add("item-fade")
        }, 200)
      }
      else {
        this.getView().byId("success").setVisible(false);
        this.getView().byId("failure").setVisible(true);
      }
      
    }
  });
}
);
