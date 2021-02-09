
sap.ui.define(
  ["luigi/demo/common/BaseController", 'luigi/demo/libs/luigi-client/luigi-client',     "/sap/ui/model/json/JSONModel",
],
  function(Controller,client, JSONModel) {
    'use strict';

    return Controller.extend('qldh.collections.collection', {
      onInit: function(){
        this.setModel(new JSONModel({
          code: `
          {"Businessstatus":"","ZSob":false,"Mgrsignonbehalftext":"I certify that the amount claimed in this request is due and payable for the expenses incurred or services rendered as specified and that this claim is in accordance with Policy C15 - Allowances. I acknowledge that the provision of false information to any questions on this request may result in the termination of my appointment. This claim is not in relation to a novated lease arrangement.","Requestfor":"S","Role":"","ZManAppr":false,"MgrcertSignonbehalfComment":"","ZText3months":"This claim is greater than 3 months old, please complete and attach the validation of claim older than three months form","LeadObjectId":"00250004","MgrcertSignonbehalfCert":false,"ZClaimOlderthan3months":false,"Comments":"","LeadObjectType":"P","CompanyCode":"2400","Requestortype":"[{\"name\":\"MGR\",\"value\":\"Supervisor\"},{\"name\":\"EMP\",\"value\":\"Employee\"}]","CentralPerson":250004,"Vehtype":"[{\"name\":\"CAR\",\"value\":\"Car\"},{\"name\":\"MCYCLE\",\"value\":\"Motorcycle\"}]","EffectiveDate":"\/Date({{$isoTimestamp}})\/","Employeecertification":true,"Event":"SUBMIT","FormName":"","Guid":"5207A8D8585C1EEB9AB76AFB5169C73A","HrasrCurrentNote":"","I0001Orgeh":70000001,"I0001Orgeh2ndText":"36 MYHR AUTOMATED TESTING","I0001Plans2ndText":"36 myHR Emp3 FT Perm AO5 fddsfeds","I0002Nachn":"MYHRAUTOMATED","I0002Vorna":"THREEEMP","I0006Zznum01":"","I0709PersonidExt":250004,"Pernr":"00250004","ProcessObjectGuid":"5207A8D8585C1EEB9AB76AFB5169C73A","ProcessReferenceNumber":"","RequestedFor":"1","Specialidentifier":"","Status":"","Workitem":"000001368341","ZCdCc":"2400135","ZCdCcTxt":"MACK-MGR-NURSE ADMNS","ZCdCents":"80","ZCdGtotKms":"3200","ZCdMvRego":"fgdfd","ZCdNovated":false,"ZCdReason":"654gfdgd","ZCdTotClaim":"2560","ZLocation":"2fdgfd","ZPlans":30000004,"ZRequestor":"MGR","ZVehtype":"CAR","ZWagetype":"2M42","MileageRecordSet":[{"ZCdDate":"\/Date({{$isoTimestamp}})\/","ZCdTown":"dasa","ZCdTownEnd":"32324","ZCdTotalkm":"3432.00","ZCdRetDist":"232.00","ZCdKmClaimed":"3200.00"}]}`,
          test: `
          pm.test("Work item is not Zero", function () {
            var jsonData = pm.response.json();
            pm.expect(jsonData.Workitem).not.eql("0000000000000");
        });
        `
        
        }));
      },

      onSelect: function(sId){
        this.byId(sId.toString()).setSelected(false)
      }, 
      onValidate: function () {
        if (this.byId("1").getSelected() === true) {
          this.getView().byId("success").setVisible(true);
          this.getView().byId("failure").setVisible(false);
          this._showFireworks();
          setTimeout(() => {
            document.getElementById("myFrame").style.visibility = "visible"
          }, 200)
        } else {
          this.getView().byId("failure").setVisible(true);
          this.getView().byId("success").setVisible(false);
        }
      }
    
    });
  });




