"use client";
// import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export interface IMenuData {
  menus: Menu[];
   subMenus: SubMenu[];
}
interface Menu {
  name: string;
  id: number;
}
interface SubMenu {
  name: string;
  id: number;
  parentId: number;
}
const ClientSideBar = ({ sidbarstatus }: { sidbarstatus?: string }) => {
  //   const { setSelectedSubMenu, toggledMenu, setToggleMenu,setSelectedMenu,changedMenu } = useContext(Context);
  const [menuData, setData] = useState<IMenuData>();
  // const [selectedMenu, setSelectedMenu] = useState({});
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (selectedsubmenu: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("selectedsubmenu", selectedsubmenu.toString());
    params.set("sidbarstatus", "close");
    return `${pathname}?${params.toString()}`;
  };

  useEffect(() => {
    async function fetchAPI() {
      try {
        const retVal = await fetch(`/api/menus`);
        const menuData = await retVal.json();
        setData(menuData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAPI();
  }, []);

  // const { isLoading, isError, error, menuData, isSuccess } = useQuery(
  //   ["menuKey"],
  //   async () => {
  //     const retVal = await fetch(`/api/menus`);
  //     const menuData = await retVal.json();
  //     return menuData;
  //   },
  //   {
  //     staleTime: 300000, // menuData considered "fresh" for x miliseconds
  //   }
  // );

  // if (isLoading) return <Loading />;

  ///start  handle Click outside to deactive opened sidebar
  //  const [clickedOutside, setClickedOutside] = useState(false);
  // const myRef = useRef();

  //   const handleClickOutside = (e) => {
  //     if (
  //        !myRef.current.contains(e.target) &&
  //       e.target.id !== "sidebarCollapse" && e.target.parentNode.id !== "sidebarCollapse"
  //     ) {
  //       if (toggledMenu) setToggleMenu();
  //     }
  //   };

  //   const subMenuClick =async (content) => {
  //     setToggleMenu();
  //     setSelectedSubMenu(content);
  //    };

  //   useEffect(() => {
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => document.removeEventListener("mousedown", handleClickOutside);
  //   });

  return (
    <div className="flex w-60 z-10 max-sm:absolute">
      <nav
        className={`${
          sidbarstatus !== "open"
            ? "max-sm:mr-[-250px]"
            : "max-sm:mr-0 max-sm:transform-none"
        }   w-full bg-[#00bcd4] transition-all duration-500 origin-bottom-left overflow-y-auto h-[calc(100vh-56px)]`}
      >
        <p className="text-[#fff] p-3 my-3"> تفکیک خدمات</p>
        {menuData?.menus &&
          menuData?.menus.map((item: Menu) => (
            <>
              <details
                key={item.id}
                className="group p-3 no-underline cursor-pointer"
              >
                <summary className="flex cursor-pointer list-none items-center  no-underline justify-between active:text-slate-100 focus:text-slate-100 hover:text-yellow-400">
                  {item.name}
                  <div className="text-green-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </summary>
                {/* <div className="pb-4 text-secondary-500"> {item.name}</div> */}
                {/* </details> */}

                {/* // <details
            //   key={item.id}
            //   className="open:before:content-['\2A53'] before:content-['\2A54']  before:relative before:right-48  before:text-[#ff0]  p-3 no-underline cursor-pointer"
            // >
            //   <summary className=" inline-block no-underline active:text-slate-100 focus:text-slate-100 hover:text-yellow-400 transform transition duration-300 ease-in-out">
            //     {item.name}
            //   </summary>
               */}
                {menuData.subMenus! &&
                  menuData
                    .subMenus!.filter(
                      (submenu: SubMenu) => submenu.parentId === item.id
                    )
                    .map((subitem: SubMenu) => (
                      <Link
                        key={subitem.id}
                        className="mr-4 mt-5 cursor-pointer block hover:text-yellow-400 text-sm"
                        href={createPageURL(subitem.id.toString())}
                        // onClick={() =>
                        //   subMenuClick({
                        //     id: subitem["id"],
                        //     Name: subitem["name"],
                        //     parentId: subitem["parentId"],
                        //   })
                        // }
                      >
                        {`- ${subitem.name}`}
                      </Link>
                    ))}
              </details>
            </>
          ))}
      </nav>
    </div>
  );
};

export default ClientSideBar;
