sap.ui.define(['sap/ui/core/mvc/XMLView'], function(XMLView) {
  'use strict';

  XMLView.create({ viewName: 'qldh.testRunner.testRunner' }).then(function(
    oView
  ) {
    oView.placeAt('content');
  });
});
