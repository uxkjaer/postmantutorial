sap.ui.define(['sap/ui/core/mvc/XMLView'], function(XMLView) {
  'use strict';

  XMLView.create({ viewName: 'qldh.variables.variables' }).then(function(
    oView
  ) {
    oView.placeAt('content');
  });
});
