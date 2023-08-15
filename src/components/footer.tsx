"use client";

const Footer = () => (
  <section className="bg-black">
    <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mt-8">
        <div className="w-full h-full">
          <p className="cursor-default text-xl lg:text-4xl text-zinc-200 tracking-[-0.1rem] font-200 text-foreground">
            141 Studios
          </p>
        </div>
        <div className="self-center text-center w-full">
          <p className="leading-6 font-inter text-xs md:text-sm tracking-widest text-muted-foreground">
            {" "}
            All Rights Reserved
          </p>
        </div>

        <div className="w-full">
          <p className="leading-6 text-xs md:text-sm lg:text-base text-right text-gray-400">
            © 2023
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Footer;
