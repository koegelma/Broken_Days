namespace Broken_Days {
    export async function Restaurant(): ƒS.SceneReturn {
        console.log("Restaurant Scene starting");

        ƒS.Sound.play(sound.phoneVibrate, 1, false);
        ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.surprised, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Oh, wer ruft mich denn jetzt an, könnte das Hanna sein?");
        await ƒS.Progress.delay(4);
        await ƒS.Speech.tell(characters.Protagonist, "Hallo?");
        await ƒS.Speech.tell(characters.Takashi, dataForSave.nameProtagonist + "! Du solltest schnell herkommen, ich habe hier eine Nachricht von Hanna für dich gefunden!");
        await ƒS.Speech.tell(characters.Protagonist, "Was!? Ok ich komme sofort!");
        await fadeScene();

        ƒS.Sound.play(sound.restaurantAmbience, 1, true);

        await ƒS.Location.show(locations.restaurant);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Takashi?");

        await ƒS.Character.show(characters.Takashi, characters.Takashi.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Takashi, "Ah, " + dataForSave.nameProtagonist + "!");
        await ƒS.Speech.tell(characters.Protagonist, "Was ist denn passiert?");
        await ƒS.Speech.tell(characters.Takashi, "Hanna hat hier eine Nachricht hinterlassen, ich habe sie eben gefunden! Hier, schau mal!");
        showHannasMessages(4);
        await ƒS.Speech.tell(characters.Blank, "");
        await ƒS.Speech.tell(characters.Takashi, "Was ist denn, was hat sie geschrieben?");
        await ƒS.Speech.tell(characters.Protagonist, "...");
        await ƒS.Speech.tell(characters.Protagonist, "Sie ist bei uns zu Hause...");
        await ƒS.Speech.tell(characters.Takashi, "Was? Was meinst du damit?");
        await ƒS.Speech.tell(characters.Protagonist, "Ich habe irgendwie ein ganz schlechtes Gefühl dabei, ich glaube ich sollte schnellstens zu ihr fahren!");
        await ƒS.Speech.tell(characters.Takashi, "Ja, das ist wahrscheinlich eine gute Idee, du solltest schnellstens losfahren!");

        ƒS.Sound.fade(sound.restaurantAmbience, 0, 1);

        await fadeScene();
        return "Ending";
    }
}