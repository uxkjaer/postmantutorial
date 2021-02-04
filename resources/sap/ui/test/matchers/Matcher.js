/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/_OpaLogger","sap/ui/base/ManagedObject"],function(t,e){"use strict";var i=e.extend("sap.ui.test.matchers.Matcher",{metadata:{publicMethods:["isMatching"]},constructor:function(){this._oLogger=t.getLogger(this.getMetadata().getName());return e.prototype.constructor.apply(this,arguments)},isMatching:function(t){return true},_getApplicationWindow:function(){if(sap.ui.test&&sap.ui.test.Opa5){return sap.ui.test.Opa5.getWindow()}else{return window}},_getOpaPlugin:function(){var t;if(sap.ui.test&&sap.ui.test.Opa5){t=sap.ui.test.Opa5.getPlugin()}else if(window.top===window.self){sap.ui.require(["sap/ui/test/Opa5"],function(e){t=e.getPlugin()})}else{var e=n();if(e.sap.ui.test&&e.sap.ui.test.Opa5){t=e.sap.ui.test.Opa5.getPlugin()}else{e.sap.ui.require(["sap/ui/test/Opa5"],function(e){t=e.getPlugin()})}}return t}});function n(){var t=window.parent;while(!(t===window.top&&t.parent===window.top)){var e=t.document.getElementById("OpaFrame");if(e&&e.contentWindow===window.self){return t}else{t=t.parent}}return t}return i});