///<reference path="./Main.ts"/>
namespace Broken_Days {

    export let characters = {
        Narrator: {
            name: "Erzähler",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {}
        },

        Blank: {
            name: " ",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {}
        },

        Protagonist: {
            name: dataForSave.nameProtagonist,
            origin: ƒS.ORIGIN.BOTTOMCENTER, 
            pose: {
                angry: "./Images/Characters/Protagonist/Angry.png",
                happy: "./Images/Characters/Protagonist/Happy.png",
                neutral: "./Images/Characters/Protagonist/Neutral.png",
                sad: "./Images/Characters/Protagonist/Sad.png",
                shocked: "./Images/Characters/Protagonist/Shocked.png",
                surprised: "./Images/Characters/Protagonist/Surprised.png",
                tired: "./Images/Characters/Protagonist/Tired.png",
                asleep: "./Images/Characters/Protagonist/Asleep.png"
            }
        },

        Hanna: {
            name: "Hanna",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/Hanna/Neutral.png",
                happy: "./Images/Characters/Hanna/Happy.png"
            }
        },

        Takashi: {
            name: "Takashi",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/Takashi/Neutral.png"
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
                neutral: "./Images/Characters/Kana/Neutral.png",
                surprised: "./Images/Characters/Kana/Surprised.png"
            }
        },

        Saito: {
            name: "Herr Saito",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/Saito/Neutral.png",
                sad: "./Images/Characters/Saito/Sad.png"
            }
        },

        Yamato: {
            name: "Herr Yamato",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/Yamato/Neutral.png"
            }
        },

        Kenzo: {
            name: "Kenzo",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                happy: "./Images/Characters/Kenzo/Happy.png",
                neutral: "./Images/Characters/Kenzo/Neutral.png",
                surprised: "./Images/Characters/Kenzo/Surprised.png",
                sad: "./Images/Characters/Kenzo/Sad.png"
            }
        },

        DrKimura: {
            name: "Dr. Kimura",
            origin: ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                neutral: "./Images/Characters/DrKimura/Neutral.png"
            }
        }
    };

    export function UpdateName(): void {
        characters.Protagonist.name = dataForSave.nameProtagonist;
    }
}