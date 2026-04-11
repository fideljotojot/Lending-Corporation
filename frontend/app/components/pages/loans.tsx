import styles from "../../style/loans.module.css"

export default function LoansPage() {
    const loanCards = [];

    const loanInfo = [
        {title: "Car Loan", description: "thiscription1"},
        {title: "Business Loan", description: "thiscription2"},
        {title: "House Loan", description: "thiscription3"},
    ]

    for (let i = 0; i < loanInfo.length; i++) {
        loanCards.push(
            <div className="data-card" key={i}>
                <h3 className={styles["title"]}>{loanInfo[i].title}</h3>
                <p>{loanInfo[i].description}</p>
            </div>
        );
    }

    return (
        <main className="wrapper">
            <div className={styles["top-div"]}>
                <h1 className="headline">
                    LOANS OVERVIEW
                </h1>
                <div className={styles["loan-container"]}>
                    {loanCards}
                </div>
            </div>
        </main>
    )
}