"use client";

import { TrainingModal } from "./components/training-modal";
import { OnboardingCard } from "./components/onboarding-card";
import { HistoryIcon, Mic2Icon, PhoneCallIcon } from "lucide-react";

import { useState } from "react";
import { ConversationTemplatesModal } from "./components/conversation-templates-modal";

const DashboardPage = () => {
  const [open, setOpen] = useState(false);

  const [voiceRegistered, setVoiceRegistered] = useState(false);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Dashboard</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-0 lg:grid-cols-5 items-center w-full ">
        <OnboardingCard
          description="Click to get started"
          title="1. Register Your Voice"
          isEnabled={true}
          icon={<Mic2Icon width={40} height={40} />}
          open={open}
          setOpen={setOpen}
        >
          <TrainingModal
            setOpen={setOpen}
            open={open}
            setVoiceRegistered={setVoiceRegistered}
          />
        </OnboardingCard>

        <div className="justify-center hidden lg:flex">
          <svg
            viewBox="0 0 30 12"
            xmlns="http://www.w3.org/2000/svg"
            className="accent"
            stroke={voiceRegistered ? "#cecece" : "#171717"}
            // width={300}
            height={50}
          >
            <line x1="0" y1="3" x2="30" y2="3" strokeDasharray="4" />
          </svg>
        </div>

        <OnboardingCard
          description="Get started with our preconfigured options"
          title="2. Start New Conversation"
          isEnabled={voiceRegistered}
          icon={<PhoneCallIcon width={40} height={40} />}
          // open={open}
          // setOpen={setOpen}
        >
          <ConversationTemplatesModal setOpen={setOpen} />
        </OnboardingCard>

        <div className="hidden lg:flex justify-center">
          <svg
            viewBox="0 0 30 12"
            xmlns="http://www.w3.org/2000/svg"
            className="accent"
            stroke={voiceRegistered ? "#cecece" : "#171717"}
            // width={200}
            // width={10}
            height={50}
          >
            <line x1="0" y1="3" x2="30" y2="3" strokeDasharray="4" />
          </svg>
        </div>

        {/* <div className="flex max-w-sm"> */}
        <OnboardingCard
          description="Revisit past conversations and resume from where you left off"
          title="3. View Your History"
          isEnabled={false}
          icon={<HistoryIcon width={40} height={40} />}
          // open={open}
          // setOpen={setOpen}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
