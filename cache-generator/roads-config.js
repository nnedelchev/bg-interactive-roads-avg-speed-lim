// roads-config.js - Configuration file for cache generator

const ROAD_TRACKS = {
    highways: [
        {
            id: "am-trakia-vakarel-ihtiman",
            name: "АМ Тракия (Вакарел - Ихтиман)",
            startPoint: {
                name: "Вакарел",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "vakarel.jpg",
                coordinates: [42.5504229, 23.7028117]
            },
            endPoint: {
                name: "Ихтиман",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "ihtiman.jpg",
                coordinates: [42.42702, 23.854146]
            },
            speedLimit: 140,
            distance: 19.16,
            "active_since": "2025-9-6"
        },
        {
            id: "am-trakia-calapica-radinovo",
            name: "АМ Тракия (Цалапица - Радиново)",
            startPoint: {
                name: "Цалапица",
                "description": "Камерите са на мост, към който няма отбивка",
                "image": "calapica.jpg",
                coordinates: [42.2049742, 24.5083902]
            },
            endPoint: {
                name: "Радиново",
                "description": "Камерите са на моста при бенз. Шел, Еко, р. Хепи и р. Макдоналдс",
                "image": "radinovo.jpg",
                coordinates: [42.1983262, 24.640272]
            },
            speedLimit: 140,
            distance: 10.936,
            "active_since": "2025-9-6"
        },
        {
            id: "am-hemus-belokopitovo-kaspichan",
            name: "АМ Хемус (Белокопитово - Каспичан)",
            startPoint: {
                name: "Белокопитово",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "belokopitovo.jpg",
                coordinates: [43.336986, 26.900171]
            },
            endPoint: {
                name: "Каспичан",
                "description": "Камерите са на мост, към който няма отбивка",
                "image": "kaspichan.jpg",
                coordinates: [43.323190, 27.149384]
            },
            speedLimit: 140,
            distance: 21.288,
            "active_since": "2025-9-6",
        },
        {
            id: "am-hemus-devnia-ignatievo",
            name: "АМ Хемус (Девня - Игнатиево)",
            startPoint: {
                name: "Девня",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "devnia.jpg",
                coordinates: [43.227240, 27.583637]
            },
            endPoint: {
                name: "Игнатиево",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "ignatievo.jpg",
                coordinates: [43.240717, 27.781228]
            },
            speedLimit: 140,
            distance: 18.423,
            "active_since": "2025-9-6"
        },
        {
            id: "am-struma-sofia-malobuchino",
            name: "АМ Струма (София - тунел Мало Бучино)",
            startPoint: {
                "name": "София",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "am-struma-nachalo-sofia.jpg",
                "coordinates": [42.7107206,23.2229235]
            },
            endPoint: {
                "name": "тунел Мало Бучино",
                "description": "Камерите са на метална конструкция над пътя след/преди тунела",
                "image": "tunel-malobuchino.jpg",
                "coordinates": [42.6778655,23.1521632]
            },
            speedLimit: 140,
            distance: 7.5,
            "active_since": "2025-11-2"
        },
        {
            id: "am-struma-bulgarchevo-pokrovnik",
            name: "АМ Струма (Българчево - Покровник)",
            startPoint: {
                "name": "Покровник",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "pokorvnik.jpg",
                "coordinates": [41.991964, 23.054048]
            },
            endPoint: {
                "name": "Българчево",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "bulgarchevo.jpg",
                "coordinates": [42.011591, 23.044888]
            },
            speedLimit: 140,
            distance: 2.329,
            "active_since": "2025-9-6"
        },
        {
            id: "am-struma-sandanski-damianica",
            name: "АМ Струма (Сандански - Дамяница)",
            startPoint: {
                "name": "Сандански",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "sandanski.jpg",
                "coordinates": [41.5730168, 23.2396528]
            },
            endPoint: {
                "name": "Дамяница",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "damianica.jpg",
                "coordinates": [41.514538, 23.2714067]
            },
            speedLimit: 140,
            distance: 7.306,
            "active_since": "2025-9-6"
        },
        {
            id: "am-marica-liubimec-momkovo",
            name: "АМ Марица (Момково - Любимец)",
            startPoint: {
                name: "Момково",
                "description": "Камерите са на мост, към който няма отбивка",
                "image": "momkovo.jpg",
                coordinates: [41.8323716, 26.1405215]
            },
            endPoint: {
                name: "Любимец",
                "description": "Камерите са на метална конструкция над пътя, до Маркет 'Мустафа'",
                "image": "liubimec.jpg",
                coordinates: [41.8626946, 26.0875656]
            },
            speedLimit: 140,
            distance: 5.9,
            "active_since": "2025-9-12"
        },
        {
            id: "am-marica-momkovo-svilengrad",
            name: "АМ Марица (Свиленград - Момково)",
            startPoint: {
                name: "Свиленград",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "svilengrad.jpg",
                coordinates: [41.7788533, 26.2175075]
            },
            endPoint: {
                name: "Момково",
                "description": "Камерите са на мост, към който няма отбивка",
                "image": "momkovo.jpg",
                coordinates: [41.8323716, 26.1405215]
            },
            speedLimit: 140,
            distance: 8.9,
            "active_since": "2025-9-12"
        },
        {
            id: "am-marica-harmanli-liubimec",
            name: "АМ Марица (Любимец - Харманли)",
            startPoint: {
                name: "Любимец",
                "description": "Камерите са на метална конструкция над пътя, до Маркет 'Мустафа'",
                "image": "liubimec.jpg",
                coordinates: [41.8626946, 26.0875656]
            },
            endPoint: {
                name: "Харманли",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "harmanli.jpg",
                coordinates: [41.9579552, 25.8825804]
            },
            speedLimit: 140,
            distance: 20.9,
            "active_since": "2025-9-12"
        }
    ],

    mainRoads: [
        {
            id: "I-1",
            name: "I-1 Слатино - Кочериновo",
            startPoint: {
                "name": "Слатино",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "slatino.jpg",
                "coordinates": [
                    42.1578707,
                    23.0411316
                ]
            },
            endPoint: {
                "name": "Кочериновo",
                "description": "Камерите са на метална конструкция над пътя на входа на Кочериново",
                "image": "kocherinovo.jpg",
                "coordinates": [
                    42.0640942,
                    23.0385459
                ]
            },
            speedLimit: 90,
            distance: 10.586,
            "active_since": "2025-9-6"
        },
        {
            id: "I-1-2",
            name: "I-1 Срацимирово - Жеглица",
            startPoint: {
                "name": "Срацимирово",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "sratsimirovo.jpg",
                "coordinates": [
                    43.8202694,
                    22.757463
                ]
            },
            endPoint: {
                "name": "Жеглица",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "jeglica.jpg",
                "coordinates": [
                    43.878498,
                    22.7892937
                ]
            },
            speedLimit: 90,
            distance: 7.5,
            "active_since": "2025-10-24"
        },
        {
            id: "I-2",
            name: "I-2 Струйно - Шумен",
            startPoint: {
                "name": "Струйно",
                "description": "Камерите са на метална конструкция над пътя на входа на Струйно",
                "image": "struino.jpg",
                "coordinates": [
                    43.3621074,
                    26.8511336
                ]
            },
            endPoint: {
                "name": "Шумен",
                "description": "Камерите са на метална конструкция над пътя преди кръгово движение",
                "image": "shumen.jpg",
                "coordinates": [
                    43.3173846,
                    26.9201329
                ]
            },
            speedLimit: 90,
            distance: 7.648,
            "active_since": "2025-9-6"
        },
        {
            id: "I-3-1",
            name: "I-3 Долни Дъбник - Телиш",
            startPoint: {
                "name": "Долни Дъбник",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "dolni-dubnik.jpg",
                "coordinates": [
                    43.4162825,
                    24.4707422
                ]
            },
            endPoint: {
                "name": "Телиш",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "telish.jpg",
                "coordinates": [
                    43.3261765,
                    24.2721534
                ]
            },
            speedLimit: 90,
            distance: 21.878,
            "active_since": "2025-9-6"
        },
        {
            id: "I-3-2",
            name: "I-3 Пейчиново - Горна Студена",
            startPoint: {
                "name": "Пейчиново",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "peychinovo.jpg",
                "coordinates": [
                    43.4420639,
                    25.610221
                ]
            },
            endPoint: {
                "name": "Горна Студена",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "gorna-studena.jpg",
                "coordinates": [
                    43.4163286,
                    25.3580126
                ]
            },
            speedLimit: 90,
            distance: 21.2,
            "active_since": "2025-10-24"
        },
        {
            id: "I-4-1",
            name: "I-4 Български извор - Сопот",
            startPoint: {
                "name": "Български извор",
                "description": "Камерите са на метална конструкция над пътя - на входа/изхода на Български извор. След бензиностанцията.",
                "image": "bulgarski-izvor.jpg",
                "coordinates": [
                    43.038396,
                    24.273818
                ]
            },
            endPoint: {
                "name": "Сопот",
                "description": "Камерите са на метална конструкция над пътя - на разклона за Славщица",
                "image": "sopot.jpg",
                "coordinates": [
                    43.0342221,
                    24.3820344
                ]
            },
            speedLimit: 90,
            distance: 9.198,
            "active_since": "2025-9-6"
        },
        {
            id: "I-4-2",
            name: "I-4 Сопот - Голец",
            startPoint: {
                "name": "Сопот",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "sopot.jpg",
                "coordinates": [
                    43.0342221,
                    24.3820344
                ]
            },
            endPoint: {
                "name": "Голец",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "golec.jpg",
                "coordinates": [
                    43.0429322,
                    24.597864
                ]
            },
            speedLimit: 90,
            distance: 17.9,
            "active_since": "2025-10-24"
        },
        {
            id: "I-4-3",
            name: "I-4 Ряховците - Богатово",
            startPoint: {
                "name": "Ряховците",
                "description": "Камерите са на метална конструкция над пътя преди/след бензиностанцията",
                "image": "riahovcite.jpg",
                "coordinates": [
                    43.0331772,
                    25.0108456
                ]
            },
            endPoint: {
                "name": "Богатово",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "bogatovo.jpg",
                "coordinates": [
                    43.0427039,
                    25.215283
                ]
            },
            speedLimit: 90,
            distance: 16.9,
            "active_since": "2025-10-24"
        },
        {
            id: "I-4-4",
            name: "I-4 Богатово - Момин сбор",
            startPoint: {
                "name": "Богатово",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "bogatovo.jpg",
                "coordinates": [
                    43.0427039,
                    25.215283
                ]
            },
            endPoint: {
                "name": "Момин сбор",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "momin-sbor.jpg",
                "coordinates": [
                    43.0889017,
                    25.4860294
                ]
            },
            speedLimit: 90,
            distance: 23.7,
            "active_since": "2025-10-24"
        },
        {
            id: "I-4-5",
            name: "I-4 Омуртаг - Пролаз",
            startPoint: {
                "name": "Омуртаг",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "omurtag.jpg",
                "coordinates": [ 43.11822,26.4149195 ]
            },
            endPoint: {
                "name": "Пролаз",
                "description": "Камерите са на метална конструкция над пътя близо до заведение на пътя",
                "image": "prolaz.jpg",
                "coordinates": [ 43.196735,26.5025829 ]
            },
            speedLimit: 90,
            distance: 13.4,
            "active_since": "2025-11-2"
        },
        {
            id: "I-5-1",
            name: "I-5 Полски Тръмбеш - Поликраище",
            startPoint: {
                "name": "Полски Тръмбеш",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "polski-trambesh.jpg",
                "coordinates": [
                    43.3719622,
                    25.6443753
                ]
            },
            endPoint: {
                "name": "Поликраище",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "polikraishte.jpg",
                "coordinates": [
                    43.1890999,
                    25.6218701
                ]
            },
            speedLimit: 90,
            distance: 21,
            "active_since": "2025-10-5"
        },
        {
            id: "I-5-2",
            name: "I-5 Обретеник - Тръстеник",
            startPoint: {
                "name": "Обретеник",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "obretenik.jpg",
                "coordinates": [
                    43.571866,
                    25.8221363
                ]
            },
            endPoint: {
                "name": "Тръстеник",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "trastenik.jpg",
                "coordinates": [
                    43.6397457,
                    25.8724194
                ]
            },
            speedLimit: 80 - 90,
            distance: 8.7,
            "active_since": "2025-10-5"
        },
        {
            id: "I-5-3",
            name: "I-5 Одяланик - Тръстеник",
            startPoint: {
                "name": "Одяланик",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "odialanik.jpg",
                "coordinates": [
                    43.7564031,
                    25.9065885
                ]
            },
            endPoint: {
                "name": "Тръстеник",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "trastenik.jpg",
                "coordinates": [
                    43.6397457,
                    25.8724194
                ]
            },
            speedLimit: 90,
            distance: 14.5,
            "active_since": "2025-10-5"
        },
        {
            id: "I-5-4",
            name: "I-5 Поликраище - Самоводене",
            startPoint: {
                "name": "Поликраище",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "polikraishte.jpg",
                "coordinates": [
                    43.1890999,
                    25.6218701
                ]
            },
            endPoint: {
                "name": "Самоводене",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "samovodene.jpg",
                "coordinates": [
                    43.1341997,
                    25.6132668
                ]
            },
            speedLimit: 90,
            distance: 6.5,
            "active_since": "2025-10-24"
        },
        {
            id: "I-5-5",
            name: "I-5 Казанлък - Ягода",
            startPoint: {
                "name": "Казанлък",
                "description": "Камерите са на метална конструкция над пътя до бензиностанции Лукоил",
                "image": "kazanluk.jpg",
                "coordinates": [ 42.6135757,25.4354488 ]
            },
            endPoint: {
                "name": "Ягода",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "qgoda.jpg",
                "coordinates": [ 42.5475989,25.5593451 ]
            },
            speedLimit: 90,
            distance: 13.2,
            "active_since": "2025-11-2"
        },
        {
            id: "I-6",
            name: "I-6 Радомир - Беланица",
            startPoint: {
                "name": "Радомир",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "radomir.jpg",
                "coordinates": [
                    42.5550108,
                    22.9651796
                ]
            },
            endPoint: {
                "name": "Беланица",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "belanica-priboi.jpg",
                "coordinates": [
                    42.4876183,
                    22.9270694
                ]
            },
            speedLimit: 40 - 90,
            distance: 8.4,
            "active_since": "2025-10-5"
        },
        {
            id: "II-55",
            name: "I-55 Килифарево - Въглевци",
            startPoint: {
                "name": "Килифарево",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "kilifarevo.jpg",
                "coordinates": [ 42.9996142,25.614714 ]
            },
            endPoint: {
                "name": "Въглевци",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "vuglevci.jpg",
                "coordinates": [ 42.90692,25.6494827 ]
            },
            speedLimit: 90,
            distance: 13.2,
            "active_since": "2025-11-2"
        },
        {
            id: "skorostna-tangentna",
            name: "Северна скоростна тангента Чепинци - Илиянци",
            startPoint: {
                "name": "Чепинци",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "chepinci.jpg",
                "coordinates": [
                    42.7653772,
                    23.2968856
                ]
            },
            endPoint: {
                "name": "Илиянци",
                "description": "Камерите са на метална конструкция над пътя",
                "image": "ilianci.jpg",
                "coordinates": [
                    42.7195694,
                    23.4005384
                ]
            },
            speedLimit: 90,
            distance: 10.278,
            "active_since": "2025-9-6"
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