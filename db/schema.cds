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
    @Common.Label: '{i18n>salesOrder}'
    @Core.Computed
    salesOrder       : String(10);

    @Common.Label: '{i18n>salesOrderDate}'
    /* Input validation preventing dating back entries*/
    @assert.range: [
        $now,
        '9999-12-31'
    ]
    salesOrderDate   : Date;
    
    @Common.Label: '{i18n>salesOrderTime}'
    /*Default Value */
    salesOrderTime   : Time default $now;

    @Common.Label: '{i18n>salesOrderStatus}'
    salesOrderStatus : Integer enum {
        submitted = 1;
        fulfilled = 2;
        shipped   = 3;
        canceled  = -1;
    };

    @Common.Label: '{i18n>businessPartner}'
    businessPartner  : String(10);

    @Common.Label: '{i18n>salesOrg}'
    /* Input validation to only allow a range*/
    @assert.range: [
        2100,
        2200
    ]
    salesOrg         : Integer;

    @Common.Label: '{i18n>category}'
    /* Input validation to only allow certain values*/
    @assert.range enum {
        webshop;
        accounting;
        store
    };
    category         : String(10);

    @Common.Label: '{i18n>assignedEmployee}'
    @mandatory
    assignedEmployee : String(10);

    @Common.Label: '{i18n>totalAmount}'
    totalAmount      : Decimal default 0.00;

}
