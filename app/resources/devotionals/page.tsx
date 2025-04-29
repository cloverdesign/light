'use client'
import ResourceDetailCard from '@/components/resources/resource-detail-card'
import ResourceDetailNewCard from '@/components/resources/resource-detail-new-card'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { BookOpen } from 'lucide-react'
import React from 'react'

const Devotionals = () => {
    return (
        <section className='pt-[100px] font-body flex flex-col gap-16 mb-[100px]'>
            <div className='bg-yellow-400 relative h-[30vh] lg:h-[40vh] overflow-hidden flex flex-col justify-center gap-4 px-16'>
                <h1 className="text-[56px] leading-[72px] lg:text-[112px] lg:leading-[111px] text-yellow-1100">Devotionals</h1>
                <p className='text-2xl text-yellow-1000'>Weekly or monthly posts to encourage spiritual growth.</p>
                <BookOpen className='text-yellow-600 size-[460px] absolute -bottom-12 -right-8 -rotate-[24deg] z-[1] pointer-events-none' />
            </div>
            <div className='flex items-center justify-center'>
                <Input
                    icon="search"
                    placeholder="Search for devotional material"
                    className='md:w-3/5 px-8'
                />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-8'>
                <ResourceDetailNewCard
                    title='The New Creature'
                    description='When we come to Christ, something incredible happens not just around us, but within us. We are not merely people who believe differently now; we are people who are different. The Bible tells us we become a new creation. That’s not symbolic language. That’s spiritual reality...'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                    className='md:col-span-2 lg:col-span-3'
                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                />
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious>
                            back
                        </PaginationPrevious>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink isActive size="xs"> 1 </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink size="xs"> 2 </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis></PaginationEllipsis>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink size="xs"> 80 </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext>
                            next
                        </PaginationNext>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>

    )
}

export default Devotionals