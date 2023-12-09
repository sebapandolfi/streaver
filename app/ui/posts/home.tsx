import { UseInfiniteScroll } from "@/app/lib/useInfiniteScroll";
import { Post } from "@prisma/client";
import { Loader } from "../general/loader";
import { VerticalCarousel } from "./verticalCarousel";
import { lusitana } from '@/app/ui/fonts';
import { Card } from "./cards";

type HomePageProps = Pick<
    UseInfiniteScroll,
    "isLoading" | "loadMoreCallback" | "isLastPage"
> & {
    posts: Post[];
};

export const HomePage = ({
    posts,
    isLoading,
    loadMoreCallback,
    isLastPage,
}: HomePageProps) => {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-2xl font-medium text-center`}>
                Posts
            </h1>
            <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-1">
                {<VerticalCarousel 
                    isLoading={isLoading}
                    loadMoreCallback={loadMoreCallback}
                    isLastPage={isLastPage} 
                    cards={posts.map((post) => <Card title={post.title} value={post.body} />)} />}
                {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
                {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
                {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
            </div>


        </main>
    );
};