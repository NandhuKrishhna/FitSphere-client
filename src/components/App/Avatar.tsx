
import { AvatarProps } from "@/types/auth.types"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar"


export function AvatarDemo({ image, name }: AvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
    </Avatar>
  )
}
