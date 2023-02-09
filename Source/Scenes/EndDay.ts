namespace Broken_Days {
    export async function EndDay(): ƒS.SceneReturn {
        console.log("EndDay Scene starting");

        let text = {
            mainCharacter: {
                T0000: "Ich kann nicht glauben, dass ich dich nicht gefunden habe!",
                T0001: "Du kannst doch nicht einfach so wie vom Erdboden verschluckt sein!",
                T0002: "Ich habe Mama und Papa doch damals versprochen, dass ich immer auf dich aufpassen werde!",
                T0003: "Ich vermisse sie so sehr...",
                T0004: "Irgendwie habe ich ein ganz komisches Gefühl bei der ganzen Sache...",
                T0005: "Und jetzt bin ich auch noch sooo müde...",
                T0006: "Vielleicht sollte ich schlafen gehen, in meinem jetzigen Zustand kann ich eh nicht mehr klar denken...",
                T0007: "Morgen werde ich dich finden...",
                T0008: "Ich verspreche es dir..."
            }
        };

        ƒS.Sound.play(sound.kotoTheme, 1, true);
        await ƒS.Location.show(locations.room.night);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.tired, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T0000);
        await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T0001);
        await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T0002);
        await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T0003);
        await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T0004);
        await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T0005);
        await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T0006);
        await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T0007);
        ƒS.Character.hide(characters.mainCharacter);
        await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.asleep, ƒS.positionPercent(25, 100));
        ƒS.Sound.fade(sound.yawn, 0, 2);
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T0008);
        //await ƒS.Location.show(locations.room.night);
        //await ƒS.update(4);
        ƒS.Sound.fade(sound.kotoTheme, 0, 1);
        await fadeScene(3);
        return "NewDay";
    }
}