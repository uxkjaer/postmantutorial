/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/model/SimpleType","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/thirdparty/jquery"],function(t,e,s,n,a,i){"use strict";var r=e.extend("sap.ui.model.type.String",{constructor:function(){e.apply(this,arguments);this.sName="String";if(this.oConstraints.search&&typeof this.oConstraints.search=="string"){this.oConstraints.search=new RegExp(this.oConstraints.search)}}});r.prototype.formatValue=function(t,e){if(t==undefined||t==null){return null}switch(this.getPrimitiveType(e)){case"string":case"any":return t;case"int":var n=parseInt(t);if(isNaN(n)){throw new s(t+" is not a valid int value")}return n;case"float":var a=parseFloat(t);if(isNaN(a)){throw new s(t+" is not a valid float value")}return a;case"boolean":if(t.toLowerCase()=="true"||t=="X"){return true}if(t.toLowerCase()=="false"||t==""){return false}throw new s(t+" is not a valid boolean value");default:throw new s("Don't know how to format String to "+e)}};r.prototype.parseValue=function(t,e){switch(this.getPrimitiveType(e)){case"string":return t;case"boolean":case"int":case"float":return t.toString();default:throw new n("Don't know how to parse String from "+e)}};r.prototype.validateValue=function(e){if(this.oConstraints){var s=sap.ui.getCore().getLibraryResourceBundle(),n=[],r=[];if(e===null){e=""}i.each(this.oConstraints,function(a,i){switch(a){case"maxLength":if(e.length>i){n.push("maxLength");r.push(s.getText("String.MaxLength",[i]))}break;case"minLength":if(e.length<i){n.push("minLength");r.push(s.getText("String.MinLength",[i]))}break;case"startsWith":if(!(typeof i=="string"&&i.length>0&&e.startsWith(i))){n.push("startsWith");r.push(s.getText("String.StartsWith",[i]))}break;case"startsWithIgnoreCase":if(!(typeof i=="string"&&i!=""?e.toLowerCase().startsWith(i.toLowerCase()):false)){n.push("startsWithIgnoreCase");r.push(s.getText("String.StartsWith",[i]))}break;case"endsWith":if(!(typeof i=="string"&&i.length>0&&e.endsWith(i))){n.push("endsWith");r.push(s.getText("String.EndsWith",[i]))}break;case"endsWithIgnoreCase":if(!(typeof i=="string"&&i!=""?e.toLowerCase().endsWith(i.toLowerCase()):false)){n.push("endsWithIgnoreCase");r.push(s.getText("String.EndsWith",[i]))}break;case"contains":if(e.indexOf(i)==-1){n.push("contains");r.push(s.getText("String.Contains",[i]))}break;case"equals":if(e!=i){n.push("equals");r.push(s.getText("String.Equals",[i]))}break;case"search":if(e.search(i)==-1){n.push("search");r.push(s.getText("String.Search",[i]))}break;default:t.warning("Ignoring unknown constraint: '"+a+"'",null,"sap.ui.model.type.String")}});if(n.length>0){throw new a(this.combineMessages(r),n)}}};return r});