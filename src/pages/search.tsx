import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/shared/Layout';
import { useDebounce } from '@/hooks';
import { getDomains, searchDomains } from '@/api/domains';
import { getBlogPosts } from '@/api/blog';
import { Domain, BlogPost } from '@/types';
import GlassCard from '@/components/shared/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faGlobe, faBook } from '@fortawesome/free-solid-svg-icons';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ domains: Domain[]; posts: BlogPost[] }>({
    domains: [],
    posts: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults({ domains: [], posts: [] });
      return;
    }

    const performSearch = async () => {
      setIsLoading(true);
      try {
        const [domainsRes, postsRes] = await Promise.all([
          searchDomains(debouncedQuery),
          getBlogPosts(1, 10, 'en'), // Filter by query in component
        ]);

        setResults({
          domains: domainsRes.data || [],
          posts: (postsRes.data || []).filter(
            (p) =>
              p.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
              p.content.toLowerCase().includes(debouncedQuery.toLowerCase())
          ),
        });
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  return (
    <Layout>
      <div className="space-y-8 animate-slideUp">
        {/* Search Header */}
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-gradient">Search Everything</h1>
            <p className="text-gray-600">Find domains, blog posts, and more</p>
          </div>

          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary text-lg"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search domains, blog posts, keywords..."
              className="w-full pl-12 pr-4 py-4 border-2 border-primary/30 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg"
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {query && (
          <div className="space-y-8">
            {/* Domains Results */}
            {results.domains.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faGlobe} className="text-primary" />
                  Domains ({results.domains.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.domains.map((domain) => (
                    <GlassCard key={domain._id}>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-primary">{domain.name}</h3>
                        <p className="text-gray-600">{domain.description}</p>
                        <p className="text-2xl font-bold">${domain.price}</p>
                        <button className="w-full py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 smooth-transition">
                          Make Offer
                        </button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Results */}
            {results.posts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faBook} className="text-primary" />
                  Blog Posts ({results.posts.length})
                </h2>
                <div className="space-y-4">
                  {results.posts.map((post) => (
                    <GlassCard key={post._id}>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold hover:text-primary smooth-transition cursor-pointer">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                          <span>{post.category}</span>
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {results.domains.length === 0 && results.posts.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No results found for "{query}"</p>
                <p className="text-gray-500 mt-2">Try different keywords</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
