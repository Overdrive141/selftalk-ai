import { Suspense } from "react";
import SidebarNav from "./(components)/sidebar-nav";
import ProfileLogout from "./(components)/profile-logout";
import PageWrapper from "@/components/page-layout-wrapper";
import { ModeToggle } from "@/components/ui/theme-button";

export default function AppLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100vh-40px)] w-full">
      {/* sidebar nav here with dashboard popping out as a shadowed past
      conversations after a heading
        Initially dashboard will have the steps user will have to take

        Finish steps and teleprompter UI


        Initially take user speech => convert to text using Whisper and then show answer of AI in text
        Later we can incorporate Eleven Labs or Voice Clone to feed it
     */}
      {/* <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0"> */}
      {/* <aside className="-mx-4 border-r-2 border-red-50 lg:w-1/5 shadow-xl h-[calc(100vh-330px)]"> */}
      <SidebarNav>
        <ModeToggle />
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileLogout />
        </Suspense>
      </SidebarNav>

      <PageWrapper>{children}</PageWrapper>
    </div>
  );
}
