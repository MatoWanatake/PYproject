import {useState} from 'react';

import './Credit.css';
import {useRevalidator} from "react-router-dom";

function Credit() {
    //Refresh loader
    const {revalidate} = useRevalidator();

    //State
    const [formData, setFormData] = useState({
        paid_to: "",
        amount: "",
        group_id: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const isEmptyOrNull = (str) => {
        return !str || str.trim() === "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const post = {
                paid_to: formData.paid_to,
                amount: formData.amount,
            }

            if (!isEmptyOrNull(formData.group_id)) {
                post.group_id = formData.group_id;
            }

            const response = await fetch("/api/expenses/credits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            });

            if (!response.ok) {
                // If the response is not ok, throw an error
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || "Failed to create credit.");
            }

            setMessage("Credit created successfully!");
            setFormData({
                paid_to: "",
                amount: "",
                group_id: "",
            });
            revalidate();
        } catch (error) {
            setMessage(error.response?.transactions?.message || "Failed to create credit.");
        } finally {
            setLoading(false);
        }
    };

    //The HTML that makes up the component
    return (
        <div className="credit">
            <h1>Create an Expense Credit</h1>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="paid_to">Paid To (User ID):</label>
                    <input
                        type="number"
                        id="paid_to"
                        name="paid_to"
                        value={formData.paid_to}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount ($):</label>
                    <input
                        type="number"
                        step="0.01"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="group_id">Group ID (Optional):</label>
                    <input
                        type="number"
                        id="group_id"
                        name="group_id"
                        value={formData.group_id}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Expense Credit"}
                </button>
            </form>
        </div>
    );
}

export default Credit;
