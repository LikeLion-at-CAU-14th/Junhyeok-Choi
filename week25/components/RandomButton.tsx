"use client";

import { useRouter } from "next/navigation";
import { restaurants } from "@/data/restaurants";

export default function RandomButton() {
  const router = useRouter();

  const handleClick = () => {
    const index = Math.floor(Math.random() * restaurants.length);
    router.push(`/restaurants/${restaurants[index].id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
    >
      아무거나 골라줘
    </button>
  );
}
