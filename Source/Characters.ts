///<reference path="./Main.ts"/>
namespace Broken_Days {

    //import * as Main from "./Main";
    export let characters = {
        narrator: {
            name: "Erzähler",
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
                shoked: "./Images/Characters/Main/Shoked.png",
                surprised: "./Images/Characters/Main/Surprised.png",
                tired: "./Images/Characters/Main/Tired.png",
                asleep: "./Images/Characters/Main/Asleep.png"
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