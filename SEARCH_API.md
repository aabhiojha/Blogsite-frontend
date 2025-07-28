# Search API Documentation

## Search Endpoint

To make the search functionality work with your Django backend, you'll need to add a search endpoint.

### Recommended API Endpoint:

```
GET /api/search/?q=<search_query>&limit=<optional_limit>
```

### Example Django Implementation:

```python
# In your Django views.py
from django.http import JsonResponse
from django.db.models import Q
from .models import Post

def search_posts(request):
    query = request.GET.get('q', '')
    limit = request.GET.get('limit', None)
    
    if not query:
        return JsonResponse([], safe=False)
    
    # Search in title, content, and category
    posts = Post.objects.filter(
        Q(title__icontains=query) |
        Q(content__icontains=query) |
        Q(category__icontains=query)
    ).order_by('-created_at')
    
    if limit:
        posts = posts[:int(limit)]
    
    # Serialize the posts
    posts_data = []
    for post in posts:
        posts_data.append({
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'category': post.category,
            'image': post.image.url if post.image else None,
            'created_at': post.created_at.isoformat(),
        })
    
    return JsonResponse(posts_data, safe=False)
```

### URL Configuration:

Add this to your `urls.py`:

```python
path('api/search/', views.search_posts, name='search_posts'),
```

### Advanced Search (Optional):

For better search functionality, consider using:
- PostgreSQL full-text search
- Elasticsearch
- Django Haystack with Whoosh/Solr

### Search Features Implemented:

✅ **Real-time search suggestions** - QuickSearch component  
✅ **Search results page** - Full search page with filters  
✅ **Recent searches** - Stored in localStorage  
✅ **Category filtering** - Filter by article categories  
✅ **Sorting options** - Sort by relevance, date, etc.  
✅ **Mobile-friendly** - Responsive search interface  
✅ **Fallback search** - Works with existing list_post API  

### Fallback Behavior:

The search currently falls back to fetching all posts and filtering on the frontend if the search API is not available. This ensures the search works even without the dedicated search endpoint.
