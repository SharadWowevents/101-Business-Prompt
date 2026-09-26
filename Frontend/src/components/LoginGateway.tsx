import React, { useState } from 'react';
import { Lock, Sparkles, ShieldCheck } from 'lucide-react';
import { UserCredentials } from '../types';

interface LoginGatewayProps {
  onLoginSuccess: (credentials: UserCredentials) => void;
}

export const LoginGateway: React.FC<LoginGatewayProps> = ({ onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false); // <-- New state for checkbox
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !mobile.trim()) {
      setErrorMessage('Please provide your name, email, and mobile number to unlock access.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    // <-- New Validation Check
    if (!acceptedTerms) {
      setErrorMessage('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), mobile: mobile.trim() }),
      });

      if (!response.ok) throw new Error('Failed to verify credentials.');

      // Proceed to the library view on success
      onLoginSuccess({
        name: name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
      });
    } catch (error) {
      setErrorMessage('An error occurred while connecting to the server.');
      setIsVerifying(false);
    }
  };

  return (
    <div
      id="login-view"
      className="min-h-screen w-full flex items-center justify-center p-4 login-bg-glow select-none"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(201,137,11,0.12)_0%,rgba(15,17,24,0)_70%)] rounded-full blur-3xl" />
      </div>

      <div
        id="login-card"
        className="relative w-full max-w-[420px] bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm z-10"
      >
        {/* Top subtle gold accent line */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-80" />

        {/* Header */}
        <div className="text-center mb-8">
          <div
            id="login-eyebrow"
            className="flex flex-col items-center justify-center gap-2 text-[11px] font-bold tracking-[0.25em] text-[var(--gold)] uppercase mb-3"
          >
            <img 
              src="/logo.png" 
              alt="WOWOS Logo" 
              className="h-10 w-auto object-contain" 
            />
            <span>WOWOS FAST TRACK</span>
          </div>
          <h1
            id="login-title"
            className="text-2xl sm:text-[26px] font-bold text-[var(--text)] tracking-tight leading-tight"
          >
            Access the 101 Business Prompts
          </h1>
          <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
            Enter your credentials to unlock the executive prompt vault.
          </p>
        </div>

        {/* Form */}
        <form id="login-form" onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Name Field */}
          <div>
            <label
              htmlFor="login-name-input"
              className="block text-xs font-semibold text-[var(--muted)] tracking-wider uppercase mb-1.5"
            >
              Full Name
            </label>
            <input
              id="login-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isVerifying}
              placeholder="e.g. Alex Morgan"
              className="w-full bg-[var(--surface)] text-[var(--text)] placeholder-[var(--faint)] text-sm px-4 py-3 rounded-t-lg border-0 border-b-2 border-[var(--border)] focus:border-[var(--gold)] focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="login-email-input"
              className="block text-xs font-semibold text-[var(--muted)] tracking-wider uppercase mb-1.5"
            >
              Email Address
            </label>
            <input
              id="login-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isVerifying}
              placeholder="alex@company.com"
              className="w-full bg-[var(--surface)] text-[var(--text)] placeholder-[var(--faint)] text-sm px-4 py-3 rounded-t-lg border-0 border-b-2 border-[var(--border)] focus:border-[var(--gold)] focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Mobile Number Field */}
          <div>
            <label
              htmlFor="login-mobile-input"
              className="block text-xs font-semibold text-[var(--muted)] tracking-wider uppercase mb-1.5"
            >
              Mobile Number
            </label>
            <input
              id="login-mobile-input"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={isVerifying}
              placeholder="+1 (555) 019-2834"
              className="w-full bg-[var(--surface)] text-[var(--text)] placeholder-[var(--faint)] text-sm px-4 py-3 rounded-t-lg border-0 border-b-2 border-[var(--border)] focus:border-[var(--gold)] focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* <-- NEW: Terms and Privacy Checkbox --> */}
          <div className="flex items-start gap-2.5 pt-1">
            <div className="flex items-center h-5">
              <input
                id="terms-checkbox"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                disabled={isVerifying}
                className="w-4 h-4 mt-0.5 accent-[var(--gold)] cursor-pointer rounded border-[var(--border)]"
              />
            </div>
            <label htmlFor="terms-checkbox" className="text-xs text-[var(--muted)] leading-relaxed cursor-pointer select-none">
              I agree to the{' '}
              <a 
                href="https://wowos.in/terms" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[var(--gold)] hover:underline hover:text-[var(--gold2)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Terms of Service
              </a>
              {' '}and{' '}
              <a 
                href="https://wowos.in/privacy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[var(--gold)] hover:underline hover:text-[var(--gold2)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </a>.
            </label>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div
              id="login-error-message"
              className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md p-2.5 text-center"
            >
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            id="login-submit-button"
            type="submit"
            disabled={isVerifying}
            className={`w-full py-3.5 px-4 rounded-lg font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
              isVerifying
                ? 'bg-[var(--gold)] text-[var(--navy)] opacity-90 cursor-wait'
                : 'bg-[var(--gold)] hover:bg-[var(--gold2)] text-[var(--navy)] active:scale-[0.99]'
            }`}
          >
            {isVerifying ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-[var(--navy)]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-[var(--navy)]" />
                <span>Unlock Prompt Library</span>
              </>
            )}
          </button>
        </form>

        {/* Security footer note */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-[var(--faint)]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Encrypted Session • Instant VIP Access</span>
        </div>
      </div>
    </div>
  );
};