namespace Broken_Days {
    export async function Neighbour(): ƒS.SceneReturn {
        console.log("Neighbour Scene starting");

        ƒS.Sound.play(sound.kotoTheme, 1, true);

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

        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Nachbar, wie gehts?");

        ƒS.Sound.fade(sound.kotoTheme, 0, 1);

        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.neighbour.morning);
        hndTransition();
    }

    async function AfternoonRoutine(): Promise<void> {
        // --> unlock laundry
        if (!dataForSave.locations.laundryUnlocked) dataForSave.locations.laundryUnlocked = true;
        await ƒS.Location.show(locations.neighbour.afternoon);
        hndTransition();
        await ƒS.Speech.tell(characters.mainCharacter, "Oh hi mark");
    }

    async function EveningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.neighbour.evening);
        hndTransition();
    }
}