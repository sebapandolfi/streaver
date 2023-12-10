import { lusitana } from '@/app/ui/fonts';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Modal } from '../general/modal';
import { useState } from 'react';

export function Card({
  title,
  body,
  author,
  id
}: {
  title: string;
  body: string;
  author: string;
  id: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldHideContent, setShouldHideContent] = useState(false);

  const deletePost = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Post with ID ${id} deleted successfully`);
        setShouldHideContent(true);
      } else {
        console.error(`Failed to delete post with ID ${id}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div hidden={shouldHideContent} className="rounded-xl bg-white p-4 shadow-md">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-medium">Title: {title}</h3>
        <TrashIcon
          title="Delete post"
          className="w-6 h-6 cursor-pointer"
          onClick={() => openModal()}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-l font-medium">Author: {author}</h2>
      </div>
      <p className={`${lusitana.className} text-md`}>{body}</p>
      <Modal
        title="Delete Post"
        body="Are you sure you want to delete this Post? This action cannot be undone."
        accept="Yes, I'm sure"
        cancel="No, cancel"
        isOpen={isModalOpen}
        onClose={closeModal}
        acceptAction={deletePost}
      />
    
    </div>
  );
}


