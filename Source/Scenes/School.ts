namespace Broken_Days {
    export async function School(): ƒS.SceneReturn {
        console.log("School Scene starting");

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

        if (dataForSave.DayTime != DayTime.EVENING) ƒS.Sound.fade(sound.schoolAmbience, 0, 1);

        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        // --> unlock psychologist
        await ƒS.Location.show(locations.school.morning);
        ƒS.Sound.play(sound.schoolAmbience, 0.7, true);
        hndTransition();
        if (!dataForSave.locations.psychologistUnlocked) await FirstVisit();
        else await RecurringVisit();
    }

    async function AfternoonRoutine(): Promise<void> {
        await ƒS.Location.show(locations.school.afternoon);
        ƒS.Sound.play(sound.schoolAmbience, 0.7, true);
        hndTransition();
        await ƒS.Speech.tell(characters.Protagonist, "Hanna scheint nicht hier zu sein. Ich sollte vielleicht später nochmal vorbeischauen.");
    }

    async function EveningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.school.evening);
        hndTransition();
        await ƒS.Speech.tell(characters.Protagonist, "Hier scheint niemand mehr zu sein.");
    }

    async function FirstVisit(): Promise<void> {
        await ƒS.Character.show(characters.Saito, characters.Saito.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.Speech.tell(characters.Saito, "Oh, hallo " + dataForSave.nameProtagonist + ". Wie kann ich ihnen helfen?");
        await ƒS.Speech.tell(characters.Protagonist, "Ist Hanna heute in die Schule gekommen?");
        await ƒS.Speech.tell(characters.Saito, "Nein, ich habe sie heute noch nicht gesehen.");
        await ƒS.Speech.tell(characters.Protagonist, "Ich suche sie schon überall, aber kann sie nicht finden.");
        await ƒS.Speech.tell(characters.Protagonist, "Sie würde normal nicht einfach so verschwinden ohne mich zu informieren.");
        await ƒS.Speech.tell(characters.Saito, "Mhh, ich kann ihnen leider nicht weiterhelfen. Vielleicht sollten sie mal bei Hannas Psychologen Dr. Kimura vorbeischauen. Vielleicht kann er ihnen helfen.");
        await ƒS.Speech.tell(characters.Protagonist, "Oh stimmt, wieso habe ich daran nicht schon früher gedacht? Danke für den Tipp. Ich werde dort mal vorbeischauen.");
        dataForSave.locations.psychologistUnlocked = true;
    }

    async function RecurringVisit(): Promise<void> {
        await ƒS.Speech.tell(characters.Saito, "Hallo " + dataForSave.nameProtagonist + ". Haben sie Hanna schon gefunden?");
        await ƒS.Speech.tell(characters.Protagonist, "Nein, leider nicht.");
        if (!dataForSave.locations.parkUnlocked) await ƒS.Speech.tell(characters.Protagonist, "Sie sollten mal bei Hannas Psychologen vorbeischauen. Vielleicht kann er ihnen helfen.");
    }
}