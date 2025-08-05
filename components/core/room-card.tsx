import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, DollarSign } from "lucide-react";
import { IRoom } from "@/types";

interface RoomCardProps {
  room: IRoom;
  onBook: (room: IRoom) => void;
}

const RoomCard = ({ room, onBook }: RoomCardProps) => {
  return (
    <Card className="h-full flex flex-col justify-between transition-all duration-200 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 bg-card">
      <div className="flex-1">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-elegant text-lg line-clamp-2">
              {room.name}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm">Capacity: {room.capacity} people</span>
          </div>

          <div className="flex items-center gap-2 text-luxury font-semibold">
            <DollarSign className="h-5 w-5" />
            <span className="text-lg">{room.price}/night</span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {room.description}
          </p>
        </CardContent>
      </div>

      <CardFooter>
        <Button onClick={() => onBook(room)} className="w-full">
          Book Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
