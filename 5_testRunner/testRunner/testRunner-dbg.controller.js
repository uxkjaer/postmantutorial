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
            "Workitem":"{{Workitem}}",
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

        manager: `
        
        let headers = {};
        headers['Authorization'] =  'Basic ' + btoa('250001' + ":" + 'Myhr1234');
        headers['x-csrf-token'] = 'fetch';
        const echoPostRequest = {
          url: 'https://myhr-dev.health.qld.gov.au/sap/opu/odata/sap/ZHR_MV_ALLOW_CLAIM_SRV/hasValidWagetypes?sap-client=120&saml2=disabled',
          method: 'GET',
          header: headers,
        };
        pm.sendRequest(echoPostRequest, function (err, res) {
          let token = res.headers.find((oHeader) => oHeader.key === 'x-csrf-token')
          pm.collectionVariables.set('csrf-token', token.value)
        });
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
      });`,
      instanceID: `        pm.test('Work Item is filled out', () => {
        var jsonData = pm.response.json();
        pm.variables.set('Workitem', jsonData.d.InstanceID)
     
})`
     
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
        if (this.byId("b").getSelected() === true) {
          
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
      },

      onSelect: function(sId){
        this.byId(sId.toString()).setSelected(false)
      }, 
  });
}
);
