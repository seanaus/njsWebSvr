class Totals {
    constructor(
        vatMetric = 0,
        exVat = 0,
        incVat = 0,
        count = 0
    ) {
        this.vatMetric = vatMetric;
        this.exVat = exVat;
        this.incVat = incVat;
        this.count = count;
    }
}
module.exports = Totals