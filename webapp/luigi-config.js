//you can now use ES6 goodies here
Luigi.setConfig({
  navigation: {
    contextSwitcher: false,
    nodes: () => [
      {
        pathSegment: "home",
        label: "h",
        hideFromNav: true,
        children: [
          {
            pathSegment: "overview",
            label: "Overview",
            icon: "home",
            viewUrl: "openui5.html#/home",
          },
          {
            pathSegment: "proxy",
            label: "Set the Proxy in Postman",
            category: {
              label: "API Client",
              icon: "letter",
              collapsible: true,
            },
  

            loadingIndicator: {
              enabled: false,
            },
            viewUrl: "1_apiClient/settingProxy/sample1.html",
          },
          {
            pathSegment: "firstRequest",
            label: "Write your first API request",
            category: {
              label: "API Client",
              icon: "letter",
              collapsible: true,
            },
  

            loadingIndicator: {
              enabled: false,
            },
            viewUrl: "1_apiClient/firstRequest/sample1.html",
          },
          {
            pathSegment: "importRequest",
            label: "Importing requests into Postman",
            category: "API Client",
            loadingIndicator: {
              enabled: false,
            },
  

            viewUrl: "1_apiClient/importRequest/sample2.html",
          },
          {
            pathSegment: "firstTest",
            label: "Create your first test",
            icon: "paper-plane",
  

            viewUrl: "2_writingTests/firstTest/sample2.html",
            category: {
              label: "Writing Tests",
              icon: "target-group",
              collapsible: true,
            },
            loadingIndicator: {
              enabled: false,
            },
            
          },
          {
            pathSegment: "jsonSchema",
            label: "JSON Schema validations",
            icon: "paper-plane",
  

            viewUrl: "2_writingTests/jsonSchema/schema.html",
            category: "Writing Tests",
            loadingIndicator: {
              enabled: false,
            },
          },
            {
              pathSegment: "PreRequest",
              label: "Pre-request scripts",
              icon: "paper-plane",
    

              viewUrl: "3_preRequestScripts/preRequest/PreRequest.html",
              category: {
                label: "Pre-Request Scripts",
                icon: "arobase",
                collapsible: true,
              },
              loadingIndicator: {
                enabled: false,
              },
              
            },
            {
              pathSegment: "postRequest",
              label: "Create a post request",
              icon: "paper-plane",
              viewUrl: "3_preRequestScripts/postRequest/postRequest.html",
              category: "Pre-Request Scripts",
              loadingIndicator: {
                enabled: false,
              },
    

          },
          {
            pathSegment: "collections",
            label: "Colletions",
            icon: "paper-plane",
            viewUrl: "4_collections/collections/collection.html",
            category: {
              label: "Cross Environment",
              icon: "open-folder",
              collapsible: true,
            },
            loadingIndicator: {
              enabled: false,
            },
  

            
          },
          {
            pathSegment: "environments",
            label: "Environments",
            icon: "paper-plane",
            viewUrl: "4_collections/environments/environment.html",
            category: "Cross Environment",
            loadingIndicator: {
              enabled: false,
            },
  

          },
            {
              pathSegment: "variables",
              label: "Variables",
              icon: "paper-plane",
              viewUrl: "4_collections/variables/variables.html",
              category: "Cross Environment",
              loadingIndicator: {
                enabled: false,
              },
    
        },
        {
          pathSegment: "testRunner",
          label: "Test Runner",
          icon: "paper-plane",
          viewUrl: "5_testRunner/testRunner/testRunner.html",
          category: {
            label: "Test Runner",
            icon: "physical-activity",
            collapsible: true,
          },

          loadingIndicator: {
            enabled: false,
          },
          
        },
        ],
      },
    ],
  },
  routing: {
    /**
     * Development:
     * For path routing, set to false
     * For hash routing, set to true
     */
    useHashRouting: true,
  },
  settings: {
    header: {
      title: "Postman Tutorial",
      logo: "./menu.png",
      favicon: "./logo.png",
    },
    responsiveNavigation: "simpleMobileOnly",
    appLoadingIndicator: {
      hideAutomatically: true,
    },
  },
});
