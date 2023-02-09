namespace Broken_Days {
    export async function Restaurant(): ƒS.SceneReturn {
        console.log("Restaurant Scene starting");

        ƒS.Sound.play(sound.restaurantAmbience, 1, true);

        await ƒS.Location.show(locations.restaurant);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, "Hallo Restaurant, wie gehts?");

        ƒS.Sound.fade(sound.restaurantAmbience, 0, 1);

    }
}