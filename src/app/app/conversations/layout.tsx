import PageWrapper from "@/components/page-layout-wrapper";

export default function ConversationsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <div className="h-[calc(100vh-40px)] w-full">{children}</div>;
}
