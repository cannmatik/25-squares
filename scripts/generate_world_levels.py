
import json
import random
import time

# Constants
GRID_SIZE = 5
TOTAL_SQUARES = GRID_SIZE * GRID_SIZE
MOVES = [
    (3, 0), (-3, 0), (0, 3), (0, -3),
    (2, 2), (-2, -2), (2, -2), (-2, 2)
]

def load_valid_paths():
    try:
        with open('all_valid_paths.json', 'r') as f:
            data = json.load(f)
            return [p for p in data['paths']] # Simplify structure
    except FileNotFoundError:
        print("Error: all_valid_paths.json not found. Run find_all_paths.py first.")
        return []

def is_valid(x, y, visited, blocked):
    return 0 <= x < GRID_SIZE and 0 <= y < GRID_SIZE and \
           (x, y) not in visited and (x, y) not in blocked

def solve_blocked_path(start_x, start_y, blocked_set, path, target_length):
    """
    Backtracking to find a path of length `target_length` avoiding `blocked_set`.
    """
    current = path[-1]
    
    if len(path) == target_length:
        return path
    
    # Heuristic: Sort moves by distance to center or availability? 
    # Random shuffle is good enough for abundance of solutions.
    random_moves = list(MOVES)
    random.shuffle(random_moves)
    
    for dx, dy in random_moves:
        nx, ny = current['x'] + dx, current['y'] + dy
        if is_valid(nx, ny, set((p['x'], p['y']) for p in path), blocked_set):
            path.append({'x': nx, 'y': ny})
            result = solve_blocked_path(start_x, start_y, blocked_set, path, target_length)
            if result:
                return result
            path.pop()
    
    return None

def generate_blocked_level(level_id, blocked_count, base_rule_set=2):
    """Generates a level with specific number of blocked squares"""
    # 1. Randomly place blocked squares (avoid trapping start too easily)
    # Strategy: Pick a start, then random blocks. Try to solve. If fail, retry.
    
    max_attempts = 100
    for _ in range(max_attempts):
        blocked = set()
        while len(blocked) < blocked_count:
            bx, by = random.randint(0, 4), random.randint(0, 4)
            blocked.add((bx, by))
        
        # Pick start that is not blocked
        possible_starts = [(x,y) for x in range(5) for y in range(5) if (x,y) not in blocked]
        if not possible_starts: continue
        
        sx, sy = random.choice(possible_starts)
        
        start_node = {'x': sx, 'y': sy}
        path = [start_node]
        target_len = 25 - blocked_count # e.g. 24 if 1 blocked
        
        full_path = solve_blocked_path(sx, sy, blocked, path, target_len)
        
        if full_path:
            return {
                "id": level_id,
                "gridSize": 5,
                "fixedStart": None, # Starting from user click, but solvable
                "blockedSquares": [{'x': x, 'y': y} for x, y in blocked],
                "requiredMoves": [],
                "stars": [target_len - 5, target_len - 3, target_len - 1] if blocked_count > 0 else [10, 12, 15], # Adjust stars for blocked
                "ruleSet": base_rule_set,
                "timeLimit": 120,
                "fullPath": full_path
            }
            
    print(f"Warning: Could not generate blocked level {level_id} after {max_attempts} attempts.")
    return None

