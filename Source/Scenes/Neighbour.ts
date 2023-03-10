namespace Broken_Days {
    export async function Neighbour(): ƒS.SceneReturn {
        console.log("Neighbour Scene starting");

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
        await ƒS.Location.show(locations.neighbour.morning);
        hndTransition();
        await ƒS.Speech.tell(characters.Protagonist, "Etsuko scheint nicht hier zu sein. Ich sollte vielleicht später nochmal vorbeischauen.");
    }

    async function AfternoonRoutine(): Promise<void> {
        // --> unlock laundry
        await ƒS.Location.show(locations.neighbour.afternoon);
        hndTransition();
        if (!dataForSave.locations.laundryUnlocked) await FirstVisit();
        else await RecurringVisit();
    }

    async function EveningRoutine(): Promise<void> {
        await ƒS.Location.show(locations.neighbour.evening);
        hndTransition();
        await ƒS.Speech.tell(characters.Protagonist, "Etsuko scheint nicht hier zu sein. Ich sollte vielleicht später nochmal vorbeischauen.");
    }

    async function FirstVisit(): Promise<void> {
        await ƒS.Character.show(characters.Etsuko, characters.Etsuko.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.Speech.tell(characters.Etsuko, "Oh, hallo " + dataForSave.nameProtagonist + "!");
        await ƒS.Speech.tell(characters.Etsuko, "Wie schön dich zu sehen! Ich habe gerade etwas für dich gebacken.");
        await ƒS.Speech.tell(characters.Protagonist, "Hallo Etsuko... Das ist sehr nett von dir, aber ich habe leider keine Zeit.");
        await ƒS.Speech.tell(characters.Protagonist, "Hanna ist verschwunden, ich kann sie nicht erreichen und finde sie nirgends.");
        await ƒS.Speech.tell(characters.Protagonist, "Weißt du vielleicht, wo sie sein könnte?");
        ƒS.Character.hide(characters.Etsuko);
        await ƒS.Character.show(characters.Etsuko, characters.Etsuko.pose.surprised, ƒS.positionPercent(75, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Etsuko, "Oh nein, das ist ja schrecklich! Das tut mir sehr leid, aber ich habe sie auch nicht gesehen.");
        await ƒS.Speech.tell(characters.Etsuko, "Ich hoffe es geht ihr gut, sie hat in letzter Zeit einen sehr kränklichen Eindruck gemacht...");
        ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.surprised, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Was meinst du damit? Das ist mir gar nicht aufgefallen?!");
        ƒS.Character.hide(characters.Etsuko);
        await ƒS.Character.show(characters.Etsuko, characters.Etsuko.pose.sad, ƒS.positionPercent(75, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Etsuko, "Mhh, darüber solltest du vielleicht besser mit ihr sprechen...");
        ƒS.Character.hide(characters.Etsuko);
        await ƒS.Character.show(characters.Etsuko, characters.Etsuko.pose.optimistic, ƒS.positionPercent(75, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Etsuko, "Hast du schon im Waschsalon nach ihr geschaut? Ich glaube sie wollte eure Wäsche waschen.");
        await ƒS.Speech.tell(characters.Etsuko, "Mach dir bitte keine all zu großen Sorgen, so wie ich sie kenne wird sie wahrscheinlich einfach vergessen haben dir Bescheid zu geben.");
        ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Das ist eine gute Idee. Danke für deine Hilfe Etsuko, ich werde dort mal nachsehen.");
        dataForSave.locations.laundryUnlocked = true;
    }

    async function RecurringVisit(): Promise<void> {
        await ƒS.Character.show(characters.Etsuko, characters.Etsuko.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.Speech.tell(characters.Etsuko, "Oh, hallo " + dataForSave.nameProtagonist + "!");
        await ƒS.Speech.tell(characters.Etsuko, "Hast du Hanna schon gefunden?");
        await ƒS.Speech.tell(characters.Protagonist, "Nein, leider noch nicht.");
        await ƒS.Speech.tell(characters.Etsuko, "Was machst du dann noch hier? Komm, geh sie lieber suchen, ich melde mich falls Hanna hier auftaucht.");
        if (!dataForSave.locations.parkUnlocked) await ƒS.Speech.tell(characters.Etsuko, "Schau doch mal im Waschsalon, ich bin sicher, dass du dort etwas über sie herausfinden kannst.");
        await ƒS.Speech.tell(characters.Protagonist, "Okay, vielen Dank Etsuko.");
    }
}