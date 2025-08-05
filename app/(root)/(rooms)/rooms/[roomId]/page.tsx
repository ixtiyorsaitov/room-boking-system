import { Suspense } from "react";
import RoomViewPage from "../../_components/room-view-page";

const RoomPage = async ({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) => {
  const { roomId } = await params;

  return (
    <div className="w-full space-y-3">
      <Suspense fallback={<>Loading...</>}>
        <RoomViewPage roomId={roomId} />
      </Suspense>
    </div>
  );
};

export default RoomPage;
