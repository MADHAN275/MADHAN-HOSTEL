"use client";

import { User, LogOut, Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface TopBarProps {
  title?: string;
  userName?: string;
  role?: string;
  userEmail?: string;
  onLogout?: () => void;
}

export default function TopBar({ title, userName, role, userEmail, onLogout }: TopBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg border-b border-white/10 relative z-20">
      <div className="flex items-center gap-4">
        {title && <h2 className="text-xl font-semibold text-text-primary">{title}</h2>}
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none hover:bg-white/5 p-2 rounded-lg transition-colors"
          >
            <User className="w-8 h-8 rounded-full bg-accent-purple p-1 text-white" />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-text-primary">{userName || "User"}</p>
              {role && <p className="text-xs text-text-muted">{role}</p>}
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-secondary-background border border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 border-b border-white/10">
                <p className="text-sm font-semibold text-text-primary">{userName || "User"}</p>
                {userEmail && (
                  <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{userEmail}</span>
                  </div>
                )}
              </div>
              
              {onLogout && (
                <div className="p-2">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
