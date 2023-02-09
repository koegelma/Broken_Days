namespace Broken_Days {
    export async function Psychologist(): ƒS.SceneReturn {
        console.log("Psychologist Scene starting");

        switch (dataForSave.DayTime) {
            case DayTime.MORNING:
                await MorningRoutine();
                break;
            case DayTime.AFTERNOON:
                await AfternoonRoutine();
                break;
            case DayTime.EVENING:
                await EveningRoutine();
                break;
        }
        ƒS.Sound.play(sound.kotoTheme, 1, true);
        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Psychologe, wie gehts?");

        ƒS.Sound.fade(sound.kotoTheme, 0, 1);

        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.psychologist.day);
        hndTransition();
    }

    async function AfternoonRoutine(): Promise<void> {
        // --> recieve puzzle piece
        await ƒS.Location.show(locations.psychologist.day);
        hndTransition();

    }

    async function EveningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.psychologist.evening);
        hndTransition();
    }
}