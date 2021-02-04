sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
  ], function(Controller, History, UIComponent) {
    "use strict";
  
    return Controller.extend("com.myorg.myUI5App.controller.BaseController", {
  
  
      /**
       * Convenience method for getting the view model by name in every controller of the application.
       * @public
       * @param {string} sName the model name
       * @returns {sap.ui.model.Model} the model instance
       */
      getModel: function(sName) {
        return this.getView().getModel(sName);
      },
  
      /**
       * Convenience method for setting the view model in every controller of the application.
       * @public
       * @param {sap.ui.model.Model} oModel the model instance
       * @param {string} sName the model name
       * @returns {sap.ui.mvc.View} the view instance
       */
      setModel: function(oModel, sName) {
        return this.getView().setModel(oModel, sName);
      },
  
      /**
       * Convenience method for getting the resource bundle.
       * @public
       * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
       */
      getResourceBundle: function() {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle();
      },
  
      /**
       * Method for navigation to specific view
       * @public
       * @param {string} psTarget Parameter containing the string for the target navigation
       * @param {mapping} pmParameters? Parameters for navigation
       * @param {boolean} pbReplace? Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
       */
      navTo: function(psTarget, pmParameters, pbReplace) {
        this.getRouter().navTo(psTarget, pmParameters, pbReplace);
      },
  
      getRouter: function() {
        return UIComponent.getRouterFor(this);
      },
  
      onNavBack: function() {
        var sPreviousHash = History.getInstance().getPreviousHash();
  
        if (sPreviousHash !== undefined) {
          window.history.back();
        } else {
          this.getRouter().navTo("appHome", {}, true /*no history*/ );
        }
      },
      _showFireworks: function () {
        const max_fireworks = 5,
          max_sparks = 50;
        let canvas = document.getElementById("myCanvas");
        let context = canvas.getContext("2d");
        let fireworks = [];

        for (let i = 0; i < max_fireworks; i++) {
          let firework = {
            sparks: [],
          };
          for (let n = 0; n < max_sparks; n++) {
            let spark = {
              vx: Math.random() * 5 + 0.5,
              vy: Math.random() * 5 + 0.5,
              weight: Math.random() * 0.3 + 0.03,
              red: Math.floor(Math.random() * 2),
              green: Math.floor(Math.random() * 2),
              blue: Math.floor(Math.random() * 2),
            };
            if (Math.random() > 0.5) spark.vx = -spark.vx;
            if (Math.random() > 0.5) spark.vy = -spark.vy;
            firework.sparks.push(spark);
          }
          fireworks.push(firework);
          resetFirework(firework);
        }
        window.requestAnimationFrame(explode);

        function resetFirework(firework) {
          firework.x = Math.floor(Math.random() * canvas.width);
          firework.y = canvas.height;
          firework.age = 0;
          firework.phase = "fly";
        }

        function explode() {
          context.clearRect(0, 0, canvas.width, canvas.height);
          fireworks.forEach((firework, index) => {
            if (firework.phase == "explode") {
              firework.sparks.forEach((spark) => {
                for (let i = 0; i < 10; i++) {
                  let trailAge = firework.age + i;
                  let x = firework.x + spark.vx * trailAge;
                  let y =
                    firework.y +
                    spark.vy * trailAge +
                    spark.weight * trailAge * spark.weight * trailAge;
                  let fade = i * 20 - firework.age * 2;
                  let r = Math.floor(spark.red * fade);
                  let g = Math.floor(spark.green * fade);
                  let b = Math.floor(spark.blue * fade);
                  context.beginPath();
                  context.fillStyle = "rgba(" + r + "," + g + "," + b + ",1)";
                  context.rect(x, y, 4, 4);
                  context.fill();
                }
              });
              firework.age++;
              if (firework.age > 100 && Math.random() < 0.05) {
                resetFirework(firework);
              }
            } else {
              firework.y = firework.y - 10;
              for (let spark = 0; spark < 15; spark++) {
                context.beginPath();
                context.fillStyle =
                  "rgba(" + index * 50 + "," + spark * 17 + ",0,1)";
                context.rect(
                  firework.x + Math.random() * spark - spark / 2,
                  firework.y + spark * 4,
                  4,
                  4
                );
                context.fill();
              }
              if (Math.random() < 0.001 || firework.y < 200)
                firework.phase = "explode";
            }
          });
          window.requestAnimationFrame(explode);
        }
      },
  
    });
  
  });