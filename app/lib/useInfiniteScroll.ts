import { Post, User } from "@prisma/client";
import { useCallback, useEffect, useRef, useState } from "react";

export type UseInfiniteScroll = {
    isLoading: boolean;
    loadMoreCallback: (el: HTMLDivElement) => void;
    hasDynamicPosts: boolean;
    dynamicPosts: extendedPost[];
    isLastPage: boolean;
    hasError: string | null
};

export type extendedPost = Post & {
    user: User
}

export const useInfiniteScroll = (posts: extendedPost[], authorFilter: string): UseInfiniteScroll => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState<string| null>(null);
    const [page, setPage] = useState(1);
    const [hasDynamicPosts, setHasDynamicPosts] = useState(false);
    const [dynamicPosts, setDynamicPosts] = useState<extendedPost[]>(posts);
    const [isLastPage, setIsLastPage] = useState(false);
    const observerRef = useRef<IntersectionObserver>();
    const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, 500);
    const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout);

    useEffect(() => {
        setPage(1);
        setHasDynamicPosts(false);
        setDynamicPosts(posts);
        setIsLastPage(false);
      }, [authorFilter]);

    const handleObserver = useCallback(
        (entries: any[]) => {
            const target = entries[0];
            if (target.isIntersecting) {
                setIsLoading(true);
                clearTimeout(loadMoreTimeoutRef.current);

                // this timeout debounces the intersection events
                loadMoreTimeoutRef.current = setTimeout(async () => {
                    try {
                        const response = await fetch(`/api/posts/${page}?author=${authorFilter}`);
                        const data = await response.json();
                        setPage(page + 1);
                        const newPosts = data?.posts;

                        if (newPosts?.length) {
                            const newDynamicPosts = [...dynamicPosts, ...newPosts];
                            const uniquePostIds = new Set();
                            const filteredDynamicPosts = newDynamicPosts.filter((post) => {
                                if (!uniquePostIds.has(post.id)) {
                                    uniquePostIds.add(post.id);
                                    return true; // Include the post in the filtered array
                                }
                                return false; // Skip the post if its ID is already in the Set
                            });
                            setDynamicPosts(filteredDynamicPosts);
                            setIsLastPage(filteredDynamicPosts?.length >= data?.total);
                            setHasDynamicPosts(true);
                            setIsLoading(false);
                        }else{
                            setHasError("Sorry, no posts were found.");
                        }
                    } catch (error) {
                        // Handle error here
                        setHasError("An error occurred while retrieving the post. Please try again.");
                        console.error('Error loading more posts:', error);
                    }
                }, 500);
            }
        },
        [loadMoreTimeoutRef, setIsLoading, page, dynamicPosts]
    );

    const loadMoreCallback = useCallback(
        (el: HTMLDivElement) => {
            if (isLoading) return;
            if (observerRef.current) observerRef.current.disconnect();

            const option: IntersectionObserverInit = {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            };
            observerRef.current = new IntersectionObserver(handleObserver, option);

            if (el) observerRef.current.observe(el);
        },
        [handleObserver, isLoading]
    );

    return {
        isLoading,
        loadMoreCallback,
        hasDynamicPosts,
        dynamicPosts,
        isLastPage,
        hasError
    };
};