'use client'
import ResourceDetailCard from '@/components/resources/resource-detail-card'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { AudioLines, BookOpen } from 'lucide-react'
import React from 'react'

const Sermons = () => {
    return (
        <section className='pt-[100px] font-body flex flex-col gap-16 mb-[100px]'>
            <div className='bg-aero-400 relative h-[30vh] lg:h-[40vh] overflow-hidden flex flex-col justify-center gap-4 px-16'>
                <AudioLines className='text-aero-600 size-[460px] absolute -bottom-12 -right-8 -rotate-[24deg] z-[1] pointer-events-none' />
                <h1 className="text-[56px] leading-[72px] lg:text-[112px] lg:leading-[111px] text-deep-blue-600">Sermons</h1>
                <p className='text-2xl text-deep-blue-600'>Video/audio recordings or downloadable notes of live sermons and teachings.</p>
            </div>
            <div className='flex items-center justify-center'>
                <Input
                    icon="search"
                    placeholder="Search for devotional material"
                    className='md:w-3/5 px-8'
                />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 p-8'>
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                    type='audio'
                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                    type="video"

                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                    type="video"
                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                    type="video"
                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                    type="video"
                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                    type="video"
                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                    type="video"
                />
                <ResourceDetailCard
                    title='The New Creature'
                    description='Stay connected with our vibrant fellowship through upcoming events'
                    author='pastor jerry kan'
                    duration='10 mins read'
                    date='23rd april'
                    type="video"
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
                        <PaginationLink size="xs"> 3 </PaginationLink>
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

export default Sermons