import { lusitana } from '@/app/ui/fonts';

export function Card({
  title,
  value
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-xl font-medium text-center">Title: {title}</h3>
      </div>
      <p
        className={`${lusitana.className}
           rounded-xl bg-white px-4 py-8 text-md`}
      >
        {value}
      </p>
    </div>
  );
}
