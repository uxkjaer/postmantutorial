/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/Device","sap/ui/core/ResizeHandler","sap/ui/core/Control","sap/m/library","sap/m/Button","sap/m/NavContainer","sap/ui/core/Configuration","sap/ui/core/theming/Parameters","sap/ui/dom/units/Rem","./FlexibleColumnLayoutRenderer","sap/base/assert"],function(e,t,o,n,i,s,a,r,u,l,d,p,g){"use strict";var C=t.LayoutType;var m=i.extend("sap.f.FlexibleColumnLayout",{metadata:{properties:{autoFocus:{type:"boolean",group:"Behavior",defaultValue:true},layout:{type:"sap.f.LayoutType",defaultValue:C.OneColumn},defaultTransitionNameBeginColumn:{type:"string",group:"Appearance",defaultValue:"slide"},defaultTransitionNameMidColumn:{type:"string",group:"Appearance",defaultValue:"slide"},defaultTransitionNameEndColumn:{type:"string",group:"Appearance",defaultValue:"slide"},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:s.BackgroundDesign.Transparent},restoreFocusOnBackNavigation:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{beginColumnPages:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getBeginColumn",aggregation:"pages"}},midColumnPages:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getMidColumn",aggregation:"pages"}},endColumnPages:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getEndColumn",aggregation:"pages"}},_beginColumnNav:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_midColumnNav:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_endColumnNav:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_beginColumnBackArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_midColumnForwardArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_midColumnBackArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_endColumnForwardArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{initialBeginColumnPage:{type:"sap.ui.core.Control",multiple:false},initialMidColumnPage:{type:"sap.ui.core.Control",multiple:false},initialEndColumnPage:{type:"sap.ui.core.Control",multiple:false}},events:{stateChange:{parameters:{layout:{type:"sap.f.LayoutType"},maxColumnsCount:{type:"int"},isNavigationArrow:{type:"boolean"},isResize:{type:"boolean"}}},beginColumnNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterBeginColumnNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},midColumnNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterMidColumnNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},endColumnNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterEndColumnNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},columnResize:{parameters:{beginColumn:{type:"boolean"},midColumn:{type:"boolean"},endColumn:{type:"boolean"}}}}}});m.COLUMN_RESIZING_ANIMATION_DURATION=560;m.PINNED_COLUMN_CLASS_NAME="sapFFCLPinnedColumn";m.COLUMN_ORDER=["begin","mid","end"];m.prototype.init=function(){this._iWidth=0;this._oColumnFocusInfo={begin:{},mid:{},end:{}};this._initNavContainers();this._initButtons();this._oLayoutHistory=new h;this._oRenderedColumnPagesBoolMap={};this._iNavigationArrowWidth=d.toPx(l.get("_sap_f_FCL_navigation_arrow_width"));this._oColumnWidthInfo={begin:0,mid:0,end:0}};m.prototype._onNavContainerRendered=function(e){var t=e.srcControl,o=t.getPages().length>0,n=this._hasAnyColumnPagesRendered();this._setColumnPagesRendered(t.getId(),o);if(this._hasAnyColumnPagesRendered()!==n){this._hideShowArrows()}};m.prototype._createNavContainer=function(e){var t=e.charAt(0).toUpperCase()+e.slice(1);var o=new r(this.getId()+"-"+e+"ColumnNav",{autoFocus:this.getAutoFocus(),navigate:function(t){this._handleNavigationEvent(t,false,e)}.bind(this),afterNavigate:function(t){this._handleNavigationEvent(t,true,e)}.bind(this),defaultTransitionName:this["getDefaultTransitionName"+t+"Column"]()});o.addDelegate({onAfterRendering:this._onNavContainerRendered},this);this["_"+e+"ColumnFocusOutDelegate"]={onfocusout:function(t){this._oColumnFocusInfo[e]=t.target}};o.addEventDelegate(this["_"+e+"ColumnFocusOutDelegate"],this);return o};m.prototype._handleNavigationEvent=function(e,t,o){var n,i;if(t){n="after"+(o.charAt(0).toUpperCase()+o.slice(1))+"ColumnNavigate"}else{n=o+"ColumnNavigate"}i=this.fireEvent(n,e.mParameters,true);if(!i){e.preventDefault()}};m.prototype._getColumnByStringName=function(e){if(e==="end"){return this._getEndColumn()}else if(e==="mid"){return this._getMidColumn()}else{return this._getBeginColumn()}};m.prototype._getBeginColumn=function(){return this.getAggregation("_beginColumnNav")};m.prototype._getMidColumn=function(){return this.getAggregation("_midColumnNav")};m.prototype._getEndColumn=function(){return this.getAggregation("_endColumnNav")};m.prototype._flushColumnContent=function(e){var t=this.getAggregation("_"+e+"ColumnNav"),o=sap.ui.getCore().createRenderManager();o.renderControl(t);o.flush(this._$columns[e].find(".sapFFCLColumnContent")[0],undefined,true);o.destroy()};m.prototype.setLayout=function(e){e=this.validateProperty("layout",e);var t=this.getLayout();if(t===e){return this}var o=this.setProperty("layout",e,true);this._oLayoutHistory.addEntry(e);this._hideShowArrows();this._resizeColumns();return o};m.prototype.setAutoFocus=function(e){e=this.validateProperty("autoFocus",e);var t=this.getAutoFocus();if(t===e){return this}this._getNavContainers().forEach(function(t){t.setAutoFocus(e)});return this.setProperty("autoFocus",e,true)};m.prototype.onBeforeRendering=function(){this._deregisterResizeHandler()};m.prototype.onAfterRendering=function(){this._measureControlWidth();this._registerResizeHandler();this._cacheDOMElements();this._hideShowArrows();this._resizeColumns();this._flushColumnContent("begin");this._flushColumnContent("mid");this._flushColumnContent("end");this._fireStateChange(false,false)};m.prototype._restoreFocusToColumn=function(t){var o=this._oColumnFocusInfo[t];if(!o||e.isEmptyObject(o)){o=this._getFirstFocusableElement(t)}e(o).trigger("focus")};m.prototype._getFirstFocusableElement=function(e){var t=this._getColumnByStringName(e),o=t.getCurrentPage();if(o){return o.$().firstFocusableDomRef()}return null};m.prototype._isFocusInSomeOfThePreviousColumns=function(){var e=m.COLUMN_ORDER.indexOf(this._sPreviuosLastVisibleColumn)-1,t;for(;e>=0;e--){t=this._getColumnByStringName(m.COLUMN_ORDER[e]);if(t&&t._isFocusInControl(t)){return true}}return false};m.prototype._getControlWidth=function(){if(this._iWidth===0){this._measureControlWidth()}return this._iWidth};m.prototype._measureControlWidth=function(){if(this.$().is(":visible")){this._iWidth=this.$().width()}else{this._iWidth=0}};m.prototype.exit=function(){this._removeNavContainersFocusOutDelegate();this._oRenderedColumnPagesBoolMap=null;this._oColumnFocusInfo=null;this._deregisterResizeHandler();this._handleEvent(e.Event("Destroy"))};m.prototype._removeNavContainersFocusOutDelegate=function(){m.COLUMN_ORDER.forEach(function(e){this._getColumnByStringName(e).removeEventDelegate(this["_"+e+"ColumnFocusOutDelegate"])},this)};m.prototype._registerResizeHandler=function(){g(!this._iResizeHandlerId,"Resize handler already registered");this._iResizeHandlerId=n.register(this,this._onResize.bind(this))};m.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){n.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};m.prototype._initNavContainers=function(){this.setAggregation("_beginColumnNav",this._createNavContainer("begin"),true);this.setAggregation("_midColumnNav",this._createNavContainer("mid"),true);this.setAggregation("_endColumnNav",this._createNavContainer("end"),true)};m.prototype._getNavContainers=function(){return[this._getBeginColumn(),this._getMidColumn(),this._getEndColumn()]};m.prototype._initButtons=function(){var e=new a(this.getId()+"-beginBack",{icon:"sap-icon://slim-arrow-left",tooltip:m._getResourceBundle().getText("FCL_BEGIN_COLUMN_BACK_ARROW"),type:"Transparent",press:this._onArrowClick.bind(this,"left")}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonRight");this.setAggregation("_beginColumnBackArrow",e,true);var t=new a(this.getId()+"-midForward",{icon:"sap-icon://slim-arrow-right",tooltip:m._getResourceBundle().getText("FCL_MID_COLUMN_FORWARD_ARROW"),type:"Transparent",press:this._onArrowClick.bind(this,"right")}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonLeft");this.setAggregation("_midColumnForwardArrow",t,true);var o=new a(this.getId()+"-midBack",{icon:"sap-icon://slim-arrow-left",tooltip:m._getResourceBundle().getText("FCL_MID_COLUMN_BACK_ARROW"),type:"Transparent",press:this._onArrowClick.bind(this,"left")}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonRight");this.setAggregation("_midColumnBackArrow",o,true);var n=new a(this.getId()+"-endForward",{icon:"sap-icon://slim-arrow-right",tooltip:m._getResourceBundle().getText("FCL_END_COLUMN_FORWARD_ARROW"),type:"Transparent",press:this._onArrowClick.bind(this,"right")}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonLeft");this.setAggregation("_endColumnForwardArrow",n,true)};m.prototype._cacheDOMElements=function(){this._cacheColumns();if(!o.system.phone){this._cacheArrows()}};m.prototype._cacheColumns=function(){this._$columns={begin:this.$("beginColumn"),mid:this.$("midColumn"),end:this.$("endColumn")}};m.prototype._cacheArrows=function(){this._oColumnSeparatorArrows={beginBack:this.$("beginBack"),midForward:this.$("midForward"),midBack:this.$("midBack"),endForward:this.$("endForward")}};m.prototype._getVisibleColumnsCount=function(){return m.COLUMN_ORDER.filter(function(e){return this._getColumnSize(e)>0},this).length};m.prototype._getVisibleArrowsCount=function(){if(!this._oColumnSeparatorArrows){return 0}return Object.keys(this._oColumnSeparatorArrows).filter(function(e){return this._oColumnSeparatorArrows[e].data("visible")},this).length};m.prototype._getTotalColumnsWidth=function(e){var t=this._getVisibleArrowsCount();if(e){t++}return this._getControlWidth()-t*this._iNavigationArrowWidth};m.prototype._resizeColumns=function(){var e,t,i=m.COLUMN_ORDER.slice(),s=sap.ui.getCore().getConfiguration().getRTL(),a=sap.ui.getCore().getConfiguration().getAnimationMode(),r=a!==u.AnimationMode.none&&a!==u.AnimationMode.minimal,l,d,p,g,h,_,c;if(!this.isActive()){return}d=this._getVisibleColumnsCount();if(d===0){return}g=this.getLayout();p=this._getMaxColumnsCountForLayout(g,m.DESKTOP_BREAKPOINT);h=i[p-1];c=this.getRestoreFocusOnBackNavigation()&&this._isNavigatingBackward(h)&&!this._isFocusInSomeOfThePreviousColumns();_=d===3&&g===C.ThreeColumnsEndExpanded;t=this._getTotalColumnsWidth(_);if(r){i.forEach(function(e){var t=this._shouldConcealColumn(p,e),o=this._shouldRevealColumn(p,e===h),n=this._$columns[e];n.toggleClass(m.PINNED_COLUMN_CLASS_NAME,t||o)},this)}i.forEach(function(i){var s=this._$columns[i],a,u,l,d;e=this._getColumnSize(i);l=r&&this._shouldConcealColumn(p,i);d=c&&i===h;if(!l){s.toggleClass("sapFFCLColumnActive",e>0)}s.toggleClass("sapFFCLColumnInset",_&&i==="mid");s.removeClass("sapFFCLColumnHidden");s.removeClass("sapFFCLColumnOnlyActive");s.removeClass("sapFFCLColumnLastActive");s.removeClass("sapFFCLColumnFirstActive");a=Math.round(t*(e/100));if([100,0].indexOf(e)!==-1){u=e+"%"}else{u=a+"px"}if(r){var g=s.get(0);if(s._iResumeResizeHandlerTimeout){clearTimeout(s._iResumeResizeHandlerTimeout)}n.suspend(g);s._iResumeResizeHandlerTimeout=setTimeout(this._adjustColumnAfterAnimation.bind(this,l,u,a,s,g,d),m.COLUMN_RESIZING_ANIMATION_DURATION)}else{this._adjustColumnDisplay(s,a,d)}if(!l){s.width(u)}if(!o.system.phone){this._updateColumnContextualSettings(i,a);this._updateColumnCSSClasses(i,a)}},this);l=i.filter(function(e){return this._getColumnSize(e)>0},this);if(s){i.reverse()}if(l.length===1){this._$columns[l[0]].addClass("sapFFCLColumnOnlyActive")}if(l.length>1){this._$columns[l[0]].addClass("sapFFCLColumnFirstActive");this._$columns[l[l.length-1]].addClass("sapFFCLColumnLastActive")}this._storePreviousResizingInfo(p,h)};m.prototype._adjustColumnAfterAnimation=function(e,t,o,n,i,s){if(e){n.width(t);n.toggleClass("sapFFCLColumnActive",false)}n.toggleClass(m.PINNED_COLUMN_CLASS_NAME,false);this._adjustColumnDisplay(n,o,s);this._resumeResizeHandler(n,i)};m.prototype._resumeResizeHandler=function(e,t){n.resume(t);e._iResumeResizeHandlerTimeout=null};m.prototype._adjustColumnDisplay=function(e,t,o){var n={begin:e.hasClass("sapFFCLColumnBegin"),mid:e.hasClass("sapFFCLColumnMid"),end:e.hasClass("sapFFCLColumnEnd")},i=_(n),s;if(t===0){e.addClass("sapFFCLColumnHidden")}else{e.removeClass("sapFFCLColumnHidden")}if(this._oColumnWidthInfo[i]!==t){s={};for(var a in n){s[a+"Column"]=n[a]}this.fireColumnResize(s);if(o){this._restoreFocusToColumn(i)}}this._oColumnWidthInfo[i]=t};m.prototype._storePreviousResizingInfo=function(e,t){var o=this.getLayout();this._iPreviousVisibleColumnsCount=e;this._bWasFullScreen=o===C.MidColumnFullScreen||o===C.EndColumnFullScreen;this._sPreviuosLastVisibleColumn=t};m.prototype._isNavigatingBackward=function(e){return this._bWasFullScreen||m.COLUMN_ORDER.indexOf(this._sPreviuosLastVisibleColumn)>m.COLUMN_ORDER.indexOf(e)};m.prototype._shouldRevealColumn=function(e,t){return e>this._iPreviousVisibleColumnsCount&&!this._bWasFullScreen&&t};m.prototype._shouldConcealColumn=function(e,t){return e<this._iPreviousVisibleColumnsCount&&t===this._sPreviuosLastVisibleColumn&&!this._bWasFullScreen&&this._getColumnSize(t)===0};m.prototype._propagateContextualSettings=function(){};m.prototype._updateColumnContextualSettings=function(e,t){var o,n;o=this.getAggregation("_"+e+"ColumnNav");if(!o){return}n=o._getContextualSettings();if(!n||n.contextualWidth!==t){o._applyContextualSettings({contextualWidth:t})}};m.prototype._updateColumnCSSClasses=function(e,t){var n="";this._$columns[e].removeClass("sapUiContainer-Narrow sapUiContainer-Medium sapUiContainer-Wide sapUiContainer-ExtraWide");if(t<o.media._predefinedRangeSets[o.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0]){n="Narrow"}else if(t<o.media._predefinedRangeSets[o.media.RANGESETS.SAP_STANDARD_EXTENDED].points[1]){n="Medium"}else if(t<o.media._predefinedRangeSets[o.media.RANGESETS.SAP_STANDARD_EXTENDED].points[2]){n="Wide"}else{n="ExtraWide"}this._$columns[e].addClass("sapUiContainer-"+n)};m.prototype._getColumnSize=function(e){var t=this.getLayout(),o=this._getColumnWidthDistributionForLayout(t),n=o.split("/"),i={begin:0,mid:1,end:2},s=n[i[e]];return parseInt(s)};m.prototype.getMaxColumnsCount=function(){return this._getMaxColumnsCountForWidth(this._getControlWidth())};m.prototype._getMaxColumnsCountForWidth=function(e){if(e>=m.DESKTOP_BREAKPOINT){return 3}if(e>=m.TABLET_BREAKPOINT&&e<m.DESKTOP_BREAKPOINT){return 2}if(e>0){return 1}return 0};m.prototype._getMaxColumnsCountForLayout=function(e,t){var o=this._getMaxColumnsCountForWidth(t),n=this._getColumnWidthDistributionForLayout(e,false,o),i=n.split("/"),s={begin:0,mid:1,end:2},a,r,u=0;Object.keys(s).forEach(function(e){a=i[s[e]];r=parseInt(a);if(r){u++}});return u};m.prototype._onResize=function(e){var t=e.oldSize.width,o=e.size.width,n,i;this._iWidth=o;if(o===0){return}n=this._getMaxColumnsCountForWidth(t);i=this._getMaxColumnsCountForWidth(o);this._resizeColumns();if(i!==n){this._hideShowArrows();this._fireStateChange(false,true)}};m.prototype._setColumnPagesRendered=function(e,t){this._oRenderedColumnPagesBoolMap[e]=t};m.prototype._hasAnyColumnPagesRendered=function(){return Object.keys(this._oRenderedColumnPagesBoolMap).some(function(e){return this._oRenderedColumnPagesBoolMap[e]},this)};m.prototype._onArrowClick=function(e){var t=this.getLayout(),o=typeof m.SHIFT_TARGETS[t]!=="undefined"&&typeof m.SHIFT_TARGETS[t][e]!=="undefined",n;g(o,"An invalid layout was used for determining arrow behavior");n=o?m.SHIFT_TARGETS[t][e]:C.OneColumn;this.setLayout(n);if(m.ARROWS_NAMES[n][e]!==m.ARROWS_NAMES[t][e]&&o){var i=e==="right"?"left":"right";this._oColumnSeparatorArrows[m.ARROWS_NAMES[n][i]].focus()}this._fireStateChange(true,false)};m.prototype._hideShowArrows=function(){var e=this.getLayout(),t={},n=[],i,s;if(!this.isActive()||o.system.phone){return}i=this.getMaxColumnsCount();if(i>1){t[C.TwoColumnsBeginExpanded]=["beginBack"];t[C.TwoColumnsMidExpanded]=["midForward"];t[C.ThreeColumnsMidExpanded]=["midForward","midBack"];t[C.ThreeColumnsEndExpanded]=["endForward"];t[C.ThreeColumnsMidExpandedEndHidden]=["midForward","midBack"];t[C.ThreeColumnsBeginExpandedEndHidden]=["beginBack"];if(typeof t[e]==="object"){n=t[e]}}s=this._hasAnyColumnPagesRendered();Object.keys(this._oColumnSeparatorArrows).forEach(function(e){this._toggleButton(e,n.indexOf(e)!==-1,s)},this)};m.prototype._toggleButton=function(e,t,o){this._oColumnSeparatorArrows[e].toggle(t&&o);this._oColumnSeparatorArrows[e].data("visible",t)};m.prototype._fireStateChange=function(e,t){if(this._getControlWidth()===0){return}this.fireStateChange({isNavigationArrow:e,isResize:t,layout:this.getLayout(),maxColumnsCount:this.getMaxColumnsCount()})};m.prototype.setInitialBeginColumnPage=function(e){this._getBeginColumn().setInitialPage(e);this.setAssociation("initialBeginColumnPage",e,true);return this};m.prototype.setInitialMidColumnPage=function(e){this._getMidColumn().setInitialPage(e);this.setAssociation("initialMidColumnPage",e,true);return this};m.prototype.setInitialEndColumnPage=function(e){this._getEndColumn().setInitialPage(e);this.setAssociation("initialEndColumnPage",e,true);return this};m.prototype.to=function(e,t,o,n){if(this._getBeginColumn().getPage(e)){this._getBeginColumn().to(e,t,o,n)}else if(this._getMidColumn().getPage(e)){this._getMidColumn().to(e,t,o,n)}else{this._getEndColumn().to(e,t,o,n)}return this};m.prototype.backToPage=function(e,t,o){if(this._getBeginColumn().getPage(e)){this._getBeginColumn().backToPage(e,t,o)}else if(this._getMidColumn().getPage(e)){this._getMidColumn().backToPage(e,t,o)}else{this._getEndColumn().backToPage(e,t,o)}return this};m.prototype._safeBackToPage=function(e,t,o,n){if(this._getBeginColumn().getPage(e)){this._getBeginColumn()._safeBackToPage(e,t,o,n)}else if(this._getMidColumn().getPage(e)){this._getMidColumn()._safeBackToPage(e,t,o,n)}else{this._getEndColumn()._safeBackToPage(e,t,o,n)}};m.prototype.toBeginColumnPage=function(e,t,o,n){this._getBeginColumn().to(e,t,o,n);return this};m.prototype.toMidColumnPage=function(e,t,o,n){this._getMidColumn().to(e,t,o,n);return this};m.prototype.toEndColumnPage=function(e,t,o,n){this._getEndColumn().to(e,t,o,n);return this};m.prototype.backBeginColumn=function(e,t){return this._getBeginColumn().back(e,t)};m.prototype.backMidColumn=function(e,t){return this._getMidColumn().back(e,t)};m.prototype.backEndColumn=function(e,t){return this._getEndColumn().back(e,t)};m.prototype.backBeginColumnToPage=function(e,t,o){return this._getBeginColumn().backToPage(e,t,o)};m.prototype.backMidColumnToPage=function(e,t,o){return this._getMidColumn().backToPage(e,t,o)};m.prototype.backEndColumnToPage=function(e,t,o){return this._getEndColumn().backToPage(e,t,o)};m.prototype.backToTopBeginColumn=function(e,t){this._getBeginColumn().backToTop(e,t);return this};m.prototype.backToTopMidColumn=function(e,t){this._getMidColumn().backToTop(e,t);return this};m.prototype.backToTopEndColumn=function(e,t){this._getEndColumn().backToTop(e,t);return this};m.prototype.getCurrentBeginColumnPage=function(){return this._getBeginColumn().getCurrentPage()};m.prototype.getCurrentMidColumnPage=function(){return this._getMidColumn().getCurrentPage()};m.prototype.getCurrentEndColumnPage=function(){return this._getEndColumn().getCurrentPage()};m.prototype.setDefaultTransitionNameBeginColumn=function(e){this.setProperty("defaultTransitionNameBeginColumn",e,true);this._getBeginColumn().setDefaultTransitionName(e);return this};m.prototype.setDefaultTransitionNameMidColumn=function(e){this.setProperty("defaultTransitionNameMidColumn",e,true);this._getMidColumn().setDefaultTransitionName(e);return this};m.prototype.setDefaultTransitionNameEndColumn=function(e){this.setProperty("defaultTransitionNameEndColumn",e,true);this._getEndColumn().setDefaultTransitionName(e);return this};m.prototype._getLayoutHistory=function(){return this._oLayoutHistory};m.prototype._getColumnWidthDistributionForLayout=function(e,t,o){var n={},i;o||(o=this.getMaxColumnsCount());if(o===0){i="0/0/0"}else{n[C.OneColumn]="100/0/0";n[C.MidColumnFullScreen]="0/100/0";n[C.EndColumnFullScreen]="0/0/100";if(o===1){n[C.TwoColumnsBeginExpanded]="0/100/0";n[C.TwoColumnsMidExpanded]="0/100/0";n[C.ThreeColumnsMidExpanded]="0/0/100";n[C.ThreeColumnsEndExpanded]="0/0/100";n[C.ThreeColumnsMidExpandedEndHidden]="0/0/100";n[C.ThreeColumnsBeginExpandedEndHidden]="0/0/100"}else{n[C.TwoColumnsBeginExpanded]="67/33/0";n[C.TwoColumnsMidExpanded]="33/67/0";n[C.ThreeColumnsMidExpanded]=o===2?"0/67/33":"25/50/25";n[C.ThreeColumnsEndExpanded]=o===2?"0/33/67":"25/25/50";n[C.ThreeColumnsMidExpandedEndHidden]="33/67/0";n[C.ThreeColumnsBeginExpandedEndHidden]="67/33/0"}i=n[e]}if(t){i=i.split("/").map(function(e){return parseInt(e)})}return i};m.DESKTOP_BREAKPOINT=1280;m.TABLET_BREAKPOINT=960;m.ARROWS_NAMES={TwoColumnsBeginExpanded:{left:"beginBack"},TwoColumnsMidExpanded:{right:"midForward"},ThreeColumnsMidExpanded:{left:"midBack",right:"midForward"},ThreeColumnsEndExpanded:{right:"endForward"},ThreeColumnsMidExpandedEndHidden:{left:"midBack",right:"midForward"},ThreeColumnsBeginExpandedEndHidden:{left:"beginBack"}};m._getResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.f")};m.SHIFT_TARGETS={TwoColumnsBeginExpanded:{left:C.TwoColumnsMidExpanded},TwoColumnsMidExpanded:{right:C.TwoColumnsBeginExpanded},ThreeColumnsMidExpanded:{left:C.ThreeColumnsEndExpanded,right:C.ThreeColumnsMidExpandedEndHidden},ThreeColumnsEndExpanded:{right:C.ThreeColumnsMidExpanded},ThreeColumnsMidExpandedEndHidden:{left:C.ThreeColumnsMidExpanded,right:C.ThreeColumnsBeginExpandedEndHidden},ThreeColumnsBeginExpandedEndHidden:{left:C.ThreeColumnsMidExpandedEndHidden}};function h(){this._aLayoutHistory=[]}function _(e){var t;for(var o in e){if(e[o]){t=o;break}}return t}h.prototype.addEntry=function(e){if(typeof e!=="undefined"){this._aLayoutHistory.push(e)}};h.prototype.getClosestEntryThatMatches=function(e){var t;for(t=this._aLayoutHistory.length-1;t>=0;t--){if(e.indexOf(this._aLayoutHistory[t])!==-1){return this._aLayoutHistory[t]}}};return m});