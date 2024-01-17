import React, {useEffect, useState} from "react";
import Spritesheet from 'react-responsive-spritesheet';


type CharacterBodyPart = "body" | "bottom" | "carrying_stuff" | "hair" | "hat" | "top";
interface CharacterPartProps  {
  index: number,
  part: CharacterBodyPart
}

export function CharacterPart({index, part}: CharacterPartProps) {
  const [image, setImage] = useState<any>();
  const loadImage = (index: number) => {
    import(`../../../sprites/${part}/${index}.png`).then(image => {
      setImage(image.default);
    });
  };

  useEffect(() => {
    loadImage(index)
  }, [index])

  return (
        <div style={{position: "absolute"}}>
          {image && <Spritesheet image={image} widthFrame={64} heightFrame={64} steps={16} fps={6} direction={'forward'} loop={true}/>}
        </div>
  );
}
