namespace Broken_Days {
    export async function Onsen(): ƒS.SceneReturn {
        console.log("Onsen Scene starting");

        ƒS.Sound.play(sound.onsenAmbience, 1, true);

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

        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Onsen, wie gehts?");

        ƒS.Sound.fade(sound.onsenAmbience, 0, 1);

        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.onsen.day);
        hndTransition();

    }

    async function AfternoonRoutine(): Promise<void> {
        await ƒS.Location.show(locations.onsen.day);
        hndTransition();

    }

    async function EveningRoutine(): Promise<void> {
        // --> unlock psychologist
        await ƒS.Location.show(locations.onsen.evening);
        hndTransition();
    }
}