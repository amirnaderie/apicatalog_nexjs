import Burger from "./burger";
import Image from "next/image";
import logoIcon from "../../../public/images/logo.svg";
import Link from "next/link";

const Header = ({ selectedmenu }: { selectedmenu?: string }) => {
  return (
    <nav className="bg-black  flex justify-between items-center pr-3 py-3  ">
      <div className="sm:hidden">
        <Burger selectedmenu={selectedmenu} />
      </div>
      <a className="text-white  cursor-pointer  no-underline" href="/">
        بازارچه API بانک سپه
      </a>
      <Link className=" cursor-pointer ml-2 " data-tip="logo" href="/">
        <Image
          width={28}
          height={28}
          priority
          src={logoIcon}
          alt="logoIcon"
        />
      </Link>
    </nav>
  );
};

export default Header;
