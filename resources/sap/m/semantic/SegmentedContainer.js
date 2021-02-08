/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/semantic/Segment","sap/ui/base/Object","sap/base/Log"],function(t,n,e){"use strict";var r=n.extend("sap.m.semantic.SegmentedContainer",{constructor:function(t,n){if(!t){e.error("missing argumment: constructor expects a container reference",this);return}this._oContainer=t;n||(n="content");this._sContainerAggregationName=n;this._aSegments=[]},getInterface:function(){return this}});r.prototype.addSection=function(n){if(!n||!n.sTag){e.error("missing argumment: section options expected",this);return}if(n.aContent){var r=n.aContent;var i=r.length;for(var o=0;o<i;o++){this._oContainer.addAggregation(this._sContainerAggregationName,r[o])}}var a=new t(r,this._oContainer,this._sContainerAggregationName,n.fnSortFunction);a.sTag=n.sTag;var s=this._aSegments;a.getStartIndex=function(){var t=0;var n=s.indexOf(this);if(n>0){var e=n-1;while(e>=0){t+=s[e].getContent().length;e--}}return t};this._aSegments.push(a)};r.prototype.getSection=function(t){var n;this._aSegments.forEach(function(e){if(e.sTag===t){n=e}});return n};r.prototype.destroy=function(t){this._oContainer.destroy(t);this.aSegments=null};r.prototype.getContainer=function(){return this._oContainer};return r});