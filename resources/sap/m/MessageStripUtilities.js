/*!
* OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(function(){"use strict";var e={};e.MESSAGES={TYPE_NOT_SUPPORTED:"Value 'sap.ui.core.MessageType.None' for property 'type' is not supported."+"Defaulting to 'sap.ui.core.MessageType.Information'"};e.CLASSES={ROOT:"sapMMsgStrip",ICON:"sapMMsgStripIcon",MESSAGE:"sapMMsgStripMessage",CLOSE_BUTTON:"sapMMsgStripCloseButton",CLOSING_TRANSITION:"sapMMsgStripClosing"};e.ATTRIBUTES={CLOSABLE:"data-sap-ui-ms-closable"};e.RESOURCE_BUNDLE=sap.ui.getCore().getLibraryResourceBundle("sap.m");e.getIconURI=function(){var e=this.getType(),t=this.getCustomIcon(),s="sap-icon://message-"+e.toLowerCase();return t||s};e.getAriaTypeText=function(){var t="MESSAGE_STRIP_"+this.getType().toUpperCase(),s=e.RESOURCE_BUNDLE.getText(t);if(this.getShowCloseButton()){s+=" "+e.RESOURCE_BUNDLE.getText("MESSAGE_STRIP_CLOSABLE")}return s};e.isMSCloseButtonPressed=function(t){return t.className.indexOf(e.CLASSES.CLOSE_BUTTON)!==-1||t.parentNode.className.indexOf(e.CLASSES.CLOSE_BUTTON)!==-1};e.closeTransitionWithCSS=function(t){this.$().addClass(e.CLASSES.CLOSING_TRANSITION).one("webkitTransitionEnd transitionend",t)};e.getAccessibilityState=function(){return{role:"note",live:"assertive"}};return e});