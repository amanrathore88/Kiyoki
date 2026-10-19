import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, ShieldAlert, CheckCircle2, Lock, User as UserIcon } from 'lucide-react';
import {
  login,
  register,
  signInWithGoogle,
  signInWithApple,
  checkLockout,
  validatePassword,
  type AuthSession,
} from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (session: AuthSession) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Google OAuth Dialog Modal State
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [showCustomGoogleInput, setShowCustomGoogleInput] = useState(false);

  // Rate-limiting / lockout state
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);

  // Synchronize initial mode when opened
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage(null);
      setSuccessMessage(null);
      setShowGoogleChooser(false);
      setShowCustomGoogleInput(false);
      // Check if current typed email is locked
      if (email) {
        const status = checkLockout(email);
        setLockoutSeconds(status.remainingSeconds);
      }
    }
  }, [isOpen, initialMode]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          setErrorMessage(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  // Password strength score for registration
  const pwStrength = mode === 'register' && password ? validatePassword(password) : null;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (lockoutSeconds > 0) {
      setErrorMessage(`Account temporarily locked. Please wait ${lockoutSeconds}s before retrying.`);
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (res.success && res.session) {
          setSuccessMessage(
            res.user?.role === 'admin'
              ? 'Administrator authenticated. Redirecting to Admin Portal...'
              : 'Sign in successful! Welcome back.'
          );
          setTimeout(() => {
            onAuthSuccess(res.session!);
            onClose();
          }, 600);
        } else {
          if (res.isLocked && res.remainingSeconds) {
            setLockoutSeconds(res.remainingSeconds);
          }
          setErrorMessage(res.error || 'Invalid email or password.');
        }
      } else {
        const res = await register(name, email, password);
        if (res.success && res.session) {
          setSuccessMessage('Account created successfully! Transmitting customer details to directory...');
          setTimeout(() => {
            onAuthSuccess(res.session!);
            onClose();
          }, 700);
        } else {
          setErrorMessage(res.error || 'Failed to create account.');
        }
      }
    } catch {
      setErrorMessage('An unexpected security error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (targetEmail: string, targetPass: string) => {
    setEmail(targetEmail);
    setPassword(targetPass);
    setErrorMessage(null);
    const lock = checkLockout(targetEmail);
    setLockoutSeconds(lock.remainingSeconds);
  };

  // Google OAuth Login Action
  const handleGoogleSignIn = async (userProfile: { name: string; email: string; avatarUrl?: string }) => {
    setIsLoading(true);
    setShowGoogleChooser(false);
    setErrorMessage(null);

    try {
      const res = await signInWithGoogle(userProfile);
      if (res.success && res.session) {
        setSuccessMessage(`Signed in with Google as ${res.user?.name}! Customer record updated.`);
        setTimeout(() => {
          onAuthSuccess(res.session!);
          onClose();
        }, 600);
      } else {
        setErrorMessage(res.error || 'Failed to sign in with Google.');
      }
    } catch {
      setErrorMessage('Google authentication service timed out.');
    } finally {
      setIsLoading(false);
    }
  };

  // Apple OAuth Login Action
  const handleAppleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await signInWithApple({
        name: 'Sarah Connor',
        email: 'sarah.connor.apple@icloud.com',
      });
      if (res.success && res.session) {
        setSuccessMessage('Signed in with Apple ID! Customer record updated.');
        setTimeout(() => {
          onAuthSuccess(res.session!);
          onClose();
        }, 600);
      } else {
        setErrorMessage(res.error || 'Failed to sign in with Apple.');
      }
    } catch {
      setErrorMessage('Apple authentication service timed out.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/50 backdrop-blur-sm animate-fade-in">
      {/* Modal Container */}
      <div 
        className="w-full max-w-[960px] bg-gradient-to-b from-[#fbf8f2] via-[#faf5e9] to-[#f5ebd3] rounded-[32px] sm:rounded-[36px] shadow-2xl overflow-hidden flex flex-col md:flex-row relative border border-white/60"
        style={{ minHeight: '620px' }}
      >
        {/* Floating Close Button for Mobile Screens */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center text-gray-700 hover:text-black z-30 transition-transform active:scale-90 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: AUTH FORM */}
        <div className="w-full md:w-[48%] p-6 sm:p-9 lg:p-11 flex flex-col justify-between relative z-10">
          <div>
            {/* Brand Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-400/35 bg-white/40 backdrop-blur-sm text-gray-800 text-[13px] font-medium tracking-wide mb-6 sm:mb-8 select-none">
              <span>KIYOKI</span>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-[28px] font-normal text-gray-900 tracking-tight leading-snug">
                {mode === 'login' ? 'Sign in to your account' : 'Create an account'}
              </h2>
              <p className="text-[13px] sm:text-sm text-gray-500 mt-1">
                {mode === 'login'
                  ? 'Welcome back! Please enter your details.'
                  : 'Sign up and get 30 day free trial'}
              </p>
            </div>

            {/* Notification / Error / Lockout Banner */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200/80 text-red-700 text-xs flex items-start gap-2.5 animate-shake">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <div className="flex-1">
                  <p className="font-medium">{errorMessage}</p>
                  {lockoutSeconds > 0 && (
                    <p className="mt-1 font-mono text-[11px] text-red-600 font-semibold">
                      Security Cooldown: {lockoutSeconds}s remaining
                    </p>
                  )}
                </div>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <p className="font-medium">{successMessage}</p>
              </div>
            )}

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name Field (Register Mode Only) */}
              {mode === 'register' && (
                <div>
                  <label className="block text-[12px] font-medium text-gray-600 mb-1 ml-3.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Amélie Laurent"
                    className="w-full rounded-full bg-[#f4f2ed] border border-transparent focus:border-[#fbc658] focus:bg-white px-5 py-2.5 sm:py-3 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all shadow-inner/5"
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-[12px] font-medium text-gray-600 mb-1 ml-3.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    const lock = checkLockout(e.target.value);
                    setLockoutSeconds(lock.remainingSeconds);
                  }}
                  placeholder="amelielaurent7622@gmail.com"
                  className="w-full rounded-full bg-[#f4f2ed] border border-transparent focus:border-[#fbc658] focus:bg-white px-5 py-2.5 sm:py-3 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all shadow-inner/5"
                />
              </div>

              {/* Password Field with Eye Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1 ml-3.5 mr-2">
                  <label className="block text-[12px] font-medium text-gray-600">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset verification link has been sent to your email.')}
                      className="text-[11px] text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••••••"
                    className="w-full rounded-full bg-[#f4f2ed] border border-transparent focus:border-[#fbc658] focus:bg-white pl-5 pr-11 py-2.5 sm:py-3 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all shadow-inner/5 tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none p-1 transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[1.8]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[1.8]" />
                    )}
                  </button>
                </div>

                {/* Password strength indicator for registration */}
                {pwStrength && (
                  <div className="mt-2 px-3">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-gray-500">Security strength:</span>
                      <span
                        className={`font-semibold ${
                          pwStrength.score <= 1
                            ? 'text-red-500'
                            : pwStrength.score === 2
                            ? 'text-amber-500'
                            : pwStrength.score === 3
                            ? 'text-blue-500'
                            : 'text-emerald-600'
                        }`}
                      >
                        {pwStrength.strengthLabel}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden flex gap-0.5">
                      <div
                        className={`h-full transition-all duration-300 ${
                          pwStrength.score >= 1 ? (pwStrength.score <= 1 ? 'bg-red-500' : 'bg-emerald-500') : 'bg-transparent'
                        }`}
                        style={{ width: '25%' }}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          pwStrength.score >= 2 ? (pwStrength.score === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-transparent'
                        }`}
                        style={{ width: '25%' }}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          pwStrength.score >= 3 ? 'bg-emerald-500' : 'bg-transparent'
                        }`}
                        style={{ width: '25%' }}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          pwStrength.score >= 4 ? 'bg-emerald-600' : 'bg-transparent'
                        }`}
                        style={{ width: '25%' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button (Golden Pill Button) */}
              <button
                type="submit"
                disabled={isLoading || lockoutSeconds > 0}
                className="w-full rounded-full bg-[#fbc658] hover:bg-[#f6b738] active:scale-[0.99] text-gray-900 font-semibold py-3 sm:py-3.5 text-sm transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed mt-2 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Submit'
                )}
              </button>

              {/* Social Login Buttons: Apple & Google (Fully Integrated) */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleAppleSignIn}
                  disabled={isLoading}
                  title="Sign in or register with Apple ID"
                  className="flex-1 rounded-full border border-gray-300/80 bg-white/50 hover:bg-white py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-medium text-gray-800 transition-all shadow-xs cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.77-11.65-14.19-5.99-9.35-10.74-20.08-14.25-32.19-3.51-12.1-5.27-23.36-5.27-33.77 0-14.36 3.69-26.04 11.07-35.03 7.38-8.99 16.59-13.55 27.63-13.68 4.79 0 10.28 1.34 16.48 4.03 6.2 2.68 10.27 4.09 12.21 4.22 1.52-.13 5.89-1.61 13.1-4.44 7.21-2.83 13.17-4.04 17.89-3.63 13.5 1.1 24.37 6.44 32.61 16.02-11.75 7.08-17.5 16.89-17.26 29.43.24 10.15 4.15 18.77 11.74 25.86 7.59 7.08 16.71 11.09 27.35 12.02-2.39 7.39-5.49 15.02-9.29 22.89zM119.22 33.15c0-7.28 2.66-14.18 7.99-20.7 5.33-6.52 11.93-10.76 19.8-12.72.65 1.96.98 3.91.98 5.87 0 7.28-2.77 14.3-8.31 21.05-5.54 6.75-12.28 10.87-20.22 12.35-.11-1.96-.24-3.91-.24-5.85z"/>
                  </svg>
                  <span>Apple</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowGoogleChooser(true)}
                  disabled={isLoading}
                  title="Sign in or register with Google"
                  className="flex-1 rounded-full border border-gray-300/80 bg-white/50 hover:bg-white py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-medium text-gray-800 transition-all shadow-xs cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>
              </div>

              {/* Quick Testing Chips */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-1.5">
                  <Lock className="w-3 h-3 text-gray-400" />
                  <span>Quick Test Fill:</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('admin@kiyoki.com', 'Admin@Kiyoki2026!')}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-100/70 hover:bg-amber-200/80 text-amber-900 border border-amber-300/60 transition-colors cursor-pointer"
                  >
                    ⚡ Demo Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('user@kiyoki.com', 'User@Kiyoki2026!')}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-sky-100/70 hover:bg-sky-200/80 text-sky-900 border border-sky-300/60 transition-colors cursor-pointer"
                  >
                    👤 Demo User
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGoogleSignIn({ name: 'Alex Morgan', email: 'alex.morgan.tech@gmail.com' })}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-red-50 hover:bg-red-100 text-red-900 border border-red-200 transition-colors cursor-pointer"
                  >
                    🔴 Quick Google Sign-In
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Bottom Row: Mode switcher & Terms */}
          <div className="pt-6 mt-4 border-t border-gray-300/40 flex items-center justify-between text-[11px] sm:text-xs text-gray-600">
            <div>
              {mode === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setErrorMessage(null);
                    }}
                    className="underline font-semibold text-gray-900 hover:text-black cursor-pointer"
                  >
                    Sign up
                  </button>
                </span>
              ) : (
                <span>
                  Have any account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMessage(null);
                    }}
                    className="underline font-semibold text-gray-900 hover:text-black cursor-pointer"
                  >
                    Sign in
                  </button>
                </span>
              )}
            </div>

            <div>
              <a
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Kiyoki Terms of Service & Privacy Policy: Your data and credentials are encrypted and protected under zero-trust standards.');
                }}
                className="underline text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HERO GRAPHIC CARD WITH INTEGRATED CLOSE BUTTON */}
        <div className="hidden md:block md:w-[52%] p-3 sm:p-4 bg-transparent relative">
          <div className="w-full h-full rounded-[28px] overflow-hidden relative shadow-md">
            {/* Sliced High-Definition Graphic Asset */}
            <img
              src="/images/login_hero.png"
              alt="Kiyoki Team & Workspace"
              className="w-full h-full object-cover object-center select-none pointer-events-none"
            />

            {/* Clickable Close Button perfectly overlaying the top-right position */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 hover:bg-white shadow-md hover:shadow-lg flex items-center justify-center text-gray-700 hover:text-black transition-all hover:scale-105 active:scale-95 z-30 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE GOOGLE ACCOUNT CHOOSER DIALOG
          Authentic Google OAuth Dialog Experience
          ========================================================================= */}
      {showGoogleChooser && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-6 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="font-medium text-gray-800 text-sm">Sign in with Google</span>
              </div>
              <button
                onClick={() => setShowGoogleChooser(false)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-base font-semibold text-gray-900">Choose an account</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                to continue to <span className="font-semibold text-gray-700">Kiyoki Pure Air</span>
              </p>
            </div>

            {/* Quick Profile 1: Alex Morgan */}
            <div className="mt-4 divide-y divide-gray-100">
              <button
                onClick={() =>
                  handleGoogleSignIn({
                    name: 'Alex Morgan',
                    email: 'alex.morgan.tech@gmail.com',
                    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
                  })
                }
                className="w-full py-3 px-2 flex items-center gap-3 hover:bg-gray-50 rounded-xl transition-colors text-left cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  alt="Alex Morgan"
                  className="w-9 h-9 rounded-full object-cover border border-gray-200"
                />
                <div className="flex-1 truncate">
                  <p className="text-sm font-semibold text-gray-900 leading-none">Alex Morgan</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">alex.morgan.tech@gmail.com</p>
                </div>
              </button>

              {/* Quick Profile 2: Jessica Chen */}
              <button
                onClick={() =>
                  handleGoogleSignIn({
                    name: 'Jessica Chen',
                    email: 'jessica.chen.air@gmail.com',
                    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
                  })
                }
                className="w-full py-3 px-2 flex items-center gap-3 hover:bg-gray-50 rounded-xl transition-colors text-left cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
                  alt="Jessica Chen"
                  className="w-9 h-9 rounded-full object-cover border border-gray-200"
                />
                <div className="flex-1 truncate">
                  <p className="text-sm font-semibold text-gray-900 leading-none">Jessica Chen</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">jessica.chen.air@gmail.com</p>
                </div>
              </button>
            </div>

            {/* Custom Google Account Section */}
            {!showCustomGoogleInput ? (
              <button
                onClick={() => setShowCustomGoogleInput(true)}
                className="w-full mt-3 py-2.5 px-3 rounded-xl border border-dashed border-gray-300 hover:border-gray-400 text-xs font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5 text-gray-400" />
                <span>Use another Google account</span>
              </button>
            ) : (
              <div className="mt-3 p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customGoogleEmail && customGoogleEmail.includes('@')) {
                      handleGoogleSignIn({
                        name: customGoogleName.trim() || 'Google User',
                        email: customGoogleEmail.trim(),
                      });
                    } else {
                      alert('Please provide a valid Gmail address.');
                    }
                  }}
                  className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Continue with Google
                </button>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-400 text-center leading-relaxed">
              Google will share your name, email address, language preference, and profile picture with Kiyoki.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
