import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Now from '@/components/Now'
import Services from '@/components/Services'
import Skills from '@/components/Skills'
import ProjectsStack from '@/components/ProjectsStack'
import Experience from '@/components/Experience'
import Certifications from '@/components/Certifications'
import Recognition from '@/components/Recognition'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ChatPanel from '@/components/ChatPanel'
import VoicePlayer from '@/components/VoicePlayer'
import SmoothScroll from '@/components/SmoothScroll'
import AuroraBlobs from '@/components/AuroraBlobs'
import ScrollProgress from '@/components/ScrollProgress'
import GlowDivider from '@/components/GlowDivider'
import DimOnScroll from '@/components/DimOnScroll'

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <AuroraBlobs />
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Hero handles its own scroll-driven motion */}
        <Hero />

        <DimOnScroll><Marquee /></DimOnScroll>
        <DimOnScroll><Now /></DimOnScroll>

        <GlowDivider label="What I do" />

        <DimOnScroll><Services /></DimOnScroll>
        <DimOnScroll><Skills /></DimOnScroll>

        <GlowDivider label="The work" />

        {/* ProjectsStack uses sticky internally — don't wrap in transformed parent */}
        <ProjectsStack />

        <GlowDivider label="The journey" />

        <DimOnScroll><Experience /></DimOnScroll>
        <DimOnScroll><Certifications /></DimOnScroll>
        <DimOnScroll><Recognition /></DimOnScroll>

        <GlowDivider label="More about me" />

        <DimOnScroll><About /></DimOnScroll>
        <DimOnScroll><Contact /></DimOnScroll>
      </main>
      <Footer />
      <ChatPanel />
      <VoicePlayer />
    </>
  )
}
