"use client";

import { LoginForm } from '@/components/login-form'
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {

    const {data,isPending} = authClient.useSession()
    const router = useRouter();
    
    useEffect(() => {
        // Solo redirigir si NO hay carga pendiente y hay sesión
        if (!isPending && data?.session) {
            router.push("/");
        }
    }, [data, isPending, router]);

    if(isPending){
        return(
          <div className="flex flex-col items-center justify-center h-screen">
            <Spinner/>
          </div>
        )
    }

    if (data?.session) return null;
    
  return (
    <>
        <LoginForm/>
    </>
  )
}

export default Page