import { lusitana } from '@/app/ui/fonts';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';

export default function BlogLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[44px]">Blog</p>
      <ChatBubbleBottomCenterTextIcon className="h-12 w-12 rotate-[15deg]" />
    </div>
  );
}
