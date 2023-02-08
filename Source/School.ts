namespace Broken_Days {
    export async function School(): ƒS.SceneReturn {
        console.log("School Scene starting");

        switch (dataForSave.DayTime) {
            case DayTime.MORNING:
                await ƒS.Location.show(locations.school.morning);
                break;
            case DayTime.AFTERNOON:
                await ƒS.Location.show(locations.school.afternoon);
                break;
            case DayTime.EVENING:
                //await ƒS.Location.show(locations.school.evening);
                console.log("Evening not implemented yet");
                break;
        }

        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Schule, wie gehts?");

        return hndNextLocation();
    }
}