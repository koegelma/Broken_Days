namespace Broken_Days {
    export async function NewDay(): ƒS.SceneReturn {
        console.log("NewDay Scene starting");

        await ƒS.Location.show(locations.room.day);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Oh man, das hat sich alles wie ein schlechter Traum angefühlt...");
    }
}
