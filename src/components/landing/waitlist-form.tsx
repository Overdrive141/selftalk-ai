import { Input } from "../ui/input";
import { CopyButton } from "../copy-button";
import { UUID } from "crypto";

type WaitlistProps = {
  uuid: UUID;
  waitlistCount: number;
};

export default function WaitlistResult({ uuid, waitlistCount }: WaitlistProps) {
  // try {
  //   users = await db.selectFrom("users").selectAll().execute();
  // } catch (err: any) {
  //   // throw err;a
  //   if (err.message === `relation "users" does not exist`) {
  //     console.log("Table does not exist, creating it now...");
  //     await seed();
  //     startTime = Date.now();
  //     users = await db.selectFrom("users").selectAll().execute();
  //   } else {
  //     throw err;
  //   }
  // }

  return (
    <>
      <div className="flex gap-3 flex-col">
        <span className="text-lg tracking-tighter max-w-md whitespace-pre-wrap ">
          You&apos;re all set. You are number {waitlistCount}/1000 on the
          waiting list.{"\n\n"}Keep an eye on your inbox. Exciting updates from
          us are heading your way soon.
        </span>
        {/* <span className="text-muted-foreground">
          Want to be invited quicker? Invite your friends.
        </span> */}
      </div>
      {/* <div className="flex px-10 gap-10">
        <Input disabled value={`https://selftalk.ai/invite?id=${uuid}`} />{" "}
        <Button className="min-w-max">Copy Link</Button>
        <CopyButton
          className="min-w-max gap-2 "
          value={`https://selftalk.ai/invite?id=${uuid}`}
        />
      </div> */}
    </>
  );
}
