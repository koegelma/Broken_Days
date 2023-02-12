namespace Broken_Days {

    export async function NewDay(): ƒS.SceneReturn {
        console.log("NewDay Scene starting");

        let textDayOneRoom: string[] = [
            "Was ist denn jetzt passiert?!",
            "Es ist plötzlich wieder hell geworden!",
            "War das etwa alles nur ein Traum?",
            "Ich sollte schnell nach Hanna sehen!"
        ];

        let textDayOneHannaRoom: string[] = [
            "Hanna? Hanna? Bist du da?",
            "Hanna?!",
            "...",
            "Moment mal, es ist schon wieder Montag?!",
            "Erlebe ich den selben Tag etwa noch mal?!",
            "Das kann doch alles nicht wahr sein...",
            "Das fühlt sich alles so surreal an...",
            "Ich muss Hanna finden, nur so kann ich herausfinden, was hier wirklich los ist!"
        ];

        let textDayTwoRoom: string[] = [
            "Es ist schon wieder passiert!",
            "Ich sollte schnell nach Hanna sehen!"
        ];

        let textDayTwoHannaRoom: string[] = [
            "Hanna ist wieder nicht da...",
            "Ich muss sie finden, nur so kann ich herausfinden, was hier wirklich los ist!"
        ];

        openMeter();
        if (dataForSave.despair >= 100) await triggerBadEnding();
        ƒS.Sound.play(sound.kotoTheme, 1, true);
        await ƒS.Location.show(locations.room.day);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.surprised, ƒS.positionPercent(25, 100));
        await ƒS.update(1);

        let text: string[];

        if (dataForSave.daysPassed === 1) text = textDayOneRoom;
        else text = textDayTwoRoom;

        for (let i = 0; i < text.length; i++) {
            await ƒS.Speech.tell(characters.Protagonist, text[i]);
        }

        await fadeScene();

        // hannas room
        await ƒS.Location.show(locations.hannaBedroom.day);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.shocked, ƒS.positionPercent(25, 100));
        await ƒS.update(1);

        if (dataForSave.daysPassed === 1) text = textDayOneHannaRoom;
        else text = textDayTwoHannaRoom;

        for (let i = 0; i < text.length; i++) {
            await ƒS.Speech.tell(characters.Protagonist, text[i]);
        }

        ƒS.Sound.fade(sound.kotoTheme, 0, 1);

        closeMeter();
        await fadeScene();
        return "LocationDecision";
    }
}
