sap.ui.define(['sap/ui/core/mvc/XMLView'], function(XMLView) {
  'use strict';

  XMLView.create({ viewName: 'qldh.postRequest.postRequest' }).then(function(
    oView
  ) {
    oView.placeAt('content');
  });
});
