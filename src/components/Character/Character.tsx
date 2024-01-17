import {CharacterPart} from "./CharacterPart";

interface CharacterProps  {
  body: number,
  bottom: number,
  carryingStuff: number,
  hair: number,
  hat: number,
  top: number
}

export function Character({body, bottom, carryingStuff, hair, hat, top}: CharacterProps) {
  return (
    <div style={{position: "relative"}}>
      <CharacterPart index={body} part={"body"}/>
      <CharacterPart index={bottom} part={"bottom"}/>
      <CharacterPart index={carryingStuff} part={"carrying_stuff"}/>
      <CharacterPart index={hair} part={"hair"}/>
      <CharacterPart index={hat} part={"hat"}/>
      <CharacterPart index={top} part={"top"}/>
    </div>
  );
}
