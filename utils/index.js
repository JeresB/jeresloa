import { format, getDay, subDays, getWeek } from 'date-fns'

export const demo_perso = [
    {
        "idperso": "p_roster",
        "name": "Roster",
        "groupe": "roster",
        "ilevel": 335,
        "repos": false,
        "track_fate_ember": false,
        "logo": "images/class_10.png",
        "icon": "<i className=\"fa-solid fa-circle\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/Selfie_20241122_Jeresayaya_045.jpg"
    },
    {
        "idperso": "hors_roster",
        "name": "Hors Roster",
        "groupe": "hors_roster",
        "ilevel": 335,
        "repos": false,
        "track_fate_ember": false,
        "logo": "images/class_10.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/Selfie_20241126_Imanyrae_001.jpg"
    },
    {
        "idperso": "p_lopang",
        "name": "Lopang",
        "groupe": "hors_roster",
        "ilevel": 335,
        "repos": false,
        "track_fate_ember": false,
        "logo": "images/class_10.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/Selfie_20241126_Imanyrae_001.jpg"
    },
    {
        "idperso": "p_main",
        "name": "Jeresayaya",
        "classe": "Artist",
        "groupe": "roster6",
        "ilevel": 1700,
        "level": 70,
        "repos": false,
        "track_fate_ember": true,
        "logo": "images/class_artist.png",
        "icon": "<i className=\"fa-solid fa-paintbrush\" style=\"color: #f63489;\"></i>",
        "image": "images/Selfie_20241130_Jeresayaya_005.jpg",
        "current_fragments": 375,
        "raid_gate_done": 1,
        "h_ilevel": [
            {
                "date": "Wed Nov 06 2024 20:38:43 GMT+0100 (heure normale d’Europe centrale)",
                "label": "06/11/2024 20:38:43",
                "ilevel": 1682
            },
            {
                "date": "2024-11-22T11:57:41.636Z",
                "label": "22/11/2024 12:57:41",
                "ilevel": 1683
            },
            {
                "date": "2024-11-22T11:57:44.344Z",
                "label": "22/11/2024 12:57:44",
                "ilevel": 1684
            },
            {
                "date": "2024-11-22T11:57:47.263Z",
                "label": "22/11/2024 12:57:47",
                "ilevel": 1685
            },
            {
                "date": "2024-11-29T13:36:13.162Z",
                "label": "29/11/2024 14:36:13",
                "ilevel": 1686
            },
            {
                "date": "2024-11-29T13:36:14.390Z",
                "label": "29/11/2024 14:36:14",
                "ilevel": 1687
            },
            {
                "date": "2024-11-29T13:36:15.568Z",
                "label": "29/11/2024 14:36:15",
                "ilevel": 1688
            },
            {
                "date": "2024-11-29T13:36:16.804Z",
                "label": "29/11/2024 14:36:16",
                "ilevel": 1689
            },
            {
                "date": "2024-11-29T13:36:17.944Z",
                "label": "29/11/2024 14:36:17",
                "ilevel": 1690
            },
            {
                "date": "2025-01-09T23:04:49.751Z",
                "label": "10/01/2025 00:04:49",
                "ilevel": 1691
            },
            {
                "date": "2025-01-09T23:04:50.611Z",
                "label": "10/01/2025 00:04:50",
                "ilevel": 1692
            },
            {
                "date": "2025-01-09T23:04:51.475Z",
                "label": "10/01/2025 00:04:51",
                "ilevel": 1693
            },
            {
                "date": "2025-01-09T23:04:52.399Z",
                "label": "10/01/2025 00:04:52",
                "ilevel": 1694
            },
            {
                "date": "2025-01-09T23:04:53.362Z",
                "label": "10/01/2025 00:04:53",
                "ilevel": 1695
            },
            {
                "date": "2025-01-09T23:04:54.282Z",
                "label": "10/01/2025 00:04:54",
                "ilevel": 1696
            },
            {
                "date": "2025-01-09T23:04:55.197Z",
                "label": "10/01/2025 00:04:55",
                "ilevel": 1697
            },
            {
                "date": "2025-01-09T23:04:56.110Z",
                "label": "10/01/2025 00:04:56",
                "ilevel": 1698
            },
            {
                "date": "2025-01-09T23:04:57.002Z",
                "label": "10/01/2025 00:04:57",
                "ilevel": 1699
            },
            {
                "date": "2025-01-09T23:04:57.864Z",
                "label": "10/01/2025 00:04:57",
                "ilevel": 1700
            }
        ],
        "infos": [
            {
                "name": "Intelligence",
                "value": 400109,
                "logo": "images/stat.webp"
            },
            {
                "name": "Advanced Honing",
                "value": "+20 ilevel",
                "logo": "images/Echidna Honing.webp"
            },
            {
                "name": "Transcendence",
                "value": "121 Fleurs / 7.46%",
                "logo": "images/Transcendence.webp"
            },
            {
                "name": "Elixir",
                "value": "Set 40 / 3.60%",
                "logo": "images/Elixir.webp"
            },
            {
                "name": "Armor Quality",
                "value": "Min 93 / Avg 94 / Max 97",
                "logo": "images/sdm_item_78.webp"
            },
            {
                "name": "Weapon",
                "value": "Quality 98 / ilevel 1690",
                "logo": "images/sdm_item_136.webp"
            },
            {
                "name": "Bracelet",
                "value": "Gain 1.95%",
                "logo": "images/acc_304.webp"
            }
        ],
        "gears": [
            {
                "id": "p_main_head",
                "type": "aegir_ancien_armor",
                "piece": "head",
                "ilevel": 1690,
                "advhoning": 20,
                "histo": []
            },
            {
                "id": "p_main_shoulder",
                "type": "aegir_ancien_armor",
                "piece": "shoulder",
                "ilevel": 1690,
                "advhoning": 20,
                "histo": []
            }
        ]
    },
    {
        "idperso": "p_alt_1",
        "name": "Jeresunshine",
        "classe": "Bard",
        "groupe": "roster6",
        "ilevel": 1690,
        "level": 70,
        "repos": false,
        "track_fate_ember": true,
        "logo": "images/class_bard.png",
        "icon": "<i className=\"fa-solid fa-music\" style=\"color: #cf2a43;\"></i>",
        "image": "images/Selfie_20241128_Jeresunshine_012.jpg",
        "current_fragments": 306,
        "raid_gate_done": 0,
        "h_ilevel": [
            {
                "date": "Wed Nov 06 2024 20:38:42 GMT+0100 (heure normale d’Europe centrale)",
                "label": "06/11/2024 20:38:42",
                "ilevel": 1680
            },
            {
                "date": "2024-12-19T23:36:34.182Z",
                "label": "20/12/2024 00:36:34",
                "ilevel": 1681
            },
            {
                "date": "2024-12-19T23:36:35.392Z",
                "label": "20/12/2024 00:36:35",
                "ilevel": 1682
            },
            {
                "date": "2024-12-19T23:36:36.602Z",
                "label": "20/12/2024 00:36:36",
                "ilevel": 1683
            },
            {
                "date": "2024-12-19T23:36:38.011Z",
                "label": "20/12/2024 00:36:38",
                "ilevel": 1684
            },
            {
                "date": "2024-12-19T23:36:39.228Z",
                "label": "20/12/2024 00:36:39",
                "ilevel": 1685
            },
            {
                "date": "2025-01-02T21:10:08.339Z",
                "label": "02/01/2025 22:10:08",
                "ilevel": 1686
            },
            {
                "date": "2025-01-02T21:10:09.423Z",
                "label": "02/01/2025 22:10:09",
                "ilevel": 1687
            },
            {
                "date": "2025-01-02T21:10:10.461Z",
                "label": "02/01/2025 22:10:10",
                "ilevel": 1688
            },
            {
                "date": "2025-01-02T21:10:11.416Z",
                "label": "02/01/2025 22:10:11",
                "ilevel": 1689
            },
            {
                "date": "2025-01-02T21:10:12.385Z",
                "label": "02/01/2025 22:10:12",
                "ilevel": 1690
            }
        ],
        "infos": []
    },
    {
        "idperso": "p_alt_2",
        "name": "Jerescelestia",
        "classe": "Aeromancer",
        "groupe": "roster6",
        "ilevel": 1690,
        "level": 70,
        "repos": false,
        "track_fate_ember": true,
        "logo": "images/class_aeromancer.png",
        "icon": "<i className=\"fa-solid fa-umbrella\" style=\"color: #ad25a0;\"></i>",
        "image": "images/Selfie_20241122_Jerescelestia_002.jpg",
        "current_fragments": 281,
        "raid_gate_done": 0,
        "h_ilevel": [
            {
                "date": "Wed Nov 06 2024 20:32:42 GMT+0100 (heure normale d’Europe centrale)",
                "label": "06/11/2024 20:32:42",
                "ilevel": 1674
            },
            {
                "date": "Wed Nov 06 2024 20:33:31 GMT+0100 (heure normale d’Europe centrale)",
                "label": "06/11/2024 20:33:31",
                "ilevel": 1675
            },
            {
                "date": "2024-11-09T19:52:59.816Z",
                "label": "09/11/2024 20:52:59",
                "ilevel": 1676
            },
            {
                "date": "2024-11-10T13:39:44.590Z",
                "label": "10/11/2024 14:39:44",
                "ilevel": 1677
            },
            {
                "date": "2024-11-11T15:42:12.925Z",
                "label": "11/11/2024 16:42:12",
                "ilevel": 1678
            },
            {
                "date": "2024-11-11T15:42:13.645Z",
                "label": "11/11/2024 16:42:13",
                "ilevel": 1679
            },
            {
                "date": "2024-11-11T16:12:21.317Z",
                "label": "11/11/2024 17:12:21",
                "ilevel": 1680
            },
            {
                "date": "2024-12-19T23:36:43.198Z",
                "label": "20/12/2024 00:36:43",
                "ilevel": 1681
            },
            {
                "date": "2024-12-19T23:36:44.588Z",
                "label": "20/12/2024 00:36:44",
                "ilevel": 1682
            },
            {
                "date": "2024-12-19T23:36:46.147Z",
                "label": "20/12/2024 00:36:46",
                "ilevel": 1683
            },
            {
                "date": "2024-12-19T23:36:47.199Z",
                "label": "20/12/2024 00:36:47",
                "ilevel": 1684
            },
            {
                "date": "2024-12-19T23:36:48.267Z",
                "label": "20/12/2024 00:36:48",
                "ilevel": 1685
            },
            {
                "date": "2025-01-02T21:10:13.989Z",
                "label": "02/01/2025 22:10:13",
                "ilevel": 1686
            },
            {
                "date": "2025-01-02T21:10:15.292Z",
                "label": "02/01/2025 22:10:15",
                "ilevel": 1687
            },
            {
                "date": "2025-01-02T21:10:16.390Z",
                "label": "02/01/2025 22:10:16",
                "ilevel": 1688
            },
            {
                "date": "2025-01-02T21:10:17.485Z",
                "label": "02/01/2025 22:10:17",
                "ilevel": 1689
            },
            {
                "date": "2025-01-02T21:10:18.478Z",
                "label": "02/01/2025 22:10:18",
                "ilevel": 1690
            }
        ],
        "infos": [
            {
                "name": "Intelligence",
                "value": 400109,
                "logo": "images/stat.webp"
            },
            {
                "name": "Advanced Honing",
                "value": "+18.33 ilevel",
                "logo": "images/Echidna Honing.webp"
            },
            {
                "name": "Transcendence",
                "value": "123 Fleurs",
                "logo": "images/Transcendence.webp"
            },
            {
                "name": "Elixir",
                "value": "Set 40",
                "logo": "images/Elixir.webp"
            },
            {
                "name": "Armor Quality",
                "value": "Min 93 / Avg 95 / Max 100",
                "logo": "images/sdm_item_78.webp"
            },
            {
                "name": "Weapon",
                "value": "Quality 99 / ilevel 1690",
                "logo": "images/sdm_item_136.webp"
            },
            {
                "name": "Bracelet",
                "value": "Gain 8.5%",
                "logo": "images/acc_304.webp"
            }
        ]
    },
    {
        "idperso": "p_alt_3",
        "name": "Jeresbard",
        "classe": "Bard",
        "groupe": "roster6",
        "ilevel": 1683,
        "level": 70,
        "repos": false,
        "track_fate_ember": true,
        "logo": "images/class_bard.png",
        "icon": "<i className=\"fa-solid fa-music\" style=\"color: #f795d4;\"></i>",
        "image": "images/Selfie_20241122_Jeresbard_017.jpg",
        "current_fragments": 486,
        "raid_gate_done": 0,
        "h_ilevel": [
            {
                "date": "Wed Nov 06 2024 20:38:45 GMT+0100 (heure normale d’Europe centrale)",
                "label": "06/11/2024 20:38:45",
                "ilevel": 1667
            },
            {
                "date": "2024-11-11T19:11:49.151Z",
                "label": "11/11/2024 20:11:49",
                "ilevel": 1668
            },
            {
                "date": "2024-11-11T19:11:49.539Z",
                "label": "11/11/2024 20:11:49",
                "ilevel": 1669
            },
            {
                "date": "2024-11-13T17:15:48.180Z",
                "label": "13/11/2024 18:15:48",
                "ilevel": 1670
            },
            {
                "date": "2024-11-29T13:36:19.984Z",
                "label": "29/11/2024 14:36:19",
                "ilevel": 1671
            },
            {
                "date": "2024-11-29T13:36:21.355Z",
                "label": "29/11/2024 14:36:21",
                "ilevel": 1672
            },
            {
                "date": "2024-11-29T13:36:22.648Z",
                "label": "29/11/2024 14:36:22",
                "ilevel": 1673
            },
            {
                "date": "2024-11-29T13:36:23.797Z",
                "label": "29/11/2024 14:36:23",
                "ilevel": 1674
            },
            {
                "date": "2024-11-29T13:36:25.079Z",
                "label": "29/11/2024 14:36:25",
                "ilevel": 1675
            },
            {
                "date": "2024-12-01T17:00:41.789Z",
                "label": "01/12/2024 18:00:41",
                "ilevel": 1676
            },
            {
                "date": "2024-12-01T17:00:43.504Z",
                "label": "01/12/2024 18:00:43",
                "ilevel": 1677
            },
            {
                "date": "2024-12-01T17:00:45.038Z",
                "label": "01/12/2024 18:00:45",
                "ilevel": 1678
            },
            {
                "date": "2024-12-01T17:00:46.510Z",
                "label": "01/12/2024 18:00:46",
                "ilevel": 1679
            },
            {
                "date": "2024-12-01T17:00:47.962Z",
                "label": "01/12/2024 18:00:47",
                "ilevel": 1680
            },
            {
                "date": "2025-01-02T21:10:20.110Z",
                "label": "02/01/2025 22:10:20",
                "ilevel": 1681
            },
            {
                "date": "2025-01-02T21:10:21.218Z",
                "label": "02/01/2025 22:10:21",
                "ilevel": 1682
            },
            {
                "date": "2025-01-02T21:10:22.311Z",
                "label": "02/01/2025 22:10:22",
                "ilevel": 1683
            }
        ],
        "infos": []
    },
    {
        "idperso": "p_alt_4",
        "name": "Jeresakura",
        "classe": "Bard",
        "groupe": "roster6",
        "ilevel": 1682,
        "level": 70,
        "repos": false,
        "track_fate_ember": true,
        "logo": "images/class_bard.png",
        "icon": "<i className=\"fa-solid fa-music\" style=\"color: #ffdf7a;\"></i>",
        "image": "images/Selfie_20241130_Jeresakura_011.jpg",
        "imageold": "images/Selfie_20241122_Jeresakura_006.jpg",
        "current_fragments": 474,
        "raid_gate_done": 0,
        "h_ilevel": [
            {
                "date": "Wed Nov 06 2024 20:38:45 GMT+0100 (heure normale d’Europe centrale)",
                "label": "06/11/2024 20:38:45",
                "ilevel": 1667
            },
            {
                "date": "2024-11-22T09:49:48.622Z",
                "label": "22/11/2024 10:49:48",
                "ilevel": 1668
            },
            {
                "date": "2024-11-22T09:49:49.063Z",
                "label": "22/11/2024 10:49:49",
                "ilevel": 1669
            },
            {
                "date": "2024-11-22T09:49:49.554Z",
                "label": "22/11/2024 10:49:49",
                "ilevel": 1670
            },
            {
                "date": "2024-12-01T17:20:29.354Z",
                "label": "01/12/2024 18:20:29",
                "ilevel": 1671
            },
            {
                "date": "2024-12-01T17:20:30.638Z",
                "label": "01/12/2024 18:20:30",
                "ilevel": 1672
            },
            {
                "date": "2024-12-01T17:20:31.848Z",
                "label": "01/12/2024 18:20:31",
                "ilevel": 1673
            },
            {
                "date": "2024-12-01T17:20:33.138Z",
                "label": "01/12/2024 18:20:33",
                "ilevel": 1674
            },
            {
                "date": "2024-12-01T17:20:34.339Z",
                "label": "01/12/2024 18:20:34",
                "ilevel": 1675
            },
            {
                "date": "2024-12-01T17:20:35.647Z",
                "label": "01/12/2024 18:20:35",
                "ilevel": 1676
            },
            {
                "date": "2024-12-01T17:20:36.743Z",
                "label": "01/12/2024 18:20:36",
                "ilevel": 1677
            },
            {
                "date": "2024-12-01T17:20:37.965Z",
                "label": "01/12/2024 18:20:37",
                "ilevel": 1678
            },
            {
                "date": "2024-12-01T17:20:39.161Z",
                "label": "01/12/2024 18:20:39",
                "ilevel": 1679
            },
            {
                "date": "2024-12-01T17:20:40.258Z",
                "label": "01/12/2024 18:20:40",
                "ilevel": 1680
            },
            {
                "date": "2025-01-02T21:10:23.594Z",
                "label": "02/01/2025 22:10:23",
                "ilevel": 1681
            },
            {
                "date": "2025-01-02T21:10:26.084Z",
                "label": "02/01/2025 22:10:26",
                "ilevel": 1682
            }
        ],
        "infos": []
    },
    {
        "idperso": "p_alt_5",
        "name": "Jereseraphina",
        "classe": "Artist",
        "groupe": "roster6",
        "ilevel": 1682,
        "level": 70,
        "repos": false,
        "track_fate_ember": true,
        "logo": "images/class_artist.png",
        "icon": "<i className=\"fa-solid fa-paintbrush\" style=\"color: #efe3bd;\"></i>",
        "image": "images/Selfie_20241122_Jereseraphina_002.jpg",
        "current_fragments": 313,
        "raid_gate_done": 0,
        "h_ilevel": [
            {
                "date": "Wed Nov 06 2024 20:38:47 GMT+0100 (heure normale d’Europe centrale)",
                "label": "06/11/2024 20:38:47",
                "ilevel": 1665
            },
            {
                "date": "2024-11-11T19:07:36.881Z",
                "label": "11/11/2024 20:07:36",
                "ilevel": 1666
            },
            {
                "date": "2024-11-11T19:07:37.534Z",
                "label": "11/11/2024 20:07:37",
                "ilevel": 1667
            },
            {
                "date": "2024-11-22T09:53:55.541Z",
                "label": "22/11/2024 10:53:55",
                "ilevel": 1668
            },
            {
                "date": "2024-11-22T09:53:55.862Z",
                "label": "22/11/2024 10:53:55",
                "ilevel": 1669
            },
            {
                "date": "2024-11-22T09:53:56.203Z",
                "label": "22/11/2024 10:53:56",
                "ilevel": 1670
            },
            {
                "date": "2024-12-06T12:55:57.992Z",
                "label": "06/12/2024 13:55:57",
                "ilevel": 1671
            },
            {
                "date": "2024-12-06T12:55:58.811Z",
                "label": "06/12/2024 13:55:58",
                "ilevel": 1672
            },
            {
                "date": "2024-12-06T12:55:59.771Z",
                "label": "06/12/2024 13:55:59",
                "ilevel": 1673
            },
            {
                "date": "2024-12-06T12:56:00.693Z",
                "label": "06/12/2024 13:56:00",
                "ilevel": 1674
            },
            {
                "date": "2024-12-06T12:56:01.632Z",
                "label": "06/12/2024 13:56:01",
                "ilevel": 1675
            },
            {
                "date": "2024-12-06T12:56:02.582Z",
                "label": "06/12/2024 13:56:02",
                "ilevel": 1676
            },
            {
                "date": "2024-12-06T12:56:03.570Z",
                "label": "06/12/2024 13:56:03",
                "ilevel": 1677
            },
            {
                "date": "2024-12-06T12:56:04.655Z",
                "label": "06/12/2024 13:56:04",
                "ilevel": 1678
            },
            {
                "date": "2024-12-06T12:56:05.648Z",
                "label": "06/12/2024 13:56:05",
                "ilevel": 1679
            },
            {
                "date": "2024-12-06T12:56:07.056Z",
                "label": "06/12/2024 13:56:07",
                "ilevel": 1680
            },
            {
                "date": "2025-01-02T21:10:24.835Z",
                "label": "02/01/2025 22:10:24",
                "ilevel": 1681
            },
            {
                "date": "2025-01-02T21:10:27.007Z",
                "label": "02/01/2025 22:10:27",
                "ilevel": 1682
            }
        ],
        "infos": [],
        "gears": [
            {
                "id": "p_alt_5_head",
                "type": "t4_relic_armor",
                "piece": "head",
                "ilevel": 1675,
                "advhoning": 10,
                "histo": [
                    {
                        "type": "t4_relic_armor",
                        "gearlvl": 14,
                        "goldcost": -18480,
                        "taps": 14,
                        "artisan": 52.33,
                        "done": true
                    },
                    {
                        "type": "t4_relic_armor",
                        "gearlvl": 15,
                        "goldcost": -42188,
                        "taps": 17,
                        "artisan": 53.02,
                        "done": true
                    }
                ]
            },
            {
                "id": "p_alt_5_shoulder",
                "type": "aegir_ancien_armor",
                "piece": "shoulder",
                "ilevel": 1675,
                "advhoning": 10,
                "histo": [
                    {
                        "type": "aegir_ancien_armor",
                        "gearlvl": 14,
                        "goldcost": -33000,
                        "taps": 25,
                        "artisan": 100,
                        "done": true
                    },
                    {
                        "type": "aegir_ancien_armor",
                        "gearlvl": 15,
                        "goldcost": -5840,
                        "taps": 8,
                        "artisan": 20.09,
                        "done": true
                    }
                ]
            },
            {
                "id": "p_alt_5_chest",
                "type": "aegir_ancien_armor",
                "piece": "chest",
                "ilevel": 1690,
                "advhoning": 20,
                "histo": [
                    {
                        "type": "aegir_ancien_armor",
                        "gearlvl": 15,
                        "goldcost": -8760,
                        "taps": 6,
                        "artisan": 13.95,
                        "done": true
                    },
                    {
                        "type": "aegir_ancien_armor",
                        "gearlvl": 16,
                        "goldcost": -59053,
                        "taps": 31,
                        "artisan": 100,
                        "done": true
                    }
                ]
            },
            {
                "id": "p_alt_5_pants",
                "type": "aegir_ancien_armor",
                "piece": "pants",
                "ilevel": 1675,
                "advhoning": 10,
                "histo": [
                    {
                        "type": "aegir_ancien_armor",
                        "gearlvl": 14,
                        "goldcost": -9240,
                        "taps": 7,
                        "artisan": 21.16,
                        "done": true
                    },
                    {
                        "type": "aegir_ancien_armor",
                        "gearlvl": 15,
                        "goldcost": -53870,
                        "taps": 28,
                        "artisan": 100,
                        "done": true
                    }
                ]
            },
            {
                "id": "p_alt_5_gloves",
                "type": "t4_relic_armor",
                "piece": "gloves",
                "ilevel": 1675,
                "advhoning": 10,
                "histo": [
                    {
                        "type": "t4_relic_armor",
                        "gearlvl": 14,
                        "goldcost": -10560,
                        "taps": 8,
                        "artisan": 25.12,
                        "done": true
                    },
                    {
                        "type": "t4_relic_armor",
                        "gearlvl": 15,
                        "goldcost": -17520,
                        "taps": 8,
                        "artisan": 20.09,
                        "done": true
                    }
                ]
            },
            {
                "id": "p_alt_5_weapon",
                "type": "t4_relic_weapon",
                "piece": "weapon",
                "ilevel": 1690,
                "advhoning": 20,
                "histo": [
                    {
                        "type": "t4_relic_weapon",
                        "gearlvl": 15,
                        "goldcost": -7290,
                        "taps": 3,
                        "artisan": 6.14,
                        "done": true
                    },
                    {
                        "type": "t4_relic_weapon",
                        "gearlvl": 16,
                        "goldcost": -24030,
                        "taps": 9,
                        "artisan": 23.44,
                        "done": true
                    }
                ]
            }
        ]
    },
    {
        "idperso": "p_alt_6",
        "name": "Imanyrae",
        "classe": "Sorceress",
        "groupe": "hors_roster",
        "ilevel": 1642,
        "level": 61,
        "repos": false,
        "track_fate_ember": true,
        "logo": "images/class_sorceress.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/Selfie_20241122_Imanyrae_006.jpg",
        "h_ilevel": []
    },
    {
        "idperso": "p_alt_19",
        "name": "Jeresketch",
        "classe": "Artist",
        "groupe": "hors_roster",
        "ilevel": 1640,
        "level": 65,
        "repos": false,
        "track_fate_ember": true,
        "logo": "images/class_artist.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/Selfie_20241102_Jeresketch_000.jpg",
        "h_ilevel": []
    },
    {
        "idperso": "p_alt_7",
        "name": "Shadowbreacher",
        "classe": "Paladin",
        "groupe": "lopang",
        "ilevel": 1590,
        "level": 60,
        "repos": true,
        "track_fate_ember": false,
        "logo": "images/class_paladin.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/Shadow11.jpg",
        "h_ilevel": []
    },
    {
        "idperso": "p_alt_8",
        "name": "Drevana",
        "classe": "Shadowhunter",
        "groupe": "lopang",
        "ilevel": 1580,
        "level": 60,
        "repos": true,
        "track_fate_ember": false,
        "logo": "images/class_shadowhunter.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/Drevana11.jpg",
        "h_ilevel": []
    },
    {
        "idperso": "p_alt_9",
        "name": "Jeresblade",
        "classe": "Slayer",
        "groupe": "lopang",
        "ilevel": 1540,
        "level": 60,
        "repos": true,
        "track_fate_ember": false,
        "logo": "images/class_slayer.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/",
        "h_ilevel": []
    },
    {
        "idperso": "p_alt_10",
        "name": "Skairiper",
        "classe": "Deathblade",
        "groupe": "lopang",
        "ilevel": 1465,
        "level": 60,
        "repos": true,
        "track_fate_ember": false,
        "logo": "images/class_db.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/",
        "h_ilevel": []
    },
    {
        "idperso": "p_alt_11",
        "name": "Shadotech",
        "classe": "Scouter",
        "groupe": "lopang",
        "ilevel": 1460,
        "level": 60,
        "repos": true,
        "track_fate_ember": false,
        "logo": "images/class_scouter.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/",
        "h_ilevel": []
    },
    {
        "idperso": "p_alt_12",
        "name": "Shadorim",
        "classe": "Berserker",
        "groupe": "lopang",
        "ilevel": 1415,
        "level": 60,
        "repos": true,
        "track_fate_ember": false,
        "logo": "images/class_zerk.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/",
        "h_ilevel": []
    },
    {
        "idperso": "p_alt_13",
        "name": "Jerestarwhale",
        "classe": "Aeromancer",
        "groupe": "lopang",
        "ilevel": 1415,
        "level": 60,
        "repos": true,
        "track_fate_ember": false,
        "logo": "images/class_aeromancer.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/",
        "h_ilevel": []
    },
    {
        "idperso": "p_alt_14",
        "name": "Jeresfighter",
        "classe": "Wardancer",
        "groupe": "lopang",
        "ilevel": 1370,
        "level": 60,
        "repos": true,
        "track_fate_ember": false,
        "logo": "images/class_wardancer.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/",
        "h_ilevel": []
    },
    {
        "idperso": "p_alt_15",
        "name": "Jerespala",
        "classe": "Paladin",
        "groupe": "lopang",
        "ilevel": 1370,
        "level": 60,
        "repos": true,
        "track_fate_ember": false,
        "logo": "images/class_paladin.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/",
        "h_ilevel": []
    },
    {
        "idperso": "p_alt_16",
        "name": "Jereslopang",
        "classe": "Sharpshooter",
        "groupe": "lopang",
        "ilevel": 1340,
        "level": 60,
        "repos": true,
        "track_fate_ember": false,
        "logo": "images/class_ss.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/",
        "h_ilevel": []
    },
    {
        "idperso": "p_roster_alt",
        "name": "Roster Alt",
        "groupe": "roster_alt",
        "ilevel": 80,
        "repos": true,
        "track_fate_ember": false,
        "logo": "images/rosterlogo.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/roster1.jpg"
    },
    {
        "idperso": "p_alt_17",
        "name": "Chadsunshine",
        "classe": "Gunlancer",
        "groupe": "roster6_alt",
        "ilevel": 1610,
        "level": 60,
        "repos": false,
        "track_fate_ember": false,
        "logo": "images/class_gl.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/Selfie_20240329_Chadsunshine_002.jpg",
        "h_ilevel": []
    },
    {
        "idperso": "p_alt_18",
        "name": "Dauntlessoul",
        "classe": "Souleater",
        "groupe": "roster6_alt",
        "ilevel": 1540,
        "level": 60,
        "repos": false,
        "track_fate_ember": false,
        "logo": "images/class_se.png",
        "icon": "<i className=\"fa-solid fa-circle-half-stroke\" style=\"color: #CDCDCD;\"></i>",
        "image": "images/Selfie_20240329_Chadsunshine_002.jpg",
        "h_ilevel": []
    }
]

