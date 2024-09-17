'use client'
import React,{useState} from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal';

function MeetingTypeList() {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isSchedulingMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()

    const createMeeting = () =>{

    }

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                img = "/icons/add-meeting.svg"
                title = "New Meeting"
                description = "Start an instant Meeting"
                handleClick = {() =>{
                    setMeetingState('isInstantMeeting')
                }}
                className = "bg-orange-1"
            />
            <HomeCard
                img = "/icons/Schedule.svg"
                title = "Schedule Meeting"
                description = "Plane Your meeting"
                handleClick = {() =>{
                    setMeetingState('isSchedulingMeeting')
                }}
                className = "bg-blue-1"
            />
            <HomeCard
                img = "/icons/recordings.svg"
                title = "View Recoded Meetings"
                description = "Check Your Recoding"
                handleClick = {() =>{
                    router.push('/recoding')
                }}
                className = "bg-purple-1"
            />
            <HomeCard
                img = "/icons/join-meeting.svg"
                title = "Join Meeting"
                description = "Via Invitaion Link"
                handleClick = {() =>{
                    setMeetingState('isJoiningMeeting')
                }}
                className = "bg-yellow-1"
            />
            <MeetingModal
                isOpen = {meetingState === 'isInstantMeeting'}
                onClose = {()=>setMeetingState(undefined)}
                title = "Start an Instant Meetings"
                className = "text-center"
                buttonText = "Start Meeting"
                handleClick = {createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList