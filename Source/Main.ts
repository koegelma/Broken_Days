namespace Template {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  console.log("Visual Novel starting");



  // transitions
  export let transitions = {
    puzzle: {
      duration: 1, // in Sekunden
      alpha: "/FreeTransitions/5.jpg",
      edge: 1
    }
  };

  // sounds
  export let sound = {
    // themes
    backgroundTheme: "Pfad",

    // SFX
    click: "Pfad"
  };

  // backgrounds
  export let locations = {
    room: {
      name: "Room",
      background: "./Images/Backgrounds/Modern-Dormroom1.png"
    },
    park: {
      name: "Park",
      background: "./Images/Backgrounds/Modern-Street1.png"
    }
  };

  export let characters = {
    narrator: {
      name: ""
    },
    mainCharacter: {
      name: "Protagonist",
      origin: ƒS.ORIGIN.BOTTOMCENTER,   // Ankerpunkt: Anfangsposition im Canvas, kann in der Szene umpositioniert werden
      pose: {
        angry: "./Images/Characters/Test/Test_Angry.png",
        happy: "./Images/Characters/Test/Test_Happy_1.png",
        neutral: "./Images/Characters/Test/Test_Neutral_1.png"
      }
    }/* ,
    secondCharacter: {
      name: "Second",
      origin: ƒS.ORIGIN.BOTTOMCENTER,   // Ankerpunkt: Anfangsposition im Canvas, kann in der Szene umpositioniert werden
      pose: {
        angry: "Pfad.png",
        happy: "Pfad.png",
        neutral: "Pfad.png"
      }
    } */
  };

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

  export let dataForSave = {    // Alles was über Szenen hinaus gespeichert werden soll, Speicher-/Ladepunkt immer zu Beginn der Szene
    nameProtagonist: "",
    score: 0
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
      //{ scene: Introduction, name: "Introduction" }
      { scene: Inventory_Test, name: "Inventory_Test" }
      //{id: "", scene: Scene, name: "Scene" , next:""}, --> next mit id ansprechen
    ];

    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave = ƒS.Progress.setData(dataForSave, uiElement);

    // start the sequence
    ƒS.Progress.go(scenes);
  }
}


