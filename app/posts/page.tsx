'use client'
import { Card } from '@/app/ui/posts/cards';
import { lusitana } from '@/app/ui/fonts';
import { VerticalCarousel } from '../ui/posts/verticalCarousel';
import { extendedPost, useInfiniteScroll } from '../lib/useInfiniteScroll';
import { Modal } from '../ui/general/modal';
import { useEffect, useState } from 'react';
import DropDown from '../ui/general/dropdown';

const initialData: extendedPost[] = [];



export default function Page() {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [authorSelected, setAuthorSelected] = useState("Authors");
  const {
    isLoading,
    loadMoreCallback,
    hasDynamicPosts,
    dynamicPosts,
    isLastPage,
    hasError
  } = useInfiniteScroll(initialData, authorSelected);

  const chargeData = async () => {
    try {
      const response = await fetch(`/api/users`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.userIds);
      } else {
        console.error('Error fetching user IDs:', data.error);
      }
    } catch (error) {
      console.error('Error fetching user IDs:', error);
    }
  };
  useEffect(() => {
    chargeData();
  }, []);
  useEffect(() => {
    hasError != null ? openModalError() : null;
  }, [hasError]);

  const openModalError = () => {
    setIsErrorModalOpen(true);
  };

  const closeModalError = () => {
    setIsErrorModalOpen(false);
  };

  const filterData = (option: string) => {
    setAuthorSelected(option);
  };
  return (
    <main>
      <h1 className={`${lusitana.className} text-blue-500 mb-4 text-5xl font-bold text-center`}>
        Posts
      </h1>
      <div className="h-auto w-full grow rounded-md bg-gray-50 block">
        Filter by Author: <DropDown changeAction={filterData} options={["Authors",...users]} />
      </div>
      <div className="grid gap-2 grid-cols-1 ">
        <VerticalCarousel
          isLoading={isLoading}
          loadMoreCallback={loadMoreCallback}
          isLastPage={isLastPage}
          cards={hasDynamicPosts ? dynamicPosts.map((post) => <Card title={post.title} body={post.body} author={post.user.name} id={post.id} />) : null} />
        <Modal
          title="Error retrieving Post"
          body={hasError}
          accept={null}
          cancel="Close"
          isOpen={isErrorModalOpen}
          onClose={closeModalError}
          acceptAction={closeModalError}
        />
      </div>
    </main>
  );
}