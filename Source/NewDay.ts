namespace Broken_Days {

    /* async function MorningRoutine(): Promise<void> {


    } */

    export async function NewDay(): ƒS.SceneReturn {
        console.log("NewDay Scene starting");

        let textDayOne: string[] = [
            "Oh man, das hat sich alles wie ein schlechter Traum angefühlt...",
            "Vielleicht war es ja wirklich nur ein Traum?"
        ];

        /* let textDayOne = {
            mainCharacter: {
                T0000: "Oh man, das hat sich alles wie ein schlechter Traum angefühlt...",
                T0001: "",
                T0002: ""
            }
        }; */

        await ƒS.Location.show(locations.room.day);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);

        let text: string[];

        if (dataForSave.daysPassed == 1) {
            text = textDayOne;
        }

        for (let i = 0; i < text.length; i++) {
            await ƒS.Speech.tell(characters.mainCharacter, text[i]);
        }
    }
}
