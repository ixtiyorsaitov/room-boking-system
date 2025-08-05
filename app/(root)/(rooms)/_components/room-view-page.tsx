import { notFound } from "next/navigation";

export async function getData(filmId: string) {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URI}/api/rooms/${filmId}`,
    {
      cache: "no-store",
      method: "GET",
    }
  );

  const res = await req.json();
  if (!res.success) {
    // return notFound();
  }
  console.log("res", res);
  return res;
}

const RoomViewPage = async ({ roomId }: { roomId: string }) => {
  const data = await getData(roomId);
  return <div>{roomId}</div>;
};

export default RoomViewPage;
