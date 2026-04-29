import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Now from '@/components/Now'
import Services from '@/components/Services'
import Skills from '@/components/Skills'
import ProjectsStack from '@/components/ProjectsStack'
import Experience from '@/components/Experience'
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

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <AuroraBlobs />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Now />
        <GlowDivider label="What I do" />
        <Services />
        <Skills />
        <GlowDivider label="The work" />
        <ProjectsStack />
        <GlowDivider label="The journey" />
        <Experience />
        <Recognition />
        <GlowDivider label="More about me" />
        <About />
        <Contact />
      </main>
      <Footer />
      <ChatPanel />
      <VoicePlayer />
    </>
  )
}
