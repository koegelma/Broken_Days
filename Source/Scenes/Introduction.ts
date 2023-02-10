namespace Broken_Days {
  export async function Introduction(): ƒS.SceneReturn {
    console.log("Introduction Scene starting");

    ƒS.Sound.play(sound.kotoTheme, 1, true);

    let text = {
      Narrator: {
        T001: "Hallo!",
        T002: "Willkommen zu Broken Days!",
        T003: "Bevor wir anfangen, möchte ich dich fragen, wie dein Name lautet.",
        T004: "Wie möchtest du heißen? " + "\u00A0".repeat(5)
      },
      mainCharacter: {
        T001: "<Insert Gähnen Here> Guten Morgen!",
        T002: "Oh, es ist schon 9 Uhr?! Ich muss schnell aufstehen und meine Schwester wecken!",
        T003: "Ich hoffe, sie kommt nicht wieder zu spät zur Schule...",
        T004: "Nanu, wo ist sie denn?",
        T005: "Ich glaube, ich habe sie gehört. Sie ist in der Küche.",
        T006: "Hanna?!",
        T007: "Hanna, wo bist du?!",
        T008: "Das kann doch nicht sein, sie würde doch nicht einfach verschwinden ohne etwas zu sagen!",
        T009: "Ich sollte mal versuchen sie anzurufen...",
        T010: "Mist, sie hat ihr Telefon ausgeschaltet.",
        T011: "Ich muss sie schnell finden, in 2 Stunden muss ich zur Arbeit!",
        T012: "Vielleicht sollte ich lieber schon mal auf der Arbeit anrufen und Bescheid sagen, dass ich nicht kommen kann?",
        T013: "Mhh, wo könnte sie sein?",
        T014: "Sie könnte schon zur Schule gegangen sein?",
        T015: "Vielleicht ist sie aber auch bei unserer früheren Nachbarin Etsuko?",
        T016: "Oder sie ist bei ihrer Freundin Kana?",
        T017: "Ich sollte mich jetzt besser schnell auf die Suche machen."

        // -> Hanna suchen
        // -> Im Restaurant Bescheid geben, dass ich nicht zur Arbeit kommen kann - Hinweis auf Wochentag
        // -> 3 Möglichkeiten: Bei Nachbarin, in der Schule, bei ihrer Freundin
      },
      blank: {
        T001: "..."
      }

    };

    //ƒS.Sound.play();

    // Bedroom
    await ƒS.Location.show(locations.room.day);
    await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);

    await ƒS.Speech.tell(characters.narrator, text.Narrator.T001);
    await ƒS.Speech.tell(characters.narrator, text.Narrator.T002);
    await ƒS.Speech.tell(characters.narrator, text.Narrator.T003);
    await ƒS.Speech.tell(characters.narrator, text.Narrator.T004);

    dataForSave.nameProtagonist = await ƒS.Speech.getInput();
    await ƒS.update(1);
    await UpdateName();
    await ƒS.Speech.tell(characters.narrator, `Hallo ${characters.mainCharacter.name}!`);

    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
    await ƒS.update(1);
    ƒS.Character.hide(characters.mainCharacter);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.happy, ƒS.positionPercent(25, 100));
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T001);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T002);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T003);

    //ƒS.Speech.clear(); // blendet Text aus, Textfeld ist noch da
    //ƒS.Speech.hide(); 


    await ƒS.update();

    await fadeScene();

    // Hanna's Bedroom
    await ƒS.Location.show(locations.hannaBedroom.day);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.happy, ƒS.positionPercent(25, 100));
    await ƒS.update(1);
    ƒS.Character.hide(characters.mainCharacter);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.surprised, ƒS.positionPercent(25, 100));
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T004);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T005);

    await fadeScene();

    // Kitchen
    await ƒS.Location.show(locations.kitchen.day);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.happy, ƒS.positionPercent(25, 100));
    await ƒS.update(1);
    ƒS.Character.hide(characters.mainCharacter);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.shoked, ƒS.positionPercent(25, 100));
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T006);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T007);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T008);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T009);
    await ƒS.Speech.tell(characters.blank, text.blank.T001);
    ƒS.Sound.fade(sound.phoneTurnedOff, 0, 4);
    await ƒS.Progress.delay(4);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T010);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T011);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T012);
    ƒS.Character.hide(characters.mainCharacter);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.angry, ƒS.positionPercent(25, 100));
    await ƒS.update(1);

    let callWorkAnswers = {
      iSayYes: "Ich rufe besser an",
      iSayNo: "Ich habe jetzt keine Zeit anzurufen"
    };

    let nextLocation = await ƒS.Menu.getInput(callWorkAnswers, "decision");

    switch (nextLocation) {
      case callWorkAnswers.iSayYes:
        await CallWorkDecision();
        break;
      case callWorkAnswers.iSayNo:
        await ƒS.Speech.tell(characters.mainCharacter, "Ich habe jetzt keine Zeit dafür, ich muss sie finden!");
        await ƒS.Speech.tell(characters.mainCharacter, "Heute ist Montag, da ist normal eh nicht viel los. Es wird bestimmt kein Problem sein, wenn ich später komme.");
        break;
    }

    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T013);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T014);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T015);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T016);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T017);

    ƒS.Sound.fade(sound.kotoTheme, 0, 1);

    await fadeScene();
    return "LocationDecision";
  }

  export async function CallWorkDecision(): Promise<void> {
    dataForSave.decisions.calledWork = true;
    await ƒS.Speech.tell(characters.mainCharacter, "Ich rufe besser an und sage Bescheid.");
    await ƒS.Speech.tell(characters.blank, "...");
    ƒS.Sound.play(sound.phoneOutgoing, 1);
    await ƒS.Progress.delay(10);
    ƒS.Character.hide(characters.mainCharacter);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.surprised, ƒS.positionPercent(25, 100));
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.Takashi, "Hallo, Kamon Restaurant, was kann ich für Sie tun?");
    await ƒS.Speech.tell(characters.mainCharacter, "Hallo Takashi? Ich bin es " + dataForSave.nameProtagonist + ", ich habe ein Problem...");
    await ƒS.Speech.tell(characters.mainCharacter, "Meine kleine Schwester Hanna ist verschwunden und ich habe keine Ahnung wo sie ist.");
    await ƒS.Speech.tell(characters.mainCharacter, "Als ich aufgewacht bin war sie einfach weg und ihr Telefon ist ausgeschaltet.");
    await ƒS.Speech.tell(characters.mainCharacter, "Ich muss sie suchen, ich weiß deshalb nicht ob ich zur Arbeit kommen kann.");
    await ƒS.Speech.tell(characters.Takashi, "Oh nein, das ist ja schrecklich!");
    await ƒS.Speech.tell(characters.Takashi, "Ich werde für dich übernehmen, das ist kein Problem. Und du kannst dich um deine Schwester kümmern.");
    await ƒS.Speech.tell(characters.Takashi, "Heute ist Montag, es wird bestimmt wieder nicht viel los sein, mach dir also keine Sorgen.");
    await ƒS.Speech.tell(characters.Takashi, "Ich wünsche dir viel Glück bei der Suche und hoffe du findest sie bald, wenn du Hilfe brauchst melde dich einfach bei mir.");
    await ƒS.Speech.tell(characters.mainCharacter, "Danke Takashi, du hast was gut bei mir. Ich werde versuchen sie zu finden...");
    ƒS.Sound.play(sound.phoneTurnedOff, 1);
    ƒS.Sound.fade(sound.phoneTurnedOff, 0, 3);
    await ƒS.Progress.delay(3);
  }

}