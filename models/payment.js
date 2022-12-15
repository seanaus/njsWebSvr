class Payment {
    constructor(
        cardNo = "",
        nameOnCard = "",
        csv = "",
        expiryDate = "",
        completed = ""

    ) {
        this.cardNo = cardNo;
        this.nameOnCard = nameOnCard;
        this.csv = csv;
        this.expiryDate = expiryDate;
        this.completed = completed;
    }

}
module.exports = Payment