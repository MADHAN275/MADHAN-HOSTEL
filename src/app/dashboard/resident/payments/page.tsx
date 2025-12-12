"use client";

import ResidentSidebar from "@/components/ResidentSidebar";
import TopBar from "@/components/TopBar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  DollarSign,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Booking {
  roomType: string;
  roomNumber: string;
  createdAt?: string;
}

export default function PaymentsPage() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [rentAmount, setRentAmount] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("email");
      if (email) {
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
            calculateRentAndDueDate(data.booking);
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

  const calculateRentAndDueDate = (bookingData: Booking) => {
    // Rent Calculation
    let rent = 0;
    const type = bookingData.roomType?.toLowerCase();
    
    if (type === 'single') rent = 10000;
    else if (type === 'double' || type === 'two') rent = 8000;
    else if (type === 'four') rent = 6000;
    
    setRentAmount(rent);

    // Due Date Calculation (based on booking date)
    if (bookingData.createdAt) {
      const bookingDate = new Date(bookingData.createdAt);
      // Example: Due 1 month after booking, or same day each month
      const nextDueDate = new Date(bookingDate);
      nextDueDate.setMonth(nextDueDate.getMonth() + 1);
      
      // Format: "October 15, 2023"
      setDueDate(nextDueDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
    } else {
        const today = new Date();
        today.setDate(today.getDate() + 7); // Default to 7 days from now if no date
        setDueDate(today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
    }
  };

  const handlePayRent = async () => {
    alert("Online payments are currently disabled. Please pay at the office.");
  };

  return (
    <div className="flex h-screen bg-primary-background text-text-primary overflow-hidden">
      <ResidentSidebar booking={booking || undefined} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopBar title="Payments" userName={userName} />
        <main className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-secondary-background scrollbar-track-transparent">
          <div className="max-w-5xl mx-auto">
            
            {isLoading ? (
               <div className="flex flex-col items-center justify-center h-96 gap-4">
               <Loader2 className="w-12 h-12 text-accent-blue animate-spin" />
               <p className="text-text-secondary animate-pulse">Loading payment details...</p>
             </div>
            ) : !booking ? (
              <div className="text-center py-20 bg-secondary-background/30 rounded-3xl border border-white/5 backdrop-blur-sm">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Active Booking Found</h2>
                <p className="text-text-secondary max-w-md mx-auto">
                  You need to book a room before you can view payment details. 
                  Please go to the &quot;Book Room&quot; section.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#1a1f3c] to-[#0f1225] border border-white/10 shadow-2xl"
                >
                  {/* Background effects */}
                  <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-accent-purple/20 rounded-full blur-[100px] pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-accent-blue/20 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                      <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-pink-500">
                          ₹{rentAmount.toLocaleString()}
                        </span>
                        <span className="text-2xl md:text-3xl text-text-secondary font-medium ml-2">/ month</span>
                      </h1>
                      <div className="flex items-center gap-3 text-text-secondary mt-2">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium capitalize flex items-center gap-2">
                           <CheckCircle className="w-4 h-4 text-accent-green" />
                           {booking.roomType} Seater Room
                        </span>
                        <span className="text-sm">•</span>
                        <span className="text-sm">Room {booking.roomNumber}</span>
                      </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm min-w-[280px]">
                      <div className="flex items-center gap-3 mb-2 text-text-secondary">
                        <Calendar className="w-5 h-5 text-accent-purple" />
                        <span className="text-sm font-medium uppercase tracking-wider">Next Due Date</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{dueDate}</p>
                      <p className="text-xs text-orange-400 mt-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Upcoming Payment
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                     <Button 
                       onClick={handlePayRent}
                       disabled={isProcessingPayment}
                       className="h-14 px-8 text-lg bg-gradient-to-r from-accent-blue to-accent-purple hover:from-accent-blue/90 hover:to-accent-purple/90 border-0 shadow-lg shadow-accent-blue/25 rounded-xl flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-[1.02]"
                     >
                       {isProcessingPayment ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                       {isProcessingPayment ? "Processing..." : "Pay Rent Now"}
                       {!isProcessingPayment && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                     </Button>
                     <Button 
                       variant="outline" 
                       className="h-14 px-8 text-lg border-white/10 hover:bg-white/5 text-text-primary rounded-xl"
                     >
                       View History
                     </Button>
                  </div>
                </motion.div>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-3xl bg-secondary-background/50 border border-white/5 backdrop-blur-sm"
                  >
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-accent-green" />
                      Payment Breakdown
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Base Rent ({booking.roomType} room)</span>
                        <span className="font-medium">₹{rentAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Maintenance</span>
                        <span className="font-medium">₹0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Mess Charges</span>
                        <span className="font-medium text-green-400">Included</span>
                      </div>
                      <div className="h-px bg-white/10 my-2"></div>
                      <div className="flex justify-between text-base font-bold text-white">
                        <span>Total Payable</span>
                        <span>₹{rentAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>

                   <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-3xl bg-secondary-background/50 border border-white/5 backdrop-blur-sm"
                  >
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-accent-blue" />
                      Payment Policy
                    </h3>
                    <ul className="space-y-3 text-sm text-text-secondary">
                      <li className="flex gap-2">
                        <span className="text-accent-blue">•</span>
                        Rent is due on the date specified above each month.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-accent-blue">•</span>
                        Late payments may incur a fine of ₹100 per day.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-accent-blue">•</span>
                        Online payments are secure and instant.
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
