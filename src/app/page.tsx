import HomeClient from '@/components/HomeClient'
import { getFeaturedProjects } from '@/lib/projects'

export const revalidate = 60

export default async function Home() {
  const projects = await getFeaturedProjects(6)
  return <HomeClient projects={projects} />
}
