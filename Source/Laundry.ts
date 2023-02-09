namespace Broken_Days {
    export async function Laundry(): ƒS.SceneReturn {
        console.log("Laundry Scene starting");

        await ƒS.Location.show(locations.laundry);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Waschsalon, wie gehts?");

        return hndNextLocation();
    }
}