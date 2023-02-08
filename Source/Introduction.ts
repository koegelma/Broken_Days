namespace Broken_Days {
  export async function Introduction(): ƒS.SceneReturn {
    console.log("Introduction Scene starting");

    let text = {
      Narrator: {
        T001: "Hallo!",
        T002: "Willkommen zu Broken Days!",
        T003: "Bevor wir anfangen, möchte ich dich fragen, wie dein Name lautet.",
        T004: "Wie möchtest du heißen? " + "\u00A0".repeat(5)
      },
      mainCharacter: {
        T001: "<Insert Gähnen Here> Guten Morgen!",
        T002: "Oh, es ist schon 9 Uhr?! Ich muss schnell aufstehen und meine Schwester wecken!"
      }
    };

    //ƒS.Sound.play();

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

    //await ƒS.Speech.tell(characters.mainCharacter, "Test");
    //ƒS.Speech.clear(); // blendet Text aus, Textfeld ist noch da
    ƒS.Speech.hide(); // blendet Textfeld aus
    //ƒS.Character.hide(characters.mainCharacter);
    //await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.happy, ƒS.positions.bottomcenter);

    await ƒS.update();

    /* await ƒS.Speech.tell(characters.mainCharacter, "Soll es jetzt weiter gehen?");

    let firstDialogueElementAnswers = {
      iSayOk: "Okay.",
      iSayYes: "Ja gerne!",
      iSayNo: "Nö."
    };

    let firstDialogueElement = await ƒS.Menu.getInput(firstDialogueElementAnswers, "decision");

    switch (firstDialogueElement) {
      case firstDialogueElementAnswers.iSayOk:
        // continue path here
        await ƒS.Speech.tell(characters.mainCharacter, "Alles klar.");
        ƒS.Speech.clear();
        break;
      case firstDialogueElementAnswers.iSayYes:
        // continue path here
        await ƒS.Speech.tell(characters.mainCharacter, "Super!");
        break;
      case firstDialogueElementAnswers.iSayNo:
        // continue path here
        await ƒS.Speech.tell(characters.mainCharacter, "Schade.");
        ƒS.Character.hide(characters.mainCharacter);
        await ƒS.Character.animate(characters.mainCharacter, characters.mainCharacter.pose.neutral, getAnimation());
        break;
    } */



    // continue story after decision here

    //ƒS.Speech.setTickerDelays();

    //ƒS.Inventory.add();


    /*  ƒS.Character.hide(characters.mainCharacter);
     // show black screen for transition
     ƒS.update(); */


    // put in a scene for changing location and handling the daytime transition
    await fadeScene();
    //await ƒS.update(1);
    /* await ƒS.Location.show(locations.city.morning);
    await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
    await ƒS.update();
    await ƒS.Speech.tell(characters.mainCharacter, "Wo soll ich nur zuerst suchen?");

    let nextLocationAnswers = {
      iSayNeighbour: "Nachbarin",
      iSaySchool: "Schule",
      iSayFriend: "Beste Freundin"
    };

    let nextLocation = await ƒS.Menu.getInput(nextLocationAnswers, "decision");

    switch (nextLocation) {
      case nextLocationAnswers.iSayNeighbour:
        await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zu meiner Nachbarin.");
        await fadeScene();
        return "Neighbour";
      case nextLocationAnswers.iSaySchool:
        await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zur Schule.");
        await fadeScene();
        return "School";
      case nextLocationAnswers.iSayFriend:
        await ƒS.Speech.tell(characters.mainCharacter, "Ich gehe zu meiner besten Freundin.");
        await fadeScene();
        return "Friend";
    }
  } */
    return "LocationDecision";
  }

}