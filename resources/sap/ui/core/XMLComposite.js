/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/XMLCompositeMetadata","sap/ui/model/base/ManagedObjectModel","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/base/ManagedObject","sap/ui/base/DataType","sap/ui/model/resource/ResourceModel","sap/base/Log","sap/ui/performance/Measurement"],function(e,t,i,r,o,n,a,s,g,p){"use strict";var d="sap.ui.core.XMLComposite";var u=e.extend("sap.ui.core.XMLComposite",{metadata:{interfaces:["sap.ui.core.IDScope"],properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%",invalidate:true},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null,invalidate:true},displayBlock:{type:"boolean",group:"Appearance",defaultValue:true,invalidate:true}},aggregations:{_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden",invalidate:true}}},constructor:function(){this._bIsCreating=true;e.apply(this,arguments);delete this._bIsCreating},renderer:{apiVersion:2,render:function(e,t){g.debug("Start rendering '"+t.sId,d);p.start(t.getId()+"---renderControl","Rendering of "+t.getMetadata().getName(),["rendering","control"]);e.openStart("div",t);e.accessibilityState(t);if(!t.getDisplayBlock()&&(t.getWidth()!=="100%"||t.getHeight()!=="100%")){e.style("display","inline-block")}e.style("height",t.getHeight());e.style("width",t.getWidth());e.openEnd();var i=t._renderingContent?t._renderingContent():t._getCompositeAggregation();if(i){e.renderControl(i)}e.close("div");p.end(t.getId()+"---renderControl");g.debug("Stop rendering '"+t.sId,d)}}},t);u.prototype.byId=function(e){return sap.ui.getCore().byId(o.createId(this.getId(),e))};u.prototype._getManagedObjectModel=function(){if(!this._oManagedObjectModel){this._oManagedObjectModel=new i(this)}return this._oManagedObjectModel};u.prototype.getSuppressInvalidateAggregation=function(e,t){var i=this.getMetadata(),r=i.getAggregation(e)||i.getAllPrivateAggregations()[e];if(!r){return true}t=i._suppressInvalidate(r,t);return t};u.prototype.setProperty=function(t,i,r){var o=this.getMetadata(),n=o.getManagedProperty(t);if(!n){return this}r=o._suppressInvalidate(n,r);return e.prototype.setProperty.apply(this,[t,i,r])};u.prototype.setAggregation=function(t,i,r){return e.prototype.setAggregation.apply(this,[t,i,this.getSuppressInvalidateAggregation(t,r)])};u.prototype.addAggregation=function(t,i,r){return e.prototype.addAggregation.apply(this,[t,i,this.getSuppressInvalidateAggregation(t,r)])};u.prototype.insertAggregation=function(t,i,r,o){return e.prototype.insertAggregation.apply(this,[t,i,r,this.getSuppressInvalidateAggregation(t,o)])};u.prototype.removeAggregation=function(t,i,r){return e.prototype.removeAggregation.apply(this,[t,i,this.getSuppressInvalidateAggregation(t,r)])};u.prototype.removeAllAggregation=function(t,i){return e.prototype.removeAllAggregation.apply(this,[t,this.getSuppressInvalidateAggregation(t,i)])};u.prototype.destroyAggregation=function(t,i){return e.prototype.destroyAggregation.apply(this,[t,this.getSuppressInvalidateAggregation(t,i)])};u.prototype.updateAggregation=function(t,i){var r=this.getMetadata().getAggregation(t);if(r&&r.type==="TemplateMetadataContext"){this.invalidate();return}e.prototype.updateAggregation.apply(this,arguments)};u.prototype.setVisible=function(e){this.setProperty("visible",e);if(this.getParent()){this.getParent().invalidate()}return this};u.prototype._destroyCompositeAggregation=function(){var e=this._getCompositeAggregation();if(e){e.destroy("KeepDom")}return this};u.prototype.updateBindings=function(){if(this._bIsCreating){return}var t=e.prototype.updateBindings.apply(this,arguments);for(var i in this.mBindingInfos){var r=this.getMetadata().getAggregation(i);if(r&&r.multiple&&!r._doesNotRequireFactory&&this.isBound(i)&&!this.getBinding(i)){this[r._sDestructor]()}}return t};u.prototype._getCompositeAggregation=function(){var e=this.getMetadata().getCompositeAggregationName();return this.getAggregation(e)};u.prototype._setCompositeAggregation=function(e){var t=this.getMetadata().getCompositeAggregationName();this._destroyCompositeAggregation();if(!this._oManagedObjectModel){this._getManagedObjectModel()}if(Array.isArray(e)){this.setAggregation(t,null);return}if(e){if(!e.enhanceAccessibilityState){e.enhanceAccessibilityState=function(e,t){this.enhanceAccessibilityState(e,t)}.bind(this)}e.bindObject("$"+this.alias+">/");e.setModel(this._oManagedObjectModel,"$"+this.alias);if(this.bUsesI18n){var i=this._getResourceModel();if(i){e.setModel(i,"$"+this.alias+".i18n")}}}this.setAggregation(t,e)};u.mResourceModels={};u.getLibraryResourceModel=function(e){var t=u.mResourceModels[e];if(!t){t=new s({bundleName:e+".messagebundle",async:true});u.mResourceModels[e]=t}return t};u.prototype._getResourceModel=function(){if(this.resourceModel){return this.resourceModel}if(this.messageBundle){this.resourceModel=new s({bundleName:this.messageBundle,async:true});return this.resourceModel}else{this.sLibraryName=this.sLibraryName||this.getMetadata().getLibraryName();if(this.sLibraryName){return u.getLibraryResourceModel(this.sLibraryName)}}};u.prototype.getResourceBundle=function(){var e=this._getResourceModel();return e?e.getResourceBundle():null};u.prototype.destroy=function(){e.prototype.destroy.apply(this,arguments);if(this.resourceModel){this.resourceModel.destroy()}if(this._oManagedObjectModel){this._oManagedObjectModel.destroy()}};u.prototype._initCompositeSupport=function(e){var t=this.getMetadata(),i=t._fragment,r=t.getCompositeAggregationName();this._destroyCompositeAggregation();if(e&&r&&e[r]){var o=e[r];if(o.localName==="FragmentDefinition"){i=o;delete e[r]}}var n=i?(new XMLSerializer).serializeToString(i):undefined;this.bUsesI18n=n?n.indexOf("$"+this.alias+".i18n")!=-1:true;this._setCompositeAggregation(sap.ui.xmlfragment({sId:this.getId(),fragmentContent:i,oController:this}));this._bIsInitialized=true};u.prototype.enhanceAccessibilityState=function(e,t){var i=this.getParent();if(i&&i.enhanceAccessibilityState){return i.enhanceAccessibilityState(this,t)}return t};u.prototype.getFocusDomRef=function(){var e=this._renderingContent?this._renderingContent():this._getCompositeAggregation();return e.getFocusDomRef()};u.prototype.getFocusInfo=function(){var e=this._renderingContent?this._renderingContent():this._getCompositeAggregation();return e.getFocusInfo()};u.prototype.getIdForLabel=function(){var e=this._renderingContent?this._renderingContent():this._getCompositeAggregation();return e.getIdForLabel()};return u});