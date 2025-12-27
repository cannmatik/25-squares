# 25 Squares - Level Generation & Rules System

## Overview
The game features 25 Worlds with increasing difficulty. Levels are generated using a combination of **Exhaustive Backtracking** for valid paths and **Procedural Rule Application** for obstacles and objectives.

## 1. Path Generation (`find_all_paths.py`)
Before any level is created, we pre-calculate valid 25-move knight's tour variants.
- **Algorithm**: Recursive Backtracking
- **Constraints**:
  - Grid: 5x5 (25 squares)
  - Moves: Horizontal/Vertical 3 squares OR Diagonal 2 squares (skip 1)
  - Must visit **every single square** exactly once (Hamiltonian Path)
- **Result**: ~12,400 unique valid valid paths stored in `all_valid_paths.json`.

## 2. World Logic & Difficulty

### World 1: The Basics (Tutorial)
- **Levels 1-7**: Introduction to moves.
- **Levels 8-13**: Introduce 1 Blocked Square.
- **Levels 14-19**: 2 Blocked Squares.
- **Levels 20-22**: 3 Blocked Squares.
- **Levels 23-25**: Time Attack (Complete in < 120s).

### World 2: Predefined Moves
- **Concept**: Specific moves must land on specific squares (Checkpoints).
- **Levels 1-10**: 1 Checkpoint (Move ≤ 9).
- **Levels 11-20**: 2 Checkpoints (Gap 3-4 moves).
- **Levels 21-25**: 3 Checkpoints (Move 3, 6, 9).

### World 3: Combined Mechanics (Redesigned)
Introduces the "Balance Rule": `blocked + predefined <= path_len / 3`
- **Levels 1-8**: 0 Blocked, 1 Checkpoint (Move 4+).
- **Levels 9-16**: 1 Blocked, 1 Checkpoint.
- **Levels 17-25**: 2 Blocked, 2 Checkpoints (Gap ≥ 3).

### World 4-25: Procedural Difficulty
Dynamically scales difficulty using a formula.

| World Range | First Checkpoint | Checkpoint Gap | Blocked Squares | Min Moves |
|-------------|------------------|----------------|-----------------|-----------|
| **4-5**     | Move 5+          | 3-4 moves      | 0-2             | Path - 5  |
| **6-10**    | Move 6+          | 4-5 moves      | 0-2             | Path - 5  |
| **11-15**   | Move 7+          | 5-7 moves      | 1-3             | Path - 3  |
| **16-20**   | Move 9+          | 6-8 moves      | 2-4             | Path - 2  |
| **21-25**   | Move 11+         | 7-10 moves     | 2-5             | Path - 1  |

## 3. Key Concepts

### Blocked Squares
Squares that cannot be visited. Since valid paths are 25 moves long, blocking squares **shortens the playable path**.
- *Example*: If 3 squares are blocked, the max possible score is 22 moves.

### Checkpoints (Required Moves)
Players MUST land on specific squares at specific move numbers.
- *Visual*: Dashed border with move number.
- *Logic*: `generate_world_levels.py` selects a valid path first, picks a move (e.g., Move 7), and sets its coordinate as required. This ensures the level is **always solvable**.

### Dynamic Objectives
In later worlds (World 21+), specific "Visit X Squares" objectives are added.
- *Extreme Mode*: Must visit `Path Length - 1` squares. Basically a perfect game required.

## 4. How to Generate
1. **Generate Paths**: `python scripts/find_all_paths.py` (One time only)
2. **Generate Levels**: `python scripts/generate_world_levels.py`
3. **Update Frontend**: `node scripts/update-levels.js`
4. **Seed Database**: `node scripts/seed-levels.mjs`
