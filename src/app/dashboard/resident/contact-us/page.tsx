"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ResidentSidebar from "@/components/ResidentSidebar";
import TopBar from "@/components/TopBar";
import { Loader2, Mail, MapPin, AlertCircle, MessageCircle } from "lucide-react";

export default function ContactUsPage() {
  const [userName, setUserName] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          }

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

  const categories = [
    "Personal or roommate-related concerns",
    "Maintenance issues (water, electricity, furniture, etc.)",
    "Cleanliness or hygiene-related problems",
    "Safety or security concerns",
    "Suggestions to improve hostel facilities",
    "Any other support you may need",
    "Feedback on mess food quality",
    "Internet or Wi-Fi connectivity issues",
    "Laundry service inquiries"
  ];

  return (
    <div className="flex h-screen bg-primary-background text-text-primary overflow-hidden">
      <ResidentSidebar booking={booking || undefined} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopBar title="Contact Us" userName={userName} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-secondary-background scrollbar-track-transparent">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-10 h-10 text-accent-blue animate-spin" />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Info & Context */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple">
                    We’re Here to Help
                  </h1>
                  <p className="text-lg text-text-secondary leading-relaxed mb-6">
                    I am <span className="text-text-primary font-semibold">Madhan T</span>, Founder of MADHAN HOSTEL.
                    My goal is to ensure that your stay with us is as comfortable and hassle-free as possible. 
                    Whether you are facing personal challenges, room-related issues, or have concerns about our facilities, 
                    I encourage you to reach out. We are committed to maintaining a safe, inclusive, and supportive environment for all residents.
                  </p>
                  <p className="text-lg text-text-secondary leading-relaxed mb-6">
                    We understand that living away from home comes with its own set of challenges. 
                    That implies our team is always ready to listen and act. Your feedback is invaluable to us—it helps us 
                    continuously improve our services and create a better community for everyone.
                    Do not hesitate to connect with us; your well-being is our top priority.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-accent-green">You can contact us for:</h3>
                  <ul className="space-y-3">
                    {categories.map((cat, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 text-text-secondary"
                      >
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-accent-blue flex-shrink-0" />
                        {cat}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-1">Urgent Issue?</h4>
                    <p className="text-text-secondary text-sm">
                      If it is an urgent issue (e.g., medical emergency, severe maintenance failure), please contact the warden or hostel office directly immediately.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Contact Links (Replaces Form) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-secondary-background/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center"
              >
                {/* Decorative background blobs */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />

                <h2 className="text-2xl font-bold mb-6 relative z-10 text-center">Get in Touch</h2>
                <p className="text-text-secondary mb-10 text-center relative z-10">
                  Connect with us directly via WhatsApp or Email. We try to respond to all inquiries within 24 hours.
                </p>

                <div className="space-y-6 relative z-10">
                  {/* WhatsApp Contact */}
                  <a 
                    href="https://wa.me/919080688119" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/50 rounded-2xl transition-all group"
                  >
                    <div className="bg-green-500/20 p-4 rounded-full mr-6 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">WhatsApp Us</h3>
                      <p className="text-text-secondary text-sm">Chat directly for quick support</p>
                      <p className="text-accent-green text-sm mt-1">+91 9080688119</p>
                    </div>
                  </a>

                  {/* Email Contact */}
                  <a 
                    href="mailto:madhantamilarasan80@gmail.com"
                    className="flex items-center p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent-blue/50 rounded-2xl transition-all group"
                  >
                    <div className="bg-accent-blue/20 p-4 rounded-full mr-6 group-hover:scale-110 transition-transform">
                      <Mail className="w-8 h-8 text-accent-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Email Support</h3>
                      <p className="text-text-secondary text-sm">For detailed queries & feedback</p>
                      <p className="text-accent-blue text-sm mt-1">madhantamilarasan80@gmail.com</p>
                    </div>
                  </a>

                  {/* Office Visit */}
                   <div className="flex items-center p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="bg-purple-500/20 p-4 rounded-full mr-6">
                      <MapPin className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Visit Office</h3>
                      <p className="text-text-secondary text-sm">Ground Floor, Main Building</p>
                      <p className="text-purple-400 text-sm mt-1">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>

                  {/* Google Map Embed */}
                  <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0000000000005!2d80.20000000000000!3d13.00000000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzAwLjAiTiA4MMKwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}