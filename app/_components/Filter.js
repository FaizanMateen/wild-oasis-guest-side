"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  // useSearchParams is used to get the url into this client component [Filter.js] which is http://localhost:3000/cabins?capacity=all
  const searchParams = useSearchParams();
  // useRouter is used for programmatic navigation in react router
  const router = useRouter();
  // The usePathname is used to get the url current path http://localhost:3000/cabins?capacity=all which is [cabins]
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    //params.set build the url but doesn't navigate to the url
    params.set("capacity", filter);
    //router.replace actually constructs a funtional url that will actually work when clicked http://localhost:3000/cabins?capacity=all

    //then the [pathname] is used here to create a working url like this
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guest
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
