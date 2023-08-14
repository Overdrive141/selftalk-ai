"use client";

// import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const steps = [
  {
    title: "1. Train Your Voice",
    label: "Speak the given words for 30 seconds",
  },
  {
    title: "2. Ask a Question",
    label:
      "Are you stuck in a situation? Simply ask: 'I am currently stuck in <situation>, what are my options?",
  },
  {
    title: "3. Get Your Answers",
    label: "Receive answers back in your own voice",
  },
];

export function StepCard() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Step 1</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4"></CardContent>
      <CardFooter>
        {/* <Button className="w-full">Create account</Button> */}
      </CardFooter>
    </Card>
  );
}

// Step 1:
// Train Your Voice

/**
 * Step 2:
 *  Ask yourself a question
 *
 * Step 3: Get your answers
 */

/**
 * About:
 *
 * We don't keep anything data and anything on you. Everything is handled on your own servers. You own your data and your voice.
 *
 *
 * Pricing: Free for first 3 uses
 *
 * Interested? Stay informed: <TextInput placeholder="ENter your email">
 *
 * // When customer presses submits email => we will show them "You are number 1 on the waitlist. Want to get higher? Share this link:"
 *
 * Have feedback or custom requests? Contact us at: support@selftalk.ai
 *
 * // We wont send you any unncessary emails.
 */

/**
 * Self talk has been regarded as one of the most therapeutic things according to research. Find peace, build your confidence and build a relationship with yourself
 */

/**
 *
 * For the training process:
 *
 * There will be 3 buttons horizontally in a flexbox.
 *
 * [Train] => the other 2 buttons will be disabled
 *
 * We'll show them a paragraph in a modal when they click on Train that they have to speak with their microphone
 * the paragraph appears sentence by sentence and automatically scrolls down as they speak. We can highlight the words too for the user so it is easy for them to speak.
 *
 * Once the 30 seconds conclude, we show them a loading indicator and a checkmark when training has completed then a next button appears where they are taken to the dashboard
 * // Dashboard has to be inspired by https://app.vercel.pub/
 * // Sidebar has Past Conversations => We will show the chat history as audio recordings
 *
 */
