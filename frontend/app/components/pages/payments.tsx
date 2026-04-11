import style from "../../style/payments.module.css";

const paymentData = [
    {paymentNo: 1, amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 2, amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 3, amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 4, amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 5, amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 6, amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 7, amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 8, amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 9, amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 10, amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 11, amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 12, amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 13, amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 14, amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 15, amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 16, amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"},
    {paymentNo: 17, amount: 1000, dueDate: "04-01-2026", remainingBalance: 10000, status: "Paid"},
    {paymentNo: 18, amount: 1000, dueDate: "05-01-2026", remainingBalance: 9000, status: "Pending"}
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