import { Card } from '@/app/ui/posts/cards';
import { lusitana } from '@/app/ui/fonts';
import { Loader } from '../general/loader';
import { UseInfiniteScroll } from '@/app/lib/useInfiniteScroll';

type VerticalCarouselProps = Pick<
    UseInfiniteScroll,
    "isLoading" | "loadMoreCallback" | "isLastPage"
> & {
    cards: React.JSX.Element[];
};

export function VerticalCarousel({
    cards,
    isLoading,
    isLastPage,
    loadMoreCallback
}:
    VerticalCarouselProps
) {
    return (
        <div className="h-96 carousel carousel-vertical rounded-box">
            {cards.map((card, index) => (
                <div key={index} className="carousel-item h-50">
                    {card}
                </div>
            ))}
            <Loader
                isLoading={isLoading}
                isLastPage={isLastPage}
                loadMoreCallback={loadMoreCallback}
            />
        </div>

    );
}
