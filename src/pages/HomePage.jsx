import PostCard from '../components/PostCard'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <h1 className='font-bold text-3xl flex justify-center py-8'>Latest Articles</h1>
      
      <div className='flex flex-col gap-6 px-4 md:px-8 max-w-7xl mx-auto'>
        <PostCard />
      </div>
    </div>
  )
}
