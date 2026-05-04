import Nav        from '@/components/sections/Nav'
import Hero       from '@/components/sections/Hero'
import Footprints from '@/components/sections/Footprints'
import Blog       from '@/components/sections/Blog'
import Podcast    from '@/components/sections/Podcast'
import Flash      from '@/components/sections/Flash'
import Footer     from '@/components/sections/Footer'
import JsonLd     from '@/components/ui/JsonLd'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <>
      <JsonLd />
      <Nav />
      <Hero />
      <Footprints />
      <Blog posts={posts} />
      <Podcast />
      <Flash />
      <Footer />
    </>
  )
}
