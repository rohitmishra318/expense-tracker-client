import { useEffect, useState } from "react";
import { get, EXPENSE_API } from "../services/api";
import { getToken } from "../services/auth";
import Charts from "../components/Chart";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = getToken();

  useEffect(() => {
    async function fetchExpenses() {
      setLoading(true);
      const data = await get(EXPENSE_API, token);
      setExpenses(data || []);
      setLoading(false);
    }
    fetchExpenses();
  }, [token]);

  const total = expenses.reduce((a, e) => a + Number(e.amount), 0);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <p className="mb-4 text-lg">
        Total Expenses: <b className="text-indigo-600">₹{total}</b>
      </p>

      {loading ? (
        <div className="mb-6 text-center">Loading charts...</div>
      ) : (
        <Charts expenses={expenses} />
      )}
    </div>
  );
}
