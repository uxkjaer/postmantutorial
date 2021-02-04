sap.ui.define(['sap/ui/core/mvc/XMLView'], function(XMLView) {
  'use strict';

  XMLView.create({ viewName: 'qldh.environment.environment' }).then(function(
    oView
  ) {
    oView.placeAt('content');
  });
});
