sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","luigi/demo/libs/luigi-client/luigi-client"],function(i,n){"use strict";return i.extend("luigi.demo.home.Home",{onDownload:function(){window.open("https://dl.pstmn.io/download/latest/win64","_blank")},getRouter:function(){return n.getRouterFor(this)},onInit:function(){LuigiClient.addInitListener(i=>{});LuigiClient.addContextUpdateListener(i=>{console.log("Luigi Client Updated!")})},onAfterRendering:function(){var i=this.byId("download"),n=i.getDomRef();if(n){n.style.paddingLeft="55px"}}})});