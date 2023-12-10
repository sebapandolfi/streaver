'use client'
import { Card } from '@/app/ui/posts/cards';
import { lusitana } from '@/app/ui/fonts';
import { VerticalCarousel } from '../ui/posts/verticalCarousel';
import { extendedPost, useInfiniteScroll } from '../lib/useInfiniteScroll';

const initialData : extendedPost[]= [];



export default function Page() {
  const {
    isLoading,
    loadMoreCallback,
    hasDynamicPosts,
    dynamicPosts,
    isLastPage,
  }  = useInfiniteScroll(initialData);

  return (
    <main>
    <h1 className={`${lusitana.className} text-blue-500 mb-4 text-5xl font-bold text-center`}>
        Posts
    </h1>
    <div className="grid gap-2 grid-cols-1 ">
        {<VerticalCarousel 
            isLoading={isLoading}
            loadMoreCallback={loadMoreCallback}
            isLastPage={isLastPage} 
            cards={hasDynamicPosts ? dynamicPosts.map((post) => <Card title={post.title} body={post.body} author={post.user.name} id={post.id}/>) : null } />}
    </div>
</main>
  );
}