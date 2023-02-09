declare namespace Broken_Days {
    function ApartmentEnd(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    enum DayTime {
        MORNING = 0,
        AFTERNOON = 1,
        EVENING = 2
    }
    let transitions: {
        puzzle: {
            duration: number;
            alpha: string;
            edge: number;
        };
    };
    let dataForSave: {
        nameProtagonist: string;
        DayTime: DayTime;
        daysPassed: number;
        locations: {
            laundryUnlocked: boolean;
            onsenUnlocked: boolean;
            shopUnlocked: boolean;
            parkUnlocked: boolean;
            psychologistUnlocked: boolean;
            templeUnlocked: boolean;
        };
    };
    function UpdateDayTime(): Promise<void>;
    let items: {
        handy: {
            name: string;
            description: string;
            image: string;
            static: boolean;
        };
        laptop: {
            name: string;
            description: string;
            image: string;
            static: boolean;
        };
        apple: {
            name: string;
            description: string;
            image: string;
        };
    };
    function showCredits(): void;
    function getAnimation(): ƒS.AnimationDefinition;
    function getTrainAnimation(): ƒS.AnimationDefinition;
    function trainTransition(): Promise<void>;
    function fadeScene(_duration?: number): Promise<void>;
    function hndNextLocation(): Promise<string>;
}
declare namespace Broken_Days {
    let characters: {
        narrator: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {};
        };
        mainCharacter: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                angry: string;
                happy: string;
                neutral: string;
                sad: string;
                shoked: string;
                surprised: string;
                tired: string;
                asleep: string;
            };
        };
    };
    function UpdateName(): Promise<void>;
}
declare namespace Broken_Days {
    function EndDay(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Ending(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Epilogue(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Friend(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Introduction(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Inventory_Test(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Laundry(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function LocationDecision(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    let locations: {
        room: {
            day: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
            night: {
                name: string;
                background: string;
            };
        };
        hannaBedroom: {
            day: {
                name: string;
                background: string;
            };
            night: {
                name: string;
                background: string;
            };
        };
        kitchen: {
            day: {
                name: string;
                background: string;
            };
            night: {
                name: string;
                background: string;
            };
        };
        blackscreen: {
            name: string;
            background: string;
        };
        train: {
            name: string;
            background: string;
        };
        city: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        neighbour: {
            morning: {
                name: string;
                background: string;
                visited: boolean;
            };
            afternoon: {
                name: string;
                background: string;
                visited: boolean;
            };
            evening: {
                name: string;
                background: string;
                visited: boolean;
            };
        };
        school: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        friend: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        laundry: {
            name: string;
            background: string;
        };
        onsen: {
            day: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        shop: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        park: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        psychologist: {
            day: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        temple: {
            morning: {
                name: string;
                background: string;
            };
            afternoon: {
                name: string;
                background: string;
            };
            evening: {
                name: string;
                background: string;
            };
        };
        restaurant: {
            name: string;
            background: string;
        };
    };
}
declare namespace Broken_Days {
    function Neighbour(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function NewDay(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Onsen(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Park(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Psychologist(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Restaurant(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function School(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Shop(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    let sound: {
        kotoTheme: string;
        yawn: string;
        trainAmbience: string;
        templeAmbience: string;
        urbanAmbience: string;
        landryAmbience: string;
        schoolAmbience: string;
        onsenAmbience: string;
        restaurantAmbience: string;
    };
}
declare namespace Broken_Days {
    function Temple(): ƒS.SceneReturn;
}
