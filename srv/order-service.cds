using ch.agilita.ui5sample.db as db from '../db/schema';

service SalesOrderService {
entity SalesOrders as projection on db.SalesOrders
}