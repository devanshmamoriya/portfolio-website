import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import FindMeOnline from './components/FindMeOnline'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'

function Section({ children }) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Section><Hero /></Section>
        <Section><About /></Section>
        <Section><Experience /></Section>
        <Section><Skills /></Section>
        <Section><Projects /></Section>
        <Section><Blog /></Section>
        <Section><FindMeOnline /></Section>
        <Section><Contact /></Section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
