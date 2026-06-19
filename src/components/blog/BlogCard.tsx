import { BlogPost } from '@/types';
import GlassCard from '@/components/shared/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface BlogCardProps {
  post: BlogPost;
  onReaction?: (postId: string) => void;
}

const BlogCard = ({ post, onReaction }: BlogCardProps) => {
  return (
    <GlassCard className="overflow-hidden hover:shadow-xl">
      <div className="space-y-4">
        {/* Featured Image */}
        {post.image && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover hover:scale-110 smooth-transition"
            />
          </div>
        )}

        {/* Category & Time */}
        <div className="flex items-center justify-between text-xs">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
            {post.category}
          </span>
          <span className="text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-lg font-bold text-dark hover:text-primary smooth-transition line-clamp-2 cursor-pointer">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>

        {/* Footer - Author & Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">{post.author}</div>
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => onReaction?.(post._id)}
              className="flex items-center gap-1 text-gray-600 hover:text-red-500 smooth-transition"
            >
              <FontAwesomeIcon icon={faHeart} />
              <span>{post.reactions}</span>
            </button>
            <div className="flex items-center gap-1 text-gray-600">
              <FontAwesomeIcon icon={faEye} />
              <span>{post.views}</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default BlogCard;
