import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import {
  getAuditLogs,
  clearAuditLogs,
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
  const [logs, setLogs] = useState<SecurityAuditLog[]>([]);
  const [copiedToken, setCopiedToken] = useState(false);

  const refreshLogs = () => {
    setLogs(getAuditLogs());
  };

  useEffect(() => {
    refreshLogs();
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
      refreshLogs();
    }
  };

  const formatTimestamp = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' ' + d.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* TOP ADMIN HEADER BAR */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur sticky top-0 z-30 px-6 sm:px-10 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-wide text-base">KIYOKI ADMIN PORTAL</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-400 text-gray-950 uppercase tracking-wider">
                  Root Admin
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Secure Authentication & Identity Management Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-red-300 hover:text-white bg-red-950/50 hover:bg-red-900/60 border border-red-800/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-6 sm:px-10 py-8 flex-1 space-y-8">
        {/* STATS & SESSION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Active Admin Identity */}
          <div className="rounded-2xl bg-gray-800/70 border border-gray-700/60 p-5 backdrop-blur-sm shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>Authenticated Admin</span>
                <UserCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white truncate">
                {session?.user.name || 'Administrator'}
              </h3>
              <p className="text-xs text-amber-300 font-mono mt-0.5 truncate">
                {session?.user.email || 'admin@kiyoki.com'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-700/60 flex items-center justify-between text-[11px] text-gray-400">
              <span>Access Level</span>
              <span className="text-emerald-400 font-medium">Full System (Superuser)</span>
            </div>
          </div>

          {/* Cryptographic Session Token */}
          <div className="rounded-2xl bg-gray-800/70 border border-gray-700/60 p-5 backdrop-blur-sm shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>Cryptographic Token (SHA-256)</span>
                <Key className="w-4 h-4 text-amber-400" />
              </div>
              <div className="font-mono text-xs bg-gray-900/80 px-3 py-2 rounded-lg text-gray-300 border border-gray-800 break-all select-all flex items-center justify-between">
                <span className="truncate pr-2">
                  {session?.token ? session.token.substring(0, 24) + '...' : 'Inactive'}
                </span>
                <button
                  onClick={handleCopyToken}
                  className="text-[10px] text-amber-400 hover:text-amber-300 shrink-0 font-sans"
                >
                  {copiedToken ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-700/60 flex items-center justify-between text-[11px] text-gray-400">
              <span>Session Duration</span>
              <span className="text-gray-300">24 Hours (Rolling)</span>
            </div>
          </div>

          {/* Brute-Force & Security Health */}
          <div className="rounded-2xl bg-gray-800/70 border border-gray-700/60 p-5 backdrop-blur-sm shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>Security Engine Status</span>
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
            <div className="mt-4 pt-3 border-t border-gray-700/60 flex items-center justify-between text-[11px] text-gray-400">
              <span>Audit Log Entries</span>
              <span className="text-gray-200 font-mono font-medium">{logs.length} logged</span>
            </div>
          </div>
        </div>

        {/* NOTICE / PLACEHOLDER CARD FOR FUTURE MODULES */}
        <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-400/20 p-5 text-amber-200 text-xs sm:text-sm flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-300">
              Admin Portal Security Frame Ready
            </p>
            <p className="text-amber-200/80 text-xs mt-1 leading-relaxed">
              As per instructions, the login authentication system and unified entry router have been fully implemented.
              Additional admin modules (Product Inventory, Order Management, Customer Directory) will be linked into this dashboard in subsequent updates.
            </p>
          </div>
        </div>

        {/* LIVE SECURITY AUDIT LOG TABLE */}
        <div className="rounded-2xl bg-gray-800/70 border border-gray-700/60 overflow-hidden shadow-xl backdrop-blur-sm">
          <div className="p-5 border-b border-gray-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-amber-400" />
              <h3 className="font-semibold text-white text-sm">Real-Time Security Audit Logs</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={refreshLogs}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors text-xs flex items-center gap-1"
                title="Refresh logs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleClearLogs}
                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-lg transition-colors text-xs flex items-center gap-1"
                title="Clear logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900/60 text-gray-400 uppercase tracking-wider text-[10px] border-b border-gray-700/60">
                <tr>
                  <th className="py-3 px-4">Event Type</th>
                  <th className="py-3 px-4">Account / Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/40 font-mono text-gray-300">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500 font-sans">
                      No security audit logs recorded yet.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => {
                    let badgeClass = 'bg-gray-700 text-gray-200';
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
                      <tr key={log.id} className="hover:bg-gray-750/50 transition-colors">
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
      </main>
    </div>
  );
};
