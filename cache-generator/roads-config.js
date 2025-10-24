// roads-config.js - Configuration file for cache generator

const ROAD_TRACKS = {
    highways: [
        {
            id: "am-trakia-vakarel-ihtiman",
            name: "АМ Тракия (Вакарел - Ихтиман)",
            startPoint: {
                name: "Вакарел",
                coordinates: [42.5504229, 23.7028117]
            },
            endPoint: {
                name: "Ихтиман",
                coordinates: [42.42702, 23.854146]
            },
            speedLimit: 140,
            distance: 19.16
        },
        {
            id: "am-trakia-calapica-radinovo",
            name: "АМ Тракия (Цалапица - Радиново)",
            startPoint: {
                name: "Цалапица",
                coordinates: [42.2049742, 24.5083902]
            },
            endPoint: {
                name: "Радиново",
                coordinates: [42.1983262, 24.640272]
            },
            speedLimit: 140,
            distance: 10.936
        },
        {
            id: "am-hemus-belokopitovo-kaspichan",
            name: "АМ Хемус (Белокопитово - Каспичан)",
            startPoint: {
                name: "Белокопитово",
                coordinates: [43.336986, 26.900171]
            },
            endPoint: {
                name: "Каспичан",
                coordinates: [43.323190, 27.149384]
            },
            speedLimit: 140,
            distance: 21.288
        },
        {
            id: "am-hemus-devnia-ignatievo",
            name: "АМ Хемус (Девня - Игнатиево)",
            startPoint: {
                name: "Девня",
                coordinates: [43.227240, 27.583637]
            },
            endPoint: {
                name: "Игнатиево",
                coordinates: [43.240717, 27.781228]
            },
            speedLimit: 140,
            distance: 18.423
        },
        {
            id: "am-struma-bulgarchevo-pokrovnik",
            name: "АМ Струма (Българчево - Покровник)",
            startPoint: {
                name: "Българчево",
                coordinates: [41.991964, 23.054048]
            },
            endPoint: {
                name: "Покровник",
                coordinates: [42.011591, 23.044888]
            },
            speedLimit: 140,
            distance: 2.329
        },
        {
            id: "am-struma-sandanski-damianica",
            name: "АМ Струма (Сандански - Дамяница)",
            startPoint: {
                name: "Сандански",
                coordinates: [41.5730168, 23.2396528]
            },
            endPoint: {
                name: "Дамяница",
                coordinates: [41.514538, 23.2714067]
            },
            speedLimit: 140,
            distance: 7.306
        },

        // ----
        {
            id: "am-marica-liubimec-momkovo",
            name: "АМ Марица (Момково - Любимец)",
            startPoint: {
                name: "Момково",
                coordinates: [41.8323716, 26.1405215]
            },
            endPoint: {
                name: "Любимец",
                coordinates: [41.8626946, 26.0875656]
            },
            speedLimit: 140,
            distance: 5.9
        },
        {
            id: "am-marica-momkovo-svilengrad",
            name: "АМ Марица (Свиленград - Момково)",
            startPoint: {
                name: "Свиленград",
                coordinates: [41.7788533, 26.2175075]
            },
            endPoint: {
                name: "Момково",
                coordinates: [41.8323716, 26.1405215]
            },
            speedLimit: 140,
            distance: 8.9
        },
        {
            id: "am-marica-harmanli-liubimec",
            name: "АМ Марица (Любимец - Харманли)",
            startPoint: {
                name: "Любимец",
                coordinates: [41.8626946, 26.0875656]
            },
            endPoint: {
                name: "Харманли",
                coordinates: [41.9579552, 25.8825804]
            },
            speedLimit: 140,
            distance: 20.9
        }
    ],

    mainRoads: [
        {
            id: "I-1",
            name: "I-1 Слатино - Кочериновo",
            startPoint: {
                name: "Слатино",
                coordinates: [42.1578707, 23.0411316]
            },
            endPoint: {
                name: "Кочериновo",
                coordinates: [42.0640942, 23.0385459]
            },
            speedLimit: 90,
            distance: 10.586
        },
        {
            id: "I-1-2",
            name: "I-1 Срацимирово - Жеглица",
            startPoint: {
                name: "Срацимирово",
                description: "Камерите са на метална конструкция над пътя",
                image: "sratsimirovo.jpg",
                coordinates: [43.8202694, 22.757463]
            },
            endPoint: {
                name: "Жеглица",
                description: "Камерите са на метална конструкция над пътя",
                image: "jeglica.jpg",
                coordinates: [43.878498, 22.7892937]
            },
            speedLimit: 90,
            distance: 7.5,
            "active_since": "2025-10-24"
        },
        {
            id: "I-2",
            name: "I-2 Струйно - Шумен",
            startPoint: {
                name: "Струйно",
                coordinates: [43.3621074, 26.8511336]
            },
            endPoint: {
                name: "Шумен",
                coordinates: [43.3173846, 26.9201329]
            },
            speedLimit: 90,
            distance: 7.648
        },
        {
            id: "I-3-1",
            name: "I-3 Долни Дъбник - Телиш",
            startPoint: {
                name: "Долни Дъбник",
                coordinates: [43.4162825, 24.4707422]
            },
            endPoint: {
                name: "Телиш",
                coordinates: [43.3261765, 24.2721534]
            },
            speedLimit: 90,
            distance: 21.878
        },
        {
            id: "I-3-2",
            name: "I-3 Пейчиново - Горна Студена",
            startPoint: {
                name: "Пейчиново",
                description: "Камерите са на метална конструкция над пътя",
                image: "peychinovo.jpg",
                coordinates: [43.4420639, 25.610221]
            },
            endPoint: {
                name: "Горна Студена",
                description: "Камерите са на метална конструкция над пътя",
                image: "gorna-studena.jpg",
                coordinates: [43.4163286, 25.3580126]
            },
            speedLimit: 90,
            distance: 21.2
        },
        {
            id: "I-4-1",
            name: "I-4 Български извор - Сопот",
            startPoint: {
                name: "Български извор",
                coordinates: [43.038396, 24.273818]
            },
            endPoint: {
                name: "Сопот",
                coordinates: [43.0342221, 24.3820344]
            },
            speedLimit: 90,
            distance: 9.198
        },
        {
            id: "I-4-2",
            name: "I-4 Сопот - Голец",
            startPoint: {
                name: "Сопот",
                description: "Камерите са на метална конструкция над пътя",
                image: "sopot.jpg",
                coordinates: [43.0342221, 24.3820344]
            },
            endPoint: {
                name: "Голец",
                description: "Камерите са на метална конструкция над пътя",
                image: "golec.jpg",
                coordinates: [43.0429322, 24.597864]
            },
            speedLimit: 90,
            distance: 17.9,
            "active_since": "2025-10-24"
        },
        {
            id: "I-4-3",
            name: "I-4 Ряховците - Богатово",
            startPoint: {
                name: "Ряховците",
                description: "Камерите са на метална конструкция над пътя преди/след бензиностанцията",
                image: "riahovcite.jpg",
                coordinates: [43.0331772, 25.0108456]
            },
            endPoint: {
                name: "Богатово",
                description: "Камерите са на метална конструкция над пътя",
                image: "bogatovo.jpg",
                coordinates: [43.0427039, 25.215283]
            },
            speedLimit: 90,
            distance: 16.9,
            "active_since": "2025-10-24"
        },
        {
            id: "I-4-4",
            name: "I-4 Богатово - Момин сбор",
            startPoint: {
                name: "Богатово",
                description: "Камерите са на метална конструкция над пътя",
                image: "bogatovo.jpg",
                coordinates: [43.0427039, 25.215283]
            },
            endPoint: {
                name: "Момин сбор",
                description: "Камерите са на метална конструкция над пътя",
                image: "momin-sbor.jpg",
                coordinates: [43.0889017, 25.4860294]
            },
            speedLimit: 90,
            distance: 23.7,
            "active_since": "2025-10-24"
        },
        {
            id: "I-5-1",
            name: "I-5 Полски Тръмбеш - Поликраище",
            startPoint: {
                name: "Полски Тръмбеш",
                coordinates: [43.3719622, 25.6443753]
            },
            endPoint: {
                name: "Поликраище",
                coordinates: [43.1890999, 25.6218701]
            },
            speedLimit: 90,
            distance: 21
        },
        {
            id: "I-5-2",
            name: "I-5 Обретеник - Тръстеник",
            startPoint: {
                name: "Обретеник",
                coordinates: [43.571866, 25.8221363]
            },
            endPoint: {
                name: "Тръстеник",
                coordinates: [43.6397457, 25.8724194]
            },
            speedLimit: 80 - 90,
            distance: 8.7
        },
        {
            id: "I-5-3",
            name: "I-5 Одяланик - Тръстеник",
            startPoint: {
                name: "Одяланик",
                coordinates: [43.7564031, 25.9065885]
            },
            endPoint: {
                name: "Тръстеник",
                coordinates: [43.6397457, 25.8724194]
            },
            speedLimit: 90,
            distance: 14.5
        },
        {
            id: "I-5-4",
            name: "I-5 Поликраище - Самоводене",
            startPoint: {
                name: "Поликраище",
                description: "Камерите са на метална конструкция над пътя",
                image: "polikraishte.jpg",
                coordinates: [43.1890999, 25.6218701]
            },
            endPoint: {
                name: "Самоводене",
                description: "Камерите са на метална конструкция над пътя",
                image: "samovodene.jpg",
                coordinates: [43.1341997, 25.6132668]
            },
            speedLimit: 90,
            distance: 6.5, 
            "active_since": "2025-10-24"
        },
        {
            id: "I-6",
            name: "I-6 Радомир - Беланица",
            startPoint: {
                name: "Радомир",
                coordinates: [42.5550108, 22.9651796]
            },
            endPoint: {
                name: "Беланица",
                coordinates: [42.4876183, 22.9270694]
            },
            speedLimit: 40 - 90,
            distance: 8.4
        },
        {
            id: "skorostna-tangentna",
            name: "Северна скоростна тангента Чепинци - Илиянци",
            startPoint: {
                name: "Чепинци",
                coordinates: [42.7653772, 23.2968856]
            },
            endPoint: {
                name: "Илиянци",
                coordinates: [42.7195694, 23.4005384]
            },
            speedLimit: 90,
            distance: 10.278
        }
    ],

    secondaryRoads: []
};

// IMPORTANT: This export is required for the cache generator to work
if (typeof window !== 'undefined') {
    window.RoadsConfig = {
        ROAD_TRACKS
    };
    console.log('✅ RoadsConfig loaded successfully');
}