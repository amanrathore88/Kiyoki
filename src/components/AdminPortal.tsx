import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  ShoppingBag,
  Receipt,
  Users,
  FileText,
  Settings,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  ArrowLeft,
  ChevronRight,
  MoreHorizontal,
  Calendar,
  Download,
  RefreshCw,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  PlusCircle,
  Filter,
  Mail,
  ShieldCheck,
  TrendingUp,
  Wind,
  Menu,
} from 'lucide-react';
import {
  getAllCustomers,
  updateCustomerStatus,
  deleteCustomer,
  createCustomerByAdmin,
  getAuditLogs,
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
  // Navigation State
  const [activeNav, setActiveNav] = useState<
    'dashboard' | 'products' | 'category' | 'inventory' | 'orders' | 'purchases' | 'customers' | 'invoices' | 'settings'
  >('dashboard');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customers, setCustomers] = useState<User[]>([]);
  const [logs, setLogs] = useState<SecurityAuditLog[]>([]);

  // Search & Filter state for Customers
  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState<'all' | 'google' | 'email' | 'apple'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  // Customer Modals
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustProvider, setNewCustProvider] = useState<'email' | 'google' | 'apple'>('email');

  // Basic Info Form Demo State
  const [invoiceNumber] = useState('INV-2493');
  const [invoiceDate] = useState('04 Sep 2026');
  const [dueDate] = useState('10 Sep 2026');
  const [copyEmails, setCopyEmails] = useState<string[]>([
    'amanrathore88@gmail.com',
    'alex.morgan.tech@gmail.com',
  ]);
  const [newCopyInput, setNewCopyInput] = useState('');

  const refreshData = () => {
    setCustomers(getAllCustomers());
    setLogs(getAuditLogs());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleToggleCustomerStatus = (user: User) => {
    if (user.role === 'admin') {
      alert('Root administrator account cannot be suspended.');
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
    if (window.confirm(`Permanently delete customer record for "${user.name}" (${user.email})?`)) {
      deleteCustomer(user.id);
      refreshData();
      if (selectedCustomer?.id === user.id) {
        setSelectedCustomer(null);
      }
    }
  };

  const handleCreateCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustEmail || !newCustEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!newCustName.trim()) {
      alert('Please enter a full name.');
      return;
    }

    const res = createCustomerByAdmin({
      name: newCustName.trim(),
      email: newCustEmail.trim().toLowerCase(),
      provider: newCustProvider,
      role: 'user',
    });

    if (res.success) {
      refreshData();
      setShowAddCustomerModal(false);
      setNewCustName('');
      setNewCustEmail('');
      alert(`Customer "${res.user?.name}" successfully registered into database!`);
    } else {
      alert(res.error || 'Failed to create customer.');
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

  // Sample order transactions matching reference table
  const sampleOrders = [
    {
      id: 'ord_01',
      name: 'Kathryn Murphy',
      role: 'Kiyoki Pro Office 70',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      qty: 1,
      price: '$50.00',
      tax: '$30.00',
      total: '$63.00',
    },
    {
      id: 'ord_02',
      name: 'Floyd Miles',
      role: 'Kiyoki Home Living 45',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      qty: 1,
      price: '$60.00',
      tax: '$30.00',
      total: '$93.00',
    },
    {
      id: 'ord_03',
      name: 'Darrell Steward',
      role: 'True HEPA H13 Filter Replacements',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      qty: 2,
      price: '$30.00',
      tax: '$30.00',
      total: '$88.00',
    },
    {
      id: 'ord_04',
      name: 'Savannah Nguyen',
      role: 'Kiyoki Compact Bedroom 25',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80',
      qty: 1,
      price: '$90.00',
      tax: '$30.00',
      total: '$37.00',
    },
    {
      id: 'ord_05',
      name: 'Annette Black',
      role: 'Carbon Pre-Filter Pack (3x)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      qty: 1,
      price: '$80.00',
      tax: '$30.00',
      total: '$83.00',
    },
    {
      id: 'ord_06',
      name: 'Marvin McKinney',
      role: 'Kiyoki Ultra Pure Commercial 120',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80',
      qty: 1,
      price: '$50.00',
      tax: '$30.00',
      total: '$73.00',
    },
    {
      id: 'ord_07',
      name: 'Wade Warren',
      role: 'Air Quality Sensor Accessory Kit',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80',
      qty: 1,
      price: '$60.00',
      tax: '$30.00',
      total: '$83.00',
    },
  ];

  const handleNavClick = (navId: typeof activeNav) => {
    setActiveNav(navId);
    setMobileMenuOpen(false);
    if (navId === 'customers') {
      const el = document.getElementById('customers-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  interface NavItem {
    id: typeof activeNav;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    hasSub?: boolean;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, hasSub: true },
    { id: 'category', label: 'Category', icon: FolderTree },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'purchases', label: 'Purchases', icon: Receipt },
    { id: 'customers', label: 'Customers', icon: Users, badge: customers.length },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf7f2] via-[#f7f3eb] to-[#f4eee2] text-stone-900 font-sans flex antialiased selection:bg-[#fae8c8] selection:text-stone-950">
      {/* =========================================================================
          LEFT SIDEBAR NAVIGATION (Exact layout, minimalist aesthetic & cream theme)
          ========================================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-md border-r border-stone-200/80 p-5 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Logo & Title */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-150">
            <div className="flex items-center gap-3">
              {/* Rounded Brand Icon */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#eddcb9] via-[#fae8c8] to-[#f4d693] flex items-center justify-center text-stone-900 shadow-xs border border-amber-300/40">
                <Wind className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <span className="font-extrabold text-stone-950 tracking-tight text-lg">Kiyoki</span>
                <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fae8c8] text-amber-950 border border-amber-300/50 uppercase tracking-wider">
                  Admin
                </span>
              </div>
            </div>

            {/* Close button on mobile */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 text-stone-400 hover:text-stone-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Heading */}
          <div className="mt-6 mb-2 px-3">
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
              General
            </span>
          </div>

          {/* Navigation Menu List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full py-2.5 px-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer text-sm ${
                    isActive
                      ? 'bg-gradient-to-r from-[#fae8c8] via-[#f7dda3] to-[#efc574] text-stone-950 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100/70 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-white/80 text-stone-950 shadow-xs'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      <Icon className="w-4 h-4 stroke-[1.9]" />
                    </div>
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge !== undefined && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-stone-950 text-white' : 'bg-stone-200 text-stone-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.hasSub && (
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-stone-200/80 space-y-2">
          <button
            onClick={onNavigateHome}
            className="w-full py-2.5 px-3.5 rounded-2xl text-xs font-semibold text-stone-700 hover:text-stone-950 hover:bg-stone-100/80 flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Storefront</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full py-2.5 px-3.5 rounded-2xl text-xs font-semibold text-red-600 hover:bg-red-50/80 flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* =========================================================================
          MAIN APPLICATION VIEW
          ========================================================================= */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* TOP HEADER BAR (Matching reference layout) */}
        <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-stone-200/80 px-6 sm:px-9 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Greeting */}
            <h1 className="text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
              Welcome! 👋
            </h1>
          </div>

          {/* Center Search Capsule */}
          <div className="hidden sm:flex items-center">
            <div className="rounded-full bg-white border border-stone-200/80 px-4 py-2 flex items-center justify-between w-64 md:w-80 shadow-xs focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-200/50 transition-all">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs text-stone-800 placeholder-stone-400 focus:outline-none"
              />
              <Search className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
            </div>
          </div>

          {/* Right Utility Cluster: Notification, Light Toggle, Profile */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              onClick={() => alert('All air purifiers and systems operating within normal parameters.')}
              className="w-10 h-10 rounded-full bg-white border border-stone-200/80 flex items-center justify-center text-stone-600 hover:text-black shadow-xs cursor-pointer relative transition-transform active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-2.5 right-2.5" />
            </button>

            {/* Light / Dark Mode Toggle Capsule */}
            <div className="rounded-full bg-white border border-stone-200/80 p-1 flex items-center gap-1 shadow-xs">
              <button
                className="w-7 h-7 rounded-full bg-[#fae8c8] text-amber-950 flex items-center justify-center shadow-xs"
                title="Light Cream Mode Active"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => alert('Currently displaying custom Luxury Cream Palette.')}
                className="w-7 h-7 rounded-full text-stone-400 hover:text-stone-700 flex items-center justify-center"
                title="Dark theme"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Admin Profile Chip */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-stone-200">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Admin Darina"
                className="w-9 h-9 rounded-full object-cover border border-amber-300/50 shadow-xs"
              />
              <div className="hidden lg:block text-left leading-tight">
                <p className="text-xs font-bold text-stone-900">{session?.user.name || 'Darina'}</p>
                <p className="text-[10px] text-stone-400 font-medium">UI/UX & Root Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <main className="p-6 sm:p-9 space-y-8 flex-1">
          {/* Active Module Indicator Banner for secondary tabs */}
          {activeNav !== 'dashboard' && activeNav !== 'customers' && (
            <div className="bg-[#fae8c8]/60 border border-amber-300/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-amber-950 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="font-bold capitalize text-stone-950">{activeNav} Section</span>
                <span className="text-stone-600">— Dedicated module frame ready for subsequent configuration. Displaying operations dashboard below.</span>
              </div>
              <button
                onClick={() => setActiveNav('dashboard')}
                className="underline font-bold text-amber-950 hover:text-black cursor-pointer self-start sm:self-auto"
              >
                Return to Dashboard
              </button>
            </div>
          )}

          {/* =====================================================================
              1. DASHBOARD TOP METRICS & STATS
              ===================================================================== */}
          <section className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Revenue */}
              <div className="rounded-[24px] bg-white border border-stone-200/70 p-5 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span>Gross Sales</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200/60">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-stone-950 tracking-tight">$148,920</div>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-600 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+14.2% from last month</span>
                </div>
              </div>

              {/* Card 2: Units Deployed */}
              <div className="rounded-[24px] bg-white border border-stone-200/70 p-5 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span>Active Purifiers</span>
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center border border-sky-200/60">
                    <Wind className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-stone-950 tracking-tight">1,428 units</div>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-stone-500">
                  <span>99.8% filtration uptime</span>
                </div>
              </div>

              {/* Card 3: Customers */}
              <div className="rounded-[24px] bg-white border border-stone-200/70 p-5 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span>Total Customers</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200/60">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-stone-950 tracking-tight">{customers.length}</div>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Synchronized real-time</span>
                </div>
              </div>

              {/* Card 4: Security Health */}
              <div className="rounded-[24px] bg-white border border-stone-200/70 p-5 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span>Zero-Trust Shield</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center border border-purple-200/60">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-stone-950 tracking-tight">Protected</div>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-stone-500">
                  <span>SHA-256 · {logs.length} audit logs</span>
                </div>
              </div>
            </div>

            {/* TWO-COLUMN LAYOUT MATCHING REFERENCE IMAGE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT 68% COLUMN: INVOICE / BATCH DETAILS & PRODUCTS TABLE */}
              <div className="lg:col-span-8 bg-white rounded-[28px] border border-stone-200/80 p-6 sm:p-7 shadow-xs space-y-6">
                {/* Invoice Header Details */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-stone-150">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#fae8c8] text-stone-900 flex items-center justify-center border border-amber-300/50 shrink-0">
                      <Wind className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-stone-950 text-lg leading-tight">Kiyoki Pure Air</h3>
                      <p className="text-xs text-stone-400 font-mono mt-0.5">contact@kiyoki.com</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right text-xs text-stone-500 space-y-0.5">
                    <p className="font-bold text-stone-900">Kiyoki Admin Operations</p>
                    <p>1729 Airflow Plaza, Global Dist.</p>
                    <p>Tokyo 100-0001, Japan</p>
                    <p className="font-mono text-stone-600">Phone: +81 (3) 5555-0199</p>
                  </div>
                </div>

                {/* Invoice Meta Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs py-1">
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-semibold">Invoice Ref:</span>
                    <span className="font-bold text-stone-900 text-sm mt-0.5 block font-mono">#INV-0758267/90</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-semibold">Issue Date:</span>
                    <span className="text-stone-800 font-medium mt-0.5 block">23 April 2026</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-semibold">Due Date:</span>
                    <span className="text-stone-800 font-medium mt-0.5 block">26 April 2026</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase tracking-wider font-semibold">Amount:</span>
                    <span className="font-bold text-stone-950 text-sm mt-0.5 block font-mono">$737.00</span>
                  </div>
                </div>

                {/* Table Header & Rows */}
                <div className="rounded-2xl border border-stone-200/60 overflow-hidden">
                  <div className="bg-stone-50/80 px-4 py-3 grid grid-cols-12 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    <div className="col-span-5">Product Name</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Price</div>
                    <div className="col-span-1 text-right">Tax</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  <div className="divide-y divide-stone-150 text-xs">
                    {sampleOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="px-4 py-3.5 grid grid-cols-12 items-center hover:bg-stone-50/60 transition-colors"
                      >
                        <div className="col-span-5 flex items-center gap-3">
                          <img
                            src={ord.avatar}
                            alt={ord.name}
                            className="w-8 h-8 rounded-full object-cover border border-stone-200"
                          />
                          <div>
                            <p className="font-bold text-stone-900 leading-tight">{ord.name}</p>
                            <span className="text-[10px] text-stone-400">{ord.role}</span>
                          </div>
                        </div>

                        <div className="col-span-2 text-center font-bold text-stone-900">
                          {ord.qty}
                        </div>

                        <div className="col-span-2 text-right font-mono text-stone-700">
                          {ord.price}
                        </div>

                        <div className="col-span-1 text-right font-mono text-stone-500">
                          {ord.tax}
                        </div>

                        <div className="col-span-2 text-right font-mono font-bold text-stone-950">
                          {ord.total}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT 32% COLUMN: CLIENT DETAILS & BASIC INFO */}
              <div className="lg:col-span-4 space-y-6">
                {/* Client Details Card */}
                <div className="bg-white rounded-[28px] border border-stone-200/80 p-6 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-150">
                    <h3 className="font-bold text-stone-900 text-base">Client Details</h3>
                    <button className="text-stone-400 hover:text-stone-700">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Client Avatar & Name */}
                  <div className="flex items-center gap-3.5">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                      alt="Esther Howard"
                      className="w-12 h-12 rounded-full object-cover border border-stone-200"
                    />
                    <div>
                      <h4 className="font-bold text-stone-950 text-sm">Esther Howard</h4>
                      <p className="text-xs text-stone-400 font-mono">ckctm12@gmail.com</p>
                    </div>
                  </div>

                  {/* Agency / Company */}
                  <div className="text-xs text-stone-600 bg-stone-50 p-3.5 rounded-2xl border border-stone-150 space-y-1">
                    <p className="font-bold text-stone-900">Uihut Agency LTD</p>
                    <p className="text-stone-500">3471 Rainy Day Drive Tulsa, USA</p>
                  </div>

                  {/* Add Customer Button in Cream Palette */}
                  <button
                    onClick={() => setShowAddCustomerModal(true)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#fae8c8] via-[#f7dda3] to-[#efc574] hover:brightness-95 active:scale-[0.99] text-stone-950 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Customer</span>
                  </button>
                </div>

                {/* Basic Info Form Card */}
                <div className="bg-white rounded-[28px] border border-stone-200/80 p-6 shadow-xs space-y-4">
                  <h3 className="font-bold text-stone-900 text-base pb-3 border-b border-stone-150">
                    Basic Info
                  </h3>

                  {/* Invoice Input */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                      Invoice
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={invoiceNumber}
                      className="w-full text-xs font-mono font-medium px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800"
                    />
                  </div>

                  {/* Invoice Date */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                      Invoice Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value={invoiceDate}
                        className="w-full text-xs font-medium px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-800"
                      />
                      <Calendar className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                      Due Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value={dueDate}
                        className="w-full text-xs font-medium px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-800"
                      />
                      <Calendar className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Send Copy To Pills */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                      Send Copy To
                    </label>
                    <div className="flex flex-wrap gap-1.5 p-2 bg-stone-50 rounded-xl border border-stone-200 min-h-[44px]">
                      {copyEmails.map((em) => (
                        <span
                          key={em}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white border border-stone-200 text-stone-700 shadow-xs"
                        >
                          <span className="truncate max-w-[130px]">{em}</span>
                          <button
                            type="button"
                            onClick={() => setCopyEmails(copyEmails.filter((x) => x !== em))}
                            className="text-stone-400 hover:text-stone-900 cursor-pointer"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                      <input
                        type="email"
                        placeholder="+ add email"
                        value={newCopyInput}
                        onChange={(e) => setNewCopyInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newCopyInput.includes('@')) {
                            e.preventDefault();
                            if (!copyEmails.includes(newCopyInput.trim())) {
                              setCopyEmails([...copyEmails, newCopyInput.trim()]);
                            }
                            setNewCopyInput('');
                          }
                        }}
                        className="bg-transparent border-none text-[11px] text-stone-800 placeholder-stone-400 focus:outline-none flex-1 min-w-[80px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================================
              2. DEDICATED CUSTOMERS SECTION (Placed below the dashboard as requested)
              ===================================================================== */}
          <section id="customers-section" className="bg-white rounded-[28px] border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-150">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/60 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl font-bold text-stone-950 tracking-tight">
                    Customers Directory
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#fae8c8] text-amber-950 border border-amber-300/40">
                    {customers.length} Accounts
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Synchronized customer profiles from Google OAuth, Apple ID, and standard registrations.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={refreshData}
                  className="py-2 px-3 text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/80 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Synchronize database"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="py-2 px-3.5 text-stone-800 font-semibold bg-stone-100 hover:bg-stone-200/80 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setShowAddCustomerModal(true)}
                  className="py-2 px-4 text-stone-950 font-bold bg-gradient-to-r from-[#fae8c8] via-[#f7dda3] to-[#efc574] hover:brightness-95 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Add Customer</span>
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer name, email, or ID..."
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-700">
                  <Filter className="w-3.5 h-3.5 text-stone-400" />
                  <select
                    value={providerFilter}
                    onChange={(e) => setProviderFilter(e.target.value as any)}
                    className="bg-transparent border-none text-xs text-stone-700 focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="all">All Providers</option>
                    <option value="google">Google OAuth</option>
                    <option value="email">Email & Password</option>
                    <option value="apple">Apple ID</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-700">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="bg-transparent border-none text-xs text-stone-700 focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="suspended">Suspended Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Customers Table */}
            <div className="rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50/90 text-stone-400 uppercase tracking-wider text-[10px] border-b border-stone-200">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Customer Details</th>
                      <th className="py-3.5 px-4 font-bold">Email Address</th>
                      <th className="py-3.5 px-4 font-bold">Sign-In Method</th>
                      <th className="py-3.5 px-4 font-bold">Role</th>
                      <th className="py-3.5 px-4 font-bold">Status</th>
                      <th className="py-3.5 px-4 font-bold">Total Logins</th>
                      <th className="py-3.5 px-4 font-bold">Last Activity</th>
                      <th className="py-3.5 px-4 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-150 text-stone-700">
                    {filteredCustomers.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-stone-400 font-sans">
                          No customer profiles match your search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredCustomers.map((user) => (
                        <tr
                          key={user.id}
                          onClick={() => setSelectedCustomer(user)}
                          className="hover:bg-amber-50/30 transition-colors group cursor-pointer"
                        >
                          {/* Name & Avatar */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              {user.avatarUrl ? (
                                <img
                                  src={user.avatarUrl}
                                  alt={user.name}
                                  className="w-8 h-8 rounded-full object-cover border border-stone-200"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-[#fae8c8] text-amber-950 font-bold text-xs flex items-center justify-center border border-amber-300/40">
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <p className="font-bold text-stone-900 leading-tight group-hover:text-black">
                                  {user.name}
                                </p>
                                <span className="font-mono text-[10px] text-stone-400">{user.id}</span>
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="py-3.5 px-4 font-mono text-stone-600">
                            {user.email}
                          </td>

                          {/* Provider */}
                          <td className="py-3.5 px-4">
                            {user.provider === 'google' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                <svg className="w-3 h-3" viewBox="0 0 24 24">
                                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                                </svg>
                                <span>Google OAuth</span>
                              </span>
                            ) : user.provider === 'apple' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-800 border border-stone-200">
                                <span> Apple ID</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-50/80 text-amber-900 border border-amber-200/60">
                                <Mail className="w-3 h-3 text-amber-600" />
                                <span>Email & Password</span>
                              </span>
                            )}
                          </td>

                          {/* Role */}
                          <td className="py-3.5 px-4 uppercase text-[10px] font-bold">
                            {user.role === 'admin' ? (
                              <span className="px-2 py-0.5 rounded-full bg-[#fae8c8] text-amber-950 border border-amber-300">
                                Administrator
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                Customer
                              </span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            {user.status === 'active' ? (
                              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Active</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] text-red-600 font-semibold">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Suspended</span>
                              </span>
                            )}
                          </td>

                          {/* Login Count */}
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 font-bold border border-stone-200">
                              {user.loginCount || 1} logins
                            </span>
                          </td>

                          {/* Last Login */}
                          <td className="py-3.5 px-4 text-stone-500 text-[11px]">
                            {formatTimestamp(user.lastLogin)}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setSelectedCustomer(user)}
                                className="p-1.5 hover:bg-stone-100 text-stone-500 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
                                title="View Customer Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {user.role !== 'admin' && (
                                <>
                                  <button
                                    onClick={() => handleToggleCustomerStatus(user)}
                                    className={`p-1.5 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer ${
                                      user.status === 'active' ? 'text-amber-600 hover:text-amber-800' : 'text-emerald-600 hover:text-emerald-800'
                                    }`}
                                    title={user.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                                  >
                                    {user.status === 'active' ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                  </button>

                                  <button
                                    onClick={() => handleDeleteCustomer(user)}
                                    className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Customer"
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
          </section>
        </main>
      </div>

      {/* =========================================================================
          MODAL 1: ADD NEW CUSTOMER MODAL
          ========================================================================= */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-2xl relative text-stone-900 animate-scale-up">
            <button
              onClick={() => setShowAddCustomerModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 pb-4 border-b border-stone-150">
              <div className="w-9 h-9 rounded-xl bg-[#fae8c8] text-amber-950 flex items-center justify-center">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-950">Add New Customer</h3>
                <p className="text-xs text-stone-500">Register a new client profile into the Kiyoki directory</p>
              </div>
            </div>

            <form onSubmit={handleCreateCustomerSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jessica Chen"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="w-full text-xs px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-amber-400 text-stone-900 placeholder-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jessica.chen@gmail.com"
                  value={newCustEmail}
                  onChange={(e) => setNewCustEmail(e.target.value)}
                  className="w-full text-xs px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-amber-400 text-stone-900 placeholder-stone-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Authentication Type
                </label>
                <select
                  value={newCustProvider}
                  onChange={(e) => setNewCustProvider(e.target.value as any)}
                  className="w-full text-xs px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-amber-400 text-stone-900"
                >
                  <option value="email">Standard Email Account</option>
                  <option value="google">Google OAuth Account</option>
                  <option value="apple">Apple ID Account</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddCustomerModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#fae8c8] via-[#f7dda3] to-[#efc574] hover:brightness-95 text-stone-950 font-bold text-xs shadow-sm cursor-pointer"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: CUSTOMER DETAIL INSPECTION DRAWER
          ========================================================================= */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-2xl relative text-stone-900 animate-scale-up">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Banner */}
            <div className="flex items-center gap-4 pb-5 border-b border-stone-150">
              {selectedCustomer.avatarUrl ? (
                <img
                  src={selectedCustomer.avatarUrl}
                  alt={selectedCustomer.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#fae8c8] shadow-xs"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#fae8c8] text-amber-950 border border-amber-300 flex items-center justify-center text-xl font-bold">
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-stone-950">{selectedCustomer.name}</h3>
                <p className="text-xs text-stone-500 font-mono mt-0.5">{selectedCustomer.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    selectedCustomer.role === 'admin'
                      ? 'bg-[#fae8c8] text-amber-950 border border-amber-300'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {selectedCustomer.role}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    selectedCustomer.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Detail Rows */}
            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-400">Account ID</span>
                <span className="font-mono text-stone-800 font-semibold">{selectedCustomer.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-400">Authentication Method</span>
                <span className="text-stone-900 font-bold uppercase tracking-wider">{selectedCustomer.provider}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-400">Total Authentications</span>
                <span className="font-mono text-stone-950 font-bold">{selectedCustomer.loginCount || 1} logins</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-400">Account Created</span>
                <span className="text-stone-700">{formatTimestamp(selectedCustomer.createdAt)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-stone-400">Most Recent Login</span>
                <span className="text-stone-700">{formatTimestamp(selectedCustomer.lastLogin)}</span>
              </div>
            </div>

            {/* Actions for non-admin customers */}
            {selectedCustomer.role !== 'admin' && (
              <div className="pt-4 border-t border-stone-150 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleToggleCustomerStatus(selectedCustomer)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCustomer.status === 'active'
                      ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-300'
                  }`}
                >
                  {selectedCustomer.status === 'active' ? 'Suspend Customer' : 'Activate Customer'}
                </button>
                <button
                  onClick={() => handleDeleteCustomer(selectedCustomer)}
                  className="px-4 py-2.5 rounded-xl bg-red-100 text-red-800 hover:bg-red-200 border border-red-300 text-xs font-bold transition-colors cursor-pointer"
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
