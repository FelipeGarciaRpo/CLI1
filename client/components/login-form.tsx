"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import {Card, CardContent} from "./ui/card";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Button } from "./ui/button";

export const LoginForm = ()=>{
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
     const [isHovered, setIsHovered] = useState(false);
    const handleGithubLogin = () => {
        setIsLoading(true);
        // Simular login - en tu código real usarías authClient.signIn.social
        setTimeout(() => setIsLoading(false), 2000);
    };
    return(
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
        {/* Logo and Title */}
        <div className="text-center mb-4 space-y-6">
            <Image src={"/logo2.png"} alt="Login image" height={400} width={400}/>
        </div>

        {/* Login Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-white rounded-2xl blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
          
          <div className="relative bg-zinc-950/90 backdrop-blur-xl rounded-2xl border border-zinc-800/50 shadow-2xl p-8">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">Welcome back</h2>
                <p className="text-zinc-500 text-sm">Sign in to continue to your terminal</p>
              </div>

              <button
                onClick={()=> authClient.signIn.social({
                    provider: "github",
                    callbackURL: "http://localhost:3000"
                })}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                disabled={isLoading}
                className="relative w-full group/button overflow-hidden rounded-xl bg-white ring-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative bg-black rounded-[11px] px-6 py-4 flex items-center justify-center gap-3 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/0 via-zinc-800/50 to-zinc-900/0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
                  
                  {isLoading ? (
                    <div className="relative flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-white font-semibold">Connecting...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover/button:scale-110" viewBox="0 0 24 24" fill="white">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="relative z-10 text-white font-semibold text-lg">Continue with GitHub</span>
                    </>
                  )}
                </div>
              </button>

                <button
                onClick={()=> authClient.signIn.social({
                    provider: "google",
                    callbackURL: "http://localhost:3000"
                })}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                disabled={isLoading}
                className="relative w-full group/button overflow-hidden rounded-xl bg-white ring-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative bg-black rounded-[11px] px-6 py-4 flex items-center justify-center gap-3 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/0 via-zinc-800/50 to-zinc-900/0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
                  
                  {isLoading ? (
                    <div className="relative flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-white font-semibold">Connecting...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                      <span className="relative z-10 text-white font-semibold text-lg">Continue with Google</span>
                    </>
                  )}
                </div>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-zinc-950 px-2 text-zinc-600">Secure Authentication</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-zinc-600 text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <span>Protected by enterprise-grade security</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-zinc-600 text-sm">
            By continuing, you agree to our{" "}
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Terms</a>
            {" "}and{" "}
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</a>
          </p>
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

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
    )
}