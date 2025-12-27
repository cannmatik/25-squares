// Game levels data - Generated via Backtracking
// Guaranteed Solvable Paths

export const WORLDS = [
    { id: 1, name: "World 1", requiredStars: 0, levels: 25 },
    { id: 2, name: "World 2", requiredStars: 30, levels: 25 },
    { id: 3, name: "World 3", requiredStars: 60, levels: 25 }
];

export const LEVELS = {
    1: [
    {
        "id": 1,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [
            {
                "x": 0,
                "y": 3
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 12,
                "x": 4,
                "y": 0
            }
        ],
        "stars": [
            10,
            15,
            24
        ],
        "ruleSet": 1,
        "timeLimit": 300,
        "fullPath": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            }
        ],
        "tutorial": [
            {
                "move": 0,
                "text": "WELCOME! CLICK THE FLASHING SQUARE TO START!",
                "highlight": {
                    "x": 0,
                    "y": 0
                }
            },
            {
                "move": 1,
                "text": "RULE 1: MOVE 3 SQUARES STRAIGHT (VERTICAL OR HORIZONTAL) →",
                "highlight": {
                    "x": 3,
                    "y": 0
                }
            },
            {
                "move": 2,
                "text": "RULE 2: OR MOVE 2 SQUARES DIAGONALLY ↙",
                "highlight": {
                    "x": 1,
                    "y": 2
                }
            },
            {
                "move": 3,
                "text": "EXCELLENT! NOW JUMP OVER SQUARES AGAIN →",
                "highlight": {
                    "x": 4,
                    "y": 2
                }
            },
            {
                "move": 4,
                "text": "KEEP GOING! DIAGONAL JUMP ↖",
                "highlight": {
                    "x": 2,
                    "y": 0
                }
            },
            {
                "move": 5,
                "text": "YOU ARE DOING GREAT!",
                "highlight": {
                    "x": 2,
                    "y": 3
                }
            },
            {
                "move": 6,
                "text": "FOLLOW THE PATH...",
                "highlight": {
                    "x": 0,
                    "y": 1
                }
            },
            {
                "move": 7,
                "text": "FOLLOW THE PATH...",
                "highlight": {
                    "x": 3,
                    "y": 1
                }
            },
            {
                "move": 8,
                "text": "FOLLOW THE PATH...",
                "highlight": {
                    "x": 3,
                    "y": 4
                }
            },
            {
                "move": 9,
                "text": "FOLLOW THE PATH...",
                "highlight": {
                    "x": 0,
                    "y": 4
                }
            },
            {
                "move": 10,
                "text": "FOLLOW THE PATH...",
                "highlight": {
                    "x": 2,
                    "y": 2
                }
            },
            {
                "move": 11,
                "text": "LOOK AHEAD! SQUARES WITH NUMBERS ARE CHECKPOINTS. YOU MUST LAND THERE!",
                "highlight": {
                    "x": 4,
                    "y": 0
                }
            },
            {
                "move": 12,
                "text": "CHECKPOINT REACHED! PERFECT.",
                "highlight": {
                    "x": 1,
                    "y": 0
                }
            },
            {
                "move": 13,
                "text": "NOTICE THE RED SQUARE? THAT IS BLOCKED. NEVER GO THERE.",
                "highlight": {
                    "x": 1,
                    "y": 3
                }
            },
            {
                "move": 14,
                "text": "ALMOST THERE! KEEP FOLLOWING...",
                "highlight": {
                    "x": 4,
                    "y": 3
                }
            },
            {
                "move": 15,
                "text": "ALMOST THERE! KEEP FOLLOWING...",
                "highlight": {
                    "x": 2,
                    "y": 1
                }
            },
            {
                "move": 16,
                "text": "ALMOST THERE! KEEP FOLLOWING...",
                "highlight": {
                    "x": 2,
                    "y": 4
                }
            },
            {
                "move": 17,
                "text": "ALMOST THERE! KEEP FOLLOWING...",
                "highlight": {
                    "x": 0,
                    "y": 2
                }
            },
            {
                "move": 18,
                "text": "ALMOST THERE! KEEP FOLLOWING...",
                "highlight": {
                    "x": 3,
                    "y": 2
                }
            },
            {
                "move": 19,
                "text": "ALMOST THERE! KEEP FOLLOWING...",
                "highlight": {
                    "x": 1,
                    "y": 4
                }
            },
            {
                "move": 20,
                "text": "ALMOST THERE! KEEP FOLLOWING...",
                "highlight": {
                    "x": 4,
                    "y": 4
                }
            },
            {
                "move": 21,
                "text": "ALMOST THERE! KEEP FOLLOWING...",
                "highlight": {
                    "x": 4,
                    "y": 1
                }
            },
            {
                "move": 22,
                "text": "ALMOST THERE! KEEP FOLLOWING...",
                "highlight": {
                    "x": 1,
                    "y": 1
                }
            },
            {
                "move": 23,
                "text": "FINAL MOVE! FINISH THE LEVEL!",
                "highlight": {
                    "x": 3,
                    "y": 3
                }
            }
        ]
    },
    {
        "id": 2,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [],
        "stars": [
            8,
            10,
            12
        ],
        "ruleSet": 1,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            }
        ],
        "tutorial": null
    },
    {
        "id": 3,
        "gridSize": 5,
        "fixedStart": {
            "x": 3,
            "y": 4
        },
        "blockedSquares": [],
        "requiredMoves": [],
        "stars": [
            10,
            12,
            15
        ],
        "ruleSet": 1,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            }
        ],
        "tutorial": null
    },
    {
        "id": 4,
        "gridSize": 5,
        "fixedStart": {
            "x": 4,
            "y": 4
        },
        "blockedSquares": [],
        "requiredMoves": [],
        "stars": [
            10,
            13,
            16
        ],
        "ruleSet": 1,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            }
        ],
        "tutorial": null
    },
    {
        "id": 5,
        "gridSize": 5,
        "fixedStart": {
            "x": 3,
            "y": 4
        },
        "blockedSquares": [],
        "requiredMoves": [],
        "stars": [
            12,
            15,
            18
        ],
        "ruleSet": 1,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            }
        ],
        "tutorial": null
    },
    {
        "id": 6,
        "gridSize": 5,
        "fixedStart": {
            "x": 4,
            "y": 1
        },
        "blockedSquares": [],
        "requiredMoves": [],
        "stars": [
            14,
            17,
            20
        ],
        "ruleSet": 1,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            }
        ],
        "tutorial": null
    },
    {
        "id": 7,
        "gridSize": 5,
        "fixedStart": {
            "x": 3,
            "y": 4
        },
        "blockedSquares": [],
        "requiredMoves": [],
        "stars": [
            15,
            18,
            22
        ],
        "ruleSet": 1,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            }
        ],
        "tutorial": null
    },
    {
        "id": 8,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [
            {
                "x": 2,
                "y": 4
            }
        ],
        "requiredMoves": [],
        "stars": [
            10,
            12,
            15
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            }
        ]
    },
    {
        "id": 9,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [
            {
                "x": 2,
                "y": 4
            }
        ],
        "requiredMoves": [],
        "stars": [
            10,
            12,
            15
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            }
        ]
    },
    {
        "id": 10,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [
            {
                "x": 3,
                "y": 1
            }
        ],
        "requiredMoves": [],
        "stars": [
            12,
            14,
            17
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            }
        ]
    },
    {
        "id": 11,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [
            {
                "x": 0,
                "y": 0
            }
        ],
        "requiredMoves": [],
        "stars": [
            12,
            14,
            17
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            }
        ]
    },
    {
        "id": 12,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [
            {
                "x": 2,
                "y": 3
            }
        ],
        "requiredMoves": [],
        "stars": [
            14,
            16,
            19
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            }
        ]
    },
    {
        "id": 13,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [
            {
                "x": 4,
                "y": 1
            }
        ],
        "requiredMoves": [],
        "stars": [
            14,
            16,
            19
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            }
        ]
    },
    {
        "id": 14,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            }
        ],
        "requiredMoves": [],
        "stars": [
            10,
            12,
            15
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            }
        ]
    },
    {
        "id": 15,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 0
            }
        ],
        "requiredMoves": [],
        "stars": [
            10,
            12,
            15
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            }
        ]
    },
    {
        "id": 16,
        "gridSize": 5,
        "fixedStart": {
            "x": 4,
            "y": 0
        },
        "blockedSquares": [
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 4
            }
        ],
        "requiredMoves": [],
        "stars": [
            12,
            14,
            17
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            }
        ]
    },
    {
        "id": 17,
        "gridSize": 5,
        "fixedStart": {
            "x": 4,
            "y": 4
        },
        "blockedSquares": [
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 3,
                "y": 3
            }
        ],
        "requiredMoves": [],
        "stars": [
            12,
            14,
            17
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            }
        ]
    },
    {
        "id": 18,
        "gridSize": 5,
        "fixedStart": {
            "x": 0,
            "y": 1
        },
        "blockedSquares": [
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            }
        ],
        "requiredMoves": [],
        "stars": [
            14,
            16,
            19
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            }
        ]
    },
    {
        "id": 19,
        "gridSize": 5,
        "fixedStart": {
            "x": 1,
            "y": 2
        },
        "blockedSquares": [
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            }
        ],
        "requiredMoves": [],
        "stars": [
            14,
            16,
            19
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            }
        ]
    },
    {
        "id": 20,
        "gridSize": 5,
        "fixedStart": {
            "x": 2,
            "y": 2
        },
        "blockedSquares": [
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            }
        ],
        "requiredMoves": [],
        "stars": [
            10,
            12,
            16
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            }
        ]
    },
    {
        "id": 21,
        "gridSize": 5,
        "fixedStart": {
            "x": 4,
            "y": 1
        },
        "blockedSquares": [
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 3,
                "y": 0
            }
        ],
        "requiredMoves": [],
        "stars": [
            12,
            14,
            17
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            }
        ]
    },
    {
        "id": 22,
        "gridSize": 5,
        "fixedStart": {
            "x": 1,
            "y": 4
        },
        "blockedSquares": [
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            }
        ],
        "requiredMoves": [],
        "stars": [
            14,
            16,
            18
        ],
        "ruleSet": 2,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            }
        ]
    },
    {
        "id": 23,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [],
        "stars": [
            10,
            15,
            24
        ],
        "ruleSet": 6,
        "timeLimit": 120,
        "starCriteria": "time",
        "starThresholds": [
            120,
            90,
            60
        ],
        "fullPath": [
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            }
        ]
    },
    {
        "id": 24,
        "gridSize": 5,
        "fixedStart": {
            "x": 4,
            "y": 2
        },
        "blockedSquares": [],
        "requiredMoves": [],
        "stars": [
            10,
            15,
            24
        ],
        "ruleSet": 6,
        "timeLimit": 120,
        "starCriteria": "time",
        "starThresholds": [
            120,
            90,
            60
        ],
        "fullPath": [
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            }
        ]
    },
    {
        "id": 25,
        "gridSize": 5,
        "fixedStart": {
            "x": 3,
            "y": 1
        },
        "blockedSquares": [],
        "requiredMoves": [],
        "stars": [
            10,
            15,
            24
        ],
        "ruleSet": 6,
        "timeLimit": 120,
        "starCriteria": "time",
        "starThresholds": [
            120,
            90,
            60
        ],
        "fullPath": [
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            }
        ]
    }
],
    2: [
    {
        "id": 1,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 2,
                "x": 0,
                "y": 0
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            }
        ]
    },
    {
        "id": 2,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 3,
                "x": 2,
                "y": 3
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            }
        ]
    },
    {
        "id": 3,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 4,
                "x": 1,
                "y": 4
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            }
        ]
    },
    {
        "id": 4,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 0,
                "y": 4
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            }
        ]
    },
    {
        "id": 5,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 6,
                "x": 0,
                "y": 1
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            }
        ]
    },
    {
        "id": 6,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 7,
                "x": 2,
                "y": 3
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            }
        ]
    },
    {
        "id": 7,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 8,
                "x": 4,
                "y": 2
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            }
        ]
    },
    {
        "id": 8,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 2,
                "x": 2,
                "y": 4
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            }
        ]
    },
    {
        "id": 9,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 3,
                "x": 0,
                "y": 1
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            }
        ]
    },
    {
        "id": 10,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 4,
                "x": 4,
                "y": 2
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            }
        ]
    },
    {
        "id": 11,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 3,
                "x": 1,
                "y": 4
            },
            {
                "moveNumber": 6,
                "x": 2,
                "y": 3
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            }
        ]
    },
    {
        "id": 12,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 4,
                "x": 0,
                "y": 4
            },
            {
                "moveNumber": 8,
                "x": 4,
                "y": 4
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            }
        ]
    },
    {
        "id": 13,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 1,
                "y": 0
            },
            {
                "moveNumber": 8,
                "x": 4,
                "y": 4
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            }
        ]
    },
    {
        "id": 14,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 3,
                "x": 1,
                "y": 3
            },
            {
                "moveNumber": 7,
                "x": 4,
                "y": 2
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            }
        ]
    },
    {
        "id": 15,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 4,
                "x": 1,
                "y": 3
            },
            {
                "moveNumber": 7,
                "x": 1,
                "y": 2
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            }
        ]
    },
    {
        "id": 16,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 0,
                "y": 4
            },
            {
                "moveNumber": 9,
                "x": 4,
                "y": 3
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            }
        ]
    },
    {
        "id": 17,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 3,
                "x": 3,
                "y": 0
            },
            {
                "moveNumber": 6,
                "x": 4,
                "y": 4
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            }
        ]
    },
    {
        "id": 18,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 4,
                "x": 0,
                "y": 4
            },
            {
                "moveNumber": 8,
                "x": 4,
                "y": 3
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            }
        ]
    },
    {
        "id": 19,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 3,
                "y": 4
            },
            {
                "moveNumber": 8,
                "x": 2,
                "y": 0
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            }
        ]
    },
    {
        "id": 20,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 3,
                "x": 4,
                "y": 1
            },
            {
                "moveNumber": 7,
                "x": 0,
                "y": 0
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            }
        ]
    },
    {
        "id": 21,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 3,
                "x": 0,
                "y": 2
            },
            {
                "moveNumber": 6,
                "x": 1,
                "y": 2
            },
            {
                "moveNumber": 9,
                "x": 0,
                "y": 1
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            }
        ]
    },
    {
        "id": 22,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 3,
                "x": 1,
                "y": 3
            },
            {
                "moveNumber": 6,
                "x": 1,
                "y": 2
            },
            {
                "moveNumber": 9,
                "x": 0,
                "y": 3
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            }
        ]
    },
    {
        "id": 23,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 3,
                "x": 1,
                "y": 2
            },
            {
                "moveNumber": 6,
                "x": 1,
                "y": 3
            },
            {
                "moveNumber": 9,
                "x": 4,
                "y": 3
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            }
        ]
    },
    {
        "id": 24,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 3,
                "x": 0,
                "y": 2
            },
            {
                "moveNumber": 6,
                "x": 4,
                "y": 0
            },
            {
                "moveNumber": 9,
                "x": 3,
                "y": 1
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            }
        ]
    },
    {
        "id": 25,
        "gridSize": 5,
        "fixedStart": null,
        "blockedSquares": [],
        "requiredMoves": [
            {
                "moveNumber": 3,
                "x": 1,
                "y": 1
            },
            {
                "moveNumber": 6,
                "x": 0,
                "y": 2
            },
            {
                "moveNumber": 9,
                "x": 0,
                "y": 1
            }
        ],
        "stars": [
            15,
            20,
            25
        ],
        "ruleSet": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            }
        ]
    }
],
    3: [
    {
        "id": 1,
        "gridSize": 5,
        "fixedStart": {
            "x": 0,
            "y": 0
        },
        "blockedSquares": [
            {
                "x": 0,
                "y": 3
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 1,
                "y": 4
            }
        ],
        "stars": [
            18,
            21,
            24
        ],
        "ruleSet": 5,
        "maxMistakes": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            }
        ]
    },
    {
        "id": 2,
        "gridSize": 5,
        "fixedStart": {
            "x": 3,
            "y": 2
        },
        "blockedSquares": [
            {
                "x": 2,
                "y": 3
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 4,
                "y": 4
            }
        ],
        "stars": [
            18,
            21,
            24
        ],
        "ruleSet": 5,
        "maxMistakes": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            }
        ]
    },
    {
        "id": 3,
        "gridSize": 5,
        "fixedStart": {
            "x": 3,
            "y": 3
        },
        "blockedSquares": [
            {
                "x": 3,
                "y": 2
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 0,
                "y": 2
            }
        ],
        "stars": [
            18,
            21,
            24
        ],
        "ruleSet": 5,
        "maxMistakes": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            }
        ]
    },
    {
        "id": 4,
        "gridSize": 5,
        "fixedStart": {
            "x": 0,
            "y": 0
        },
        "blockedSquares": [
            {
                "x": 1,
                "y": 3
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 4,
                "y": 0
            }
        ],
        "stars": [
            18,
            21,
            24
        ],
        "ruleSet": 5,
        "maxMistakes": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            }
        ]
    },
    {
        "id": 5,
        "gridSize": 5,
        "fixedStart": {
            "x": 4,
            "y": 4
        },
        "blockedSquares": [
            {
                "x": 1,
                "y": 0
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 2,
                "y": 0
            }
        ],
        "stars": [
            18,
            21,
            24
        ],
        "ruleSet": 5,
        "maxMistakes": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            }
        ]
    },
    {
        "id": 6,
        "gridSize": 5,
        "fixedStart": {
            "x": 2,
            "y": 4
        },
        "blockedSquares": [
            {
                "x": 1,
                "y": 4
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 4,
                "y": 0
            }
        ],
        "stars": [
            18,
            21,
            24
        ],
        "ruleSet": 5,
        "maxMistakes": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            }
        ]
    },
    {
        "id": 7,
        "gridSize": 5,
        "fixedStart": {
            "x": 4,
            "y": 0
        },
        "blockedSquares": [
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 4
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 0,
                "y": 2
            }
        ],
        "stars": [
            17,
            20,
            23
        ],
        "ruleSet": 5,
        "maxMistakes": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            }
        ]
    },
    {
        "id": 8,
        "gridSize": 5,
        "fixedStart": {
            "x": 3,
            "y": 0
        },
        "blockedSquares": [
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 0,
                "y": 1
            }
        ],
        "stars": [
            17,
            20,
            23
        ],
        "ruleSet": 5,
        "maxMistakes": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            }
        ]
    },
    {
        "id": 9,
        "gridSize": 5,
        "fixedStart": {
            "x": 4,
            "y": 2
        },
        "blockedSquares": [
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 4,
                "y": 4
            }
        ],
        "stars": [
            17,
            20,
            23
        ],
        "ruleSet": 5,
        "maxMistakes": 3,
        "timeLimit": 120,
        "fullPath": [
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            }
        ]
    },
    {
        "id": 10,
        "gridSize": 5,
        "fixedStart": {
            "x": 3,
            "y": 4
        },
        "blockedSquares": [
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 2,
                "y": 2
            },
            {
                "moveNumber": 10,
                "x": 4,
                "y": 3
            }
        ],
        "stars": [
            17,
            20,
            23
        ],
        "ruleSet": 5,
        "maxMistakes": 2,
        "timeLimit": 90,
        "fullPath": [
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            }
        ]
    },
    {
        "id": 11,
        "gridSize": 5,
        "fixedStart": {
            "x": 0,
            "y": 0
        },
        "blockedSquares": [
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 2,
                "y": 0
            },
            {
                "moveNumber": 10,
                "x": 3,
                "y": 3
            }
        ],
        "stars": [
            17,
            20,
            23
        ],
        "ruleSet": 5,
        "maxMistakes": 2,
        "timeLimit": 90,
        "fullPath": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            }
        ]
    },
    {
        "id": 12,
        "gridSize": 5,
        "fixedStart": {
            "x": 0,
            "y": 0
        },
        "blockedSquares": [
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 4,
                "y": 1
            },
            {
                "moveNumber": 10,
                "x": 4,
                "y": 2
            }
        ],
        "stars": [
            17,
            20,
            23
        ],
        "ruleSet": 5,
        "maxMistakes": 2,
        "timeLimit": 90,
        "fullPath": [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            }
        ]
    },
    {
        "id": 13,
        "gridSize": 5,
        "fixedStart": {
            "x": 4,
            "y": 4
        },
        "blockedSquares": [
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 0,
                "y": 3
            },
            {
                "moveNumber": 10,
                "x": 0,
                "y": 0
            }
        ],
        "stars": [
            17,
            20,
            23
        ],
        "ruleSet": 5,
        "maxMistakes": 2,
        "timeLimit": 90,
        "fullPath": [
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            }
        ]
    },
    {
        "id": 14,
        "gridSize": 5,
        "fixedStart": {
            "x": 3,
            "y": 0
        },
        "blockedSquares": [
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 2,
                "y": 3
            },
            {
                "moveNumber": 10,
                "x": 1,
                "y": 3
            }
        ],
        "stars": [
            16,
            19,
            22
        ],
        "ruleSet": 5,
        "maxMistakes": 2,
        "timeLimit": 90,
        "fullPath": [
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            }
        ]
    },
    {
        "id": 15,
        "gridSize": 5,
        "fixedStart": {
            "x": 0,
            "y": 1
        },
        "blockedSquares": [
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 4,
                "y": 3
            },
            {
                "moveNumber": 10,
                "x": 3,
                "y": 3
            }
        ],
        "stars": [
            16,
            19,
            22
        ],
        "ruleSet": 5,
        "maxMistakes": 2,
        "timeLimit": 90,
        "fullPath": [
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            }
        ]
    },
    {
        "id": 16,
        "gridSize": 5,
        "fixedStart": {
            "x": 4,
            "y": 3
        },
        "blockedSquares": [
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 3,
                "y": 1
            },
            {
                "moveNumber": 10,
                "x": 2,
                "y": 0
            }
        ],
        "stars": [
            16,
            19,
            22
        ],
        "ruleSet": 5,
        "maxMistakes": 2,
        "timeLimit": 90,
        "fullPath": [
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            }
        ]
    },
    {
        "id": 17,
        "gridSize": 5,
        "fixedStart": {
            "x": 2,
            "y": 0
        },
        "blockedSquares": [
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 4,
                "y": 0
            },
            {
                "moveNumber": 10,
                "x": 1,
                "y": 2
            }
        ],
        "stars": [
            16,
            19,
            22
        ],
        "ruleSet": 5,
        "maxMistakes": 2,
        "timeLimit": 90,
        "fullPath": [
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            }
        ]
    },
    {
        "id": 18,
        "gridSize": 5,
        "fixedStart": {
            "x": 2,
            "y": 4
        },
        "blockedSquares": [
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 1,
                "y": 2
            },
            {
                "moveNumber": 10,
                "x": 4,
                "y": 3
            }
        ],
        "stars": [
            16,
            19,
            22
        ],
        "ruleSet": 5,
        "maxMistakes": 1,
        "timeLimit": 60,
        "fullPath": [
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            }
        ]
    },
    {
        "id": 19,
        "gridSize": 5,
        "fixedStart": {
            "x": 2,
            "y": 0
        },
        "blockedSquares": [
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 1,
                "y": 3
            },
            {
                "moveNumber": 10,
                "x": 3,
                "y": 4
            }
        ],
        "stars": [
            16,
            19,
            22
        ],
        "ruleSet": 5,
        "maxMistakes": 1,
        "timeLimit": 60,
        "fullPath": [
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            }
        ]
    },
    {
        "id": 20,
        "gridSize": 5,
        "fixedStart": {
            "x": 2,
            "y": 0
        },
        "blockedSquares": [
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 3,
                "y": 1
            },
            {
                "moveNumber": 10,
                "x": 2,
                "y": 4
            },
            {
                "moveNumber": 15,
                "x": 0,
                "y": 4
            }
        ],
        "stars": [
            16,
            19,
            22
        ],
        "ruleSet": 5,
        "maxMistakes": 1,
        "timeLimit": 60,
        "fullPath": [
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            }
        ]
    },
    {
        "id": 21,
        "gridSize": 5,
        "fixedStart": {
            "x": 0,
            "y": 3
        },
        "blockedSquares": [
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 0,
                "y": 1
            },
            {
                "moveNumber": 10,
                "x": 1,
                "y": 4
            },
            {
                "moveNumber": 15,
                "x": 3,
                "y": 0
            }
        ],
        "stars": [
            16,
            19,
            22
        ],
        "ruleSet": 5,
        "maxMistakes": 1,
        "timeLimit": 60,
        "fullPath": [
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            }
        ]
    },
    {
        "id": 22,
        "gridSize": 5,
        "fixedStart": {
            "x": 3,
            "y": 4
        },
        "blockedSquares": [
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 3,
                "y": 2
            },
            {
                "moveNumber": 10,
                "x": 0,
                "y": 1
            },
            {
                "moveNumber": 15,
                "x": 0,
                "y": 3
            }
        ],
        "stars": [
            16,
            19,
            22
        ],
        "ruleSet": 5,
        "maxMistakes": 1,
        "timeLimit": 60,
        "fullPath": [
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            }
        ]
    },
    {
        "id": 23,
        "gridSize": 5,
        "fixedStart": {
            "x": 4,
            "y": 4
        },
        "blockedSquares": [
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 3,
                "y": 2
            },
            {
                "moveNumber": 10,
                "x": 3,
                "y": 4
            },
            {
                "moveNumber": 15,
                "x": 3,
                "y": 3
            }
        ],
        "stars": [
            16,
            19,
            22
        ],
        "ruleSet": 5,
        "maxMistakes": 1,
        "timeLimit": 60,
        "fullPath": [
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 3,
                "y": 1
            }
        ]
    },
    {
        "id": 24,
        "gridSize": 5,
        "fixedStart": {
            "x": 3,
            "y": 3
        },
        "blockedSquares": [
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 4,
                "y": 2
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 0,
                "y": 1
            },
            {
                "moveNumber": 10,
                "x": 4,
                "y": 3
            },
            {
                "moveNumber": 15,
                "x": 4,
                "y": 4
            }
        ],
        "stars": [
            16,
            19,
            22
        ],
        "ruleSet": 5,
        "maxMistakes": 1,
        "timeLimit": 60,
        "fullPath": [
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 3,
                "y": 2
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 2,
                "y": 0
            }
        ]
    },
    {
        "id": 25,
        "gridSize": 5,
        "fixedStart": {
            "x": 0,
            "y": 1
        },
        "blockedSquares": [
            {
                "x": 2,
                "y": 0
            },
            {
                "x": 0,
                "y": 2
            },
            {
                "x": 3,
                "y": 2
            }
        ],
        "requiredMoves": [
            {
                "moveNumber": 5,
                "x": 1,
                "y": 4
            },
            {
                "moveNumber": 10,
                "x": 2,
                "y": 4
            },
            {
                "moveNumber": 15,
                "x": 2,
                "y": 2
            }
        ],
        "stars": [
            16,
            19,
            22
        ],
        "ruleSet": 5,
        "maxMistakes": 1,
        "timeLimit": 60,
        "fullPath": [
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 2,
                "y": 3
            },
            {
                "x": 4,
                "y": 1
            },
            {
                "x": 4,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 4,
                "y": 2
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 3,
                "y": 0
            },
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 3,
                "y": 1
            },
            {
                "x": 1,
                "y": 3
            },
            {
                "x": 4,
                "y": 3
            },
            {
                "x": 4,
                "y": 0
            },
            {
                "x": 1,
                "y": 0
            }
        ]
    }
]
};

export const RULE_DESCRIPTIONS = {
    1: "Visit as many squares as possible!",
    2: "Avoid the blocked squares!",
    3: "Follow the pre-revealed path!",
    4: "Get a low number in the first row!",
    5: "Stop exactly at the target move!",
    6: "Race against time!",
    7: "Hit the required positions!"
};

export function getLevelConfig(worldId, levelId) {
    const worldLevels = LEVELS[worldId];
    if (!worldLevels) return null;
    return worldLevels.find(l => l.id === levelId) || null;
}

export function getWorldConfig(worldId) {
    return WORLDS.find(w => w.id === worldId) || null;
}
