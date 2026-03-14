import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          AI Expense Tracker
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/expenses" className="hover:underline">
            Expenses
          </Link>
          <Link href="/wallet" className="hover:underline">
            Wallet
          </Link>
          <Link href="/budget" className="hover:underline">
            Budget
          </Link>
          <Link href="/ai" className="hover:underline">
            AI Assistant
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;