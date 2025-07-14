import { Button } from '@/components/ui/button'
import { Binoculars, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <section className='pt-[150px] pb-20 font-body flex flex-col items-center justify-center gap-8'>

            <h1 className='text-[50vw] lg:text-[30vw] leading-none relative'>
                404
                <span
                    className={`badge-1 w-fit p-2 bg-aero-600 text-deep-blue-600 absolute top-[20%] left-4 rounded-full block border-3 border-white z-[2] rotate-15`}
                >
                    <Binoculars />
                </span>
                <span
                    className={`badge-1 w-fit p-2 bg-orange-600 text-orange-200 absolute bottom-0 right-4  rounded-full block border-3 border-white z-[2] rotate-15`}
                >
                    <Search />
                </span>
            </h1>
            <p className='text-xl text-gray-600 text-center'>oops ... looks like that page does not exist</p>
            <Link href="/">
                <Button>
                    Back to Home
                </Button>
            </Link>
        </section>
    )
}

export default NotFound