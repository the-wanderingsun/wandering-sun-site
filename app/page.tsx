import Nav        from '@/components/sections/Nav'
import Hero       from '@/components/sections/Hero'
import Footprints from '@/components/sections/Footprints'
import Blog       from '@/components/sections/Blog'
import Podcast    from '@/components/sections/Podcast'
import Flash      from '@/components/sections/Flash'
import Footer     from '@/components/sections/Footer'
import JsonLd     from '@/components/ui/JsonLd'

export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <Hero />
      <Footprints />
      <Blog />
      <Podcast />
      <Flash />
      <Footer />
    </>
  )
}
