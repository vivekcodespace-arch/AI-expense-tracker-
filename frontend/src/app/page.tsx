import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to AI Expense Tracker</h1>
      <p className="text-lg mb-8 text-gray-600">
        Manage your expenses, track your wallet, set budgets, and get AI-powered insights.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/expenses" className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-md transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Expenses</h2>
          <p>View and manage your expenses</p>
        </Link>
        <Link href="/wallet" className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-md transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Wallet</h2>
          <p>Check your balance and add money</p>
        </Link>
        <Link href="/budget" className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow-md transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Budget</h2>
          <p>Set and manage your budgets</p>
        </Link>
        <Link href="/ai" className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-lg shadow-md transition duration-300">
          <h2 className="text-xl font-semibold mb-2">AI Assistant</h2>
          <p>Get AI-powered financial advice</p>
        </Link>
      </div>
    </div>
  );
}
