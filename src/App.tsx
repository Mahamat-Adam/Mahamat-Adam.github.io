import { About } from './components/About'
import { Awards } from './components/Awards'
import { ChatBot } from './components/ChatBot'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Fyp } from './components/Fyp'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Fyp />
        <Awards />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </>
  )
}