export const demo_fate_embers = [
    {
        "date": "2025-01-27T16:25:40.585Z",
        "type": "500ksilver",
        "perso": "Main"
    },
    {
        "perso": "p_alt_5",
        "date": "2025-01-27T16:26:17.978Z",
        "type": "Alt 1"
    },
    {
        "date": "2025-01-27T16:26:22.505Z",
        "perso": "Alt 1",
        "type": "3000golds"
    },
    {
        "type": "5msilver",
        "perso": "Alt 1",
        "date": "2025-01-27T16:26:39.218Z"
    },
    {
        "perso": "Alt 2",
        "type": "1msilver",
        "date": "2025-01-27T16:27:01.377Z"
    },
    {
        "perso": "Alt 3",
        "type": "1msilver",
        "date": "2025-01-31T08:23:24.882Z"
    },
    {
        "perso": "Alt 3",
        "date": "2025-01-31T08:24:07.946Z",
        "type": "1500golds"
    },
    {
        "perso": "Alt 3",
        "type": "1msilver",
        "date": "2025-01-31T08:31:09.108Z"
    },
    {
        "perso": "Alt 3",
        "date": "2025-01-31T09:15:55.373Z",
        "type": "lucky_xpcardpack"
    },
    {
        "perso": "Main",
        "date": "2025-01-31T09:15:59.306Z",
        "type": "random_leg_card_pack"
    },
    {
        "perso": "Main",
        "type": "m_honing_chest",
        "date": "2025-01-31T09:16:02.632Z"
    },
    {
        "type": "100kgolds",
        "date": "2025-02-01T02:52:36.946Z",
        "perso": "Main"
    },
    {
        "date": "2025-02-01T02:52:42.643Z",
        "perso": "Main",
        "type": "5msilver"
    },
    {
        "date": "2025-02-01T02:52:46.495Z",
        "perso": "Main",
        "type": "500ksilver"
    }
]

