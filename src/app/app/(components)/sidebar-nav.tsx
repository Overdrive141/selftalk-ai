"use client"; // because it contains a Link item

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SiteLogo from "@/components/ui/site-logo";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { cn } from "@/lib/utils";
import {
  FileCode2,
  HelpCircleIcon,
  HistoryIcon,
  LayoutDashboard,
  Menu,
  Settings,
  SpeakerIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const externalLinks = [
  {
    name: "Privacy Policy",
    href: "https://selftalk.ai/privacy",
    icon: <HelpCircleIcon width={18} />,
    isDisabled: true,
  },
  {
    name: "Read the guide",
    href: "/guide",
    icon: <FileCode2 width={18} />,
    isDisabled: true,
  },
  //   {
  //     name: 'Changelog & Roadmap',
  //     href: 'https://selftalk.ai/roadmap',
  //     icon: <FileCode width={18} />,
  //   }
];

const SidebarNav = ({ className, children, ...props }: SidebarNavProps) => {
  const pathname = usePathname();

  const segments = useSelectedLayoutSegments();

  console.log(segments);

  const { currentUser, refetch } = useCurrentUser();

  useEffect(() => {
    refetch();
  }, [pathname]);

  // when url is "/conversation/id"
  const { id } = useParams() as { id?: string };
  const [conversationId, setConversationId] = useState<string | null>();
  /*
  Enable this when you want to load/fetch conversations when a user clicks on a certain conversation in sidebar
  Notes: initially I will fetch text and audio recordings
  Later it will have only audio recordings when voice cloning is functional

  Source: https://github.dev/vercel/platforms/blob/main/next.config.js


  useEffect(() => {
    if (segments[0] === "conversation" && id) {
        getConversationHistory(conversationId).then((id) => {
            setConversationId(id);
        })
    }
  }, [segments, id])

  */

  /**
   * Current Segments: Dashboard: Initially show onboarding
   * Later show user analytics of their past conversations, have some gamified experiences into it
   *
   * Sidebar items: Dashboard
   * New Conversation
   * Separator
   * Convo History
   *
   * And add feedback loop
   */

  const tabs = useMemo(() => {
    // add dotted lines below conversation history if segments[0] === 'conversations'
    return [
      {
        name: "Dashboard",
        href: "/app/dashboard",
        isActive: segments[0] === "dashboard", // or item.href
        icon: <LayoutDashboard width={18} />,
      },
      {
        name: "Conversation History",
        href: "/app/conversations",
        // isActive: segments[0] === "conversations",
        isActive: false,
        isDisabled: currentUser?.voice_id ? false : true,
        icon: <HistoryIcon width={18} />,
        child: [
          {
            isDisabled: currentUser?.voice_id ? false : true,
            isActive: segments[0] === "conversations",
            name: "Personal Life Coach",
            href: "/app/conversations", // change this to an id later, every user's conversations will be stored as ids which will be foreign key for templates
          },
        ],
      },
      {
        name: "Settings",
        href: "/app/settings",
        isDisabled: true,
        isActive: segments[0] === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, conversationId, id]);

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 left-5 top-5 sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>

      <div
        className={`transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full w-full flex-col justify-between border-r border-accent bg-background p-4 transition-all dark:bg-background shadow-xl shadow-accent drop-shadow-xl sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="rounded-lg px-2 py-1.5">
            <Link
              href="/"
              className="rounded-lg md:w-auto gap-1 p-2 hover:bg-accent/30 flex w-full items-center justify-start"
            >
              {/* <Image
                src="/vercel.svg"
                width={24}
                height={24}
                alt="Logo"
                className="dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
              /> */}
              <SiteLogo />
            </Link>
          </div>

          <div className="grid gap-1">
            {tabs.map(({ name, href, isActive, isDisabled, icon, child }) => (
              <>
                <Link
                  key={name}
                  href={href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    `flex justify-start items-center space-x-3 ${
                      isActive
                        ? "bg-accent-foreground/20  dark:bg-stone-700"
                        : ""
                    } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-accent-foreground/20 active:bg-accent-foreground/20  dark:hover:bg-stone-700 dark:active:bg-stone-800`,
                    isDisabled
                      ? "opacity-50 cursor-not-allowed blur-[1px] pointer-events-none"
                      : ""
                  )}
                >
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </Link>

                {child?.map((item) => (
                  <Link
                    key={item.name}
                    href={item.isDisabled ? "#" : item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      `flex justify-start items-center  ${
                        item.isActive
                          ? "bg-accent-foreground/20  dark:bg-stone-700"
                          : ""
                      } rounded-lg px-4 ml-6 pl-6 transition-all duration-150 ease-in-out hover:bg-accent-foreground/20 active:bg-accent-foreground/20  dark:hover:bg-stone-700 dark:active:bg-stone-800`,
                      item.isDisabled
                        ? "opacity-50 cursor-not-allowed blur-[1px] pointer-events-none"
                        : ""
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                {(name === "Dashboard" || name === "Conversation History") && (
                  <Separator className="my-2" />
                )}
              </>
            ))}
          </div>
        </div>

        <div>
          <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon, isDisabled }) => (
              <a
                key={name}
                href="javascript:void(0);"
                // href={href}
                // target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-accent-foreground/20 active:bg-accent-foreground/20 dark:hover:bg-stone-700 dark:active:bg-stone-800",
                  isDisabled ? "opacity-50 cursor-not-allowed blur-[1px]" : ""
                )}
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))}
          </div>
          <div className="my-2 border-t border-accent/30 dark:border-stone-700" />
          <div className="space-y-2">{children}</div>
        </div>
      </div>
    </>
  );
};

export default SidebarNav;
