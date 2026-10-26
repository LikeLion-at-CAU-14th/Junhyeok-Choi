import RandomButton from "@/components/RandomButton";

export default function RandomPage() {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <p className="text-6xl">🎲</p>
      <h1 className="text-3xl font-bold">오늘 뭐 먹지?</h1>
      <p className="text-gray-600">고민될 땐 도감에 맡겨보세요.</p>
      <RandomButton />
    </div>
  );
}
