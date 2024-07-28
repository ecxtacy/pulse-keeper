import Navbar from "@/components/navbar";
import QuoteCard from "@/components/quote-card";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <AuroraBackground>
      <div className="w-screen h-screen">
        <div className="w-screen h-screen dark:bg-x-black-1">
          <Navbar />
          <div className="px-2 pt-24 flex flex-col items-center justify-center z-0">
            <QuoteCard
              quote="Time is, but a stubborn illusion"
              author="Albert Einstein"
            />
            {/* <Image src={"/clock.gif"} alt="Clock Image" width={500} height={500} className="rounded-full w-40" /> */}
          </div>
        </div>
      </div>
    </AuroraBackground>
    
    </>
  );
}
