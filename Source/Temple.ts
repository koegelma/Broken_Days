namespace Broken_Days {
    export async function Temple(): ƒS.SceneReturn {
        console.log("Temple Scene starting");

        ƒS.Sound.play(sound.templeAmbience, 1, true);

        switch (dataForSave.DayTime) {
            case DayTime.MORNING:
                await ƒS.Location.show(locations.temple.morning);
                console.log("Day");
                break;
            case DayTime.AFTERNOON:
                await ƒS.Location.show(locations.temple.afternoon);
                console.log("Day");
                break;
            case DayTime.EVENING:
                await ƒS.Location.show(locations.temple.evening);
                console.log("Evening");
                break;
        }

        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Tempel, wie gehts?");

        ƒS.Sound.fade(sound.templeAmbience, 0, 1);
        return hndNextLocation();
    }
}