def generate_world1(all_paths):
    levels = []
    
    # Levels 1-7: Rule Set 1 (Basic)
    # Table: Stars 10/12/15 -> 22/23/24 for later levels.
    # Level 1-2: 10,12,15
    # Level 3-7: Fixed Start X (Need to pick paths with specific constraints?)
    # Table says "Fixed Start X" for Levels 3-7. 
    
    print("Generating World 1...")
    
    for i in range(1, 8):
        # Pick random path
        path = random.choice(all_paths)
        fixed_start = None
        stars = [10, 12, 15]
        
        if i >= 3:
            fixed_start = path[0] # The path defines the start
            stars = [14 + (i-3)*2, 18 + (i-3)*1, 22 + (i-3)*0] # Approximate progression
            # Let's stick to table:
            if i==3: stars = [14, 18, 22]
            if i==4: stars = [16, 20, 23]
            if i==5: stars = [18, 21, 23]
            if i==6: stars = [20, 22, 24]
            if i==7: stars = [22, 23, 24]
            
        levels.append({
            "id": i,
            "gridSize": 5,
            "fixedStart": fixed_start,
            "blockedSquares": [],
            "requiredMoves": [],
            "stars": stars,
            "ruleSet": 1,
            "timeLimit": 120,
            "fullPath": path,
            "tutorial": None
        })

    # Levels 8-13: 1 Blocked Square
    for i in range(8, 14):
        # Table: "1 Kare kapansın"
        lvl = generate_blocked_level(i, 1)
        # Table says Fixed Start is empty for 8-13
        lvl['stars'] = [14, 18, 22] if i <= 9 else ([16,20,23] if i <= 11 else [18,21,23])
        levels.append(lvl)

    # Levels 14-19: 2 Blocked Squares
    for i in range(14, 20):
        lvl = generate_blocked_level(i, 2)
        # Table: Fixed start X for 16-19
        if i >= 16:
            lvl['fixedStart'] = lvl['fullPath'][0]
        
        lvl['stars'] = [14,18,22] # Default from table
        if i >= 16: lvl['stars'] = [16,20,23]
        if i >= 18: lvl['stars'] = [18,21,23]
            
        levels.append(lvl)

    # Levels 20-22: 3 Blocked Squares
    for i in range(20, 23):
        lvl = generate_blocked_level(i, 3)
        lvl['fixedStart'] = lvl['fullPath'][0] # Table says X
        lvl['stars'] = [14+(i-20)*2, 16+(i-20)*1, 20+(i-20)*1] # Approx from table: 14,16,20 -> 16,17,20 -> 18,19,21
        if i==20: lvl['stars'] = [14,16,20]
        if i==21: lvl['stars'] = [16,17,20]
        if i==22: lvl['stars'] = [18,19,21]
        levels.append(lvl)

    # Levels 23-25: Rule Set 1+6 (Time)
    # Table: 24 & < 2 (stars <1.5, <1)
    # This implies "Reach 24 moves" (which is essentially full board) in tight time.
    for i in range(23, 26):
        path = random.choice(all_paths)
        fixed_start = path[0] if i >= 24 else None # Table says fixed start X for 24,25
        
        levels.append({
            "id": i,
            "gridSize": 5,
            "fixedStart": fixed_start,
            "blockedSquares": [],
            "requiredMoves": [],
            "stars": [10, 15, 24], # Placeholder, but real condition is time
            "ruleSet": 6,          # Time Condition
            "timeLimit": 120,      # Display limit
            "starCriteria": "time",
            "starThresholds": [120, 90, 60], # <2m, <1.5m, <1m
            "fullPath": path
        })
        
    return levels

def generate_world2(all_paths):
    # World 2 Idea: Focus on "Avoid Squares" (Rule 2) and "Predefined Moves" (Rule 3)
    # Mixed difficulty.
    print("Generating World 2...")
    levels = []
    for i in range(1, 26):
        # Mix of blocked squares: 1 to 4
        blocked_count = (i // 5) # 0, 0, 0, 0, 0, 1, 1...
        if blocked_count > 4: blocked_count = 4
        
        if blocked_count == 0:
            path = random.choice(all_paths)
            levels.append({
                "id": i,
                "gridSize": 5,
                "fixedStart": path[0],
                "blockedSquares": [],
                "stars": [15, 20, 25],
                "ruleSet": 3, # Pre-show path?
                "timeLimit": 100,
                "fullPath": path
            })
        else:
            lvl = generate_blocked_level(i, blocked_count, base_rule_set=2)
            lvl['fixedStart'] = lvl['fullPath'][0]
            lvl['timeLimit'] = 120 - (i*2) # decrease time
            if lvl['timeLimit'] < 45: lvl['timeLimit'] = 45
            levels.append(lvl)
            
    return levels

def generate_world3(all_paths):
    # World 3: Hardest. Max Mistakes (Rule 5) and Row Constraint (Rule 4)
    print("Generating World 3...")
    levels = []
    
    # Filter paths for Rule 4 (First row constraints - assume it means start at row > 0)
    row_constrained_paths = [p for p in all_paths if p[0]['y'] > 0 and p[1]['y'] > 0 and p[2]['y'] > 0]
    
    for i in range(1, 26):
        path = random.choice(row_constrained_paths if row_constrained_paths else all_paths)
        
        levels.append({
            "id": i,
            "gridSize": 5,
            "fixedStart": path[0],
            "blockedSquares": [],
            "requiredMoves": [], # Could add checkpoints
            "stars": [15, 20, 25],
            "ruleSet": 5, # Max Mistakes
            "maxMistakes": 3 if i < 10 else (2 if i < 20 else 1),
            "timeLimit": 90,
            "fullPath": path
        })
        
    return levels

def main():
    all_paths = load_valid_paths()
    if not all_paths: return

    w1 = generate_world1(all_paths)
    with open('world1_levels.json', 'w') as f:
        json.dump(w1, f, indent=2)
    print(f"Generated World 1: {len(w1)} levels")

    w2 = generate_world2(all_paths)
    with open('world2_levels.json', 'w') as f:
        json.dump(w2, f, indent=2)
    print(f"Generated World 2: {len(w2)} levels")

    w3 = generate_world3(all_paths)
    with open('world3_levels.json', 'w') as f:
        json.dump(w3, f, indent=2)
    print(f"Generated World 3: {len(w3)} levels")

if __name__ == "__main__":
    main()
