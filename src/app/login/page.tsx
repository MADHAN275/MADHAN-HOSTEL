"use client";

import { useSearchParams } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import LightRays from '@/components/LightRays';
import { Suspense } from 'react';

type Role = "admin" | "resident";

export default function LoginPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      <div className="relative z-10">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthFormWrapper />
        </Suspense>
      </div>
    </div>
  );
}

function AuthFormWrapper() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as Role;

  return <AuthForm role={role || 'resident'} />;
}
