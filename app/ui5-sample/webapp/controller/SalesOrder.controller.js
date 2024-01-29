sap.ui.define(
  ["sap/ui/core/mvc/Controller","sap/m/MessageBox"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller,
	MessageBox) {
    "use strict";

    return Controller.extend("ui5sample.controller.SalesOrder", {
      onInit: function () {
        this.getOwnerComponent()
          .getRouter()
          .getRoute("SalesOrder")
          .attachPatternMatched(this._onRouteMatched, this);
      },

      async _onRouteMatched(oEvent) {
        let { id } = oEvent.getParameter("arguments");
        if (!id) {
          /* Just binding and saving the objects directly can lead to 
            unused entries stored in the database.
            To prevent this we need to use  Batchgroups
            */
          const oView = this.getView();
          const oListBinding = oView
            .getModel()
            .bindList(`/SalesOrders`, null, /*Sorters */ [], /*Filters*/ [], {
              $$updateGroupId: "SalesOrderRecord",
            });
          const oSalesOrder = oListBinding.create();
          oView.setBindingContext(oSalesOrder);
          return;
        }

        this.getView().bindElement({
          path: `/SalesOrders(${id})`,
          parameters: {
            $$updateGroupId: "SalesOrderRecord",
          },
        });
      },


      onNavBack() {
        this.getOwnerComponent().getRouter().navTo("SalesOrdersList");
      },

      onSaveButtonPress() {
        const oModel = this.getView().getModel();
        if (oModel.hasPendingChanges()) {
          this.getView().getModel().submitBatch("SalesOrderRecord").then(this.onNavBack());
        } else {
          MessageBox.error("No Pending Changes");
        }
      },

      onDeleteButtonPress() {
        this.getView().getBindingContext().delete()
        this.getView().getModel().submitBatch("SalesOrderRecord")
        this.onNavBack();
      },
    });
  }
);
