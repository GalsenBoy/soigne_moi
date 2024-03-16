import Image from "next/image";
import "./header.scss";
import "./header.scss";
import Link from "next/link";
export default function Header() {
  return (
    <header>
      <div id="header-contain">
        <div id="logo">
          <Image src="/next.svg" width={100} height={100} alt="logo" />
        </div>
        <div id="connexion">
          <Link href={"/login"}>Se connecter</Link>
        </div>
      </div>
    </header>
  );
}
