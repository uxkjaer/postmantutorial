sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","luigi/demo/libs/luigi-client/luigi-client"],function(n,e){"use strict";return n.extend("luigi.demo.home.Home",{onDownload:function(){window.open("https://dl.pstmn.io/download/latest/win64","_blank")},getRouter:function(){return e.getRouterFor(this)},onInit:function(){LuigiClient.addInitListener(n=>{});LuigiClient.addContextUpdateListener(n=>{console.log("Luigi Client Updated!")})},onAfterRendering:function(){var n=this.byId("download"),e=n.getDomRef();e.style.paddingLeft="55px"}})});