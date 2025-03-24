import footer from "@/assets/images/footer.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
export default function Giving() {
    return (
        <section className="font-body pt-[100px]">
            <div
                style={{
                    backgroundImage: `url(${footer.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top'
                }}
                className="h-screen w-full overflow-hidden relative flex flex-col items-center justify-center"
            >
                <div className="bg-[#0F4760a2] h-full w-full absolute top-0 left-0" />
                <h1 className="xl:text-9xl lg:text-8xl text-6xl leading-[72px] lg:leading-[120px] xl:leading-[144px] text-white text-center absolute">
                    <div className="relative inline-block mr-5 w-fit h-fit">
                        <Badge variant="header" className="absolute capitalize transform -rotate-12 -left-5 -top-5 lg:top-2">
                            <Heart />
                            BLW LightHouse
                        </Badge>
                        Where
                    </div> Dreams <br /> Come True
                </h1>
            </div>
            <div className="flex flex-col items-center gap-16 my-50 px-8">
                <p className="w-full lg:w-[800px] text-deep-blue-400 text-xl">Your generous support empowers us to create life-changing
                    experiences on campuses. Together, we organize impactful events,
                    provide essential resources for spiritual growth, and foster a
                    welcoming community where countless students find hope,
                    inspiration, and a sense of belonging.
                    <br />
                    <br />
                    Join us in shining the light of transformation and making dreams come true for students everywhere. With your partnership, we’ll
                    continue to impact our world, one life at a time.</p>
                <Button className="w-[235px]">
                    Give Now
                </Button>
            </div>
        </section>
    )
}