///<reference path="./Main.ts"/>

namespace Broken_Days {
    // items
    export let items = {
        puzzlePiece1: {
            name: "Puzzlestück 1",
            description: "Eine Nachricht von Hanna.",
            image: "./Images/Items/puzzlePiece.png",
            number: 1
        },
        puzzlePiece2: {
            name: "Puzzlestück 2",
            description: "Eine Nachricht von Hanna.",
            image: "./Images/Items/puzzlePiece.png",
            number: 2
        },
        puzzlePiece3: {
            name: "Puzzlestück 3",
            description: "Eine Nachricht von Hanna.",
            image: "./Images/Items/puzzlePiece.png",
            number: 3
        },
        puzzlePiece4: {
            name: "Puzzlestück 4",
            description: "Eine Nachricht von Hanna.",
            image: "./Images/Items/puzzlePiece.png",
            number: 4
        }
    };

    export let puzzleMessages = {
        puzzle1text: "Weißt du noch, als wir als Kinder immer im Park herumgetollt haben? Ich denke oft an diese Zeit zurück. Es tut mir leid, dass wir uns nicht sehen können, aber ich bin immer bei dir. Pass auf dich auf, Hanna.",
        puzzle2text: "Ich war heute Morgen im Onsen und dachte an dich. Du hast mir einmal gesagt, dass das Wasser heilende Kräfte hat. Dieser Gedanke gibt mir Kraft. Du musst jetzt stark bleiben und dich um dich selbst kümmern, für uns beide, Hanna.",
        puzzle3text: "Ich bin gerade im Tempel und denke an unsere Kindheit. Erinnerst du dich noch an die Geschichten, die unser Vater immer erzählt hat? Ich hoffe, dass sie dich trösten, wenn du an mich denkst, Hanna.",
        puzzle4text: "Ich hoffe du machst dir nicht zu große Sorgen. Ich weiß, dass du immer noch nach mir suchst und ich danke dir dafür. Es ist nun aber an der Zeit, dass du die Wahrheit verstehst. Komm zu meinem Zimmer, ich warte auf dich. In Liebe, Hanna."
    };

    export function showHannasMessages(_number: number): void {
        ƒS.Text.setClass("hannaMessage");
        let text: string;

        switch (_number) {
            case 1:
                text = puzzleMessages.puzzle1text;
                break;
            case 2:
                text = puzzleMessages.puzzle2text;
                break;
            case 3:
                text = puzzleMessages.puzzle3text;
                break;
            case 4:
                text = puzzleMessages.puzzle4text;
                break;
        }

        ƒS.Text.print(text);
        console.log("showHannasMessages");
    }
}