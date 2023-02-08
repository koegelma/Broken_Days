namespace Broken_Days {
    export async function Neighbour(): ƒS.SceneReturn {
        console.log("Neighbour Scene starting");

        switch (dataForSave.DayTime) {
            case DayTime.MORNING:
                await ƒS.Location.show(locations.neighbour.morning);
                console.log("Morning");
                break;
            case DayTime.AFTERNOON:
                await ƒS.Location.show(locations.neighbour.afternoon);
                console.log("Afternoon");
                break;
            case DayTime.EVENING:
                await ƒS.Location.show(locations.neighbour.evening);
                console.log("Evening");
                break;
        }

        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Nachbar, wie gehts?");


        return hndNextLocation();
    }
}