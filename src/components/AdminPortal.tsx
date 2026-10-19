import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  LogOut,
  ArrowLeft,
  Key,
  Activity,
  Trash2,
  RefreshCw,
  Lock,
  UserCheck,
  AlertTriangle,
  Users,
  Search,
  Filter,
  Download,
  Mail,
  CheckCircle2,
  XCircle,
  Eye,
  X,
} from 'lucide-react';
import {
  getAllCustomers,
  updateCustomerStatus,
  deleteCustomer,
  getAuditLogs,
  clearAuditLogs,
  type User,
  type AuthSession,
  type SecurityAuditLog,
} from '../services/authService';

interface AdminPortalProps {
  session: AuthSession | null;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  session,
  onLogout,
  onNavigateHome,
}) => {
  const [activeTab, setActiveTab] = useState<'customers' | 'security' | 'system'>('customers');
  const [customers, setCustomers] = useState<User[]>([]);
  const [logs, setLogs] = useState<SecurityAuditLog[]>([]);
  const [copiedToken, setCopiedToken] = useState(false);

  // Search & Filters for Customers
  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState<'all' | 'google' | 'email' | 'apple'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  // Customer Detail Modal
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);

  const refreshData = () => {
    setCustomers(getAllCustomers());
    setLogs(getAuditLogs());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleCopyToken = () => {
    if (session?.token) {
      navigator.clipboard.writeText(session.token);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear the security audit logs?')) {
      clearAuditLogs();
      refreshData();
    }
  };

  const handleToggleCustomerStatus = (user: User) => {
    if (user.role === 'admin') {
      alert('Administrator accounts cannot be suspended.');
      return;
    }
    const nextStatus = user.status === 'active' ? 'suspended' : 'active';
    if (window.confirm(`Are you sure you want to change ${user.name}'s status to ${nextStatus.toUpperCase()}?`)) {
      updateCustomerStatus(user.id, nextStatus);
      refreshData();
      if (selectedCustomer?.id === user.id) {
        setSelectedCustomer({ ...user, status: nextStatus });
      }
    }
  };

  const handleDeleteCustomer = (user: User) => {
    if (user.role === 'admin') {
      alert('Cannot delete the root administrator account.');
      return;
    }
    if (window.confirm(`Permanently delete customer "${user.name}" (${user.email})?`)) {
      deleteCustomer(user.id);
      refreshData();
      if (selectedCustomer?.id === user.id) {
        setSelectedCustomer(null);
      }
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Provider', 'Status', 'Logins', 'Created At', 'Last Login'];
    const rows = filteredCustomers.map((c) => [
      c.id,
      `"${c.name}"`,
      c.email,
      c.role,
      c.provider,
      c.status,
      c.loginCount || 1,
      c.createdAt,
      c.lastLogin || 'Never',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kiyoki_customers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTimestamp = (ts: number | string | undefined) => {
    if (!ts) return 'Never';
    const d = new Date(ts);
    return (
      d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
      ' · ' +
      d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    );
  };

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q);
      const matchesProvider = providerFilter === 'all' || c.provider === providerFilter;
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchesSearch && matchesProvider && matchesStatus;
    });
  }, [customers, searchQuery, providerFilter, statusFilter]);

  // Key stats
  const googleUsersCount = customers.filter((c) => c.provider === 'google').length;
  const emailUsersCount = customers.filter((c) => c.provider === 'email').length;
  const activeCount = customers.filter((c) => c.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* TOP ADMIN HEADER BAR */}
      <header className="border-b border-gray-800 bg-gray-900/90 backdrop-blur sticky top-0 z-30 px-6 sm:px-10 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-wide text-base">KIYOKI ADMIN CONSOLE</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-400 text-gray-950 uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Live Customer Directory & Security Infrastructure
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-red-300 hover:text-white bg-red-950/50 hover:bg-red-900/60 border border-red-800/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ADMIN NAVIGATION TABS */}
      <div className="border-b border-gray-800 bg-gray-900/40 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          <button
            onClick={() => setActiveTab('customers')}
            className={`py-3.5 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'customers'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customers ({customers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3.5 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'security'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Security Audit Logs ({logs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`py-3.5 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'system'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>System Health</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto w-full px-6 sm:px-10 py-8 flex-1 space-y-6">
        {/* =========================================================================
            TAB 1: CUSTOMERS DIRECTORY (PRIMARY REQUESTED SECTION)
            ========================================================================= */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-fade-in">
            {/* STAT CARDS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Customers */}
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Total Registered</span>
                  <Users className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-2xl font-bold text-white">{customers.length}</div>
                <p className="text-[11px] text-gray-400 mt-1">Users & Admins in database</p>
              </div>

              {/* Google OAuth Customers */}
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Google Sign-Ins</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <div className="text-2xl font-bold text-white">{googleUsersCount}</div>
                <p className="text-[11px] text-gray-400 mt-1">Authenticated via Google OAuth</p>
              </div>

              {/* Email/Password Customers */}
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Email Sign-Ups</span>
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white">{emailUsersCount}</div>
                <p className="text-[11px] text-gray-400 mt-1">Standard email registration</p>
              </div>

              {/* Active Accounts */}
              <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Active Accounts</span>
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white">{activeCount}</div>
                <p className="text-[11px] text-emerald-400 mt-1">100% security verified</p>
              </div>
            </div>

            {/* CONTROLS BAR: SEARCH, FILTERS & EXPORT */}
            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, or user ID..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter by Provider */}
                <div className="flex items-center gap-1.5 bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-gray-300">
                  <Filter className="w-3.5 h-3.5 text-gray-400" />
                  <select
                    value={providerFilter}
                    onChange={(e) => setProviderFilter(e.target.value as any)}
                    className="bg-transparent border-none text-xs text-gray-200 focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-gray-900">All Providers</option>
                    <option value="google" className="bg-gray-900">Google OAuth</option>
                    <option value="email" className="bg-gray-900">Email & Password</option>
                    <option value="apple" className="bg-gray-900">Apple ID</option>
                  </select>
                </div>

                {/* Filter by Status */}
                <div className="flex items-center gap-1.5 bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-gray-300">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="bg-transparent border-none text-xs text-gray-200 focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-gray-900">All Status</option>
                    <option value="active" className="bg-gray-900">Active</option>
                    <option value="suspended" className="bg-gray-900">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Right: Export & Refresh */}
              <div className="flex items-center gap-2">
                <button
                  onClick={refreshData}
                  className="p-2 text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Refresh customer database"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sync</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 text-gray-950 font-semibold bg-amber-400 hover:bg-amber-300 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  title="Export customer list to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* CUSTOMER DIRECTORY TABLE */}
            <div className="rounded-2xl bg-gray-900/80 border border-gray-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-950/70 text-gray-400 uppercase tracking-wider text-[10px] border-b border-gray-800">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Customer Details</th>
                      <th className="py-3.5 px-4 font-semibold">Email</th>
                      <th className="py-3.5 px-4 font-semibold">Sign-In Method</th>
                      <th className="py-3.5 px-4 font-semibold">Role</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold">Logins</th>
                      <th className="py-3.5 px-4 font-semibold">Last Login</th>
                      <th className="py-3.5 px-4 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/80 text-gray-300">
                    {filteredCustomers.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-gray-500 font-sans">
                          No customer records found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredCustomers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-850/60 transition-colors group cursor-pointer"
                          onClick={() => setSelectedCustomer(user)}
                        >
                          {/* Customer Name & Avatar */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              {user.avatarUrl ? (
                                <img
                                  src={user.avatarUrl}
                                  alt={user.name}
                                  className="w-8 h-8 rounded-full object-cover border border-gray-700"
                                />
                              ) : (
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                  user.role === 'admin'
                                    ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40'
                                    : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                                }`}>
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <p className="font-semibold text-white leading-tight">{user.name}</p>
                                <span className="font-mono text-[10px] text-gray-500">{user.id}</span>
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="py-3.5 px-4 font-mono text-gray-200">
                            {user.email}
                          </td>

                          {/* Provider */}
                          <td className="py-3.5 px-4">
                            {user.provider === 'google' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-950/60 text-blue-400 border border-blue-800/50">
                                <svg className="w-3 h-3" viewBox="0 0 24 24">
                                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                                </svg>
                                <span>Google OAuth</span>
                              </span>
                            ) : user.provider === 'apple' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-800 text-gray-300 border border-gray-700">
                                <span> Apple ID</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-800/80 text-gray-300 border border-gray-700">
                                <Mail className="w-3 h-3 text-gray-400" />
                                <span>Email & Password</span>
                              </span>
                            )}
                          </td>

                          {/* Role */}
                          <td className="py-3.5 px-4 uppercase text-[10px] tracking-wider font-semibold">
                            {user.role === 'admin' ? (
                              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30">
                                Administrator
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-700/40">
                                Customer
                              </span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            {user.status === 'active' ? (
                              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Active</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] text-red-400 font-medium">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Suspended</span>
                              </span>
                            )}
                          </td>

                          {/* Login Count */}
                          <td className="py-3.5 px-4 font-mono text-[11px] text-gray-400">
                            <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                              {user.loginCount || 1}
                            </span>
                          </td>

                          {/* Last Login */}
                          <td className="py-3.5 px-4 text-gray-400 text-[11px]">
                            {formatTimestamp(user.lastLogin)}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedCustomer(user)}
                                className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                                title="View customer details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {user.role !== 'admin' && (
                                <>
                                  <button
                                    onClick={() => handleToggleCustomerStatus(user)}
                                    className={`p-1.5 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer ${
                                      user.status === 'active' ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-400 hover:text-emerald-300'
                                    }`}
                                    title={user.status === 'active' ? 'Suspend account' : 'Activate account'}
                                  >
                                    {user.status === 'active' ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                  </button>

                                  <button
                                    onClick={() => handleDeleteCustomer(user)}
                                    className="p-1.5 hover:bg-red-950/60 text-red-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer"
                                    title="Delete customer record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: REAL-TIME SECURITY AUDIT LOGS
            ========================================================================= */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-2xl bg-gray-900/80 border border-gray-800 overflow-hidden shadow-xl">
              <div className="p-5 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <h3 className="font-semibold text-white text-sm">Real-Time Security Audit Logs</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={refreshData}
                    className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-xs flex items-center gap-1 cursor-pointer"
                    title="Refresh logs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                  <button
                    onClick={handleClearLogs}
                    className="p-1.5 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition-colors text-xs flex items-center gap-1 cursor-pointer"
                    title="Clear logs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-950/70 text-gray-400 uppercase tracking-wider text-[10px] border-b border-gray-800">
                    <tr>
                      <th className="py-3 px-4">Event Type</th>
                      <th className="py-3 px-4">Account / Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Details</th>
                      <th className="py-3 px-4 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-mono text-gray-300">
                    {logs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500 font-sans">
                          No security audit logs recorded yet.
                        </td>
                      </tr>
                    ) : (
                      logs.map((log) => {
                        let badgeClass = 'bg-gray-800 text-gray-300';
                        if (log.event === 'LOGIN_SUCCESS') {
                          badgeClass = 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/40';
                        } else if (log.event === 'LOGIN_FAILED') {
                          badgeClass = 'bg-amber-950/80 text-amber-400 border border-amber-700/40';
                        } else if (log.event === 'ACCOUNT_LOCKED') {
                          badgeClass = 'bg-red-950/80 text-red-400 border border-red-700/40';
                        } else if (log.event === 'REGISTER_SUCCESS') {
                          badgeClass = 'bg-sky-950/80 text-sky-400 border border-sky-700/40';
                        }

                        return (
                          <tr key={log.id} className="hover:bg-gray-850/50 transition-colors">
                            <td className="py-3 px-4 font-sans">
                              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${badgeClass}`}>
                                {log.event}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-white font-medium truncate max-w-[200px]">
                              {log.email}
                            </td>
                            <td className="py-3 px-4 uppercase text-[11px] text-gray-400">
                              {log.role}
                            </td>
                            <td className="py-3 px-4 font-sans text-gray-300 truncate max-w-[340px]">
                              {log.details}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-400 text-[11px]">
                              {formatTimestamp(log.timestamp)}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: SYSTEM HEALTH & CRYPTOGRAPHIC SESSION STATUS
            ========================================================================= */}
        {activeTab === 'system' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Active Admin Identity */}
              <div className="rounded-2xl bg-gray-900/80 border border-gray-800 p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Active Administrator</span>
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white truncate">
                    {session?.user.name || 'Administrator'}
                  </h3>
                  <p className="text-xs text-amber-300 font-mono mt-0.5 truncate">
                    {session?.user.email || 'admin@kiyoki.com'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Access Level</span>
                  <span className="text-emerald-400 font-medium">Full System (Root Admin)</span>
                </div>
              </div>

              {/* Cryptographic Session Token */}
              <div className="rounded-2xl bg-gray-900/80 border border-gray-800 p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Cryptographic Token (SHA-256)</span>
                    <Key className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="font-mono text-xs bg-gray-950 px-3 py-2 rounded-lg text-gray-300 border border-gray-850 break-all select-all flex items-center justify-between">
                    <span className="truncate pr-2">
                      {session?.token ? session.token.substring(0, 24) + '...' : 'Inactive'}
                    </span>
                    <button
                      onClick={handleCopyToken}
                      className="text-[10px] text-amber-400 hover:text-amber-300 shrink-0 font-sans cursor-pointer"
                    >
                      {copiedToken ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Session Duration</span>
                  <span className="text-gray-300">24 Hours (Rolling)</span>
                </div>
              </div>

              {/* Brute-Force & Security Health */}
              <div className="rounded-2xl bg-gray-900/80 border border-gray-800 p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Brute-Force Shield</span>
                    <Activity className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-semibold text-white">Active Protection</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Rate limiting, 5-attempt lockout, and audit trails active.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Logged Events</span>
                  <span className="text-gray-200 font-mono font-medium">{logs.length} entries</span>
                </div>
              </div>
            </div>

            {/* NOTICE CARD */}
            <div className="rounded-2xl bg-amber-400/5 border border-amber-400/20 p-5 text-amber-200 text-xs sm:text-sm flex items-start gap-3.5">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">
                  Real-time Customer & Authentication Synchronization
                </p>
                <p className="text-amber-200/80 text-xs mt-1 leading-relaxed">
                  Every customer who registers or signs in via Google OAuth, Apple ID, or Email is captured in real-time.
                  Customer profiles, total login frequency, and account statuses are persisted and instantly manageable.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          CUSTOMER DETAIL MODAL
          ========================================================================= */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-gray-900 rounded-3xl border border-gray-800 p-6 shadow-2xl relative text-gray-100 animate-scale-up">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 pb-5 border-b border-gray-800">
              {selectedCustomer.avatarUrl ? (
                <img
                  src={selectedCustomer.avatarUrl}
                  alt={selectedCustomer.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-700"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center text-xl font-bold">
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-white">{selectedCustomer.name}</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{selectedCustomer.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                    selectedCustomer.role === 'admin'
                      ? 'bg-amber-400/20 text-amber-400'
                      : 'bg-emerald-950/60 text-emerald-400'
                  }`}>
                    {selectedCustomer.role}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                    selectedCustomer.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-800/60">
                <span className="text-gray-400">Account ID</span>
                <span className="font-mono text-gray-200">{selectedCustomer.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800/60">
                <span className="text-gray-400">Authentication Provider</span>
                <span className="text-gray-200 font-semibold uppercase">{selectedCustomer.provider}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800/60">
                <span className="text-gray-400">Total Logins</span>
                <span className="font-mono text-amber-400 font-bold">{selectedCustomer.loginCount || 1}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800/60">
                <span className="text-gray-400">Account Created</span>
                <span className="text-gray-300">{formatTimestamp(selectedCustomer.createdAt)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400">Most Recent Login</span>
                <span className="text-gray-300">{formatTimestamp(selectedCustomer.lastLogin)}</span>
              </div>
            </div>

            {selectedCustomer.role !== 'admin' && (
              <div className="pt-4 border-t border-gray-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleToggleCustomerStatus(selectedCustomer)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    selectedCustomer.status === 'active'
                      ? 'bg-amber-950/60 text-amber-300 hover:bg-amber-900/60 border border-amber-800/40'
                      : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-800/40'
                  }`}
                >
                  {selectedCustomer.status === 'active' ? 'Suspend Customer' : 'Activate Customer'}
                </button>
                <button
                  onClick={() => handleDeleteCustomer(selectedCustomer)}
                  className="px-4 py-2 rounded-xl bg-red-950/60 text-red-300 hover:bg-red-900/60 border border-red-800/40 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
