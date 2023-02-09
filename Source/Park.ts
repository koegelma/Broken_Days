namespace Broken_Days {
    export async function Park(): ƒS.SceneReturn {
        console.log("Park Scene starting");

        ƒS.Sound.play(sound.urbanAmbience, 1, true);

        switch (dataForSave.DayTime) {
            case DayTime.MORNING:
                await ƒS.Location.show(locations.park.morning);
                console.log("Morning");
                break;
            case DayTime.AFTERNOON:
                await ƒS.Location.show(locations.park.afternoon);
                console.log("Afternoon");
                break;
            case DayTime.EVENING:
                await ƒS.Location.show(locations.park.evening);
                console.log("Evening");
                break;
        }

        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Park, wie gehts?");

        ƒS.Sound.fade(sound.urbanAmbience, 0, 1);

        return hndNextLocation();
    }
}