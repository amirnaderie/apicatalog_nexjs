import Link from "next/link";
import postmanIcon from "../public/images/postman.svg";
import wordIcon from "../public/images/word.svg";
import Image from "next/image";
import Search from "./search";
import { search_Allitems_in_Allobjects_Ofarray } from "./lib/general";

interface API {
  id: number;
  parentId: number;
  name: String;
  title: String;
  desc: String;
  type: String;
  submenu: {
    id: number;
    menu: {
      id: number;
      name: String;
    };
  };
}

const MainContent = async ({ selectedmenu }: { selectedmenu?: string }) => {
  const res = await fetch(`${process.env.API_URL}/api/apis`, {
    next: { revalidate: 20 },
  });
  let apis: API[] = await res.json();
  let selectedMenuName: String | undefined;
  if (selectedmenu) {
    if (/[0-9]/.test(selectedmenu)) {
      if (parseInt(selectedmenu) > 0) {
        apis = apis.filter(
          (api) => api.submenu.menu.id === parseInt(selectedmenu)
        );
        if (apis.length > 0) selectedMenuName = apis[0].submenu.menu.name;
      }
    } else {
      apis = search_Allitems_in_Allobjects_Ofarray(apis, selectedmenu);
      selectedMenuName = undefined;
    }
  }

  return (
    <div className="max-sm:w-full  relative  content-start  items-center text-center ">
      <div className="w-2/3 fixed top-14 z-10 md:w-1/2 lg:w-1/3 2xl:w-1/4 border-b-slate-100  pb-2 mt-1 pr-2 ">
        <Search selectedmenu={selectedmenu} />
      </div>
      {selectedMenuName && (
        <div className="flex fixed left-2  top-16 z-10 justify-end max-sm:ml-1 sm:ml-4 text-sm breadcrumbs w-1/3 lg:w-1/4 ">
          <ul>
            <li>{selectedMenuName}</li>
            <li>
              <Link href="/?selectedmenu=0">
                خانه
                <svg
                  className="w-3 mr-2 h-3 me-2.5 hidden md:block"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      )}
      <div className="max-h-[calc(100vh-7rem)] overflow-y-auto grow grid grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 py-4  ">
        {apis.map((api, idx) => (
          <div
            key={api.id}
            className={`card h-44 lg:h-65 bg-base-100 shadow-xl  my-2 `}
          >
            <div className="h-full card-body items-center text-center ">
              <h2 className="card-title text-xs">{api.title}</h2>
              <p className="text-xs text-justify overflow-y-auto">{api.desc}</p>
            </div>
            <div className="card-actions w-[100%] flex justify-around absolute bottom-2 ">
              <a
                className="tooltip tooltip-left hover:tooltip-open "
                data-tip="document"
                href={`/api/download/${api.name}.docx`}
              >
                <Image
                  width={28}
                  height={28}
                  priority
                  src={wordIcon}
                  alt="word File"
                />
              </a>
              <a
                className="tooltip tooltip-right hover:tooltip-open"
                data-tip="postman"
                href={`/api/download/${api.name}.json`}
              >
                <Image
                  width={28}
                  height={28}
                  priority
                  src={postmanIcon}
                  alt="Postman File"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
