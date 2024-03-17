import { useRouter } from "next/router";
import React from "react";
import UserProfileCard from "@/pages/components/UserProfileCard";

const ProfilePage = () => {
  const router = useRouter();
  const { user } = router.query;

  // Parse the user object from the query parameters
  const parsedUser = user ? JSON.parse(user as string) : null;
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Render UserProfileCard with parsed user object */}
      <UserProfileCard user={parsedUser} />
    </div>
  );
};

export default ProfilePage;
