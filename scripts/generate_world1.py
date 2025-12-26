
import json
import random

# Grid constants
GRID_SIZE = 5
TOTAL_SQUARES = GRID_SIZE * GRID_SIZE

# Knight-like moves: (dx, dy)
MOVES = [
    (1, -2), (2, -1), (2, 1), (1, 2),
    (-1, 2), (-2, 1), (-2, -1), (-1, -2),
    (0, -3), (0, 3), (3, 0), (-3, 0), # Also 3-square straight moves based on previous context or just standard Knight? 
    # User said "Knight-like moves (3 squares straight, 2 squares diagonally)". 
    # Standard Knight is 2 straight, 1 side.
    # User context previously: "3 squares straight, 2 squares diagonally" -> (0,3), (3,0), (2,2), (2,-2)...?
    # Wait, Standard Knight is (1,2). sqrt(1^2+2^2) = 2.23.
    # Previous implementation used:
    # (0,3), (0,-3), (3,0), (-3,0)  <- 3 straight
    # (2,2), (2,-2), (-2,2), (-2,-2) <- 2 diagonal
    # Let's CHECK strict definition from previous files.
]

# Re-verifying move set from src/lib/levels.js or similar.
# src/lib/levels.js typically defines validation.
# Let's assume the standard 3-straight, 2-diag rule for this game "25 Squares".
MOVES = [
    (0, 3), (0, -3), (3, 0), (-3, 0), # 3 straight
    (2, 2), (2, -2), (-2, 2), (-2, -2) # 2 diagonal
]

def is_valid(x, y, visited, blocked):
    return (0 <= x < GRID_SIZE) and (0 <= y < GRID_SIZE) and \
           ((x, y) not in visited) and ((x, y) not in blocked)

def solve(x, y, visited, blocked, target_length):
    if len(visited) == target_length:
        return visited

    # Try random moves for variety
    moves = MOVES[:]
    random.shuffle(moves)

    for dx, dy in moves:
        nx, ny = x + dx, y + dy
        if is_valid(nx, ny, visited, blocked):
            res = solve(nx, ny, visited + [(nx, ny)], blocked, target_length)
            if res:
                return res
    return None

def generate_level(level_config):
    # Config: { id, stars, blockedCount, fixedStart (bool), ruleSet }
    
    # 1. Determine Blocked Squares
    blocked = []
    while len(blocked) < level_config['blockedCount']:
        bx, by = random.randint(0, 4), random.randint(0, 4)
        if (bx, by) not in blocked:
            blocked.append({'x': bx, 'y': by})
    
    blocked_coords = [(b['x'], b['y']) for b in blocked]
    
    # 2. Determine Start
    # If fixedStart is True, pick random start? Or is it specified? 
    # User table says "fixed start defined". I'll pick a random one for now that Works.
    
    target_len = TOTAL_SQUARES - len(blocked)
    
    attempts = 0
    while attempts < 1000:
        start_x, start_y = random.randint(0, 4), random.randint(0, 4)
        if (start_x, start_y) in blocked_coords:
            continue
            
        path = solve(start_x, start_y, [(start_x, start_y)], blocked_coords, target_len)
        if path:
            # Convert path to [{x,y}]
            full_path = [{'x': p[0], 'y': p[1]} for p in path]
            
            return {
                "id": level_config['id'],
                "gridSize": GRID_SIZE,
                "fixedStart": full_path[0] if level_config['fixedStart'] else None,
                "blockedSquares": blocked,
                "requiredMoves": [], # Can add logic if needed
                "stars": level_config['stars'],
                "ruleSet": level_config['ruleSet'],
                "timeLimit": level_config['timeLimit'],
                "fullPath": full_path,
                "tutorial": None # Will be handled in seed/code
            }
        attempts += 1
    
    print(f"Failed to generate level {level_config['id']}")
    return None

