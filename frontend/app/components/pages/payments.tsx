import style from "../../style/payments.module.css";

const paymentData = [
    {paymentNo: 1, amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 2, amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"}
]

const paymentBuild = () => {
    return paymentData.map((payment, index) => (
        <tr key={index}>
            <td>{payment.paymentNo}</td>
            <td>{payment.amount}</td>
            <td>{payment.dueDate}</td>
            <td>{payment.remainingBalance}</td>
            <td>{payment.status}</td>
        </tr>
    ))
}

export default function PaymentsPage() {
    return (
        <main className="wrapper">
            <table className={`${style["table"]} ${["data-card"]}`}>
                <thead>
                    <tr>
                        <th>Payment No.</th>
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