"use client";
import React, { useState, useEffect } from 'react';
import ResidentSidebar from '@/components/ResidentSidebar';
import TopBar from '@/components/TopBar';
import { Button } from '@/components/ui/button';
import SpotlightCard from '@/components/SpotlightCard';
import ShinyText from '@/components/ShinyText';
import Background3D from '@/components/Background3D';

const ComplaintPage = () => {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
     const email = localStorage.getItem("email");
     if (email) {
       fetch("/api/get-user-info", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email }),
       })
         .then((res) => res.json())
         .then((data) => {
           if (data.user) setUserName(data.user.name);
         })
         .catch((err) => console.error("Error fetching user info:", err));
     }
   }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const email = localStorage.getItem("email");
    if (!email) {
      setMessage("Error: You must be logged in.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/raise-complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          residentId: email,
          description,
        }),
      });

      if (response.ok) {
        setMessage('Complaint raised successfully!');
        setDescription('');
        // Optional: Redirect or just show success
      } else {
        const data = await response.json();
        setMessage(`Error: ${data.message || 'Failed to raise complaint'}`);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setMessage('Error: Failed to submit complaint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-background-dark text-text-primary overflow-hidden">
      <ResidentSidebar />
      <div className="flex-1 flex flex-col relative">
        <Background3D />
        <div className="relative z-10 flex flex-col h-full pointer-events-none">
          <div className="pointer-events-auto">
             <TopBar title="Raise a Complaint" userName={userName} />
          </div>
          <main className="flex-1 flex flex-col items-center justify-center p-8 pointer-events-auto">
            <SpotlightCard className="w-full max-w-2xl !bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl">
              <div className="mb-8 text-center">
                <ShinyText text="Describe your issue" speed={3} className="text-3xl font-bold justify-center" />
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Complaint Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please provide details about the issue..."
                    className="w-full p-4 border rounded-xl bg-black/40 text-white placeholder-gray-500 border-white/10 focus:outline-none focus:border-purple-500 min-h-[150px] resize-none transition-all duration-300 focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                </div>

                {message && (
                  <div className={`p-4 rounded-lg backdrop-blur-sm ${message.includes('Error') ? 'bg-red-500/20 text-red-200 border border-red-500/30' : 'bg-green-500/20 text-green-200 border border-green-500/30'}`}>
                    {message}
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                </Button>
              </form>
            </SpotlightCard>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ComplaintPage;