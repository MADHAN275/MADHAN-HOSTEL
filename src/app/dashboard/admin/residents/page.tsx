"use client";

import AdminSidebar from "@/components/AdminSidebar";
import TopBar from "@/components/TopBar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, User, BedDouble, Hash, Loader2 } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import ShinyText from "@/components/ShinyText";

interface Resident {
  _id: string;
  residentId: string;
  name: string;
  email: string;
  room: {
    roomType: string;
    roomNumber: string;
  } | null;
}

export default function ResidentsPage() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await fetch('/api/get-residents');
        if (response.ok) {
          const data = await response.json();
          setResidents(data);
        }
      } catch (error) {
        console.error('Error fetching residents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResidents();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex h-screen bg-primary-background text-text-primary overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopBar title="Residents Directory" userName="MADHAN" role="Administrator" />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-secondary-background scrollbar-track-transparent">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <ShinyText 
                  text="Resident Details" 
                  disabled={false} 
                  speed={3} 
                  className="text-3xl md:text-4xl font-bold mb-2 block" 
                />
                <p className="text-text-secondary">Manage and view all registered residents</p>
              </div>
            </div>

            {/* Content */}
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-10 h-10 text-accent-blue animate-spin" />
              </div>
            ) : residents.length === 0 ? (
              <div className="text-center py-20 bg-secondary-background/30 rounded-2xl border border-secondary-background border-dashed">
                <User className="mx-auto h-12 w-12 text-text-muted mb-4" />
                <h3 className="text-xl font-medium text-text-primary">No residents found</h3>
                <p className="text-text-secondary mt-1">There are no registered residents yet.</p>
              </div>
            ) : (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {residents.map((resident) => (
                  <motion.div key={resident._id} variants={item}>
                    <SpotlightCard className="h-full !p-0 !bg-secondary-background/40 !border-white/5 hover:!border-accent-blue/30 transition-colors group">
                      <div className="p-6 h-full flex flex-col relative z-10">
                        {/* Header of Card */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-accent-blue/20">
                              {resident.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-text-primary group-hover:text-accent-blue transition-colors line-clamp-1">
                                {resident.name}
                              </h3>
                              <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono mt-0.5">
                                <Hash className="w-3 h-3" />
                                <span>{resident.residentId}</span>
                              </div>
                            </div>
                          </div>
                          {resident.room ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent-green/10 text-accent-green border border-accent-green/20">
                              Active
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent-crimson/10 text-accent-crimson border border-accent-crimson/20">
                              No Room
                            </span>
                          )}
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-white/5 my-2" />

                        {/* Details */}
                        <div className="space-y-3 mt-2 flex-grow">
                          <div className="flex items-center gap-3 text-sm group/item">
                            <div className="p-2 rounded-lg bg-white/5 text-text-muted group-hover/item:text-accent-blue group-hover/item:bg-accent-blue/10 transition-colors">
                              <Mail className="w-4 h-4" />
                            </div>
                            <span className="text-text-secondary truncate">{resident.email}</span>
                          </div>

                          <div className="flex items-center gap-3 text-sm group/item">
                            <div className="p-2 rounded-lg bg-white/5 text-text-muted group-hover/item:text-accent-purple group-hover/item:bg-accent-purple/10 transition-colors">
                              <BedDouble className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-text-secondary">
                                {resident.room ? `Room ${resident.room.roomNumber}` : "Not assigned"}
                              </span>
                              {resident.room && (
                                <span className="text-xs text-text-muted">{resident.room.roomType}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Footer Action (Optional, visual only for now) */}
                        <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                          <button className="text-xs font-medium text-text-muted hover:text-accent-blue transition-colors flex items-center gap-1">
                            View Profile &rarr;
                          </button>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
