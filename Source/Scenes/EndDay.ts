namespace Broken_Days {
    export async function EndDay(): ƒS.SceneReturn {
        console.log("EndDay Scene starting");

        let textDayOne: string[] = [
            "Hier ist sie auch nicht!",
            "...",
            "Ich kann nicht glauben, dass ich dich nicht gefunden habe!",
            "Du kannst doch nicht einfach so wie vom Erdboden verschluckt sein!",
            "Ich habe Mama und Papa doch damals versprochen, dass ich immer auf dich aufpassen werde!",
            "Ich vermisse die beiden so sehr...",
            "Irgendwie habe ich ein ganz komisches Gefühl bei der ganzen Sache...",
            "Und jetzt bin ich auch noch sooo müde...",
            "Ich sollte wach bleiben für den Fall, dass Hanna noch auftaucht...",
            "Moment mal, wieso fühle ich mich plötzlich so komisch?",
            "Irgendwas passiert hier gerade..."
        ];

        let textDayRepeating: string[] = [
            "Ich habe sie schon wieder nicht gefunden!",
            "Das kann doch nicht wahr sein!",
            "Und jetzt fängt es schon wieder an...",
            "Bitte nicht noch einmal..."
        ];

        let text: string[];

        if (dataForSave.daysPassed === 1) text = textDayOne;
        else text = textDayRepeating;


        ƒS.Sound.play(sound.kotoTheme, 1, true);
        await ƒS.Location.show(locations.room.night);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.tired, ƒS.positionPercent(25, 100));
        await ƒS.update(1);

        for (let i = 0; i < text.length; i++) {
            await ƒS.Speech.tell(characters.Protagonist, text[i]);
        }

        ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.asleep, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Egal, was auch passiert...");
        await ƒS.Speech.tell(characters.Protagonist, "...");
        await ƒS.Speech.tell(characters.Protagonist, "Ich werde dich finden, Hanna...");
        await ƒS.Speech.tell(characters.Protagonist, "Ich verspreche es dir...");

        ƒS.Sound.fade(sound.kotoTheme, 0, 1);
        await fadeScene(3);
        return "NewDay";
    }
}