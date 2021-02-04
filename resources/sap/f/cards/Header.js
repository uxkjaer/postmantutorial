/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/f/library","sap/ui/core/Control","sap/m/Text","sap/f/Avatar","sap/ui/Device","sap/f/cards/HeaderRenderer","sap/ui/core/Core"],function(t,e,i,s,a,r,n,o){"use strict";var p=t.AvatarShape;var l=i.extend("sap.f.cards.Header",{metadata:{library:"sap.f",interfaces:["sap.f.cards.IHeader"],properties:{title:{type:"string",defaultValue:""},subtitle:{type:"string",defaultValue:""},statusText:{type:"string",defaultValue:""},iconDisplayShape:{type:"sap.m.AvatarShape",defaultValue:p.Circle},iconSrc:{type:"sap.ui.core.URI",defaultValue:""},iconInitials:{type:"string",defaultValue:""}},aggregations:{toolbar:{type:"sap.ui.core.Control",multiple:false},_title:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_subtitle:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_avatar:{type:"sap.f.Avatar",multiple:false,visibility:"hidden"}},events:{press:{}}},renderer:n});l.prototype.init=function(){this._oRb=o.getLibraryResourceBundle("sap.f");this.data("sap-ui-fastnavgroup","true",true)};l.prototype.exit=function(){this._oRb=null};l.prototype._getTitle=function(){var t=this.getAggregation("_title");if(!t){t=new s({maxLines:3}).addStyleClass("sapFCardTitle");this.setAggregation("_title",t)}return t};l.prototype._getSubtitle=function(){var t=this.getAggregation("_subtitle");if(!t){t=new s({maxLines:2}).addStyleClass("sapFCardSubtitle");this.setAggregation("_subtitle",t)}return t};l.prototype._getAvatar=function(){var t=this.getAggregation("_avatar");if(!t){t=(new a).addStyleClass("sapFCardIcon");this.setAggregation("_avatar",t)}return t};l.prototype.onBeforeRendering=function(){this._getTitle().setText(this.getTitle());this._getSubtitle().setText(this.getSubtitle());this._getAvatar().setDisplayShape(this.getIconDisplayShape());this._getAvatar().setSrc(this.getIconSrc());this._getAvatar().setInitials(this.getIconInitials());this._setAccessibilityAttributes()};l.prototype._getHeaderAccessibility=function(){var t=this._getTitle()?this._getTitle().getId():"",e=this._getSubtitle()?this._getSubtitle().getId():"",i=this.getStatusText()?this.getId()+"-status":"",s=this._getAvatar()?this._getAvatar().getId():"";return t+" "+e+" "+i+" "+s};l.prototype.onAfterRendering=function(){if(r.browser.msie){if(this.getTitle()){this._getTitle().clampText()}if(this.getSubtitle()){this._getSubtitle().clampText()}}};l.prototype.ontap=function(t){var e=t.srcControl;if(e&&e.getId().indexOf("overflowButton")>-1){return}this.firePress()};l.prototype.onsapselect=function(){this.firePress()};l.prototype._setAccessibilityAttributes=function(){if(this.hasListeners("press")){this._sAriaRole="button";this._sAriaHeadingLevel=undefined;this._sAriaRoleDescritoion=this._oRb.getText("ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER")}else{this._sAriaRole="heading";this._sAriaHeadingLevel="3";this._sAriaRoleDescritoion=this._oRb.getText("ARIA_ROLEDESCRIPTION_CARD_HEADER")}};l.prototype.isLoading=function(){return false};l.prototype.attachPress=function(){var t=Array.prototype.slice.apply(arguments);t.unshift("press");i.prototype.attachEvent.apply(this,t);this.invalidate();return this};l.prototype.detachPress=function(){var t=Array.prototype.slice.apply(arguments);t.unshift("press");i.prototype.detachEvent.apply(this,t);this.invalidate();return this};return l});