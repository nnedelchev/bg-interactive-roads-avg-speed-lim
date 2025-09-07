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
            id: "I-4",
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