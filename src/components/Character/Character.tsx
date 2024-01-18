import {CharacterPart} from "./CharacterPart";
import {Character as CharacterType, CharacterView} from "../../domain";


interface CharacterProps  {
    character: CharacterType,
    view: CharacterView
}

export function Character({character, view}: CharacterProps) {
  return (
    <div style={{position: 'relative', width: '64px', height: '64px'}}>
      <CharacterPart index={character.body} part={"body"} view={view}/>
      <CharacterPart index={character.bottom} part={"bottom"} view={view}/>
      <CharacterPart index={character.carryingStuff} part={"carrying_stuff"} view={view}/>
      <CharacterPart index={character.hair} part={"hair"} view={view}/>
      <CharacterPart index={character.hat} part={"hat"} view={view}/>
      <CharacterPart index={character.top} part={"top"} view={view}/>
    </div>
  );
}
