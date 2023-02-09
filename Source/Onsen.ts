namespace Broken_Days {
    export async function Onsen(): ƒS.SceneReturn {
        console.log("Onsen Scene starting");

        ƒS.Sound.play(sound.onsenAmbience, 1, true);

        switch (dataForSave.DayTime) {
            case DayTime.MORNING:
                await ƒS.Location.show(locations.onsen.day);
                console.log("Day");
                break;
            case DayTime.AFTERNOON:
                await ƒS.Location.show(locations.onsen.day);
                console.log("Day");
                break;
            case DayTime.EVENING:
                await ƒS.Location.show(locations.onsen.evening);
                console.log("Evening");
                break;
        }

        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Onsen, wie gehts?");

        ƒS.Sound.fade(sound.onsenAmbience, 0, 1);

        return hndNextLocation();
    }
}