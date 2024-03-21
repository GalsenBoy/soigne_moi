"use client";
import Image from "next/image";
import "./header.scss";
import "./header.scss";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/utils/handle-logout";
import useFetchUserProfile from "@/requests/UserProfile";
export default function Header() {
  const user = useFetchUserProfile();
  console.log(user);

  return (
    <header>
      <div id="header-contain">
        <div id="logo">
          <Image src="/next.svg" width={100} height={100} alt="logo" />
        </div>
        <div className="flex gap-2">
          {user?.roles === "admin" && (
            <Button>
              <Link href={"/admin"}>Admin</Link>
            </Button>
          )}
          {user ? (
            <Button onClick={handleLogout}>Se déconnecter</Button>
          ) : (
            <Link id="login" href="/login">
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
