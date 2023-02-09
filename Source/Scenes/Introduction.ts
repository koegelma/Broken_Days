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
        T003: "Ich hoffe, sie hat heute keine schlechte Laune...",
        T004: "Nanu, wo ist sie denn?",
        T005: "Ich glaube, ich habe sie gehört. Sie ist in der Küche.",
        T006: "Hanna?!",
        T007: "Hanna, wo bist du?!",
        T008: "Das kann doch nicht sein, sie würde doch nicht einfach verschwinden ohne etwas zu sagen!"
        // -> Hanna suchen
        // -> Im Restaurant Bescheid geben, dass ich nicht zur Arbeit kommen kann - Hinweis auf Wochentag
        // -> 3 Möglichkeiten: Bei Nachbarin, in der Schule, bei ihrer Freundin
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
    
    ƒS.Sound.fade(sound.kotoTheme, 0, 1);

    await fadeScene();
    return "LocationDecision";
  }

}