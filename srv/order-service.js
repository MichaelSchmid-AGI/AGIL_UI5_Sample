const cds = require("@sap/cds");

class OrderService extends cds.ApplicationService {
  async init() {
    const { SalesOrders } = this.entities;
    this.before("CREATE", SalesOrders, async (req) => {
      const oResult = await SELECT.one
        .from(SalesOrders)
        .columns("salesOrder")
        .orderBy("salesOrder desc");
      req.data.salesOrderDate=new Date()
      req.data.salesOrder = (oResult?.salesOrder || 0) + 1;
    });

    await super.init();
  }
}
module.exports = { OrderService };
