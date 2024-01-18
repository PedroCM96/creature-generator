import {Character} from "../Character";
import {Character as CharacterType, characterFromSeed, characterPropToOption, CharacterView} from "../../domain";
import React, {ChangeEvent, useEffect, useState} from "react";
import {generateRandomSeed, Seed, seedFromBigIntString, seedFromCharacter} from "../../domain/Seed";
import "./App.css";

export function App() {
    const initialView: number = 0;
    const initialSeed = generateRandomSeed();
    const initialCharacter = characterFromSeed(initialSeed);

    const [view, setView] = useState<number>(initialView);
    const [seed, setSeed] = useState<Seed>(initialSeed)
    const [character, setCharacter] = useState<CharacterType>(initialCharacter);

    const views: CharacterView[] = ['front', 'left', 'back', 'right'];

    useEffect(() => {
        setCharacter(characterFromSeed(seed));
    }, [seed]);
    const regenerateCharacter = () => {
       const newSeed = generateRandomSeed();
       setSeed(newSeed);
    }

    const rotateCharacter = () => {
        const newView = view + 1 === views.length ? 0 : view + 1;
        setView(newView);
    }

    const onSeedChange = (e: ChangeEvent<HTMLInputElement>) => {
        const seedAsString = e.target.value;
        try {
            const seed = seedFromBigIntString(seedAsString);
            setSeed(seed);
        } catch (e) {
            alert('Please provide between 0 and 2^64');
        }
    }

    const onBodyPartChange = (bodyPart: keyof CharacterType) => {
        const maxValue = characterPropToOption[bodyPart];
        const currentValue = character[bodyPart];

        const newValue = currentValue + 1 === maxValue ? 0 : currentValue + 1;
        const newCharacter = {...character, [bodyPart]: newValue}
        setSeed(seedFromCharacter(newCharacter, 8, 8));
    }

    const copySeedToClipboard = () => {
        navigator.clipboard.writeText(seed.value.toString()).then(() => {
            alert('Seed copied to clipboard!');
        })
    }

  return (
      <div className={'app-container'}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
              <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column'}}>
                  {/*Character*/}
                  <div style={{display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <button className={'hgss-button green'} onClick={() => rotateCharacter()}>↪️ Rotate ↪️</button>
                      <Character character={character} view={views[view]}/>
                  </div>
                  {/*Buttons*/}
                  <div style={{display: 'flex', width: '100%', flexDirection: 'column', gap: 5, paddingTop: '24px'}}>
                      <div style={{display: 'flex', width: '100%', gap: 5}}>
                          <button className={'hgss-button orange'} onClick={() => onBodyPartChange('body')} style={{flex: 1}}>
                              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <div>➡️</div>
                                  <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>Body</div>
                              </div>
                          </button>
                          <button className={'hgss-button orange'} onClick={() => onBodyPartChange('hat')} style={{flex: 1}}>
                              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <div>➡️</div>
                                  <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>Hat</div>
                              </div>
                          </button>
                      </div>
                      <div style={{display: 'flex', width: '100%', gap: 5}}>
                          <button className={'hgss-button orange'} onClick={() => onBodyPartChange('hair')} style={{flex: 1}}>
                              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <div>➡️</div>
                                  <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>Hair</div>
                              </div>
                          </button>
                          <button className={'hgss-button orange'} onClick={() => onBodyPartChange('top')} style={{flex: 1}}>
                              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <div>➡️</div>
                                  <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>Top</div>
                              </div>
                          </button>
                      </div>
                      <div style={{display: 'flex', width: '100%', gap: 5}}>
                          <button className={'hgss-button orange'} onClick={() => onBodyPartChange('bottom')} style={{flex: 1}}>
                              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <div>➡️</div>
                                  <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>Bottom</div>
                              </div>
                          </button>
                          <button className={'hgss-button orange'} onClick={() => onBodyPartChange('carryingStuff')} style={{flex: 1}}>
                              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <div>➡️</div>
                                  <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>Bag</div>
                              </div>
                          </button>
                      </div>

                  </div>
              </div>
          </div>
          <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
              <button className={'hgss-button green'} onClick={() => regenerateCharacter()}>🔀 Random 🔀</button>
          </div>
          <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
              <input type={"text"} value={seed?.value.toString()} onChange={(e) => onSeedChange(e)}/>
              <button className={'hgss-button'} onClick={() => copySeedToClipboard()}>📎</button>
          </div>
      </div>
  );
}
