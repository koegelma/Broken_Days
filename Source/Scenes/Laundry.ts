namespace Broken_Days {
    export async function Laundry(): ƒS.SceneReturn {
        console.log("Laundry Scene starting");

        ƒS.Sound.play(sound.landryAmbience, 0.7, true);
        await ƒS.Location.show(locations.laundry);
        await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);

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

        ƒS.Sound.fade(sound.landryAmbience, 0, 1);

        return hndNextLocation();
    }

    async function MorningRoutine(): Promise<void> {
        await ƒS.Speech.tell(characters.Protagonist, "Hier scheint sie nicht zu sein. Vielleicht sollte ich später nochmal vorbeischauen.");
    }

    async function AfternoonRoutine(): Promise<void> {
        // --> unlock park
        if (!dataForSave.locations.parkUnlocked) await FirstVisit();
        else await RecurringVisit();
    }

    async function EveningRoutine(): Promise<void> {
        await ƒS.Speech.tell(characters.Protagonist, "Hier scheint sie nicht zu sein. Vielleicht sollte ich später nochmal vorbeischauen.");
    }

    async function FirstVisit(): Promise<void> {
        await ƒS.Speech.tell(characters.Protagonist, "Hanna scheint nicht hier zu sein...");
        await ƒS.Speech.tell(characters.Blank, "...");
        ƒS.Character.animate(characters.Kenzo, characters.Kenzo.pose.happy, getIntroAnimation());
        await ƒS.Speech.tell(characters.Kenzo, dataForSave.nameProtagonist + "!");
        await ƒS.Speech.tell(characters.Kenzo, "Man, hab' ich dich schon lange nicht mehr gesehen!");
        await ƒS.Speech.tell(characters.Kenzo, "Wie geht es dir? Arbeitest du noch immer im Kamon Restaurant als Bedienung?");
        await ƒS.Speech.tell(characters.Protagonist, "Kenzo?!");
        await ƒS.Speech.tell(characters.Protagonist, "Ja, ich arbeite noch immer dort.");
        await ƒS.Speech.tell(characters.Kenzo, "Dann hat sich ja nicht viel verändert! Ich habe mein Studium in Tokio beendet und bin gerade wieder in Stadt gezogen!");
        await ƒS.Speech.tell(characters.Kenzo, "Ich habe einen Job als Programmierer bei einer Firma hier bekommen.");
        await ƒS.Speech.tell(characters.Kenzo, "Ich habe mir außerdem eine Wohnung in der Nähe des Parks gemietet. Ich weiß noch wie wir als Kinder damals immer zusammen dort mit Hanna gespielt haben!");
        await ƒS.Speech.tell(characters.Kenzo, "Ich würde mich freuen, wenn du mal vorbeikommen würdest, du kannst Hanna auch gerne mitbringen!");
        await ƒS.Speech.tell(characters.Kenzo, "Wie geht es ihr eigentlich? Ich habe sie auch schon lange nicht mehr gesehen.");
        await ƒS.Speech.tell(characters.Protagonist, "Ich weiß nicht, wo sie ist. Ich versuche sie gerade zu finden. Ich kann sie nicht erreichen und wollte deswegen schauen ob sie hier ist.");
        ƒS.Character.hide(characters.Kenzo);
        await ƒS.Character.show(characters.Kenzo, characters.Kenzo.pose.surprised, ƒS.positionPercent(75, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Kenzo, "Oh man, das tut mir leid. Ich hoffe, sie ist nicht in Schwierigkeiten geraten.");
        ƒS.Character.hide(characters.Kenzo);
        await ƒS.Character.show(characters.Kenzo, characters.Kenzo.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Kenzo, "Hast du es schon mal im Park versucht? Ich weiß noch, dass sie es dort immer sehr gemocht hat.");
        await ƒS.Speech.tell(characters.Protagonist, "Nein, hab' ich noch nicht.");
        await ƒS.Speech.tell(characters.Kenzo, "Dann solltest du mal vorbeischauen. Vielleicht hat sie dort ein paar Freunde getroffen.");
        await ƒS.Speech.tell(characters.Kenzo, "Ich muss jetzt los, ich habe noch ein paar Dinge zu erledigen. Ich hoffe, ich sehe dich bald wieder!");
        await ƒS.Speech.tell(characters.Protagonist, "Bis bald Kenzo!");
        ƒS.Character.hide(characters.Kenzo);
        await ƒS.Character.show(characters.Kenzo, characters.Kenzo.pose.happy, ƒS.positionPercent(75, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Kenzo, "Ich freue mich schon!");
        ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.happy, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Ich auch, danke für deine Hilfe!");
        ƒS.Character.hide(characters.Kenzo);
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Ich sollte mal zum Park gehen und schauen ob ich Hanna dort finde.");

        dataForSave.locations.parkUnlocked = true;
    }

    async function RecurringVisit(): Promise<void> {
        await ƒS.Speech.tell(characters.Protagonist, "Hanna scheint nicht hier zu sein...");
        if (!dataForSave.puzzlePieces.puzzle1Unlocked) await ƒS.Speech.tell(characters.Protagonist, "Ich sollte mal zum Park gehen und schauen ob ich sie dort finde.");
        else await ƒS.Speech.tell(characters.Protagonist, "Ich glaube nicht, dass ich sie hier finden werde.");
    }
}