"use client";

import { useRouter } from "next/navigation";
import Silk from "@/components/Silk";
import SpotlightCard from "@/components/SpotlightCard";
import { Montserrat } from 'next/font/google';
import ShinyText from '@/components/ShinyText';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Home() {
  const router = useRouter();

  const handleCardClick = (role: string) => {
    router.push(`/login?role=${role}`);
  };

  return (
    <main className="relative flex flex-col min-h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <nav className="relative z-10 flex items-center justify-between p-4">
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-4">
        <ShinyText 
  text="MADHAN HOSTEL" 
  disabled={false} 
  speed={3} 
  className={`text-4xl md:text-6xl font-bold text-text-primary mb-8 md:mb-12 uppercase ${montserrat.className}`} 
/>
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center px-4">
          <SpotlightCard
            className="p-8 md:p-12 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 cursor-pointer w-full max-w-sm"
            onClick={() => handleCardClick('admin')}
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Admin</h2>
          </SpotlightCard>
          <SpotlightCard
            className="p-8 md:p-12 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 cursor-pointer w-full max-w-sm"
            onClick={() => handleCardClick('resident')}
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Resident</h2>
          </SpotlightCard>
        </div>

        <div className="mt-8 md:mt-16 p-4 md:p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 w-full max-w-4xl text-left">
          <h3 className="text-2xl font-bold text-text-primary mb-4">Announcements</h3>
          <p className="text-text-secondary">
            - Welcome to the MADHAN HOSTEL. Please select your role to login.
          </p>
          <p className="text-text-secondary mt-2">
            - The new mess menu for the month of December is now available in the resident portal.
          </p>
        </div>
      </div>
    </main>
  );
}
