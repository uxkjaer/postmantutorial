sap.ui.define(['sap/ui/core/mvc/XMLView'], function(XMLView) {
  'use strict';

  XMLView.create({ viewName: 'qldh.jsonSchema.schema' }).then(function(
    oView
  ) {
    oView.placeAt('content');
  });
});
