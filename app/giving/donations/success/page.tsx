'use client'
import Image from 'next/image'
import React from 'react'
import success from '@/assets/images/success.png'
import {
    motion,
} from "motion/react";

const Success = () => {
    return (
        <section className='h-screen font-body flex flex-col items-center justify-center'>
            <Image
                src={success}
                alt='Success image'
                width={200}
            />
            <div className="overflow-y-hidden text-center">
                <motion.h1
                    data-animate="heading1"
                    initial={{ y: '100%' }}
                    whileInView={{ y: 0 }}
                    className="text-[35px] leading-[48px] lg:text-[56px] lg:leading-[72px]"
                >
                    <span className="relative inline-block mr-5 w-fit h-fit mt-6 ml-6">
                        You&lsquo;re the best
                    </span>
                </motion.h1>
                <p className="text-base mt-4 max-w-xl mx-auto text-muted-foreground">
                    Thank you for your donation! Your support strengthens our community and spreads hope. May God bless you for your kindness.
                </p>
            </div>
        </section>
    )
}

export default Success