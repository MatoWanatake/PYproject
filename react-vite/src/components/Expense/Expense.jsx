import {useState} from 'react';
import {useRevalidator} from 'react-router-dom';

import './Expense.css';

function Expense() {
    //Refresh loader
    const {revalidate} = useRevalidator();

    //State
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [groupId, setGroupId] = useState("");
    const [debits, setDebits] = useState([{user_id: "", amount: ""}]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const isEmptyOrNull = (str) => {
        return !str || str.trim() === "";
    }

    const handleAddDebit = () => {
        setDebits([...debits, {user_id: "", amount: ""}]);
    };

    const handleDebitChange = (index, field, value) => {
        const updatedDebits = [...debits];
        updatedDebits[index][field] = value;
        setDebits(updatedDebits);
    };

    const handleRemoveDebit = (index) => {
        const updatedDebits = debits.filter((_, i) => i !== index);
        setDebits(updatedDebits);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage("");

        const post = {
            title,
            amount: parseFloat(amount),
            debits: debits.map((debit) => ({
                user_id: parseInt(debit.user_id),
                amount: parseFloat(debit.amount)
            }))
        }

        if (!isEmptyOrNull(groupId)) {
            post.group_id = groupId;
        }

        try {
            const response = await fetch("/api/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            });

            if (!response.ok) {
                // If the response is not ok, throw an error
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || "Failed to create expense.");
            }

            setMessage("Expense created successfully!");
            setTitle("");
            setAmount("");
            setGroupId("");
            setDebits([{user_id: "", amount: ""}]);
            revalidate();
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to create expense.");
        } finally {
            setLoading(false);
        }
    };

    //The HTML that makes up the component
    return (
        <div className="expense">
            <h1>Create Expense</h1>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        required
                        step="0.01"
                    />
                </div>
                <div>
                    <label htmlFor="groupId">Group ID (Optional)</label>
                    <input
                        type="text"
                        id="groupId"
                        value={groupId}
                        onChange={(event) => setGroupId(event.target.value)}
                    />
                </div>
                <div>
                    <h3>Debits</h3>
                    {debits.map((debit, index) => (
                        <div key={index} style={{display: "flex", gap: "10px", marginBottom: "10px"}}>
                            <input
                                type="number"
                                placeholder="User ID"
                                value={debit.user_id}
                                onChange={(event) => handleDebitChange(index, "user_id", event.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                value={debit.amount}
                                onChange={(event) => handleDebitChange(index, "amount", event.target.value)}
                                required
                                step="0.01"
                            />
                            <button type="button" onClick={() => handleRemoveDebit(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddDebit}>
                        Add Debit
                    </button>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Expense"}
                </button>
            </form>

        </div>
    );
}

export default Expense;
