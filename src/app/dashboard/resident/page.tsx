"use client";

import ResidentSidebar from "@/components/ResidentSidebar";
import TopBar from "@/components/TopBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/DashboardCard";
import SpotlightCard from "@/components/SpotlightCard";
import ShinyText from "@/components/ShinyText";
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  Building,
  Utensils,
  Loader2,
  Users,
  Phone,
  Wifi,
  Copy,
  Check,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard/resident" },
  { name: "Book Room", icon: Building, path: "/dashboard/resident/room" },
  { name: "Payments", icon: CreditCard, path: "/dashboard/resident/payments" },
  { name: "Complaints", icon: FileText, path: "/dashboard/resident/complaints" },
  { name: "Mess Menu", icon: Utensils, path: "/dashboard/resident/mess" },
  { name: "Contact Us", icon: Phone, path: "/dashboard/resident/contact-us" },
];

interface Booking {
  roomNumber: string;
  roomType: string;
}

interface Roommate {
  name: string;
  email: string;
}

export default function ResidentDashboard() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [roommates, setRoommates] = useState<Roommate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const router = useRouter();

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("email");
      if (email) {
        setUserEmail(email);
        try {
          // Fetch Booking
          const bookingResponse = await fetch("/api/get-booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ residentId: email }),
          });
          if (bookingResponse.ok) {
            const data = await bookingResponse.json();
            setBooking(data.booking);
            setRoommates(data.roommates || []);
          }

          // Fetch User Info
          const userResponse = await fetch("/api/get-user-info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUserName(userData.user.name);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role"); // cleanup other potential keys
    router.push("/");
  };

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  const filteredNavItems = navItems.filter(
    (item) => item.name !== "Book Room" || !booking
  );

  return (
    <div className="flex h-screen bg-primary-background text-text-primary overflow-hidden">
      <ResidentSidebar booking={booking || undefined} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopBar 
          title="Resident Dashboard" 
          userName={userName} 
          userEmail={userEmail}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-secondary-background scrollbar-track-transparent">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Welcome, {userName || "Resident"}!</h1>
            <p className="text-text-secondary mb-8">Manage your stay and access services.</p>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-10 h-10 text-accent-blue animate-spin" />
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <SpotlightCard className="w-full bg-gradient-to-r from-accent-blue/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-2xl overflow-hidden relative" spotlightColor="rgba(255, 255, 255, 0.1)">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                      {/* Left side: Icon & Text */}
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-white/5 rounded-full border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse-slow">
                          <Wifi className="w-8 h-8 text-accent-blue" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-white">Announcement</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent-green/20 text-accent-green border border-accent-green/30 uppercase tracking-wider">New</span>
                          </div>
                          <ShinyText text="Hostel Wi-Fi Credentials" speed={3} className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-1" />
                          <p className="text-text-secondary mt-2 max-w-md">Stay connected! Use these credentials to access the high-speed hostel network.</p>
                        </div>
                      </div>

                      {/* Right side: Credentials */}
                      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        {/* SSID Box */}
                        <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4 min-w-[200px] group transition-colors hover:border-accent-blue/50">
                          <div>
                            <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1">Wi-Fi Name</p>
                            <p className="text-white font-medium">Madhan Hostel</p>
                          </div>
                          <button onClick={() => handleCopy("Madhan Hostel", "ssid")} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-text-secondary hover:text-white">
                            {copiedField === "ssid" ? <Check className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Password Box */}
                        <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4 min-w-[200px] group transition-colors hover:border-accent-purple/50">
                          <div>
                            <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1">Password</p>
                            <p className="text-white font-medium font-mono">Madhanhostel123</p>
                          </div>
                          <button onClick={() => handleCopy("Madhanhostel123", "password")} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-text-secondary hover:text-white">
                            {copiedField === "password" ? <Check className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/20 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
                  </SpotlightCard>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredNavItems.map((item, index) => (
                    <DashboardCard
                      key={item.name}
                      name={item.name}
                      icon={item.icon}
                      onClick={() => handleCardClick(item.path)}
                      index={index}
                    />
                  ))}
                  

                </div>
              </>
            )}
            
            {booking && !isLoading && (
              <div className="mt-10 relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-secondary-background/50 to-secondary-background/30 border border-white/10 backdrop-blur-md shadow-2xl">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-accent-purple/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-accent-blue/20 rounded-full blur-3xl pointer-events-none"></div>
                
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Building className="w-6 h-6 text-accent-purple" />
                  Current Room Status
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                    <p className="text-text-secondary text-sm mb-1 uppercase tracking-wider font-semibold">Room Number</p>
                    <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                      {booking.roomNumber}
                    </p>
                    <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-xs font-medium">
                      {booking.roomType} Block
                    </div>
                  </div>

                  <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-accent-blue" />
                      <p className="text-text-secondary text-sm uppercase tracking-wider font-semibold">Roommates</p>
                    </div>
                    
                    {roommates.length > 0 ? (
                      <ul className="space-y-3">
                        {roommates.map((mate, idx) => (
                          <li key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-xs font-bold text-white">
                              {mate.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text-primary">{mate.name}</p>
                              <p className="text-xs text-text-secondary">{mate.email}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-text-secondary italic">No roommates assigned yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}