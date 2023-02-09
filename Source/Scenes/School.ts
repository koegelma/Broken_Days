namespace Broken_Days {
    export async function School(): ƒS.SceneReturn {
        console.log("School Scene starting");

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

        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Schule, wie gehts?");

        if (dataForSave.DayTime != DayTime.EVENING) ƒS.Sound.fade(sound.schoolAmbience, 0, 1);

        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        // --> unlock onsen
        await ƒS.Location.show(locations.school.morning);
        ƒS.Sound.play(sound.schoolAmbience, 0.7, true);
        hndTransition();
    }

    async function AfternoonRoutine(): Promise<void> {
        await ƒS.Location.show(locations.school.afternoon);
        ƒS.Sound.play(sound.schoolAmbience, 0.7, true);
        hndTransition();
    }

    async function EveningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.school.evening);
        hndTransition();
    }
}