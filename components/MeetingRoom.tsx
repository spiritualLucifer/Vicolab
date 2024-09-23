import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { LayoutList, User } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

function MeetingRoom() {
    const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
    const [showParticipants, setShowParticipants] = useState(false);
    const layoutVideoType = ['Grid','Speaker-Left','Speaker-Right'];
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');
    const router = useRouter();

    const  {useCallCallingState} = useCallStateHooks();
    const callingState = useCallCallingState();
    if(callingState !== CallingState.JOINED) return <Loader/>

    const CallLayout =()=>{
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout/>
                break;
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition='left'/>
                break;
            default:
                return <SpeakerLayout participantsBarPosition='right'/>
                break;
        }
    }
  return (
    <section className= 'relative h-screen w-full overflow-hidden pt-4 text-white'>
        <div className='relative flex size-full items-center justify-center'>
            <div className='flex size-full max-w-[1000px] items-center'>
                <CallLayout/>
            </div>
            <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipants})}>
                <CallParticipantsList onClose={()=>{
                    setShowParticipants(false);
                }}/>
            </div>
        </div>
        <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
            <CallControls onLeave={()=>router.push('/')}/>
            <DropdownMenu>
                <div className='flex items-center'>
                  <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                    <LayoutList size={20} className='text-white'/>
                  </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
                    {
                        layoutVideoType.map((item,index)=>(
                            <div key={index}>
                                <DropdownMenuItem className='cursor-pointer' onClick={()=>{setLayout(item.toLowerCase() as CallLayoutType)}}>
                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </div>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <CallStatsButton/>
            <Button onClick={()=>setShowParticipants((prev)=>!prev)}>
                <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                    <User size={20} className='text-white'/>
                </div>
            </Button>
            {!isPersonalRoom && <EndCallButton/>}
        </div>
    </section>
  )
}

export default MeetingRoom