namespace Broken_Days {

    export let locations = {
        // room of the protagonist
        room: {
            day: {
                name: "RoomDay",
                background: "./Images/Backgrounds/Bedroom_Day.png"
            },
            evening: {
                name: "RoomEvening",
                background: "./Images/Backgrounds/Bedroom_Evening.png"
            },
            night: {
                name: "RoomNight",
                background: "./Images/Backgrounds/Bedroom_Night.png"
            }
        },
        // room of the protagonist's sister hanna
        hannaBedroom: {
            day: {
                name: "HannaBedroomDay",
                background: "./Images/Backgrounds/Bedroom_Hanna_Day.png"
            },
            night: {
                name: "HannaBedroomNight",
                background: "./Images/Backgrounds/Bedroom_Hanna_Night.png"
            }
        },
        // kitchen
        kitchen: {
            day: {
                name: "KitchenDay",
                background: "./Images/Backgrounds/Kitchen_Day.png"
            },
            night: {
                name: "KitchenNight",
                background: "./Images/Backgrounds/Kitchen_Night.png"
            }
        },
        // black screen for scene changes
        blackscreen: {
            name: "BlackScreen",
            background: "./Images/Backgrounds/blackscreen.jpg"
        },
        // train
        train: {
            name: "Train",
            background: "./Images/Backgrounds/Train.png"
        },
        // city - player decides where to go next here
        city: {
            morning: {
                name: "CityMorning",
                background: "./Images/Backgrounds/City_Morning.png"
            },
            afternoon: {
                name: "CityAfternoon",
                background: "./Images/Backgrounds/City_Afternoon.png"
            },
            evening: {
                name: "CityEvening",
                background: "./Images/Backgrounds/City_Night.png"
            }
        },
        // neighbour living room
        neighbour: {
            morning: {
                name: "NeighbourMorning",
                background: "./Images/Backgrounds/Neighbour_Morning.png",
                visited: false
            },
            afternoon: {
                name: "NeighbourAfternoon",
                background: "./Images/Backgrounds/Neighbour_Afternoon.png",
                visited: false
            },
            evening: {
                name: "NeighbourEvening",
                background: "./Images/Backgrounds/Neighbour_Evening.png",
                visited: false
            }
        },
        // school
        school: {
            morning: {
                name: "SchoolMorning",
                background: "./Images/Backgrounds/School_Morning.png"
            },
            afternoon: {
                name: "SchoolAfternoon",
                background: "./Images/Backgrounds/School_Afternoon.png"
            },
            evening: {
                name: "SchoolEvening",
                background: "./Images/Backgrounds/School_Evening.png"
            }
        },
        // friends house
        friend: {
            morning: {
                name: "FriendMorning",
                background: "./Images/Backgrounds/Friend_Morning.png"
            },
            afternoon: {
                name: "FriendAfternoon",
                background: "./Images/Backgrounds/Friend_Afternoon.png"
            },
            evening: {
                name: "FriendEvening",
                background: "./Images/Backgrounds/Friend_Evening.png"
            }
        },
        // laundromat
        laundry: {
            name: "Laundry",
            background: "./Images/Backgrounds/Laundromat.png"
        },
        // onsen
        onsen: {
            day: {
                name: "OnsenDay",
                background: "./Images/Backgrounds/Onsen_Day.png"
            },
            evening: {
                name: "OnsenEvening",
                background: "./Images/Backgrounds/Onsen_Evening.png"
            }
        },
        // shop
        shop: {
            morning: {
                name: "ShopMorning",
                background: "./Images/Backgrounds/Shop_Morning.png"
            },
            afternoon: {
                name: "ShopAfternoon",
                background: "./Images/Backgrounds/Shop_Afternoon.png"
            },
            evening: {
                name: "ShopEvening",
                background: "./Images/Backgrounds/Shop_Evening.png"
            }
        },
        // park
        park: {
            morning: {
                name: "ParkMorning",
                background: "./Images/Backgrounds/Park_Morning.png"
            },
            afternoon: {
                name: "ParkAfternoon",
                background: "./Images/Backgrounds/Park_Afternoon.png"
            },
            evening: {
                name: "ParkEvening",
                background: "./Images/Backgrounds/Park_Evening.png"
            }
        },
        // psychologist
        psychologist: {
            day: {
                name: "PsychologistDay",
                background: "./Images/Backgrounds/Psychologist_Day.png"
            },
            evening: {
                name: "PsychologistEvening",
                background: "./Images/Backgrounds/Psychologist_Evening.png"
            }
        }
    };
}