import Header from "./components/sidebar/header";
import SideBar from "./components/sidebar/sideBar";
import MainContent from "./mainContent";

export default function Home({
  // children,
  searchParams,
}: {
  // children: React.ReactNode;
  searchParams?: {
    sidbarstatus?: string;
    selectedmenu?: string;
  };
}) {
  return (
    <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-12">
      <div className="col-span-12">
        <Header selectedmenu={searchParams?.selectedmenu} />
      </div>
      {/* <div className="flex h-[calc(100vh-56px)]"> */}
      <div className="md:col-span-2   h-[calc(100vh-56px)]">
        <SideBar
          sidbarstatus={searchParams?.sidbarstatus}
          selectedmenu={searchParams?.selectedmenu}
        />
      </div>
      <div className="md:col-span-10  max-h-[calc(100vh-56px)] overflow-y-hidden">
        <MainContent selectedmenu={searchParams?.selectedmenu} />
      </div>
    </div>
  );
}
