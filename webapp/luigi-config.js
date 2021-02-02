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
            viewUrl: "firstRequest/sample1.html",
          },
          {
            pathSegment: "importRequest",
            label: "Importing requests into Postman",
            category: "API Client",
            loadingIndicator: {
              enabled: false,
            },
            viewUrl: "importRequest/sample2.html",
          },
          {
            pathSegment: "step2",
            label: "Create your first test",
            icon: "paper-plane",
            viewUrl: "firstTest/sample2.html",
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
            pathSegment: "step2",
            label: "JSON Schema validations",
            icon: "paper-plane",
            viewUrl: "firstTest/sample2.html",
            category: "Writing Tests",
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
      title: "Postman",
      logo: "/logo.png",
      favicon: "/favicon.ico",
    },
    responsiveNavigation: "simpleMobileOnly",
    appLoadingIndicator: {
      hideAutomatically: true,
    },
  },
});
