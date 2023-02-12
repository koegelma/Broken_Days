namespace Broken_Days {
    export async function Epilogue(): ƒS.SceneReturn {
        console.log("Epilogue Scene starting");

        ƒS.Sound.play(sound.finalAmbience, 1, true);

        await ƒS.Location.show(locations.room.day);

        if (dataForSave.endingDecisions.ending1) await Ending1();
        else await Ending2();
    }

    export async function Ending1(): Promise<void> {
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Ich kann einfach nicht fortgehen.");
        await ƒS.Speech.tell(characters.Protagonist, "Hier habe ich meine Vergangenheit, meine Wurzeln.");
        await ƒS.Speech.tell(characters.Protagonist, "Hier habe ich das Restaurant, in dem ich arbeite, und hier kann ich das Grab meiner Eltern und meiner Schwester besuchen.");
        await ƒS.Speech.tell(characters.Protagonist, "Ich kann ihnen nicht den Rücken kehren.");
        await ƒS.Speech.tell(characters.Protagonist, "Ich weiß, dass ich irgendwann weiterziehen muss, aber jetzt noch nicht.");
        await ƒS.Speech.tell(characters.Protagonist, "Ich bin noch nicht bereit dafür.");
        await fadeScene(3);
        await ƒS.Speech.tell(characters.Narrator, "Ende.");
        await ƒS.Progress.delay(9999);
    }

    export async function Ending2(): Promise<void> {
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.happy, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Ich kann es kaum glauben, aber ich bin bereit für einen Neuanfang.");
        await ƒS.Speech.tell(characters.Protagonist, "Ich bin bereit endlich loszulassen und meinen eigenen Träumen zu folgen.");
        await ƒS.Speech.tell(characters.Protagonist, "Es wird nicht einfach, aber ich weiß, dass Hanna und meine Eltern immer bei mir sein werden.");
        await ƒS.Speech.tell(characters.Protagonist, "Ich bin bereit, die Stadt zu verlassen und mein neues Leben zu beginnen.");
        await fadeScene(3);
        await ƒS.Speech.tell(characters.Narrator, "Ende.");
        await ƒS.Progress.delay(9999);
    }
}