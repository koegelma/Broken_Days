declare namespace Broken_Days {
    function ApartmentEnd(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Cemetery(): ƒS.SceneReturn;
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
    function fadeScene(_duration?: number): Promise<void>;
    function trainTransition(): Promise<void>;
    function hndNextLocation(): Promise<string>;
    function getTrainAnimation(): ƒS.AnimationDefinition;
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
    function Laundromat(): ƒS.SceneReturn;
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
                visited: boolean;
            };
            afternoon: {
                name: string;
                background: string;
                visited: boolean;
            };
        };
        friend: {
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
        laundromat: {
            name: string;
            background: string;
        };
    };
}
declare namespace Broken_Days {
    function MusicSchool(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function Neighbour(): ƒS.SceneReturn;
}
declare namespace Broken_Days {
    function NewDay(): ƒS.SceneReturn;
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
        backgroundTheme: string;
        click: string;
    };
}
declare namespace Broken_Days {
    function Temple(): ƒS.SceneReturn;
}
