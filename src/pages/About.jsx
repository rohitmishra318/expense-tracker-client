export default function About() {
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded shadow p-8">
      <h1 className="text-3xl font-bold mb-4">About This Expense Tracker</h1>
      <p className="mb-3">
        This project was made as a MERN (MongoDB, Express, React, Node.js) stack intern assignment to help users manage their money, analyze expenses, and track debts between friends.
      </p>
      <p className="mb-2">
        Features include secure JWT-based authentication, CRUD operations, analytics dashboard, money lending/borrowing record, and responsive design with TailwindCSS.
      </p>
      <p className="mb-4">
        The expense tracker motivates better budgeting, clarity over finances, and healthy sharing with friends.
      </p>
      <p>Thanks for using ExpenseTracker!</p>
    </div>
  );
}
