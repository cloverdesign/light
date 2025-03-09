import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="font-body h-screen pt-[105px] bg-radial-[at_50%_-105%] from-aero-600 from-10% to-[#FFFCF7] to-70%">
      <div className="flex flex-col items-center justify-center gap-16 h-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-9xl text-center leading-[144px]">Where Faith, Love, &<br /> Community Flourish</h1>
          <p className="text-deep-blue-400 w-[40%] text-center">Discover a place where God’s presence transforms lives, and everyone belongs.</p>
        </div>
        <Button>
          Plan Your Visit
        </Button>
      </div>
    </section>
  );
}
