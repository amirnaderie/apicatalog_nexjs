"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Burger = ({ selectedmenu }: { selectedmenu?: string }) => {
  const [switchBurger, setSwitchBurger] = useState<boolean>(false);
  const [selectedmenulocal, setSelectedmenulocal] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (sidbarstatus: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("sidbarstatus", sidbarstatus.toString());
    router.push(`${pathname}?${params.toString()}`);
  };
  useEffect(() => {
    try {
      if (
        // parseInt(selectedmenu || "0") !== selectedmenulocal &&
        /[0-9]/.test(selectedmenu || "0")
        //  && selectedmenulocal !== 0
      ) {
        if (
          (parseInt(selectedmenu || "0") > 0 || selectedmenu === undefined) &&
          selectedmenulocal
        )
          setSwitchBurger(!switchBurger);
        setSelectedmenulocal(true);
      }
      //  else if (!selectedmenulocal && selectedmenu)
      //   setSelectedmenulocal(!selectedmenu);
    } catch (error) {
      console.log(error);
    }
  }, [selectedmenu]);

  return (
    <div
      id="sidebarCollapse"
      onClick={() => {
        setSwitchBurger(!switchBurger);
        createPageURL(switchBurger ? "close" : "open");
      }}
      className="flex flex-col justify-around bg-transparent w-12 h-8 cursor-pointer border-none z-10"
    >
      <div
        className={`transition-all duration-700 ${
          switchBurger ? "rotate-43 h-[0.15rem]" : "rotate-0 h-[0.12rem]"
        } burger-divs`}
      />
      <div
        className={`transition-all duration-100 h-[0.15rem] ${
          switchBurger
            ? "translate-x-14 opacity-0"
            : "translate-x-0 opacity-100"
        } burger-divs duration-0 `}
      />
      <div
        className={`transition-all duration-700 ${
          switchBurger ? "-rotate-43 h-[0.15rem]" : "rotate-0 h-[0.12rem]"
        } burger-divs`}
      />
    </div>
  );
};

export default Burger;
