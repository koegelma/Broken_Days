///<reference path="./Main.ts"/>
namespace Broken_Days {

    //import * as Main from "./Main";
    export let characters = {
        narrator: {
            name: "Erzähler",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {}
        },

        blank: {
            name: " ",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {}
        },

        mainCharacter: {
            name: dataForSave.nameProtagonist,
            origin: ƒS.ORIGIN.BOTTOMCENTER,   // Ankerpunkt: Anfangsposition im Canvas, kann in der Szene umpositioniert werden
            pose: {
                angry: "./Images/Characters/Main/Angry.png",
                happy: "./Images/Characters/Main/Happy.png",
                neutral: "./Images/Characters/Main/Neutral.png",
                sad: "./Images/Characters/Main/Sad.png",
                shoked: "./Images/Characters/Main/Shocked.png",
                surprised: "./Images/Characters/Main/Surprised.png",
                tired: "./Images/Characters/Main/Tired.png",
                asleep: "./Images/Characters/Main/Asleep.png"
            }
        },

        Takashi: {
            name: "Takashi",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
            }
        },

        Etsuko: {
            name: "Etsuko",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/Etsuko/Neutral.png",
                optimistic: "./Images/Characters/Etsuko/Optimistic.png",
                sad: "./Images/Characters/Etsuko/Sad.png",
                surprised: "./Images/Characters/Etsuko/Surprised.png"
            }
        },

        Kana: {
            name: "Kana",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
            }
        }
        /* ,
        secondCharacter: {
          name: "Second",
          origin: ƒS.ORIGIN.BOTTOMCENTER,   // Ankerpunkt: Anfangsposition im Canvas, kann in der Szene umpositioniert werden
          pose: {
            angry: "Pfad.png",
            happy: "Pfad.png",
            neutral: "Pfad.png"
          }
        } */
    };

    export async function UpdateName(): Promise<void> {
        characters.mainCharacter.name = dataForSave.nameProtagonist;
    }
}