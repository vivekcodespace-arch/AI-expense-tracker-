import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
            AI Expense Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Take control of your finances with intelligent expense tracking, smart budgeting, and AI-powered insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Link
            href="/expenses"
            className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-white/20 transform hover:scale-105 hover:-rotate-2 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '0ms' }}
          >
            <div className="text-center">
              <div className="text-5xl mb-4 group-hover:animate-bounce">💳</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Expenses</h2>
              <p className="text-gray-600">Track and manage all your expenses with ease</p>
            </div>
          </Link>

          <Link
            href="/wallet"
            className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-white/20 transform hover:scale-105 hover:rotate-1 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            <div className="text-center">
              <div className="text-5xl mb-4 group-hover:animate-bounce">💰</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Wallet</h2>
              <p className="text-gray-600">Monitor your balance and manage funds</p>
            </div>
          </Link>

          <Link
            href="/budget"
            className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-white/20 transform hover:scale-105 hover:-rotate-1 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '400ms' }}
          >
            <div className="text-center">
              <div className="text-5xl mb-4 group-hover:animate-bounce">📊</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Budget</h2>
              <p className="text-gray-600">Set goals and track your spending limits</p>
            </div>
          </Link>

          <Link
            href="/ai"
            className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-white/20 transform hover:scale-105 hover:rotate-2 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '600ms' }}
          >
            <div className="text-center">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🤖</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">AI Assistant</h2>
              <p className="text-gray-600">Get intelligent financial insights and advice</p>
            </div>
          </Link>
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our AI Expense Tracker?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Smart Tracking</h4>
                <p className="text-gray-600">Automatically categorize and analyze your spending patterns</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📈</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Budget Management</h4>
                <p className="text-gray-600">Set and monitor budgets with intelligent alerts</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🧠</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">AI Insights</h4>
                <p className="text-gray-600">Get personalized financial advice powered by AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
