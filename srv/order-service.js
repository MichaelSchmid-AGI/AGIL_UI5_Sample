const cds = require("@sap/cds");

class OrderService extends cds.ApplicationService {
    async init() {
        await super.init();
/*         this.on("CREATE", "SalesOrder", async (req) => {
            req.data.Status = "Pending";
        }); */
    }
}
module.exports = { OrderService };