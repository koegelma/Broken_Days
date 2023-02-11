namespace Broken_Days {
    export async function Psychologist(): ƒS.SceneReturn {
        console.log("Psychologist Scene starting");
        
        ƒS.Sound.play(sound.kotoTheme, 1, true);

        switch (dataForSave.DayTime) {
            case DayTime.MORNING:
                await MorningRoutine();
                break;
            case DayTime.AFTERNOON:
                await AfternoonRoutine();
                break;
            case DayTime.EVENING:
                await EveningRoutine();
                break;
        }


        ƒS.Sound.fade(sound.kotoTheme, 0, 1);

        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.psychologist.day);
        hndTransition();
        await ƒS.Speech.tell(characters.Protagonist, "Dr. Kimura ist noch nicht da. Ich sollte später nochmal vorbeischauen.");
    }

    async function AfternoonRoutine(): Promise<void> {
        // --> unlock onsen
        await ƒS.Location.show(locations.psychologist.day);
        hndTransition();
        if (!dataForSave.locations.onsenUnlocked) await FirstVisit();
        else await RecurringVisit();
    }

    async function EveningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.psychologist.evening);
        hndTransition();
        await ƒS.Speech.tell(characters.Protagonist, "Dr. Kimura ist nicht da. Ich sollte später nochmal vorbeischauen.");
    }

    async function FirstVisit(): Promise<void> {
        ƒS.Character.show(characters.DrKimura, characters.DrKimura.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.Speech.tell(characters.DrKimura, "Hallo " + dataForSave.nameProtagonist + ". Wie kann ich ihnen helfen?");
        await ƒS.Speech.tell(characters.Protagonist, "Hallo Dr. Kimura, ich bin hier um Hanna zu finden.");
        await ƒS.Speech.tell(characters.Protagonist, "Ich kann sie nicht finden und ich habe Angst, dass etwas schlimmes passiert ist!");
        await ƒS.Speech.tell(characters.DrKimura, "Oh nein, das tut mir leid. Wie kann ich ihnen helfen sie zu finden?");
        await ƒS.Speech.tell(characters.Protagonist, "Wissen sie wo sie hingegangen sein könnte?");
        await ƒS.Speech.tell(characters.DrKimura, "Mhh...");
        await ƒS.Speech.tell(characters.DrKimura, "Vielleicht ist sie im Onsen?");
        await ƒS.Speech.tell(characters.DrKimura, "Ich habe ihr geraten dort hin zu gehen, um sich zu entspannen.");
        await ƒS.Speech.tell(characters.DrKimura, "Die heißen Quellen dort sind sehr beruhigend!");
        await ƒS.Speech.tell(characters.Protagonist, "Danke Dr. Kimura, ich werde es dort versuchen.");
        await ƒS.Speech.tell(characters.DrKimura, "Hanna hat mir erzählt, wie sehr sie sich um sie sorgen seit ihre Eltern gestorben sind.");
        await ƒS.Speech.tell(characters.DrKimura, "Sie sind ein wirklich toller Bruder " + dataForSave.nameProtagonist + ".");
        await ƒS.Speech.tell(characters.DrKimura, "Sie sagte auch, dass sie früher studieren wollten, aber nach dem Tod ihrer Eltern dann angefangen haben im Restaurant zu arbeiten?");
        await ƒS.Speech.tell(characters.Protagonist, "Ja, außer mir gab es niemanden der für Hanna sorgen konnte.");
        await ƒS.Speech.tell(characters.Protagonist, "Ich hatte unseren Eltern versprochen auf sie aufzupassen...");
        await ƒS.Speech.tell(characters.DrKimura, "Machen sie sich bitte keine Sorgen " + dataForSave.nameProtagonist + ".");
        await ƒS.Speech.tell(characters.DrKimura, "Sie haben eine so starke und gutherzige Persönlichkeit, ich bin mir sicher, dass sie Hanna bald finden werden.");
        ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.surprised, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Vielen Dank Dr. Kimura.");
        dataForSave.locations.onsenUnlocked = true;
    }

    async function RecurringVisit(): Promise<void> {
        ƒS.Character.show(characters.DrKimura, characters.DrKimura.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.Speech.tell(characters.DrKimura, "Hallo " + dataForSave.nameProtagonist + ". Haben sie Hanna schon gefunden?");
        await ƒS.Speech.tell(characters.Protagonist, "Nein, leider nicht.");
        if (!dataForSave.puzzlePieces.puzzle2Unlocked) await ƒS.Speech.tell(characters.DrKimura, "Sie sollten mal im Onsen schauen, Hanna war bestimmt dort.");
        else await ƒS.Speech.tell(characters.DrKimura, "Schade, ich wünsche ihnen viel Glück bei der Suche. Ich bin mir sicher, dass sie sie bald finden werden.");
    }
}