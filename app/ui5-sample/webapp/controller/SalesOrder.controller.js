sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ui5sample.controller.SalesOrder", {
            onInit: function () {
                this.getOwnerComponent().getRouter()
                .getRoute("SalesOrder")
                .attachPatternMatched(this._onRouteMatched, this);
            },
            async _onRouteMatched(oEvent){
            let {id} =oEvent.getParameter("arguments")
            /*If we want to stay basic only this is need */
            this.getView().bindElement(`/SalesOrders(${id})`)
            },

            onNavBack() {
                this.getOwnerComponent().getRouter().navTo("SalesOrdersList");
            },
            
            onDeleteButtonPress(){
                this.getView().getBindingContext().delete()
                this.onNavBack();
            }
        });
    });
