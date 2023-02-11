namespace Broken_Days {
    export async function EndDay(): ƒS.SceneReturn {
        console.log("EndDay Scene starting");

        let text = {
            mainCharacter: {
                T00: "Hier ist sie auch nicht!",
                T01: "...",
                T02: "Ich kann nicht glauben, dass ich dich nicht gefunden habe!",
                T03: "Du kannst doch nicht einfach so wie vom Erdboden verschluckt sein!",
                T04: "Ich habe Mama und Papa doch damals versprochen, dass ich immer auf dich aufpassen werde!",
                T05: "Ich vermisse die beiden so sehr...",
                T06: "Irgendwie habe ich ein ganz komisches Gefühl bei der ganzen Sache...",
                T07: "Und jetzt bin ich auch noch sooo müde...",
                T08: "Ich sollte wach bleiben für den Fall, dass Hanna noch auftaucht...",
                T09: "...",
                T10: "Ich werde dich finden, Hanna...",
                T11: "Ich verspreche es dir..."
            }
        };

        ƒS.Sound.play(sound.kotoTheme, 1, true);
        await ƒS.Location.show(locations.room.night);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.tired, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, text.mainCharacter.T00);
        await ƒS.Speech.tell(characters.Protagonist, text.mainCharacter.T01);
        await ƒS.Speech.tell(characters.Protagonist, text.mainCharacter.T02);
        await ƒS.Speech.tell(characters.Protagonist, text.mainCharacter.T03);
        await ƒS.Speech.tell(characters.Protagonist, text.mainCharacter.T04);
        await ƒS.Speech.tell(characters.Protagonist, text.mainCharacter.T05);
        await ƒS.Speech.tell(characters.Protagonist, text.mainCharacter.T06);
        await ƒS.Speech.tell(characters.Protagonist, text.mainCharacter.T07);
        await ƒS.Speech.tell(characters.Protagonist, text.mainCharacter.T08);
        await ƒS.Speech.tell(characters.Protagonist, text.mainCharacter.T09);
        ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.asleep, ƒS.positionPercent(25, 100));
        ƒS.Sound.fade(sound.yawn, 0, 2);
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, text.mainCharacter.T10);
        await ƒS.Speech.tell(characters.Protagonist, text.mainCharacter.T11);

        ƒS.Sound.fade(sound.kotoTheme, 0, 1);
        await fadeScene(3);
        return "NewDay";
    }
}