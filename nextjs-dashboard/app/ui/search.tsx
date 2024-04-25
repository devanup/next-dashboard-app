'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // The useSearchParams hook returns the URL query parameters
  const pathname = usePathname(); // The usePathname hook returns the current pathname of the URL
  const { replace } = useRouter(); // The replace function is used to update the URL without adding a new entry to the browser history

  const handleSearch = useDebouncedCallback((term) => {
    // console.log(`Searching... ${term}`);

    /* URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters. Instead of creating a complex string literal, you can use it to get the params string like ?page=1&query=a.*/
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reset the page to 1 when searching

    if (term) {
      // If the search term is not empty, set the query parameter
      params.set('query', term);
    } else {
      // If the search term is empty, remove the query parameter
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`); // Update the URL with the new query parameters
  }, 300); // Debounce the search callback by 300ms

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()} // Set the default value of the input field to the query parameter
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
