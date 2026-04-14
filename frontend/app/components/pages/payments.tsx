import style from "../../style/payments.module.css";

type PaymentsPageProps = {
    onPayLoan: () => void;
}

const paymentData = [
    {paymentNo: 1, type: "car loan", amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 2, type: "car loan", amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 3, type: "car loan", amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 4, type: "car loan", amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 5, type: "car loan", amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 6, type: "car loan", amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 7, type: "car loan", amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 8, type: "car loan", amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 9, type: "car loan", amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 10, type: "car loan", amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 11, type: "car loan", amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 12, type: "car loan", amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 13, type: "car loan", amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 14, type: "car loan", amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 15, type: "car loan", amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 16, type: "car loan", amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 17, type: "car loan", amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 18, type: "car loan", amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"}
]

const paymentBuild = () => {
    return paymentData.map((payment, index) => (
        <tr key={index}>
            <td>{payment.paymentNo}</td>
            <td>{payment.type}</td>
            <td>{payment.amount}</td>
            <td>{payment.dueDate}</td>
            <td>{payment.remainingBalance}</td>
            <td>{payment.status}</td>
        </tr>
    ))
}

export default function PaymentsPage({onPayLoan} : PaymentsPageProps) {
    return (
        <main className="wrapper">
            <div className={style["title-div"]}>
                <h1 className="welcome">Payment History</h1>
                <button onClick={onPayLoan}>Pay Loan</button>
            </div>
                <div className={style["title-row"]}>
                    <h1 className="headline">Current Loan</h1>
                    <p className={style["loan-type"]}>(Car Loan)</p>
                </div>
            <table className={`${style["table"]} ${["data-card"]}`}>
                <thead>
                    <tr>
                        <th>Payment No.</th>
                        <th>Loan Type</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Remaining Balance</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentBuild()}
                </tbody>
            </table>
        </main>
    )
}