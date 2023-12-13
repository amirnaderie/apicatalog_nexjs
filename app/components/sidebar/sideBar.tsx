import Loading from "@/app/loading";
// import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Menu {
  name: string;
  id: number;
}
const SideBar = async ({
  sidbarstatus,
  selectedmenu,
}: {
  sidbarstatus?: string;
  selectedmenu?: string;
}) => {
  const res = await fetch(`${process.env.API_URL}/api/menus`, {
    next: { revalidate: 50 },
  });
  let menus: Menu[] = await res.json();

  //   const pathname = usePathname();
  //   const searchParams = useSearchParams();

  const createPageURL = (newSelectedmenu: string) => {
    if (newSelectedmenu !== selectedmenu)
      return `/?selectedmenu=${newSelectedmenu}`;
    else return `/?sidbarstatus=close`;
  };

  return (
    <div
      className={`flex h-full max-sm:absolute z-20 transition-all duration-500 `}
    >
      <nav
        className={`${
          sidbarstatus !== "open"
            ? "max-sm:mr-[-15rem] "
            : "max-sm:mr-0 max-sm:transform-none max-sm:w-60 "
        }    sm:w-full bg-[#ffa07a] transition-all duration-500 origin-bottom-left overflow-y-auto `}
      >
        <p className="text-black p-3 my-3"> تفکیک خدمات</p>
        {menus &&
          menus.map((item: Menu) => (
            <>
              <details
                key={item.id}
                className="group p-3 no-underline cursor-pointer"
              >
                <summary
                  className={`flex cursor-pointer list-none items-center  no-underline justify-between text-black  active:text-white focus:text-white hover:text-zinc-500 ${
                    selectedmenu === item.id.toString()
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  <Link href={createPageURL(item.id.toString())}>
                    {item.name}
                  </Link>

                  {/* <div className="text-green-800">
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
                  </div> */}
                </summary>
              </details>
            </>
          ))}
      </nav>
    </div>
  );
};

export default SideBar;
