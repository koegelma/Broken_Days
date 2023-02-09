namespace Broken_Days {
    export async function Friend(): ƒS.SceneReturn {
        console.log("Friend Scene starting");

        ƒS.Sound.play(sound.urbanAmbience, 1, true);

        switch (dataForSave.DayTime) {
            case DayTime.MORNING:
                await ƒS.Location.show(locations.friend.morning);
                break;
            case DayTime.AFTERNOON:
                await ƒS.Location.show(locations.friend.afternoon);
                break;
            case DayTime.EVENING:
                await ƒS.Location.show(locations.friend.evening);
                break;
        }

        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Freundin, wie gehts?");

        ƒS.Sound.fade(sound.urbanAmbience, 0, 1);

        return hndNextLocation();
    }
}