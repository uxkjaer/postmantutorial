sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent',
    'luigi/demo/libs/luigi-client/luigi-client'
  ],
  function(Controller, UIComponent) {
    'use strict';

    return Controller.extend('luigi.demo.home.Home', {

      onDownload: function(){
        window.open("https://dl.pstmn.io/download/latest/win64", "_blank")
      },
      getRouter: function() {
        return UIComponent.getRouterFor(this);
      },

      onInit: function() {
        LuigiClient.addInitListener(initialContext => {
          
        });

        LuigiClient.addContextUpdateListener(updatedContext => {
          console.log('Luigi Client Updated!');
        });
      },

      onAfterRendering: function(){
        var download = this.byId("download"), oElement = download.getDomRef();
        if (oElement){
          oElement.style.paddingLeft = '55px'
        }
        

      }
    });
  }
);
