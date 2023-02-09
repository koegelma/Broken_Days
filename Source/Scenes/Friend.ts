namespace Broken_Days {
    export async function Friend(): ƒS.SceneReturn {
        console.log("Friend Scene starting");

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

        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Freundin, wie gehts?");

        ƒS.Sound.fade(sound.urbanAmbience, 0, 1);

        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.friend.morning);
        hndTransition();
    }

    async function AfternoonRoutine(): Promise<void> {
        await ƒS.Location.show(locations.friend.afternoon);
        hndTransition();
    }

    async function EveningRoutine(): Promise<void> {
        // --> unlock shop
        await ƒS.Location.show(locations.friend.evening);
        hndTransition();
    }
}