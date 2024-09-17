'use client'
import React,{useState} from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/hooks/use-toast"


function MeetingTypeList() {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isSchedulingMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()

    const user = useUser();
    const client =  useStreamVideoClient();
    const [values,setValues] = useState({
        dateTime:new Date(),
        description:"",
        link:""
    })
    const [callDetails, setCallDetails] = useState<Call>()
    const { toast } = useToast()


    const createMeeting = async() =>{
        if(!user || !client)return;
        try {
            if(!values){
                toast({
                    title: "Please Select Date and the Time",
                })
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default',id);
            if(!call)throw new Error("Call Failed");
            const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant Meeting";
            await call.getOrCreate({
                data:{
                    starts_at:startAt,
                    custom:{
                        description
                    }
                }
            })
            setCallDetails(call);
            if(!values.description){
                router.push(`/meeting/${call.id}`);
            }
            toast({
                title: "Meeting Created",
           })
        } catch (error) {
            console.log(error)
            toast({
                title: "Error in creating the Call",
            })
      
        }
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