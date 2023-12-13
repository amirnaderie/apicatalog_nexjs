import Image from "next/image";
import OfflineIcon from "/public/images/offline.svg";

const OfflinePage = () => {
  return (
    <main className="w-full h-screen grid place-items-center">
      <div className="flex flex-col content-center items-center">
        <div className="content-center">
          <Image
            width={40}
            height={40}
            priority
            src={OfflineIcon}
            alt="Offline"
          />
        </div>
        <h1 className="text-3xl font-bold">You are offline</h1>
      </div>
    </main>
  );
};

export default OfflinePage;
