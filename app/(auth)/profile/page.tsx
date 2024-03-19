"use client";
import useFetchUserProfile from "@/requests/UserProfile";
import React from "react";

const Profile = () => {
  const user = useFetchUserProfile();
  return (
    <div>
      <h1>User Profile</h1>
      {user && (
        <div>
          <p>Email: {(user as any).email}</p>
          <p>Prénom : {(user as any).firstName}</p>
          <p>Role : {(user as any).roles}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
