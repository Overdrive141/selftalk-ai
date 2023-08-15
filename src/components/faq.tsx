const Faq = () => (
  <section className=" bg-backlight-gradient from-backlightCenter to-backlightEdge text-foreground py-20 px-10">
    <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
      {/* <p className="p-2 text-sm font-medium tracki text-center uppercase">
        How it works
      </p> */}
      <h2 className="mb-12 text-2xl font-bold leadi text-center sm:text-4xl">
        Understanding the SelfTalk AI Experience
      </h2>
      <div className="md:py-20 grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
        <div>
          <h3 className="font-semibold">How secure is my voice data?</h3>
          <p className="mt-1 dark:text-gray-400">
            Your voice data is encrypted and stored securely. We prioritize your
            privacy and ensure that your data is never shared.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">
            Can I use this as a replacement for therapy?
          </h3>
          <p className="mt-1 dark:text-gray-400">
            While SelfTalk AI is a great tool for self-reflection and personal
            growth, it shouldn&apos;t replace professional therapy. If
            you&apos;re facing severe emotional or mental challenges, please
            seek professional help.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Faq;
