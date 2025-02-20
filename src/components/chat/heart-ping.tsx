import { MessageCircleHeart } from "lucide-react"
const HeartPing = ()=>{
    return (
        <>
        <div className="relative my-5">
          <MessageCircleHeart
            size={32}
            className="animate-ping text-red-700 absolute inset-0"
          />
          <MessageCircleHeart
            size={32}
            className="text-red-700 absolute inset-0"
          />
        </div>
        </>
    )
}

export default HeartPing;