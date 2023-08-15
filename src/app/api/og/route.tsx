import { ImageResponse } from 'next/server';
// App router includes @vercel/og.
// No need to install it.
 
export const runtime = 'edge';
 
export async function GET() {
  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >

        <div
         // style={{ scale, x: "-50%", position }}
          className="left-1/2 z-10 flex flex-col items-center relative w-full"
        >
      
          <h1 tw="text-center font-semibold font-heading text-3xl leading-[1]">
            SelfTalk <span className="text-zinc-500"> AI</span>
           
          </h1>
          <h2 tw="mb-12 mt-5 text-muted-foreground animate-fade animate-delay-300">
            Seek guidance from within
          </h2>
        </div>

         
        
       
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
