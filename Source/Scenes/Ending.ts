namespace Broken_Days {
    export async function Ending(): ƒS.SceneReturn {
        console.log("Ending Scene starting");

        ƒS.Sound.play(sound.kotoTheme, 1, true);

        await ƒS.Location.show(locations.hannaBedroom.day);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.surprised, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Hanna? Hanna? Bist du da?");
        await ƒS.Speech.tell(characters.Protagonist, "Hanna?!");
        await ƒS.Speech.tell(characters.Blank, "...");
        await ƒS.Character.show(characters.Hanna, characters.Hanna.pose.happy, ƒS.positionPercent(75, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Hanna, "Hey " + dataForSave.nameProtagonist + ", du bist ja wieder da!");
        await ƒS.Speech.tell(characters.Protagonist, "Hanna! Bist du es wirklich? Was ist hier los? Wo warst du denn?");
        await ƒS.Character.hide(characters.Hanna);
        await ƒS.Character.show(characters.Hanna, characters.Hanna.pose.neutral, ƒS.positionPercent(75, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Hanna, dataForSave.nameProtagonist + ", du willst es noch immer nicht glauben, oder?");
        await ƒS.Speech.tell(characters.Protagonist, "Was soll ich denn glauben? Ich bin doch in deinem Zimmer! Du bist doch hier! Was soll ich denn da nicht glauben?");
        await ƒS.Speech.tell(characters.Hanna, dataForSave.nameProtagonist + ", du bist in einem Traum. Alles, was du hier erlebst, ist nicht real.");
        await ƒS.Speech.tell(characters.Protagonist, "...");
        await ƒS.Speech.tell(characters.Hanna, "Aber es hilft dir, mit meinem Tod umzugehen.");
        await ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.shocked, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Aber wie kann das sein? Warum bist du gestorben?");
        await ƒS.Speech.tell(characters.Hanna, "Das ist jetzt nicht wichtig. Was wichtig ist, ist, dass du weißt, dass ich immer bei dir sein werde, egal was passiert. Und dass du weißt, dass du weiterleben und glücklich sein kannst!");
        await ƒS.Speech.tell(characters.Protagonist, "...");
        await ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.sad, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Ich weiß nicht, ob ich das kann.");
        await ƒS.Character.hide(characters.Hanna);
        await ƒS.Character.show(characters.Hanna, characters.Hanna.pose.happy, ƒS.positionPercent(75, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Hanna, "Natürlich kannst du das. Du bist stark und tapfer. Und ich bin hier, um dir zu helfen.");
        await ƒS.Speech.tell(characters.Hanna, "Du hast so viel zu bieten und so viele Möglichkeiten. Denk an all die Träume und Ziele, die du verfolgen wolltest bevor unsere Eltern verstorben sind.");
        await ƒS.Speech.tell(characters.Protagonist, "...");
        await ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.tired, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Was passiert jetzt?");
        await ƒS.Speech.tell(characters.Hanna, "Jetzt hast du die Wahl. Du kannst hier in der Stadt bleiben und dein Leben wie gewohnt weiterleben oder du kannst deinem Traum folgen und für ein Studium wegziehen. Die Entscheidung liegt ganz bei dir.");
        await ƒS.Speech.tell(characters.Protagonist, "Ich weiß nicht, was ich tun soll.");
        await ƒS.Speech.tell(characters.Hanna, "Das ist okay. Du hast Zeit, um darüber nachzudenken. Aber denke daran, dass ich immer bei dir bin, egal was du tust. Und dass ich stolz auf dich bin, ganz egal wie du dich entscheidest.");
        await ƒS.Speech.tell(characters.Protagonist, "Ich danke dir Hanna...");
        await ƒS.Character.hide(characters.Protagonist);
        await ƒS.Character.show(characters.Protagonist, characters.Protagonist.pose.neutral, ƒS.positionPercent(25, 100));
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Protagonist, "Ich denke, ich weiß jetzt, was ich tun muss.");

        let nextFinalDecisionAnswers = {
            stay: "Ich bleibe hier und lebe mein Leben wie gewohnt.",
            go: "Ich folge meinem Traum und ziehe weg."
        };

        let finalDecision = await ƒS.Menu.getInput(nextFinalDecisionAnswers, "decision");

        switch (finalDecision) {
            case nextFinalDecisionAnswers.stay:
                dataForSave.endingDecisions.ending1 = true;
                await ƒS.Speech.tell(characters.Protagonist, "Ich bleibe hier und lebe mein Leben wie gewohnt.");
                break;
            case nextFinalDecisionAnswers.go:
                dataForSave.endingDecisions.ending2 = true;
                await ƒS.Speech.tell(characters.Protagonist, "Ich folge meinem Traum und ziehe weg.");
                break;
        }

        await ƒS.Speech.tell(characters.Hanna, "Das freut mich zu hören. Und jetzt ist es an der Zeit Abschied zu nehmen. Denke daran, dass ich dich immer lieben werde und ich immer bei dir bin.");
        await ƒS.Speech.tell(characters.Hanna, "Und jetzt wach endlich auf und lebe dein Leben!");
        await ƒS.Character.hide(characters.Hanna);
        await ƒS.update(3);

        ƒS.Sound.fade(sound.kotoTheme, 0, 5);
        await fadeScene(5);
        return "Epilogue";
    }
}