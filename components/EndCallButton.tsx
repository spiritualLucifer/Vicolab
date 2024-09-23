import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';

function EndCallButton() {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

  const handleClick = async() => {
    if (isMeetingOwner) {
      await call.endCall();
      router.push('/');
    } else {
      await call?.leave();
      router.push('/');
    }
  };
  return (
    <Button onClick={handleClick} className='bg-red-500'>
      {isMeetingOwner ? "End Call For Everyone" : "Leave Call"}
    </Button>
  );
}

export default EndCallButton;
