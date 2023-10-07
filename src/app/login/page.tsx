"use client";

import AuthForm from "@/app/app/(components)/auth-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
      <div className="items-center justify-center gap-6 rounded-lg p-8 flex h-[80vh]">
        <div className="col-span-2 grid items-center gap-6 lg:col-span-1">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your email below to receive a login link
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase"></div>
              </div>
              <AuthForm />
            </CardContent>
            {/* <CardFooter>
        <Button className="w-full">Create account</Button>
      </CardFooter> */}
            {/* <div className="col-6 auth-widget"> */}
          </Card>
        </div>
      </div>
    </div>
  );
}