export const classes = [
    {
        "name": "Berserker",
        "logo": "images/class_zerk.png",
        "icon": "<i class=\"fa-solid fa-gavel\" style=\"color: #ff0000;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Destroyer",
        "logo": "images/class_destroyer.png",
        "icon": "<i class=\"fa-solid fa-hammer\" style=\"color: #8b4513;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Gunlancer",
        "logo": "images/class_gl.png",
        "icon": "<i class=\"fa-solid fa-shield\" style=\"color: #0000ff;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Paladin",
        "logo": "images/class_paladin.png",
        "icon": "<i class=\"fa-solid fa-cross\" style=\"color: #ffff00;\"></i>",
        "type": "Support"
    },
    {
        "name": "Slayer",
        "logo": "images/class_slayer.png",
        "icon": "<i class=\"fa-solid fa-bolt\" style=\"color: #ff4500;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Breaker",
        "logo": "images/class_breaker.png",
        "icon": "<i class=\"fa-solid fa-shield\" style=\"color: #8b0000;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Striker",
        "logo": "images/class_striker.png",
        "icon": "<i class=\"fa-solid fa-hand-rock\" style=\"color: #ff8c00;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Glaivier",
        "logo": "images/class_glaivier.png",
        "icon": "<i class=\"fa-solid fa-fan\" style=\"color: #00ff00;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Soulfist",
        "logo": "images/class_soulfist.png",
        "icon": "<i class=\"fa-solid fa-hand-sparkles\" style=\"color: #ff69b4;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Scrapper",
        "logo": "images/class_scrapper.png",
        "icon": "<i class=\"fa-solid fa-hand-back-fist\" style=\"color: #a52a2a;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Wardancer",
        "logo": "images/class_wardancer.png",
        "icon": "<i class=\"fa-solid fa-dove\" style=\"color: #ff1493;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Arcana",
        "logo": "images/class_arcana.png",
        "icon": "<i class=\"fa-solid fa-hat-wizard\" style=\"color: #800080;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Bard",
        "logo": "images/class_bard.png",
        "icon": "<i class=\"fa-solid fa-music\" style=\"color: #ff69b4;\"></i>",
        "type": "Support"
    },
    {
        "name": "Sorceress",
        "logo": "images/class_sorceress.png",
        "icon": "<i class=\"fa-solid fa-fire\" style=\"color: #ff4500;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Summoner",
        "logo": "images/class_summoner.png",
        "icon": "<i class=\"fa-solid fa-dragon\" style=\"color: #32cd32;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Artillerist",
        "logo": "images/class_arti.png",
        "icon": "<i class=\"fa-solid fa-bomb\" style=\"color: #808080;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Deadeye",
        "logo": "images/class_deadeye.png",
        "icon": "<i class=\"fa-solid fa-crosshairs\" style=\"color: #000000;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Scouter",
        "logo": "images/class_scouter.png",
        "icon": "<i class=\"fa-solid fa-robot\" style=\"color: #4682b4;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Sharpshooter",
        "logo": "images/class_ss.png",
        "icon": "<i class=\"fa-solid fa-bullseye\" style=\"color: #228b22;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Gunslinger",
        "logo": "images/class_gs.png",
        "icon": "<i class=\"fa-solid fa-gun\" style=\"color: #696969;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Deathblade",
        "logo": "images/class_db.png",
        "icon": "<i class=\"fa-solid fa-skull\" style=\"color: #4b0082;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Reaper",
        "logo": "images/class_reaper.png",
        "icon": "<i class=\"fa-solid fa-ghost\" style=\"color: #000000;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Shadowhunter",
        "logo": "images/class_shadowhunter.png",
        "icon": "<i class=\"fa-solid fa-moon\" style=\"color: #8b0000;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Souleater",
        "logo": "images/class_se.png",
        "icon": "<i class=\"fa-solid fa-ghost\" style=\"color: #800080;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Aeromancer",
        "logo": "images/class_aeromancer.png",
        "icon": "<i class=\"fa-solid fa-umbrella\" style=\"color: #87CEEB;\"></i>",
        "type": "DPS"
    },
    {
        "name": "Artist",
        "logo": "images/class_artist.png",
        "icon": "<i class=\"fa-solid fa-paint-brush\" style=\"color: #f63489;\"></i>",
        "type": "Support"
    },
    {
        "name": "Wildsoul",
        "logo": "images/class_aeromancer.png",
        "icon": "<i class=\"fa-solid fa-paw\" style=\"color: #8b4513;\"></i>",
        "type": "DPS"
    }
]

