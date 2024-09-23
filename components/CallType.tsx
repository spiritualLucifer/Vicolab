'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import Loader from './Loader'

function CallType({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) {
  const { endedCalls, callRecordings, upcomingCalls, isLoading } = useGetCalls();
  const router = useRouter();
  const [recording, setRecording] = useState<CallRecording[]>([]);

  if(isLoading)return <Loader/>

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recording;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'recordings':
        return 'No Recordings';
      case 'upcoming':
        return 'No Upcoming Calls';
      default:
        return '';
    }
  };

  const calls = getCalls();
  const callsMessage = getNoCallMessage();

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording, index: number) => (
          <MeetingCard 
              key={(meeting as Call).id}
              icon={
                type === 'ended'
                  ? '/icons/previous.svg'
                  : type === 'upcoming'
                    ? '/icons/upcoming.svg'
                    : '/icons/recordings.svg'
              }
              title={
                (meeting as Call).state?.custom?.description ||
                (meeting as CallRecording).filename?.substring(0, 20) ||
                'No Description'
              }
              date={
                (meeting as Call).state?.startsAt?.toLocaleString() ||
                (meeting as CallRecording).start_time?.toLocaleString()
              }
              isPreviousMeeting={type === 'ended'}
              link={
                type === 'recordings'
                  ? (meeting as CallRecording).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
              }
              buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
              buttonText={type === 'recordings' ? 'Play' : 'Start'}
              handleClick={
                type === 'recordings'
                  ? () => router.push(`${(meeting as CallRecording).url}`)
                  : () => router.push(`/meeting/${(meeting as Call).id}`)
              }
           />
        ))
      ) : (
        <h1>{callsMessage}</h1>
      )}
    </div>
  );
}

export default CallType;
