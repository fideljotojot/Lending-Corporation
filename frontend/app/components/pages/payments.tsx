import style from "../../style/payments.module.css";
import { useMemo, useState, type ChangeEvent } from "react";

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

const paymentBuild = (payments: typeof paymentData) => {
    return payments.map((payment, index) => (
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
    void onPayLoan;

    const [sortOrder, setSortOrder] = useState<"current" | "previous">("current");
    const [selectedPreviousLoan, setSelectedPreviousLoan] = useState("");

    const sortedPayments = useMemo(() => {
        const sorted = [...paymentData];

        sorted.sort((a, b) => {
            if (sortOrder === "current") {
                return a.paymentNo - b.paymentNo;
            }

            return b.paymentNo - a.paymentNo;
        });

        return sorted;
    }, [sortOrder]);

    const handleCurrentSort = () => {
        setSortOrder("current");
        setSelectedPreviousLoan("");
    };

    const handlePreviousChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedPreviousLoan(event.target.value);
        setSortOrder(event.target.value ? "previous" : "current");
    };

    return (
        <main className="wrapper">
            <h1 className="page-title">Payments</h1>
            <div className={style["grid-container"]}>
                <div className={`${style["payment-card"]} data-card title`}>
                    <h2>Loan Amount</h2>
                    <h1>9000</h1>
                    <p>Personal loan</p>
                </div>
                <div className={`${style["payment-card"]} data-card title`}>
                    <h2>Interest Rate</h2>
                    <h1>5.75%</h1>
                    <p>Monthly interest</p>

                </div>
                <div className={`${style["payment-card"]} data-card title`}>
                    <h2>Outstanding Balance</h2>
                    <h1>9000</h1>
                    <p>0 payments made</p>
                </div>
                <div className={`${style["payment-card"]} data-card title`}>
                    <h2>Current Amount Due</h2>
                    <h1>900</h1>
                    <p>Monthly installment</p>
                </div>
                <div className={`${style["payment-card"]} data-card title`}>
                    <h2>Due Date</h2>
                    <h1>May 14, 2026</h1>
                    <p>31 days remaining</p>
                </div>
                <div className={`${style["payment-card"]} data-card title`}>
                    <h2>Current Payment</h2>
                    <h3>May 2026 installment</h3>
                    <p>Ref #CL-0816-01</p>
                    <button onClick={onPayLoan}>
                        <i className="fi fi-rr-right"></i>
                        <p>Pay Now</p>
                    </button>
                </div>
            </div>
            <hr className="line"/>
            <div className={`${style["row"]} title`}>
                <h2>Payment History</h2>
                <div className={style["action-div"]}>
                    <button type="button" onClick={handleCurrentSort}>Current</button>
                    <select name="previous" id="previous" value={selectedPreviousLoan} onChange={handlePreviousChange}>
                        <option value="">Previous</option>
                        <option value="#CL-0816-01">#CL-0816-01</option>
                    </select>
                </div>
            </div>
            <table className={`${style["table"]} ${["data-card"]}`}>
                <tbody>
                    {paymentBuild(sortedPayments)}
                </tbody>
            </table>
        </main>
    )
}