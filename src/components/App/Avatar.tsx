import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "../../components/ui/avatar"
  
 type Props ={
    image? : string,
    name? : string
 }

  export function AvatarDemo({image , name}:Props) {
    // console.log(image)
    return (
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
      </Avatar>
    )
  }
  