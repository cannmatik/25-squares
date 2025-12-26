
import json
import random

# Common setup
GRID_SIZE = 5
TOTAL_SQUARES = 25
MOVES = [
    (0, 3), (0, -3), (3, 0), (-3, 0),
    (2, 2), (2, -2), (-2, 2), (-2, -2)
]

def is_valid(x, y, visited, blocked):
    return (0 <= x < GRID_SIZE) and (0 <= y < GRID_SIZE) and \
           ((x, y) not in visited) and ((x, y) not in blocked)

def solve(x, y, current_path, blocked, target_length, constraints=None):
    # constraints: { 'minRow0': 10 } -> Row 0 cells must have index >= 10
    
    # Check constraint: Rule 4
    if constraints and 'minRow0' in constraints:
        move_idx = len(current_path) # 0-based, so 0 is first number (1). 
        # Actually game displays move 1 as 1.
        # User: "10 dan küçük sayı getirme" -> Numbers 1..9 cannot be in Row 0.
        # So indices 0..8 cannot be at y=0 (assuming y=0 is first row).
        if y == 0 and (move_idx + 1) < constraints['minRow0']:
            return None

    if len(current_path) == target_length:
        return current_path

    # Optimization: If we have isolated components, fail early? 
    # For 5x5 simple backtracking is usually fast enough for finding *one* path.

    moves = MOVES[:]
    random.shuffle(moves)

    for dx, dy in moves:
        nx, ny = x + dx, y + dy
        if is_valid(nx, ny, current_path, blocked):
            res = solve(nx, ny, current_path + [(nx, ny)], blocked, target_length, constraints)
            if res:
                return res
    return None

def generate_level(cfg):
    # cfg: id, ruleSet, blockedCount, preFillCount, minRow0, maxMistakes
    
    # 1. Blocked
    blocked = []
    while len(blocked) < cfg.get('blockedCount', 0):
        bx, by = random.randint(0, 4), random.randint(0, 4)
        if (bx, by) not in blocked:
            blocked.append({'x': bx, 'y': by})
    blocked_coords = [(b['x'], b['y']) for b in blocked]
    
    # 2. Start
    target_len = TOTAL_SQUARES - len(blocked)
    
    attempts = 0
    while attempts < 2000:
        sx, sy = random.randint(0, 4), random.randint(0, 4)
        if (sx, sy) in blocked_coords:
            continue
            
        constraints = {}
        if cfg.get('minRow0'): constraints['minRow0'] = cfg['minRow0']
        
        path = solve(sx, sy, [(sx, sy)], blocked_coords, target_len, constraints)
        if path:
            full_path = [{'x': p[0], 'y': p[1]} for p in path]
            
            # Rule 3: Pre-fill
            fixed_start = None
            pre_fill_n = cfg.get('preFillCount', 0)
            if pre_fill_n > 0:
                # fixedStart can be array of first N moves
                fixed_start = full_path[:pre_fill_n]
            elif cfg.get('fixedStart'):
                fixed_start = full_path[0] # Just the start point
                
            return {
                "id": cfg['id'],
                "gridSize": GRID_SIZE,
                "fixedStart": fixed_start,
                "blockedSquares": blocked,
                "requiredMoves": [],
                "stars": cfg.get('stars', [15, 20, 24]),
                "ruleSet": cfg['ruleSet'],
                "timeLimit": cfg.get('timeLimit', 120),
                "fullPath": full_path,
                "maxMistakes": cfg.get('maxMistakes', 0) # Rule 5
            }
        attempts += 1
    
    print(f"Failed to gen level {cfg['id']}")
    return None

def main():
    # Extending World 1 with new rule examples or creating World 2 start
    # User said "create levels using all these rules".
    # I will generate a set of levels 26-30 demonstrating these.
    
    new_levels = []
    
    # Rule 3: Pre-show first 5 moves
    new_levels.append({
        "id": 26, "ruleSet": 3, "blockedCount": 0, "preFillCount": 5, "stars": [10, 15, 20]
    })
    
    # Rule 4: Row 0 must have numbers >= 10
    new_levels.append({
        "id": 27, "ruleSet": 4, "blockedCount": 0, "minRow0": 10, "stars": [15, 20, 24]
    })

    # Rule 5: Max Mistakes = 3
    new_levels.append({
        "id": 28, "ruleSet": 5, "blockedCount": 0, "maxMistakes": 3, "stars": [15, 20, 24]
    })
    
    # Rule 3+4 Mixed
    new_levels.append({
        "id": 29, "ruleSet": 3, "blockedCount": 1, "preFillCount": 3, "minRow0": 10, "stars": [15, 20, 24]
    })
    
    # Rule 6: Time Limit (Strict)
    new_levels.append({
        "id": 30, "ruleSet": 6, "blockedCount": 2, "timeLimit": 45, "stars": [45, 30, 15] # Seconds? Or moves...
    })

    generated = []
    for cfg in new_levels:
        lvl = generate_level(cfg)
        if lvl:
            generated.append(lvl)
            
    with open('extra_levels.json', 'w') as f:
        json.dump(generated, f, indent=2)

if __name__ == "__main__":
    main()
