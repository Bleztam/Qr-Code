import { useState, FormEvent } from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const setAdminAuthenticated = useStore((state) => state.setAdminAuthenticated);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setAdminAuthenticated(true);
      setError(false);
      navigate('/admin');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-12 px-4 flex flex-col flex-grow items-center justify-center animate-fadeIn">
      <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-8 w-full max-w-[340px] shadow-none flex flex-col items-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface mb-2 text-center">
          Admin Portal
        </h1>
        <p className="font-body-sm text-body-sm text-outline text-center mb-8">
          Enter the manager passcode to access the restaurant dashboard.
        </p>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div>
            <input
              type="password"
              placeholder="Passcode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-surface-container border ${error ? 'border-red-500' : 'border-outline-variant/50'} focus:border-primary text-on-surface text-center font-headline-md tracking-widest py-3 px-4 rounded-xl outline-none transition-all`}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-[10px] font-label-caps text-center mt-2">
                Incorrect passcode
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-on-primary font-headline-md text-headline-md py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer mt-2"
          >
            Access Dashboard
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="mt-6 text-on-surface-variant font-label-caps text-label-caps hover:text-on-surface underline transition-all"
        >
          Return to Menu
        </button>
      </div>
    </div>
  );
}
