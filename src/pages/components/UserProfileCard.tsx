import React from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/pages/api/api";

const UserProfileCard: React.FC<{ user: User }> = ({ user }) => {
  const { latitude, longitude } = user.location.coordinates;
  const { city, country } = user.location;

  return (
    <div className="bg-white shadow-md rounded-md p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Image
            className="w-32 h-32 rounded-full"
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            width={128}
            height={128}
          />
        </div>
        <h2 className="text-2xl font-bold text-black">{`${user.name.first} ${user.name.last}`}</h2>
        <Link href="/">
          <div className="text-blue-500 hover:text-blue-700">Listing</div>
        </Link>
      </div>
      <div className="mb-4 text-black">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="mb-4 text-black">
        <strong>Nationality:</strong>{" "}
        <Image
          src={`https://flagsapi.com/${user.nat}/flat/64.png`}
          alt={`${user.nat} flag`}
          height={32}
          width={32}
        />
      </div>
      <div className="mb-4">
        <h2 className="text-black">
          <strong> Location </strong> {country} - {city}{" "}
        </h2>
        <iframe
          width="400"
          height="300"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${
            +longitude - 0.01
          }%2C${+latitude - 0.01}%2C${+longitude + 0.01}%2C${
            +latitude + 0.01
          }&layer=mapnik&marker=${+latitude},${+longitude}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default UserProfileCard;
