namespace Broken_Days {
    export async function Shop(): ƒS.SceneReturn {
        console.log("Shop Scene starting");

        ƒS.Sound.play(sound.urbanAmbience, 1, true);

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

        ƒS.Sound.fade(sound.urbanAmbience, 0, 1);

        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        // --> unlock temple
        await ƒS.Location.show(locations.shop.morning);
        hndTransition();
        if (!dataForSave.locations.templeUnlocked) await FirstVisit();
        else await RecurringVisit();
    }

    async function AfternoonRoutine(): Promise<void> {
        await ƒS.Location.show(locations.shop.afternoon);
        hndTransition();
        await ƒS.Speech.tell(characters.Protagonist, "Das Geschäft scheint gerade geschlossen zu sein. Ich sollte später nochmal vorbeischauen.");
    }

    async function EveningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.shop.evening);
        hndTransition();
        await ƒS.Speech.tell(characters.Protagonist, "Das Geschäft scheint gerade geschlossen zu sein. Ich sollte später nochmal vorbeischauen.");
    }

    async function FirstVisit(): Promise<void> {
        ƒS.Character.show(characters.Yamato, characters.Yamato.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.Speech.tell(characters.Yamato, "Hallo, willkommen in meinem Geschäft. Wie kann ich Ihnen heute helfen?");
        await ƒS.Speech.tell(characters.Protagonist, "Ich suche meine kleine Schwester Hanna. Kana hat mir gesagt, dass sie oft zusammen hierher kommen. Haben Sie sie heute zufällig gesehen?");
        await ƒS.Speech.tell(characters.Yamato, "Oh ja, Kana und Hanna sind hier oft zu Besuch. Aber ich muss zugeben, dass ich sie schon eine Weile nicht mehr gesehen habe. Ist alles in Ordnung mit ihr?");
        await ƒS.Speech.tell(characters.Protagonist, "Nein, ich kann sie nicht finden und ich mache mir große Sorgen. Haben Sie eine Idee, wo sie sein könnte?");
        await ƒS.Speech.tell(characters.Yamato, "Hmm, wissen Sie, ich habe gehört, dass sie manchmal in den Tempel geht, um ein wenig nachzudenken. Sie finden ihn ein paar Blocks von hier entfernt. Vielleicht ist sie dort.");
        await ƒS.Speech.tell(characters.Protagonist, "Vielen Dank für die Hilfe. Ich werde es dort mal versuchen.");
        await ƒS.Speech.tell(characters.Yamato, "Kein Problem, ich hoffe Sie finden sie sicher und gesund. Lassen Sie es mich wissen, wenn ich irgendwie helfen kann.");
        dataForSave.locations.templeUnlocked = true;
    }

    async function RecurringVisit(): Promise<void> {
        ƒS.Character.show(characters.Yamato, characters.Yamato.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.Speech.tell(characters.Yamato, "Hallo! Da sind sie ja wieder. Konnten sie Hanna schon finden?");
        await ƒS.Speech.tell(characters.Protagonist, "Nein, leider nicht. Ich habe sie noch nicht gefunden.");
        if (!dataForSave.puzzlePieces.puzzle3Unlocked) await ƒS.Speech.tell(characters.Yamato, "Sie sollten vielleicht nochmal in den Tempel gehen. Vielleicht finden sie dort einen Hinweis?");
        else await ƒS.Speech.tell(characters.Yamato, "Oh, das tut mir leid. Ich hoffe sie finden sie bald.");
    }
}