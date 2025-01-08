"use client";
import { SignedIn } from '@clerk/nextjs'
import SideNavBar from './_components/SideNavBar'
import React from 'react'
import { ReactNode } from 'react';

function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <SignedIn>
            <div>
                <div className='md:w-64 fixed'> 
                 <SideNavBar></SideNavBar>
                </div>
                <div className='md:ml-64'>
                    {children}
                </div>
            </div>
        </SignedIn>
    )
}

export default DashboardLayout
