"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const {data,isPending} = authClient.useSession()
  const router = useRouter();
  
  useEffect(() => {
    // Si no hay sesión y terminó de cargar, ve a login
    if (!isPending && !data?.session) {
      router.push("/sign-in");
    }
  }, [data, isPending, router]);

  if(isPending){
    return(
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner/>
      </div>
    )
  }

  if (!data?.session) return null;

  return (
<div className="min-h-screen w-full bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-zinc-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-zinc-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-zinc-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* User Profile Card */}
        <div className="relative group mb-6">
          <div className="absolute -inset-0.5 bg-white rounded-3xl blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
          
          <div className="relative bg-zinc-950/90 backdrop-blur-xl rounded-3xl border border-zinc-800/50 shadow-2xl p-8">
            {/* Avatar Section */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-10 animate-pulse"></div>
                <img
                  src={data?.user?.image || "/logo2.png"}
                  alt={data?.user?.name || "User"}
                  className="relative w-28 h-28 rounded-full border-2 border-zinc-700 object-cover shadow-xl"
                />
                {/* Status indicator */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-4 border-zinc-950 shadow-lg">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-white truncate">
                {data?.user?.name || "Guest"}
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded-full">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <p className="text-xs text-zinc-400 font-medium">Active Session</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Card */}
        <div className="relative group mb-6">
          <div className="absolute -inset-0.5 bg-white rounded-2xl blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
          
          <div className="relative bg-zinc-950/90 backdrop-blur-xl rounded-2xl border border-zinc-800/50 shadow-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-500 tracking-wide uppercase mb-1">
                  Email Address
                </p>
                <p className="text-base text-white font-medium break-all">
                  {data?.user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <Button
            onClick={()=>authClient.signOut({
              fetchOptions: {
                onError: (ctx)=>console.log(ctx),
                onSuccess: ()=> router.push("/sign-in")
              }
            })}
            className="w-full h-11 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
          >
            Sign Out
      </Button>

        {/* Session Info */}
        <div className="flex items-center gap-3 px-4 mt-5">
          <div className="flex-1 h-px bg-zinc-800"></div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-zinc-600 font-medium">Terminal Connected</span>
          </div>
          <div className="flex-1 h-px bg-zinc-800"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}


