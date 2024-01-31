sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/MessageBox"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("ui5sample.controller.SalesOrder", {
      onInit: function () {
        this.getOwnerComponent()
          .getRouter()
          .getRoute("SalesOrder")
          .attachPatternMatched(this._onRouteMatched, this);
      },

      async _onRouteMatched(oEvent) {
        const { id } = oEvent.getParameter("arguments");

        if (!id) {
          if(this.getView().getBindingContext()){
            this.getView().getBindingContext().destroy()
          }
          
          const oView = this.getView();
          const oListBinding = oView
            .getModel()
            .bindList(`/SalesOrders`, null, /*Sorters */ [], /*Filters*/ [], {
              $$updateGroupId: "SalesOrderRecord",
            });
          oListBinding.attachCreateCompleted((oEvent) =>
            this.onSentQuery(oEvent)
          );
          const oSalesOrder = oListBinding.create();
          this.getView().setBindingContext(oSalesOrder);
          return;
        }

        const oBindingContext=this.getView().bindElement({
          path: `/SalesOrders(${id})`,
          parameters: {
            $$updateGroupId: "SalesOrderRecord",
          },
          events: { patchCompleted: (oEvent) => this.onSentQuery(oEvent) },
        });
        this.getView().setBindingContext(oBindingContext);
      },

      onNavBack() {
        this.getOwnerComponent().getRouter().navTo("SalesOrdersList");
      },

      onSaveButtonPress() {
        const oModel = this.getView().getModel();
        if (oModel.hasPendingChanges()) {
          this.getView().getModel().submitBatch("SalesOrderRecord");
        } else {
          MessageBox.error("No Pending Changes");
        }
      },
      onSentQuery(oEvent) {
        if (oEvent.getParameter("success")) {
          MessageToast.show("Saved TimeRecord Succesfully");
          this.onNavBack();
        }
        const oMessageManager = sap.ui.getCore().getMessageManager();
        const aErrors = oMessageManager.getMessageModel().getData();
        let sErrorMessage = "";
        aErrors.forEach((oError) => {
          if (oError.type !== "Error") return;
          sErrorMessage += oError.message + " \n";
        });
        oMessageManager.removeAllMessages();
        if (sErrorMessage) {
          MessageBox.error(sErrorMessage);
        }
      },

      onDeleteButtonPress() {
        this.getView().getBindingContext().delete();
        this.getView().getModel().submitBatch("SalesOrderRecord");
        this.onNavBack();
      },
    });
  }
);
