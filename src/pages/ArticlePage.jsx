import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'

export default function ArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    if (id) {
      const url = `http://localhost:8000/api/post/${id}/`;

      fetch(url)
        .then(res => {
          if (!res.ok) {
            throw new Error('Article not found')
          }
          return res.json()
        })
        .then(data => {
          setArticle(data)
          setLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
        })
    } else {
    }
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft size={20} />
          Back to Articles
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto my-5 bg-white min-h-screen">
      {/* Back Button */}
      <div className="px-6 pt-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft size={20} />
          Back to Articles
        </button>
      </div>

      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-500 mb-4 px-6 pt-4">
        <span>Articles</span>
        <span className="mx-2">/</span>
        <span>{article?.title}</span>
      </nav>

      {/* Article Header */}
      <header className="px-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article?.title}
        </h1>
        <div className="text-sm text-gray-600 mb-4">
          <span>Published on {new Date(article?.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        {article?.category && (
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
              {article.category}
            </span>
          </div>
        )}
      </header>

      {/* Hero Image */}
      {article?.image && (
        <div className="mb-8 px-6">
          <img
            src={`http://localhost:8000${article.image}`}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="px-6 pb-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
            {article?.content}
          </div>
        </div>
      </div>
    </div>
  )
}
