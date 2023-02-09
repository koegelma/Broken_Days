namespace Broken_Days {
    export async function Psychologist(): ƒS.SceneReturn {
        console.log("Psychologist Scene starting");

        switch (dataForSave.DayTime) {
            case DayTime.MORNING:
                await ƒS.Location.show(locations.psychologist.day);
                console.log("Day");
                break;
            case DayTime.AFTERNOON:
                await ƒS.Location.show(locations.psychologist.day);
                console.log("Day");
                break;
            case DayTime.EVENING:
                await ƒS.Location.show(locations.psychologist.evening);
                console.log("Evening");
                break;
        }
        ƒS.Sound.play(sound.kotoTheme, 1, true);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Psychologe, wie gehts?");
        
        ƒS.Sound.fade(sound.kotoTheme, 0, 1);
        
        return hndNextLocation();
    }
}