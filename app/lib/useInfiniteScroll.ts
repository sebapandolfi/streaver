import { Post } from "@prisma/client";
import { useCallback, useRef, useState } from "react";

export type UseInfiniteScroll = {
    isLoading: boolean;
    loadMoreCallback: (el: HTMLDivElement) => void;
    hasDynamicPosts: boolean;
    dynamicPosts: Post[];
    isLastPage: boolean;
};

export const useInfiniteScroll = (posts: Post[]): UseInfiniteScroll => {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasDynamicPosts, setHasDynamicPosts] = useState(false);
    const [dynamicPosts, setDynamicPosts] = useState<Post[]>(posts);
    const [isLastPage, setIsLastPage] = useState(false);
    const observerRef = useRef<IntersectionObserver>();
    const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, 500);
    const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout);

    const handleObserver = useCallback(
        (entries: any[]) => {
            const target = entries[0];
            if (target.isIntersecting) {

                setIsLoading(true);
                clearTimeout(loadMoreTimeoutRef.current);

                // this timeout debounces the intersection events
                loadMoreTimeoutRef.current = setTimeout(async () => {
                    try {
                        const response = await fetch(`/api/posts/${page}`);
                        const data = await response.json();
                        setPage(page + 1);
                        const newPosts = data?.posts;

                        if (newPosts?.length) {
                            const newDynamicPosts = [...dynamicPosts, ...newPosts];
                            console.log(newDynamicPosts)
                            setDynamicPosts(newDynamicPosts);
                            setIsLastPage(newDynamicPosts?.length === data?.total);
                            setHasDynamicPosts(true);
                            setIsLoading(false);
                        }
                    } catch (error) {
                        // Handle error here
                        console.error('Error loading more posts:', error);
                    }
                }, 500);
            }
        },
        [loadMoreTimeoutRef, setIsLoading, page, dynamicPosts]
    );

    const loadMoreCallback = useCallback(
        (el: HTMLDivElement) => {
            console.log(el)
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
    };
};