import Header from "@/components/Header";
import MobileCta from "@/components/MobileCta";
import Motion from "@/components/Motion";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Course from "@/components/sections/Course";
import ShopTeaser from "@/components/sections/ShopTeaser";
import Cursor from "@/components/Cursor";
import Extras from "@/components/sections/Extras";
import Agus from "@/components/sections/Agus";
import Students from "@/components/sections/Students";
import Enrollment from "@/components/sections/Enrollment";
import Faq from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Course />
        <ShopTeaser />
        <Extras />
        <Agus />
        <Students />
        <Enrollment />
        <Faq />
      </main>
      <MobileCta />
      <Motion />
      <Cursor />
    </>
  );
}
