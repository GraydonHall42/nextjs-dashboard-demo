'use client';  // we're using hooks so this must be client component

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();  // current search params in the URL
    const pathname = usePathname();  // base path without url params
    const router = useRouter();

    // make this debounced to avoid triggering on every keystroke
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);  // initial search params values
        params.set('page', '1');  // reset page to 1 when performing search

        if (term) {
            params.set('query', term); // set value of query to the user search input
        } else {
            params.delete('query');  // remove from search params if no term provided
        }
        router.replace(`${pathname}?${params.toString()}`);  // replace the url
    }, 300);

    return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">Search</label>

      {/*
        We make sure to set initial input value for if there's currently a query in the url.
        When the input changes we call handleSearch
       */}
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
