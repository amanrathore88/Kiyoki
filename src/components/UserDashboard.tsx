import React from 'react';
import { Package, MapPin, Shield, LogOut, ArrowLeft, ShoppingBag } from 'lucide-react';
import { type AuthSession } from '../services/authService';

interface UserDashboardProps {
  session: AuthSession | null;
  onLogout: () => void;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  session,
  onLogout,
  onNavigateHome,
  onNavigateShop,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header Banner */}
      <div className="bg-white border-b border-gray-200 py-10 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-400 to-sky-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {session?.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {session?.user.name || 'Valued Member'}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Verified Member
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {session?.user.email} &bull; Member since 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateShop}
              className="px-4 py-2 rounded-full bg-sky-brand text-white font-medium text-xs hover:bg-sky-600 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Shop Purifiers</span>
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-medium text-xs hover:bg-gray-100 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent Orders Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-1">Recent Orders</h3>
              <p className="text-xs text-gray-500">
                You currently have no active purifiers or filter orders.
              </p>
            </div>
            <button
              onClick={onNavigateShop}
              className="mt-6 text-xs font-semibold text-sky-brand hover:text-sky-600 flex items-center gap-1"
            >
              <span>Explore Kiyoki Store</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Delivery Addresses */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-1">Saved Addresses</h3>
              <p className="text-xs text-gray-500">
                Manage your primary home and office delivery addresses.
              </p>
            </div>
            <span className="mt-6 text-xs text-gray-400">
              Primary address configured at checkout
            </span>
          </div>

          {/* Security & Password */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-1">Account Security</h3>
              <p className="text-xs text-gray-500">
                Two-Factor and cryptographic session active.
              </p>
            </div>
            <span className="mt-6 text-xs text-emerald-600 font-medium flex items-center gap-1">
              &bull; Session secured
            </span>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-10">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Kiyoki Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
