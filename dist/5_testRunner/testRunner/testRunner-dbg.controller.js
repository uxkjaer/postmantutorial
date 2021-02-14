sap.ui.define(
  ["luigi/demo/common/BaseController", 'luigi/demo/libs/luigi-client/luigi-client',     "/sap/ui/model/json/JSONModel",
],
  function(Controller,client, JSONModel) {
    'use strict';

    return Controller.extend('qldh.testRunner.testRunner', {
      onInit: function(){
        this.setModel(new JSONModel({
          code: `
          {
            "Businessstatus": "",
            "ZSob": false,
            "Mgrsignonbehalftext": "I certify that the amount claimed in this request is due and payable for the expenses incurred or services rendered as specified and that this claim is in accordance with Policy C15 - Allowances. I acknowledge that the provision of false information to any questions on this request may result in the termination of my appointment. This claim is not in relation to a novated lease arrangement.",
            "Requestfor": "S",
            "Role": "",
            "ZManAppr": false,
            "MgrcertSignonbehalfComment": "",
            "ZText3months": "This claim is greater than 3 months old, please complete and attach the validation of claim older than three months form",
            "LeadObjectId": "00250004",
            "MgrcertSignonbehalfCert": false,
            "ZClaimOlderthan3months": false,
            "Comments": "",
            "LeadObjectType": "P",
            "CompanyCode": "2400",
            "Requestortype": "[{\"name\":\"MGR\",\"value\":\"Supervisor\"},{\"name\":\"EMP\",\"value\":\"Employee\"}]",
            "CentralPerson": 250004,
            "Vehtype": "[{\"name\":\"CAR\",\"value\":\"Car\"},{\"name\":\"MCYCLE\",\"value\":\"Motorcycle\"}]",
            "EffectiveDate": "/Date({{$isoTimestamp}})/",
            "Employeecertification": true,
            "Event": "SUBMIT",
            "FormName": "",
            "Guid": "{{$guid}}",
            "HrasrCurrentNote": "",
            "I0001Orgeh": 70000001,
            "I0001Orgeh2ndText": "36 MYHR AUTOMATED TESTING",
            "I0001Plans2ndText": "36 myHR Emp3 FT Perm AO5 fddsfeds",
            "I0002Nachn": "MYHRAUTOMATED",
            "I0002Vorna": "THREEEMP",
            "I0006Zznum01": "",
            "I0709PersonidExt": 250004,
            "Pernr": "00250004",
            "ProcessObjectGuid": "{{$guid}}",
            "ProcessReferenceNumber": "",
            "RequestedFor": "1",
            "Specialidentifier": "",
            "Status": "",
            "ZCdCc": "2400135",
            "ZCdCcTxt": "MACK-MGR-NURSE ADMNS",
            "ZCdCents": "80",
            "ZCdGtotKms": "8",
            "ZCdMvRego": "100zzz",
            "ZCdNovated": false,
            "ZCdReason": "Going soem where",
            "ZCdTotClaim": "6.4",
            "ZLocation": "Work",
            "ZPlans": 30000004,
            "ZRequestor": "MGR",
            "ZVehtype": "CAR",
            "ZWagetype": "2M42",
            "MileageRecordSet": [
              {
                "ZCdDate": "/Date({{$isoTimestamp}})/",
                "ZCdTown": "Hoem",
                "ZCdTownEnd": "Work",
                "ZCdTotalkm": "12.00",
                "ZCdRetDist": "4.00",
                "ZCdKmClaimed": "8.00"
              }
            ]
          }
          `,
          test: `
          pm.test('Work Item is filled out', () => {
            var jsonData = pm.response.json();
            pm.expect(jsonData.d.Workitem).not.equal("")
            pm.variables.set('Workitem', jsonData.d.Workitem)
            pm.variables.set('$guid', jsonData.d.Guid)
    })

    setTimeout(function(){}, 10000);

        `,
        latestWork: `
        pm.test("Status code is 200", function () {
          pm.response.to.have.status(200);
      });
      
      pm.test("Latest Work Item is filled out", function () {
          var jsonData = pm.response.json();
          pm.expect(jsonData[0].latestWiId).to.not.eql('');
          pm.collectionVariables.set('LatestWorkitem', jsonData[0].latestWiId)
          console.log(pm.collectionVariables.get('LatestWorkitem'))
      });`
        
        }));
      },
      
      onValidateStep1: function(){
        var validated = true;

        var checkbox = [...Array(4).keys()]
        
        checkbox.forEach((sId) => {
          sId = sId + 1
          if (this.byId(sId.toString()).getSelected() && (sId === 2 || sId === 3)){
            validated = false;
          }
        })
        this.byId("step1").setValidated(validated)
      },
      onValidate: function () {
      var text = JSON.stringify({
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body:
          "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      });
      var myText = this.getView().byId("myText").getValue();
      try {
        myText = JSON.stringify(JSON.parse(myText));
      } catch (error) {
        this.getView().byId("failure").setVisible(true);
        return;
      }

      if (myText === text) {
        this.getView().byId("success").setVisible(true);
        this.getView().byId("failure").setVisible(false);
        this._showFireworks();
        setTimeout(() => {
          document.getElementById("content").classList.add("item-fade")
        }, 200)
      } else {
        this.getView().byId("failure").setVisible(true);
        this.getView().byId("success").setVisible(false);
      }
    }
  });
}
);
