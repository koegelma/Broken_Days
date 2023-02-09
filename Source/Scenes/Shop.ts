namespace Broken_Days {
    export async function Shop(): ƒS.SceneReturn {
        console.log("Shop Scene starting");

        ƒS.Sound.play(sound.urbanAmbience, 1, true);

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

        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Laden, wie gehts?");

        ƒS.Sound.fade(sound.urbanAmbience, 0, 1);

        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        // --> unlock temple
        await ƒS.Location.show(locations.shop.morning);
        hndTransition();
    }

    async function AfternoonRoutine(): Promise<void> {
        await ƒS.Location.show(locations.shop.afternoon);
        hndTransition();
    }

    async function EveningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.shop.evening);
        hndTransition();
    }
}