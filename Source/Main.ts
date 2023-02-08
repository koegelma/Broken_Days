namespace Broken_Days {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  console.log("Visual Novel starting");


  export enum DayTime {
    MORNING,
    AFTERNOON,
    EVENING
  }

  //export let dayTimes = ["morning", "afternoon", "evening"];



  // transitions
  export let transitions = {
    puzzle: {
      duration: 1, // in Sekunden
      alpha: "./FreeTransitions/5.jpg",
      edge: 1
    }
  };

  export let dataForSave = {    // Alles was über Szenen hinaus gespeichert werden soll, Speicher-/Ladepunkt immer zu Beginn der Szene
    nameProtagonist: "",
    DayTime: DayTime.MORNING
  };


  export async function UpdateDayTime(): Promise<void> {
    switch (dataForSave.DayTime) {
      case DayTime.MORNING:
        dataForSave.DayTime = DayTime.AFTERNOON;
        break;
      case DayTime.AFTERNOON:
        dataForSave.DayTime = DayTime.EVENING;
        break;
      case DayTime.EVENING:
        dataForSave.DayTime = DayTime.MORNING;
        // start new day
        break;
    }
  }

  // items
  export let items = {
    handy: {
      name: "Handy",
      description: "Dein eigenes Handy, wow.",
      image: "./Images/Items/phone.png",
      static: true
    },
    laptop: {
      name: "Laptop",
      description: "Dein eigener Laptop, wow.",
      image: "./Images/Items/laptop.png",
      static: true
    },
    apple: {
      name: "Apfel",
      description: "Lecker, Apfel.",
      image: "./Images/Items/apple.png"
    }
  };


  export function showCredits(): void {
    ƒS.Text.setClass("credtis"); //addClass; setClass überschreibt
    ƒS.Text.print("Credits here");
  }

  export function getAnimation(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positions.bottomleft, rotation: -20, scaling: new ƒS.Position(0.5, 1.5), color: ƒS.Color.CSS("white", 0.3) },
      end: { translation: ƒS.positions.bottomright, rotation: 20, scaling: new ƒS.Position(1.5, 0.5), color: ƒS.Color.CSS("red") },
      duration: 1,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }

  export async function fadeScene(_duration: number = 1): Promise<void> {
    ƒS.Location.show(locations.blackscreen);
    ƒS.Character.hideAll();
    ƒS.Speech.hide();
    await ƒS.update(_duration);
  }

  export async function trainTransition(): Promise<void> {
    await fadeScene();
    await ƒS.Location.show(locations.train);
    await ƒS.Character.show(characters.mainCharacter, characters.mainCharacter.pose.neutral, ƒS.positionPercent(75, 100));
    ƒS.update();
    // train sound
    //ƒS.Character.animate(characters.mainCharacter, characters.mainCharacter.pose.neutral, getTrainAnimation());
    await ƒS.Progress.delay(5);
    await fadeScene();
    /* console.log(_scene);
    return _scene; */
  }

  export async function hndNextLocation(): Promise<string> {
    if (dataForSave.DayTime != DayTime.EVENING) {
      await ƒS.Speech.tell(characters.mainCharacter, "Ich sollte meine Suche jetzt besser fortsetzen.");
      UpdateDayTime();
      await fadeScene();
      return "LocationDecision";
    }
    // Evening
    await ƒS.Speech.tell(characters.mainCharacter, "Es ist schon so spät... Ich sollte jetzt besser nach Hause gehen und morgen weiter suchen.");
    UpdateDayTime();
    await fadeScene();
    return "EndDay";
  }

  export function getTrainAnimation(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positionPercent(75, 90), rotation: 0, scaling: new ƒS.Position(1, 1) },
      end: { translation: ƒS.positionPercent(75, 100), rotation: 0, scaling: new ƒS.Position(1, 1) },
      duration: 0.5,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }

  // Menu

  //buttons
  let inGameMenuButttons = {
    save: "Save",
    load: "Load",
    //volume
    close: "Close",
    credits: "Credits"
  };

  let gameMenu: ƒS.Menu;

  let menuIsOpen: boolean = true;

  async function buttonFunctionalities(_option: string): Promise<void> {
    console.log(_option);
    switch (_option) {
      case inGameMenuButttons.save:
        await ƒS.Progress.save();
        break;
      case inGameMenuButttons.load:
        await ƒS.Progress.load();
        break;
      case inGameMenuButttons.close:
        gameMenu.close();
        menuIsOpen = false;
        break;
      case inGameMenuButttons.credits:
        showCredits();
        break;
    }
  }

  // shortcuts fürs menu
  document.addEventListener("keydown", hndKeyPress);

  let inventoryIsOpen: boolean = false;

  async function hndKeyPress(_event: KeyboardEvent): Promise<void> {
    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.F8:
        console.log("Save");
        await ƒS.Progress.save();
        break;
      case ƒ.KEYBOARD_CODE.F9:
        console.log("Load");
        await ƒS.Progress.load();
        break;
      case ƒ.KEYBOARD_CODE.M:
        // menuIsOpen = !menuIsOpen;
        if (menuIsOpen) {
          console.log("Menu close");
          gameMenu.close();
          menuIsOpen = false;
        } else {
          console.log("Menu open");
          gameMenu.open();
          menuIsOpen = true;
        }
        break;
      case ƒ.KEYBOARD_CODE.I:
        inventoryIsOpen = !inventoryIsOpen;
        if (inventoryIsOpen) {
          ƒS.Inventory.open();
        } else {
          ƒS.Inventory.close();
        }
        break;
    }
  }

  window.addEventListener("load", start);
  function start(_event: Event): void {
    gameMenu = ƒS.Menu.create(inGameMenuButttons, buttonFunctionalities, "gameMenuCSSclass");
    buttonFunctionalities("Close");
    let scenes: ƒS.Scenes = [
      //{ scene: Scene, name: "Scene" },
      { scene: Introduction, name: "Introduction" },
      //{ scene: Inventory_Test, name: "Inventory_Test" }
      //{id: "", scene: Scene, name: "Scene" , next:""}, --> next mit id ansprechen
      { id: "LocationDecision", scene: LocationDecision, name: "LocationDecision" },
      { id: "Neighbour", scene: Neighbour, name: "Neighbour"},
      { id: "School", scene: School, name: "School"},
      { id: "Friend", scene: Friend, name: "Friend"},
      { id: "EndDay", scene: EndDay, name: "EndDay"},
      { id: "NewDay", scene: NewDay, name: "NewDay"}
    ];

    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave = ƒS.Progress.setData(dataForSave, uiElement);

    // start the sequence
    ƒS.Progress.go(scenes);
  }
}


