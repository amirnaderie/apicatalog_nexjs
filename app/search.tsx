"use client";
import React, { useEffect, useState } from "react";
import searchIcon from "../public/images/search.svg";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Search = ({ selectedmenu }: { selectedmenu?: string }) => {
  const [searchInp, setSearchInp] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const createPageURL = () => {
    const params = new URLSearchParams(searchParams);
    params.set("selectedmenu", searchInp);
    router.push(`${pathname}?${params.toString()}`);
  };
  useEffect(() => {
    try {
      if (/[0-9]/.test(selectedmenu || "0")) setSearchInp("");
    } catch (error) {
      console.log(error);
    }
  }, [selectedmenu]);

  return (
    <form action={createPageURL} className="w-full pl-0.5">
      <div className="relative">
        <input
          type="text"
          value={searchInp}
          name="searchInp"
          onChange={(e) => setSearchInp(e.target.value)}
          className="w-full border h-10 shadow p-3 rounded-full"
          placeholder="جستجو"
        ></input>
        <button type="submit">
          <Image
            className="text-teal-400 h-4 w-5 absolute top-3.5 left-3 fill-current"
            width={25}
            height={25}
            priority
            src={searchIcon}
            alt="search Button"
          />
        </button>
      </div>
    </form>
  );
};

export default Search;
