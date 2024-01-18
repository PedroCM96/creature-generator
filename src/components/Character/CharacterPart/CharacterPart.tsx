import React, {useEffect, useState} from "react";
import Spritesheet from 'react-responsive-spritesheet';
import {CharacterView} from "../../../domain";


type CharacterBodyPart = "body" | "bottom" | "carrying_stuff" | "hair" | "hat" | "top";

interface CharacterPartProps {
    index: number,
    part: CharacterBodyPart,
    view: CharacterView
}


export function CharacterPart({index, part, view}: CharacterPartProps) {
    const viewToCell: Record<CharacterView, [number, number]> = {
        front: [1, 4],
        left: [5, 8],
        right: [9, 12],
        back: [13, 16]
    }

    const partToZIndex: Record<CharacterBodyPart, number> = {
        body: 0,
        bottom: 1,
        top: 1,
        hair: 1,
        hat: 2,
        carrying_stuff: 3
    }
    const [image, setImage] = useState<any>();
    const loadImage = (index: number) => {
        import(`../../../sprites/${part}/${index}.png`).then(image => {
            setImage(image.default);
        });
    };

    const start = viewToCell[view][0];
    const end = viewToCell[view][1];

    useEffect(() => {
        loadImage(index)
    }, [index])

    const frontPart = () => {
        return  <Spritesheet
            image={image}
            widthFrame={64}
            heightFrame={64}
            steps={4}
            fps={8}
            direction={"forward"}
            loop={true}
            style={{zIndex: partToZIndex[part]}}
            startAt={viewToCell['front'][0]}
            endAt={viewToCell['front'][1]}
        />
    }

    const leftPart = () => {
        return  <Spritesheet
            image={image}
            widthFrame={64}
            heightFrame={64}
            steps={4}
            fps={8}
            direction={"forward"}
            loop={true}
            style={{zIndex: partToZIndex[part]}}
            startAt={viewToCell['left'][0]}
            endAt={viewToCell['left'][1]}
        />
    }

    const rightPart = () => {
        return  <Spritesheet
            image={image}
            widthFrame={64}
            heightFrame={64}
            steps={4}
            fps={8}
            direction={"forward"}
            loop={true}
            style={{zIndex: partToZIndex[part]}}
            startAt={viewToCell['right'][0]}
            endAt={viewToCell['right'][1]}
        />
    }

    const backPart = () => {
        return  <Spritesheet
            image={image}
            widthFrame={64}
            heightFrame={64}
            steps={4}
            fps={8}
            direction={"forward"}
            loop={true}
            style={{zIndex: partToZIndex[part]}}
            startAt={viewToCell['back'][0]}
            endAt={viewToCell['back'][1]
        }
        />
    }

    return (
        <div style={{position: "absolute", zIndex: partToZIndex[part]}}>
            {image && view === 'front' && frontPart()}
            {image && view === 'left' && leftPart()}
            {image && view === 'right' && rightPart()}
            {image && view === 'back' && backPart()}
        </div>
    );
}
