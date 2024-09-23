'use client'
import React,{useState} from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/hooks/use-toast"
import { Textarea } from './ui/textarea';
import ReactDatePiker from "react-datepicker"
import { Input } from "@/components/ui/input"



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

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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
                    router.push('/recording')
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

            {
                !callDetails?(
                    <MeetingModal
                    isOpen = {meetingState === 'isSchedulingMeeting'}
                    onClose = {()=>setMeetingState(undefined)}
                    title = "Schedule Meeting"
                    handleClick = {createMeeting}
                >
                    <div className='flex flex-col gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>Add Description</label>
                        <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e)=>{
                            setValues({...values,description:e.target.value})
                        }}/>
                    </div>
                    <div className='flex w-full flex-col gap-2.5'>
                       <label className='text-base text-normal leading-[22px] text-sky-2'>Select Date</label>
                       <ReactDatePiker
                        selected={values.dateTime}
                        onChange={(date)=>setValues({...values,dateTime:date!})}
                        showTimeSelect
                        timeFormat='HH:mm'
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className='w-full rounded bg-dark-3 p-2 focus:outline-none cursor-pointer'
                       />
                    </div>
                </MeetingModal>
                ):(
                    <MeetingModal
                    isOpen = {meetingState === 'isSchedulingMeeting'}
                    onClose = {()=>setMeetingState(undefined)}
                    title = "Meeting Created"
                    className = "text-center"
                    buttonText='Copy Meeting Link'
                    handleClick = {()=>{
                        navigator.clipboard.writeText(meetingLink)
                        toast({title:"Link Copied"});
                    }}
                    image='/icons/checked.svg'
                    buttonIcon='/icons/copy.svg'
                />
                )
            }
            <MeetingModal
                isOpen = {meetingState === 'isInstantMeeting'}
                onClose = {()=>setMeetingState(undefined)}
                title = "Start an Instant Meetings"
                className = "text-center"
                buttonText = "Start Meeting"
                handleClick = {createMeeting}
            />
             <MeetingModal
                isOpen = {meetingState === 'isJoiningMeeting'}
                onClose = {()=>setMeetingState(undefined)}
                title = "Past the Link Here"
                className = "text-center"
                buttonText = "Join Meetings"
                handleClick = {()=>router.push(values.link)}
            >
                <Input className='text-white bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e)=>setValues({...values,link:e.target.value})}/>
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList