namespace Template {
  export async function Introduction(): ƒS.SceneReturn {
    console.log("Introduction Scene starting");

    let text = {
      Narrator: {
        T001: "",
        T002: ""
      },
      mainCharacter: {
        T001: "Hello World!",
        T002: "This is a test."
      }
    };

    //ƒS.Sound.play();

    await ƒS.Location.show(locations.park);
    await ƒS.update(transitions.puzzle.duration, transitions.puzzle.alpha, transitions.puzzle.edge);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(25, 100));
    await ƒS.update();
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T001);
    await ƒS.Speech.tell(characters.mainCharacter, text.mainCharacter.T002);
    //await ƒS.Speech.tell(characters.mainCharacter, "Test");
    //ƒS.Speech.clear(); // blendet Text aus, Textfeld ist noch da
    ƒS.Speech.hide(); // blendet Textfeld aus
    ƒS.Character.hide(characters.mainCharacter);
    //await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.happy, ƒS.positions.bottomcenter);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.happy, ƒS.positionPercent(25, 100));
    await ƒS.update();

    await ƒS.Speech.tell(characters.mainCharacter, "Soll es jetzt weiter gehen?");

    let firstDialogueElementAnswers = {
      iSayOk: "Okay.",
      iSayYes: "Ja gerne!",
      iSayNo: "Nö."
    };

    let firstDialogueElement = await ƒS.Menu.getInput(firstDialogueElementAnswers, "individualCSSclass");

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
    }

    dataForSave.nameProtagonist = await ƒS.Speech.getInput();

    // continue story after decision here

    //ƒS.Speech.setTickerDelays();

    //ƒS.Inventory.add();

  }
}