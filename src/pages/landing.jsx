import Header from "../components/header";
import Footer from "../components/footer";
import { Button } from "@material-tailwind/react";
function LandingPage() {
    return (
        <div className="">
            <Header landingPage={true} />
            <div className="flex flex-col">
                <div className="flex-grow bg-myBackground bg-cover h-screen w-full relative ">
                    <h1 style={{
                        fontFamily: "Arial Black",
                        background: "linear-gradient(83.84deg, #122D94 0%, #b3dbe3 25%, #FFC7A6 110%)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent",
                        lineHeight: "1.2"
                    }} className="text-5xl w-2/3 pl-10 pt-20">
                        IntraInteract: Empowering Your Team&#39;s Communication. Join Today, Collaborate Tomorrow.
                    </h1>
                    <div className="w-1/3">
                        <a href="/login" >
                            <Button className="float-right mt-7"
                                size="lg"
                                variant="outlined">
                                <span>Explore now</span>
                            </Button>
                        </a>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default LandingPage;
