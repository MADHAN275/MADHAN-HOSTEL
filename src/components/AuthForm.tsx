"use client";

import { Lock, Mail, User, Cake } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Role = "admin" | "resident";

export default function AuthForm({ role: initialRole }: { role: Role }) {
  const router = useRouter();
  const [role] = useState<Role>(initialRole);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('email', email);
        if (role === 'admin') {
          router.push('/dashboard/admin');
        } else {
          router.push('/dashboard/resident');
        }
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error('Login error:', error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age: parseInt(age), email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSignUp(false);
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error('Signup error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 space-y-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary">
          {role === "admin" ? "Admin Login" : isSignUp ? "Resident Sign Up" : "Resident Login"}
        </h1>
        <p className="text-text-secondary">
          {role === "admin"
            ? "Access the management dashboard"
            : isSignUp
            ? "Create your resident account"
            : "Sign in to your resident account"}
        </p>
      </div>

      <form className="space-y-6" onSubmit={isSignUp ? handleSignUp : handleLogin}>
        {isSignUp && (
          <>
            <div className="relative">
              <User className="absolute w-5 h-5 top-3 left-3 text-text-muted" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-accent-blue focus:outline-none"
                required
              />
            </div>
            <div className="relative">
              <Cake className="absolute w-5 h-5 top-3 left-3 text-text-muted" />
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-accent-blue focus:outline-none"
                required
              />
            </div>
          </>
        )}
        <div className="relative">
          <Mail className="absolute w-5 h-5 top-3 left-3 text-text-muted" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-accent-blue focus:outline-none"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute w-5 h-5 top-3 left-3 text-text-muted" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-2 focus:ring-accent-blue focus:outline-none"
            required
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        {role === "resident" && !isSignUp && (
          <div className="text-right">
            <a href="#" className="text-sm text-accent-purple hover:underline">
              Forgot Password?
            </a>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple hover:opacity-90 transition-opacity"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>

      {role === "resident" && (
        <div className="text-center text-text-secondary">
          <p>
            {isSignUp ? "Already have an account?" : "New Resident?"}{" "}
            <a href="#" className="font-semibold text-accent-blue hover:underline" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Login" : "Sign Up"}
            </a>
          </p>
        </div>
      )}
    </motion.div>
  );
}