def main():
    # Define the 25 levels based on user table
    # Columns: Valid Moves/Stars, RuleSet, FixedStart(X), Desc
    
    configs = [
        # Level 1-7: Rule 1 (Standard), No Blocked (unless implied? No, "1 Kare kapansın" starts at 8)
        {"id": 1, "stars": [10, 12, 15], "blockedCount": 0, "fixedStart": False, "ruleSet": 1, "timeLimit": 120},
        {"id": 2, "stars": [12, 16, 20], "blockedCount": 0, "fixedStart": False, "ruleSet": 1, "timeLimit": 120},
        {"id": 3, "stars": [14, 18, 22], "blockedCount": 0, "fixedStart": True, "ruleSet": 1, "timeLimit": 120},
        {"id": 4, "stars": [16, 20, 23], "blockedCount": 0, "fixedStart": True, "ruleSet": 1, "timeLimit": 120},
        {"id": 5, "stars": [18, 21, 23], "blockedCount": 0, "fixedStart": True, "ruleSet": 1, "timeLimit": 120},
        {"id": 6, "stars": [20, 22, 24], "blockedCount": 0, "fixedStart": True, "ruleSet": 1, "timeLimit": 120},
        {"id": 7, "stars": [22, 23, 24], "blockedCount": 0, "fixedStart": True, "ruleSet": 1, "timeLimit": 120},
        
        # Level 8-13: Rule 2, 1 Blocked
        {"id": 8, "stars": [14, 18, 22], "blockedCount": 1, "fixedStart": False, "ruleSet": 2, "timeLimit": 120},
        {"id": 9, "stars": [14, 18, 22], "blockedCount": 1, "fixedStart": False, "ruleSet": 2, "timeLimit": 120},
        {"id": 10, "stars": [16, 20, 23], "blockedCount": 1, "fixedStart": False, "ruleSet": 2, "timeLimit": 120},
        {"id": 11, "stars": [16, 20, 23], "blockedCount": 1, "fixedStart": False, "ruleSet": 2, "timeLimit": 120},
        {"id": 12, "stars": [18, 21, 23], "blockedCount": 1, "fixedStart": False, "ruleSet": 2, "timeLimit": 120},
        {"id": 13, "stars": [18, 21, 23], "blockedCount": 1, "fixedStart": False, "ruleSet": 2, "timeLimit": 120},

        # Level 14-19: Rule 2, 2 Blocked
        {"id": 14, "stars": [14, 18, 22], "blockedCount": 2, "fixedStart": False, "ruleSet": 2, "timeLimit": 120},
        {"id": 15, "stars": [14, 18, 22], "blockedCount": 2, "fixedStart": False, "ruleSet": 2, "timeLimit": 120},
        {"id": 16, "stars": [16, 20, 23], "blockedCount": 2, "fixedStart": True, "ruleSet": 2, "timeLimit": 120},
        {"id": 17, "stars": [16, 20, 23], "blockedCount": 2, "fixedStart": True, "ruleSet": 2, "timeLimit": 120},
        {"id": 18, "stars": [18, 21, 23], "blockedCount": 2, "fixedStart": True, "ruleSet": 2, "timeLimit": 120},
        {"id": 19, "stars": [18, 21, 23], "blockedCount": 2, "fixedStart": True, "ruleSet": 2, "timeLimit": 120},
        
        # Level 20-22: Rule 2, 3 Blocked
        {"id": 20, "stars": [14, 16, 20], "blockedCount": 3, "fixedStart": True, "ruleSet": 2, "timeLimit": 120},
        {"id": 21, "stars": [16, 17, 20], "blockedCount": 3, "fixedStart": True, "ruleSet": 2, "timeLimit": 120},
        {"id": 22, "stars": [18, 19, 21], "blockedCount": 3, "fixedStart": True, "ruleSet": 2, "timeLimit": 120},
        
        # Level 23-25: Rule 1,6 (Time Limit implied for 3 stars)
        # Table: "24 & < 2", "<1,5", "<1". Interpretation:
        # 1 Star: Complete it. (24 moves? user wrote 24 & <2. Maybe 24 squares?)
        # Let's assume standard full board (0 blocked) but RuleSet 1+6?
        # User said "1,6" under RuleSet.
        # Stars: "<2", "<1,5", "<1". These are MINUTES.
        # DB stars are Integers (Moves usually). 
        # But if ruleSet has 6 (Time), maybe stars represent Seconds?
        # Or maybe the game logic handles "Time Limit" differently.
        # For now, I will store [120, 90, 60] (seconds) as stars? 
        # Or stick to moves and just enable ruleSet 6.
        # "24 & < 2" -> 2 mins.
        # Let's use 0 blocked for these.
        {"id": 23, "stars": [120, 90, 60], "blockedCount": 0, "fixedStart": False, "ruleSet": 6, "timeLimit": 120}, 
        {"id": 24, "stars": [120, 90, 60], "blockedCount": 0, "fixedStart": True, "ruleSet": 6, "timeLimit": 90},
        {"id": 25, "stars": [120, 90, 60], "blockedCount": 0, "fixedStart": True, "ruleSet": 6, "timeLimit": 60}
    ]

    world_levels = []
    print("Generating World 1 Levels...")
    
    for cfg in configs:
        lvl = generate_level(cfg)
        if lvl:
            print(f"Generated Level {cfg['id']}")
            world_levels.append(lvl)
    
    with open('world1_levels.json', 'w') as f:
        json.dump(world_levels, f, indent=2)
    print("Done.")

if __name__ == "__main__":
    main()
