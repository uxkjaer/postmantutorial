/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/library","sap/ui/Device"],function(e,n){"use strict";var t=e.SideContentPosition;var i="SIDE_CONTENT_LABEL";var r={apiVersion:2};r.render=function(e,n){e.openStart("div",n);e.class("sapUiDSC");e.style("height","100%");e.openEnd();this.renderSubControls(e,n);e.close("div")};r.renderSubControls=function(e,n){var i=n.getId(),r=n._shouldSetHeight(),s=sap.ui.getCore().getConfiguration().getRTL(),o=n.getSideContentPosition();if(o===t.Begin&&!s||s&&o===t.End){this._renderSideContent(e,n,i,r);this._renderMainContent(e,n,i,r)}else{this._renderMainContent(e,n,i,r);this._renderSideContent(e,n,i,r)}};r.renderControls=function(e,n){var t=n.length,i=0;for(;i<t;i++){e.renderControl(n[i])}};r._renderMainContent=function(e,n,t,i){e.openStart("div",t+"-MCGridCell");e.class("sapUiDSCM");if(n._iMcSpan){if(n.getShowSideContent()&&n._SCVisible){e.class("sapUiDSCSpan"+n._iMcSpan)}else{e.class("sapUiDSCSpan12")}}if(i){e.style("height","100%")}e.openEnd();this.renderControls(e,n.getMainContent());e.close("div")};r._renderSideContent=function(e,t,r,s){var o=n.browser.firefox?"div":"aside";e.openStart(o,r+"-SCGridCell");e.class("sapUiDSCS");var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.layout");e.attr("aria-label",a.getText(i));e.accessibilityState(t,{role:"complementary"});if(t._iScSpan){if(t.getShowMainContent()&&t._MCVisible){e.class("sapUiDSCSpan"+t._iScSpan)}else{e.class("sapUiDSCSpan12")}}if(s){e.style("height","100%")}e.openEnd();this.renderControls(e,t.getSideContent());e.close(o)};return r},true);