namespace Broken_Days {
    export async function Temple(): ƒS.SceneReturn {
        console.log("Temple Scene starting");

        ƒS.Sound.play(sound.templeAmbience, 1, true);

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

        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Tempel, wie gehts?");

        ƒS.Sound.fade(sound.templeAmbience, 0, 1);
        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        // --> recieve puzzle piece
        await ƒS.Location.show(locations.temple.morning);
        hndTransition();
    }

    async function AfternoonRoutine(): Promise<void> {
        await ƒS.Location.show(locations.temple.afternoon);
        hndTransition();
    }

    async function EveningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.temple.evening);
        hndTransition();
    }
}