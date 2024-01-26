sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("ui5sample.controller.SalesOrdersList", {
      onInit: function () {
        this.getOwnerComponent()
          .getRouter()
          .getRoute("SalesOrdersList")
          .attachPatternMatched(this._onRouteMatched, this);
      },
      async _onRouteMatched(oEvent) {
        this.getView().byId("SalesOrdersList").getBinding("items").refresh();
      },
      onListItemPress(oEvent) {
        const sID = oEvent.getSource().getBindingContext().getProperty("ID");
        this.getOwnerComponent()
          .getRouter()
          .navTo("SalesOrder", {
            id: sID
          });
      },
      onCreateButtonPress() {
        const oBinding = this.getView()
          .byId("SalesOrdersList")
          .getBinding("items");
        oBinding.attachCreateCompleted(this._onSalesOrderCreated, this);
        oBinding.create();
      },
      _onSalesOrderCreated(oEvent) {
        this.getOwnerComponent()
          .getRouter()
          .navTo("SalesOrder", {
            id: oEvent.getParameters().context.getProperty("ID"),
          });
      },
    });
  }
);
