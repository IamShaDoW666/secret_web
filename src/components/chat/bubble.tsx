import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Message } from "@/types/message";

const TypingIndicator = () =>  {
  return (
    <div className="flex items-center space-x-2">      
      <div className="flex space-x-1 items-center">
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0ms]"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:200ms]"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:400ms]"></span>
      </div>
    </div>
  );
}

const Bubble = ({
  message,
  typing = false,
}: {
  message: Message;
  typing?: boolean;
}) => {
  return (
    <Card className={cn("max-w-1/3", message.sent && "bg-primary self-end")}>
      <CardContent className="p-2 flex flex-col gap-y-2">
        {!typing ? <p>{message.message}</p> : <TypingIndicator />}
        <span
          className={cn("text-xs", message.sent && "float-right text-right")}
        >
          {message.time}
        </span>
      </CardContent>
    </Card>
  );
};

export default Bubble;
