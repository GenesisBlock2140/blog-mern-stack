import './App.css'
import { Card } from './components/Card'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { usePost } from './hook/usePost'

function App() {

  const blogPosts = usePost()

  return (
    <div className="App">
      <Header />
      <div className='max-w-[1120px] h-auto rounded mx-auto my-4'>
        <Card cardWidth={1120} author={blogPosts[0].author} title={blogPosts[0].title}/>
      </div>
      <div className='max-w-[1200px] flex justify-center mx-auto flex-wrap gap-2'>
      {blogPosts ? blogPosts.map((post,key) => {
        if(key === 0){
          return null
        }
        return <Card cardWidth={350} author={post.author} title={post.title} key={key} />
      })  
      : null }
      </div>
      <Footer />
    </div>
  )
}

export default App
