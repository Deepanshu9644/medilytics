

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useState } from 'react';
import axios from 'axios';
import { Dna, Stethoscope, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ThemeToggle } from './ThemeToggle';

interface LoginPageProps {
  onLogin: (user: { email: string; name: string }) => void;
}

//const BASE_URL = "http://localhost:8080/api/auth"; // ✅ your backend base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        // 🧾 REGISTER REQUEST
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        const registerResponse = await axios.post(`${BASE_URL}/register`, {
          username: email.split('@')[0],
          email,
          password,
        });

        alert("✅ Registration successful! Please login now.");
        setIsRegister(false);
      } else {
        // 🔑 LOGIN REQUEST
        const loginResponse = await axios.post(`${BASE_URL}/login`, {
          username: email.split('@')[0],
          password,
        });

        const { token, username } = loginResponse.data;

        // Save token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        // Inform parent that login succeeded
        onLogin({ email, name: username });
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data || 
        (isRegister ? "Registration failed" : "Invalid username or password")
      );
    } finally {
      setLoading(false);
    }
  };

 

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken(); // 🔥 Firebase ID token
  // const token = await user.getIdToken();
console.log("FIREBASE_TOKEN:", token);

    // Send token to backend
    const response = await axios.post("http://localhost:8080/api/auth/google-login", { token });

    console.log("Backend verified user:", response.data);
    localStorage.setItem("token", token);
    localStorage.setItem("username", response.data.name);

    onLogin({ email: response.data.email, name: response.data.name });
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1758691461888-b74515208d7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBob3NwaXRhbCUyMG1vZGVybnxlbnwxfHx8fDE3NjAzODA1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-cyan-500/40 to-teal-500/40 dark:from-blue-900/60 dark:via-cyan-900/60 dark:to-teal-900/60" />
        <div className="absolute inset-0 backdrop-blur-md" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 rounded-3xl p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4 shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white text-3xl mb-2">Medilytics</h1>
            <p className="text-white/70 text-sm">AI-Powered Medical Analytics</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 backdrop-blur-md"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 backdrop-blur-md"
                required
              />
            </div>

            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white/90">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 backdrop-blur-md"
                  required
                />
              </div>
            )}

            {error && <p className="text-red-300 text-sm text-center">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
            >
              {loading ? "Please wait..." : isRegister ? 'Register' : 'Login'}
            </Button>
            
             {/* 🔥 Google Login Button */}
            {!isRegister && (
              <Button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full bg-white text-gray-700 font-medium hover:bg-gray-100 shadow-md flex items-center justify-center gap-2 mt-3"
>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google Icon"
    className="w-5 h-5"
  />
  <span>Continue with Google</span>
</Button>


            )}
            
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-white/80 hover:text-white text-sm underline"
              >
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