export const categories = [
    {
        "idcategorie": "c_event_shop",
        "name": "Event Shop",
        "reset": "weekly",
        "groupe": "weekly",
        "repet": 1,
        "duration": 1,
        "rested": false,
        "completAllAtOnce": true,
        "logo": "images/all_quest.webp",
        "image": "",
        "inputs": [
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_stronghold_merchant",
        "name": "Stronghold Merchant",
        "reset": "weekly",
        "groupe": "weekly",
        "repet": 1,
        "duration": 1,
        "rested": false,
        "completAllAtOnce": true,
        "logo": "images/castle.svg",
        "image": "",
        "inputs": [
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_stronghold_activities",
        "name": "Stronghold Activities",
        "reset": "daily",
        "groupe": "daily",
        "repet": 1,
        "duration": 2,
        "rested": false,
        "completAllAtOnce": true,
        "logo": "images/castle.svg",
        "image": "",
        "inputs": [
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_chaos_gate",
        "name": "Chaos Gate",
        "reset": "daily",
        "groupe": "daily",
        "repet": 1,
        "duration": 3,
        "rested": false,
        "completAllAtOnce": true,
        "logo": "images/chaos_gate.png",
        "image": "",
        "horaire": [1, 4, 6, 0],
        "inputs": [
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_world_boss",
        "name": "World Boss",
        "reset": "daily",
        "groupe": "daily",
        "repet": 1,
        "duration": 5,
        "rested": false,
        "completAllAtOnce": true,
        "logo": "images/island.webp",
        "image": "",
        "horaire": [2, 5, 0],
        "inputs": [
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_fouille",
        "name": "Fouille",
        "reset": "daily",
        "groupe": "daily",
        "repet": 1,
        "duration": 10,
        "rested": false,
        "completAllAtOnce": false,
        "logo": "images/trade_skill_tool.webp",
        "image": "",
        "inputs": [
            { "type": "number", "id": "tasksconfig_artisanatGainPer10Minutes_input", "var": "artisanatGainPer10Minutes", "name": "Artisanat Gain Per 10 Minutes" },
            { "type": "number", "id": "tasksconfig_artisanatMaxLifeEnergy_input", "var": "artisanatMaxLifeEnergy", "name": "Artisanat Max Life Energy" },
            { "type": "number", "id": "tasksconfig_artisanatLifeEnergy_input", "var": "artisanatLifeEnergy", "name": "Artisanat Life Energy" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_kurzan_frontline",
        "name": "Kurzan Frontline",
        "reset": "daily",
        "groupe": "daily",
        "repet": 1,
        "duration": 2,
        "rested": true,
        "completAllAtOnce": false,
        "logo": "images/chaos-dungeon.webp",
        "image": "",
        "maxRest": 200,
        "bloodstonesGain": 220,
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "number", "id": "tasksconfig_rest_input", "var": "rest", "name": "Rest" },
            { "type": "number", "id": "tasksconfig_restNeeded_input", "var": "restNeeded", "name": "Rest Needed" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_guilde_donation",
        "name": "Guilde",
        "reset": "daily",
        "groupe": "daily",
        "repet": 1,
        "duration": 1,
        "rested": true,
        "completAllAtOnce": false,
        "logo": "images/sylmael.png",
        "image": "",
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "number", "id": "tasksconfig_rest_input", "var": "rest", "name": "Rest" },
            { "type": "number", "id": "tasksconfig_restNeeded_input", "var": "restNeeded", "name": "Rest Needed" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_una_task",
        "name": "Una",
        "reset": "daily",
        "groupe": "daily",
        "repet": 3,
        "duration": 1,
        "rested": true,
        "completAllAtOnce": true,
        "logo": "images/daily.webp",
        "image": "",
        "maxRest": 100,
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "number", "id": "tasksconfig_rest_input", "var": "rest", "name": "Rest" },
            { "type": "number", "id": "tasksconfig_restNeeded_input", "var": "restNeeded", "name": "Rest Needed" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_lopang_task",
        "name": "Lopang",
        "reset": "daily",
        "groupe": "daily",
        "repet": 3,
        "duration": 1,
        "rested": true,
        "completAllAtOnce": true,
        "logo": "images/daily.webp",
        "image": "",
        "maxRest": 100,
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "number", "id": "tasksconfig_rest_input", "var": "rest", "name": "Rest" },
            { "type": "number", "id": "tasksconfig_restNeeded_input", "var": "restNeeded", "name": "Rest Needed" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_ageoros",
        "name": "Ageoros",
        "reset": "daily",
        "groupe": "daily",
        "repet": 1,
        "duration": 2,
        "rested": true,
        "completAllAtOnce": false,
        "logo": "images/guardian.png",
        "image": "",
        "maxRest": 100,
        "bloodstonesGain": 220,
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "number", "id": "tasksconfig_rest_input", "var": "rest", "name": "Rest" },
            { "type": "number", "id": "tasksconfig_restNeeded_input", "var": "restNeeded", "name": "Rest Needed" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_skolakia",
        "name": "Skolakia",
        "reset": "daily",
        "groupe": "daily",
        "repet": 1,
        "duration": 4,
        "rested": true,
        "completAllAtOnce": false,
        "logo": "images/guardian.png",
        "image": "",
        "maxRest": 100,
        "bloodstonesGain": 220,
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "number", "id": "tasksconfig_rest_input", "var": "rest", "name": "Rest" },
            { "type": "number", "id": "tasksconfig_restNeeded_input", "var": "restNeeded", "name": "Rest Needed" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_brelv2_1_2",
        "name": "Brelshaza Act. 2",
        "gold": true,
        "NM": {
            "ilevel": 1670,
            "gain": 27500,
            "G1": 9000,
            "G2": 18500,
            "coffreG1": -3800,
            "coffreG2": -5600
        },
        "HM": {
            "ilevel": 1692,
            "gain": 34000,
            "G1": 11000,
            "G2": 23000,
            "coffreG1": -4500,
            "coffreG2": -7200
        },
        "reset": "weekly",
        "groupe": "raids",
        "repet": 2,
        "duration": 60,
        "rested": false,
        "completAllAtOnce": false,
        "trackGold": true,
        "logo": "images/brelv2icon.jpg",
        "image": "images/brelv2bg.jpg",
        "bloodstonesGain": 330,
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "checkbox", "id": "tasksconfig_gold_input", "var": "gold", "name": "Gold" },
            { "type": "checkbox", "id": "tasksconfig_coffreG1_input", "var": "coffreG1", "name": "Coffre G1" },
            { "type": "checkbox", "id": "tasksconfig_coffreG2_input", "var": "coffreG2", "name": "Coffre G2" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" },
            { "type": "number", "id": "tasksconfig_done_input", "var": "done", "name": "Done" }
        ]
    },
    {
        "idcategorie": "c_aegir_1_2",
        "name": "Aegir",
        "gold": true,
        "NM": {
            "ilevel": 1660,
            "gain": 24000,
            "G1": 7500,
            "G2": 16500,
            "coffreG1": -3200,
            "coffreG2": -5300
        },
        "HM": {
            "ilevel": 1680,
            "gain": 30000,
            "G1": 10000,
            "G2": 20000,
            "coffreG1": -4100,
            "coffreG2": -6600
        },
        "reset": "weekly",
        "groupe": "raids",
        "repet": 2,
        "duration": 60,
        "rested": false,
        "completAllAtOnce": false,
        "trackGold": true,
        "logo": "images/townmusic_224.webp",
        "image": "images/aegirbg.jpg",
        "bloodstonesGain": 330,
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "checkbox", "id": "tasksconfig_gold_input", "var": "gold", "name": "Gold" },
            { "type": "checkbox", "id": "tasksconfig_coffreG1_input", "var": "coffreG1", "name": "Coffre G1" },
            { "type": "checkbox", "id": "tasksconfig_coffreG2_input", "var": "coffreG2", "name": "Coffre G2" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" },
            { "type": "number", "id": "tasksconfig_done_input", "var": "done", "name": "Done" }
        ]
    },
    {
        "idcategorie": "c_theamine_1_4",
        "name": "Thaemine",
        "gold": true,
        "NM": {
            "ilevel": 1610,
            "gain": 13000,
            "G1": 3500,
            "G2": 4000,
            "G3": 5500,
            "coffreG1": -1500,
            "coffreG2": -1800,
            "coffreG3": -2500
        },
        "HM": {
            "ilevel": 1620,
            "gain": 28600,
            "G1": 4400,
            "G2": 5500,
            "G3": 8900,
            "G4": 9800,
            "coffreG1": -1700,
            "coffreG2": -1900,
            "coffreG3": -2300,
            "coffreG4": -2300
        },
        "reset": "bimensuelthaemine",
        "groupe": "raids",
        "repet": 4,
        "duration": 60,
        "rested": false,
        "completAllAtOnce": false,
        "trackGold": true,
        "logo": "images/ToxicBaby.png",
        "image": "images/raidsv2thaemine.jpg",
        "bloodstonesGain": 330,
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "checkbox", "id": "tasksconfig_gold_input", "var": "gold", "name": "Gold" },
            { "type": "checkbox", "id": "tasksconfig_coffreG1_input", "var": "coffreG1", "name": "Coffre G1" },
            { "type": "checkbox", "id": "tasksconfig_coffreG2_input", "var": "coffreG2", "name": "Coffre G2" },
            { "type": "checkbox", "id": "tasksconfig_coffreG3_input", "var": "coffreG3", "name": "Coffre G3" },
            { "type": "checkbox", "id": "tasksconfig_coffreG4_input", "var": "coffreG4", "name": "Coffre G4" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" },
            { "type": "number", "id": "tasksconfig_done_input", "var": "done", "name": "Done" }
        ]
    },
    {
        "idcategorie": "c_echidna_1_2",
        "name": "Echidna",
        "gold": true,
        "NM": {
            "ilevel": 1620,
            "gain": 16000,
            "G1": 6000,
            "G2": 10000,
            "coffreG1": -2200,
            "coffreG2": -3400
        },
        "HM": {
            "ilevel": 1630,
            "gain": 19500,
            "G1": 7000,
            "G2": 12500,
            "coffreG1": -2800,
            "coffreG2": -4100
        },
        "reset": "weekly",
        "groupe": "raids",
        "repet": 2,
        "duration": 60,
        "rested": false,
        "completAllAtOnce": false,
        "trackGold": true,
        "logo": "images/EchidnaWow.png",
        "image": "images/raidsv2echidna.jpg",
        "bloodstonesGain": 330,
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "checkbox", "id": "tasksconfig_gold_input", "var": "gold", "name": "Gold" },
            { "type": "checkbox", "id": "tasksconfig_coffreG1_input", "var": "coffreG1", "name": "Coffre G1" },
            { "type": "checkbox", "id": "tasksconfig_coffreG2_input", "var": "coffreG2", "name": "Coffre G2" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" },
            { "type": "number", "id": "tasksconfig_done_input", "var": "done", "name": "Done" }
        ]
    },
    {
        "idcategorie": "c_behemoth_1_2",
        "name": "Behemoth",
        "gold": false,
        "NM": {
            "ilevel": 1620,
            "gain": 18000,
            "G1": 6500,
            "G2": 11500,
            "coffreG1": -1800,
            "coffreG2": -2700
        },
        "reset": "weekly",
        "groupe": "raids",
        "repet": 2,
        "duration": 60,
        "rested": false,
        "completAllAtOnce": false,
        "trackGold": true,
        "logo": "images/behemothemote.png",
        "image": "images/behemoth.jpg",
        "bloodstonesGain": 330,
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "checkbox", "id": "tasksconfig_gold_input", "var": "gold", "name": "Gold" },
            { "type": "checkbox", "id": "tasksconfig_coffreG1_input", "var": "coffreG1", "name": "Coffre G1" },
            { "type": "checkbox", "id": "tasksconfig_coffreG2_input", "var": "coffreG2", "name": "Coffre G2" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" },
            { "type": "number", "id": "tasksconfig_done_input", "var": "done", "name": "Done" }
        ]
    },

    {
        "idcategorie": "c_ebony_cube",
        "name": "Ebony Cube",
        "reset": "weekly",
        "groupe": "weekly",
        "repet": 2,
        "duration": 5,
        "rested": false,
        "completAllAtOnce": false,
        "logo": "images/cubet4_1.webp",
        "image": "",
        "bloodstonesGain": 220,
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_pirate_shop",
        "name": "Pirate Shop",
        "reset": "weekly",
        "groupe": "weekly",
        "repet": 1,
        "duration": 1,
        "rested": false,
        "completAllAtOnce": false,
        "logo": "images/pirate_coin.png",
        "image": "",
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_weekly_una",
        "name": "Weekly Una",
        "reset": "weekly",
        "groupe": "weekly",
        "repet": 1,
        "duration": 1,
        "rested": false,
        "completAllAtOnce": false,
        "logo": "images/weekly.webp",
        "image": "",
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_guilde_shop",
        "name": "Guilde Shop",
        "reset": "weekly",
        "groupe": "weekly",
        "repet": 1,
        "duration": 1,
        "rested": false,
        "completAllAtOnce": false,
        "logo": "images/sylmael.png",
        "image": "",
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    },
    {
        "idcategorie": "c_soloraid_shop",
        "name": "Solo Raid Shop",
        "reset": "weekly",
        "groupe": "weekly",
        "repet": 1,
        "duration": 1,
        "rested": false,
        "completAllAtOnce": false,
        "logo": "images/legion_raid.png",
        "image": "",
        "inputs": [
            { "type": "list-persos", "id": "tasksconfig_perso_input", "var": "idperso", "name": "Perso" },
            { "type": "number", "id": "tasksconfig_count_input", "var": "count", "name": "Count" }
        ]
    }
]

export const gold_types = [
    {
        name: "T4 Honing",
        logo: "images/T4 Honing.webp"
    },
    {
        name: "Achat",
        logo: "images/Achat.webp"
    },
    {
        name: "Artisanat",
        logo: "images/Artisanat.webp"
    },
    {
        name: "Coffre de raids",
        logo: "images/Coffre de raids.webp"
    },
    {
        name: "Depense",
        logo: "images/Depense.webp"
    },
    {
        name: "Echidna Honing",
        logo: "images/Echidna Honing.webp"
    },
    {
        name: "Elixir",
        logo: "images/Elixir.webp"
    },
    {
        name: "Events",
        logo: "images/Events.webp"
    },
    {
        name: "Fate Ember",
        logo: "images/Fate Ember.webp"
    },
    {
        name: "Gear Crafting",
        logo: "images/Gear Crafting.webp"
    },
    {
        name: "Gemme",
        logo: "images/Gemme.webp"
    },
    {
        name: "Gravures",
        logo: "images/Gravures.webp"
    },
    {
        name: "Honing",
        logo: "images/Honing.webp"
    },
    {
        name: "Karma",
        logo: "images/Karma.webp"
    },
    {
        name: "Knowledge Transfer",
        logo: "images/Knowledge Transfer.webp"
    },
    {
        name: "Oreha",
        logo: "images/Oreha.webp"
    },
    {
        name: "Quality",
        logo: "images/Quality.webp"
    },
    {
        name: "Raids",
        logo: "images/Raids.webp"
    },
    {
        name: "Refine Accessory",
        logo: "images/Refine Accessory.webp"
    },
    {
        name: "Solars",
        logo: "images/Solars.webp"
    },
    {
        name: "Stronghold",
        logo: "images/Stronghold.webp"
    },
    {
        name: "T4 Oreha",
        logo: "images/T4 Oreha.webp"
    },
    {
        name: "Token Una",
        logo: "images/Token Una.webp"
    },
    {
        name: "Transcendence",
        logo: "images/Transcendence.webp"
    },
    {
        name: "Transcendence d'arme",
        logo: "images/Transcendence d'arme.webp"
    },
    {
        name: "Transfert",
        logo: "images/Transfert.webp"
    },
    {
        name: "Update",
        logo: "images/Update.webp"
    },
    {
        name: "Vente",
        logo: "images/Vente.webp"
    }
]

export const MAX_BLOODSTONES = 6000;

export const getLastWednesday = () => {
    const lastWednesday = new Date();

    // Ajuste la date jusqu'au dernier mercredi
    while (lastWednesday.getDay() !== 3) {
        lastWednesday.setDate(lastWednesday.getDate() - 1);
    }

    lastWednesday.setHours(11, 0, 0, 0);

    return lastWednesday;
};

export const getSecondLastWednesday = () => {
    const secondLastWednesday = new Date();
  
    // Ajuste la date jusqu'au mercredi précédent
    while (secondLastWednesday.getDay() !== 3) {
      secondLastWednesday.setDate(secondLastWednesday.getDate() - 1);
    }
    
    // Reculer de 7 jours supplémentaires pour obtenir le mercredi de la semaine précédente
    secondLastWednesday.setDate(secondLastWednesday.getDate() - 7);
  
    return secondLastWednesday;
  };

export const getNextWednesday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const nextWednesday = new Date(today);
    nextWednesday.setDate(today.getDate() + ((3 - dayOfWeek + 7) % 7));
    nextWednesday.setHours(0, 0, 0, 0);
    return nextWednesday;
}

export const getWeekNumber = (date) => {
    return getWeek(date, { weekStartsOn: 3 }); // La semaine commence le lundi
};

export const isThaemineWeek = (date) => {
    const weekNumber = getWeekNumber(date);
    return weekNumber % 2 === 0;
};

export const daysRestants = () => {
    const substract = format(new Date(), 'H') < 11 ? 1 : 0;
    let today = getDay(new Date()) - substract;
    today = today === 0 ? 7 : today;
    return today === 3 ? 6 : today === 4 ? 5 : today === 5 ? 4 : today === 6 ? 3 : today === 7 ? 2 : today === 1 ? 1 : 0;
};

export const getCategorieByName = (idcategorie) => {
    return categories.find(c => c.name === idcategorie)
}