sap.ui.define(['sap/ui/core/mvc/XMLView'], function(XMLView) {
  'use strict';

  XMLView.create({ viewName: 'qldh.firstRequest.Sample1' }).then(function(
    oView
  ) {
    oView.placeAt('content');
  });
});
