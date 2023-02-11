namespace Broken_Days {
    export async function Park(): ƒS.SceneReturn {
        console.log("Park Scene starting");

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

        await ƒS.Speech.tell(characters.Protagonist, "Hallo Park, wie gehts?");

        ƒS.Sound.fade(sound.urbanAmbience, 0, 1);

        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.park.morning);
        hndTransition();

    }

    async function AfternoonRoutine(): Promise<void> {
        await ƒS.Location.show(locations.park.afternoon);
        hndTransition();

    }

    async function EveningRoutine(): Promise<void> {
        // --> recieve puzzle piece
        await ƒS.Location.show(locations.park.evening);
        hndTransition();

    }
}