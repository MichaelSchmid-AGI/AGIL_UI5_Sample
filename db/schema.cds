using {
    cuid,
    managed
} from '@sap/cds/common';

namespace ch.agilita.ui5sample.db;

/* Naming Conventions as Reccomended by CAPire
* https://cap.cloud.sap/docs/guides/domain-modeling
* Entity Names in Plural in Uppercase (PascalCase)
* Properties in Singular in lowercase (camelCase)
*
* To prevent having translating multiple times i recommend
* setting up i18n on schema
 */

entity SalesOrders : cuid, managed {
    salesOrder       : String(10)
    @Common.Label: '{i18n>salesOrder}'
    @Core.Computed;


    salesOrderDate   : Date
    @Common.Label: '{i18n>salesOrderDate}'
    /* Input validation preventing dating back entries*/
    @assert.range: [
        $now,
        '9999-12-31'
    ];


    /*Default Value */

    salesOrderTime   : Time default $now
    @Common.Label: '{i18n>salesOrderTime}';


    salesOrderStatus : Integer @Common.Label: '{i18n>salesOrderStatus}' enum {
        submitted = 1;
        fulfilled = 2;
        shipped   = 3;
        canceled  = -1;
    };
    


    businessPartner  : String(10)
    @Common.Label: '{i18n>businessPartner}';


    salesOrg         : Integer
    @Common.Label: '{i18n>salesOrg}'
    /* Input validation to only allow a range*/
    @assert.range: [
        2100,
        2200
    ];


    /* Input validation to only allow certain values*/
    category         : String
    @Common.Label: '{i18n>category}'
    @assert.range enum {
        webshop;
        accounting;
    };
    


    assignedEmployee : String(10)
    @Common.Label: '{i18n>assignedEmployee}'
    @mandatory;


    totalAmount      : Decimal default 0.00
    @Common.Label: '{i18n>totalAmount}';

}
