import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Message } from "@/types/message";

const Bubble = ({message}: {message: Message}) => {
  return (    
    <Card className={cn("max-w-1/3", message.sent && "bg-primary self-end")}>
      <CardContent className="p-2 flex flex-col gap-y-2">
        <p>{message.message}</p>
        <span className={cn("text-xs", message.sent && "float-right text-right")}>{message.time}</span>
      </CardContent>
    </Card>
  );
};

export default Bubble;
