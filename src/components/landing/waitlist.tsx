"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import WaitlistResult from "./waitlist-form";
import { db } from "@/lib/kysely";
import { joinWaitlist } from "@/lib/actions";

import Loader from "../ui/loader";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cookies } from "next/headers";

const formSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export default function Waitlist() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // const res = await joinWaitlist(values.email);
    const res = await fetch("/api/add-user", {
      method: "POST",
      body: JSON.stringify(values),
    }).then((res) => res.json());
    // console.log("Res?", JSON.stringify(res.error));
    if ("error" in res || res.status >= 400) {
      // 'duplicate key value violates unique constraint "users_email_key"'
      if (res.error.startsWith("duplicate")) {
        form.setError("email", {
          message: "You are already on the waitlist.",
        });
      } else if (res.error.startsWith("Unfortunately, all 1000")) {
        form.setError("email", {
          message: res.error,
        });
      } else {
        form.setError("email", {
          message: "Something went wrong. Please try again",
        });
      }
    } else {
      toast("Submitted");
      setData(res[0]);
      console.log(res);
      // cookies.set('submitted', true);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex justify-center mt-10 md:mt-0">
      {!isSubmitted ? (
        // <div className="flex flex-col md:flex-row w-full justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row w-full md:self-center md:items-center gap-2 justify-center"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    <Input
                      placeholder="Enter your email"
                      className="w-full md:w-[400px]"
                      {...field}
                      // className="border-zinc-500 w-full"
                    />
                  </FormControl>

                  <FormMessage className="md:absolute md:w-[400px]" />
                </FormItem>
              )}
            />

            <div className="p-0 md:px-10 self-center mt-5 md:mt-0">
              <Button
                variant="ghost"
                className="border waiting-list-btn hover:bg-backlight-gradient hover:text-primary/50 hover:blur-xs"
                // onClick={() => setIsSubmitted(fatruelse)}
                type="submit"
              >
                {form.formState.isSubmitting ? <Loader /> : "Join the Waitlist"}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        // </div>
        // <Suspense fallback={<Loader />}>
        <div className="animate-fade flex flex-col gap-4 space-y-8">
          <WaitlistResult waitlistCount={data.id} uuid={data.uuid} />
        </div>
        // </Suspense>
      )}
    </div>
  );
}
