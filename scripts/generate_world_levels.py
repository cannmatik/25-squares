
import json
import random
import time
import os

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
        # Level 1: Tutorial
        if i == 1:
            # Full Tutorial: Straight, Diagonal, Blocked, Required Moves, Full Walkthrough (24 moves)
            
            # 1. Find a path that starts with (0,0) -> Straight -> Diagonal
            # And effectively use a 25-step path but block the LAST square to make it 24 moves.
            tutorial_candidates = [p for p in all_paths if 
                                   p[0]['x'] == 0 and p[0]['y'] == 0 and 
                                   p[1]['x'] == 3 and p[1]['y'] == 0 and # Right 3
                                   p[2]['x'] == 1 and p[2]['y'] == 2     # Back 2, Down 2
                                  ]
            
            path_full = tutorial_candidates[0] if tutorial_candidates else all_paths[0]
            
            # Block the LAST square of the path (so we only play 24 moves)
            blocked_sq = path_full[24] # The 25th step (index 24)
            playable_path = path_full[:24] # 0 to 23
            
            # Setup Tutorial Steps for ALL 24 moves
            tutorial_steps = []
            
            # Intro
            tutorial_steps.append({"move": 0, "text": "WELCOME! CLICK THE FLASHING SQUARE TO START!", "highlight": playable_path[0]})
            
            # Move 1: Straight
            tutorial_steps.append({"move": 1, "text": "RULE 1: MOVE 3 SQUARES STRAIGHT (VERTICAL OR HORIZONTAL) →", "highlight": playable_path[1]})
            
            # Move 2: Diagonal
            tutorial_steps.append({"move": 2, "text": "RULE 2: OR MOVE 2 SQUARES DIAGONALLY ↙", "highlight": playable_path[2]})
            
            # Move 3-5: Practice
            tutorial_steps.append({"move": 3, "text": "EXCELLENT! NOW JUMP OVER SQUARES AGAIN →", "highlight": playable_path[3]})
            tutorial_steps.append({"move": 4, "text": "KEEP GOING! DIAGONAL JUMP ↖", "highlight": playable_path[4]})
            tutorial_steps.append({"move": 5, "text": "YOU ARE DOING GREAT!", "highlight": playable_path[5]})
            
            # Move 10: Checkpoints (Required Moves) intro
            # Let's Mark move 12 as a required "Checkpoint"
            required_moves = [{"moveNumber": 12, "x": playable_path[11]['x'], "y": playable_path[11]['y']}]
            
            for m in range(6, 11):
                 tutorial_steps.append({"move": m, "text": "FOLLOW THE PATH...", "highlight": playable_path[m]})
                 
            tutorial_steps.append({"move": 11, "text": "LOOK AHEAD! SQUARES WITH NUMBERS ARE CHECKPOINTS. YOU MUST LAND THERE!", "highlight": playable_path[11]})
            
            # Move 12: Landed on checkpoint
            tutorial_steps.append({"move": 12, "text": "CHECKPOINT REACHED! PERFECT.", "highlight": playable_path[12]})
            
            # Pointer to blocked square
            # Identify when we are near the blocked square or just mention it.
            # It's hard to know geometric proximity without calculation, but we can just say it globally.
            tutorial_steps.append({"move": 13, "text": "NOTICE THE RED SQUARE? THAT IS BLOCKED. NEVER GO THERE.", "highlight": playable_path[13]})

            for m in range(14, 23):
                 tutorial_steps.append({"move": m, "text": "ALMOST THERE! KEEP FOLLOWING...", "highlight": playable_path[m]})
                 
            # Final Move (24)
            tutorial_steps.append({"move": 23, "text": "FINAL MOVE! FINISH THE LEVEL!", "highlight": playable_path[23]})
            
            levels.append({
                "id": i,
                "gridSize": 5,
                "fixedStart": None, # Tutorial highlights first move anyway
                "blockedSquares": [blocked_sq],
                "requiredMoves": required_moves,
                "stars": [10, 15, 24], # Max stars for 24 moves
                "ruleSet": 1, # Basic + Tutorial
                "timeLimit": 300, # Plenty of time
                "fullPath": playable_path,
                "tutorial": tutorial_steps
            })
            continue

        # Level 2-7 generic logic...
        path = random.choice(all_paths)
        fixed_start = None
        stars = [8, 10, 12]
        
        if i >= 3:
            fixed_start = path[0] # The path defines the start
            # Daha kolay star gereksinimleri
            if i==3: stars = [10, 12, 15]
            if i==4: stars = [10, 13, 16]
            if i==5: stars = [12, 15, 18]
            if i==6: stars = [14, 17, 20]
            if i==7: stars = [15, 18, 22]
            
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
        # Daha kolay star gereksinimleri
        lvl['stars'] = [10, 12, 15] if i <= 9 else ([12, 14, 17] if i <= 11 else [14, 16, 19])
        levels.append(lvl)

    # Levels 14-19: 2 Blocked Squares
    for i in range(14, 20):
        lvl = generate_blocked_level(i, 2)
        # Table: Fixed start X for 16-19
        if i >= 16:
            lvl['fixedStart'] = lvl['fullPath'][0]
        
        # Daha kolay star gereksinimleri
        lvl['stars'] = [10, 12, 15] # Default
        if i >= 16: lvl['stars'] = [12, 14, 17]
        if i >= 18: lvl['stars'] = [14, 16, 19]
            
        levels.append(lvl)

    # Levels 20-22: 3 Blocked Squares
    for i in range(20, 23):
        lvl = generate_blocked_level(i, 3)
        lvl['fixedStart'] = lvl['fullPath'][0] # Table says X
        # Daha kolay star gereksinimleri
        if i==20: lvl['stars'] = [10, 12, 16]
        if i==21: lvl['stars'] = [12, 14, 17]
        if i==22: lvl['stars'] = [14, 16, 18]
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
    # World 2: Focus on "Required Moves" (Rule 3 - Predefined Targets) and "Avoid Squares"
    print("Generating World 2...")
    levels = []
    
    # 25 Levels
    for i in range(1, 26):
        path = random.choice(all_paths)
        blocked_squares = []
        required_moves = []
        stars = [15, 20, 25]
        rule_set = 3 # Rule 3: Some moves revealed/required
        
        # Yeni Predefined Kare Kuralları:
        # - Tek kare: moveNumber <= 9
        # - Birden fazla kare: ilki <= 9, aralarındaki fark 3-4 hamle
        
        if i <= 10:
            # Tek predefined kare: Move 2-8 arası (kolay hesaplanabilir)
            target_move_idx = 1 + ((i - 1) % 7)  # Move 2-8 (0-indexed: 1-7)
            
            target = path[target_move_idx]
            required_moves.append({
                "moveNumber": target_move_idx + 1,  # 1-based for UI
                "x": target['x'],
                "y": target['y']
            })
            
        elif i <= 20:
            # İki predefined kare: İlki Move 3-5, ikincisi +3-4 hamle sonra
            m1 = 2 + ((i - 11) % 3)  # Move 3-5 (0-indexed: 2-4)
            gap = 3 + ((i - 11) % 2)  # 3 veya 4 hamle fark
            m2 = m1 + gap  # Move 6-9 arası
            
            required_moves.append({"moveNumber": m1 + 1, "x": path[m1]['x'], "y": path[m1]['y']})
            required_moves.append({"moveNumber": m2 + 1, "x": path[m2]['x'], "y": path[m2]['y']})
                
        else:
            # Üç predefined kare: Move 3, +3 hamle, +3 hamle (Move 3, 6, 9)
            m1 = 2  # Move 3
            m2 = 5  # Move 6
            m3 = 8  # Move 9
            
            required_moves.append({"moveNumber": m1 + 1, "x": path[m1]['x'], "y": path[m1]['y']})
            required_moves.append({"moveNumber": m2 + 1, "x": path[m2]['x'], "y": path[m2]['y']})
            required_moves.append({"moveNumber": m3 + 1, "x": path[m3]['x'], "y": path[m3]['y']})

        levels.append({
            "id": i,
            "gridSize": 5,
            "fixedStart": None, # Let them find the start that allows hitting the checkpoint? Or fix start?
                                # User said "ilk 3 ü kendi oynayacak", implying start is free or they choose path.
                                # But if start is free, can they reach coordinates? 
                                # 25-squares usually has variable start. 
                                # BUT if we require reaching (x,y) at step 4, the start MUST be compatible.
                                # To be safe/easy, let's fix the start OR just ensure the path exists.
                                # If we leave fixedStart: None, user clicks anywhere. 
                                # If they pick wrong start, they might not reach required square at move 4.
                                # "4. hamlenin yeri belli" -> This implies a constraint. 
                                # Use Fixed Start to guarantee solvability for now?
                                # User said "ilk 3 ü kendi oynayacak", so they make moves. 
                                # If we give Fixed Start, it's easier. If not, it's a puzzle.
                                # Let's set Fixed Start = None so they have to find the correct start.
            "fixedStart": None, 
            "blockedSquares": blocked_squares,
            "requiredMoves": required_moves,
            "stars": stars,
            "ruleSet": rule_set,
            "timeLimit": 120,
            "fullPath": path
        })
            
    return levels

def generate_world3(all_paths):
    """
    World 3: Introduction to combined mechanics
    
    NEW RULES:
    - İlk predefined kare >= Move 4
    - Predefined'lar arası gap >= 3
    - Blocked count: 0-2 (düşük tutulacak)
    - blocked + predefined <= path_length / 3
    """
    print("Generating World 3...")
    levels = []
    
    for i in range(1, 26):
        path = random.choice(all_paths)
        
        # Level'e göre artan zorluk
        # Blocked: 0-2 (düşük)
        if i <= 8:
            blocked_count = 0
        elif i <= 16:
            blocked_count = 1
        else:
            blocked_count = 2
            
        # Predefined count: 1-2
        if i <= 12:
            required_count = 1
        else:
            required_count = 2
        
        # Blocked squares from end of path
        blocked_squares = []
        current_path = list(path)
        if blocked_count > 0:
            for j in range(blocked_count):
                sq = current_path[-(j+1)]
                blocked_squares.append({'x': sq['x'], 'y': sq['y']})
            current_path = current_path[:25 - blocked_count]
        
        path_len = len(current_path)
        
        # === NEW PREDEFINED LOGIC ===
        # World 3: İlk predefined >= Move 4, gap >= 3
        required_moves = []
        
        MIN_FIRST_MOVE = 4  # Move 4+ (0-indexed: 3+)
        MIN_GAP = 3
        
        if required_count == 1 and path_len > MIN_FIRST_MOVE:
            # Tek predefined: Move 4-10 arası
            m1 = random.randint(MIN_FIRST_MOVE - 1, min(9, path_len - 2))
            required_moves.append({
                "moveNumber": m1 + 1,
                "x": current_path[m1]['x'],
                "y": current_path[m1]['y']
            })
            
        elif required_count >= 2 and path_len > MIN_FIRST_MOVE + MIN_GAP:
            # İki predefined: İlki Move 4-7, ikincisi +3-5 gap
            m1 = random.randint(MIN_FIRST_MOVE - 1, min(6, path_len - MIN_GAP - 2))
            gap = random.randint(MIN_GAP, MIN_GAP + 2)  # 3-5 gap
            m2 = m1 + gap
            
            if m2 < path_len - 1:
                required_moves.append({"moveNumber": m1 + 1, "x": current_path[m1]['x'], "y": current_path[m1]['y']})
                required_moves.append({"moveNumber": m2 + 1, "x": current_path[m2]['x'], "y": current_path[m2]['y']})
            else:
                # Fallback: sadece ilki
                required_moves.append({"moveNumber": m1 + 1, "x": current_path[m1]['x'], "y": current_path[m1]['y']})
        
        # Denge kontrolü: blocked + predefined <= path_len / 3
        total_constraints = len(blocked_squares) + len(required_moves)
        max_constraints = path_len // 3
        if total_constraints > max_constraints:
            # Reduce predefined if too many constraints
            required_moves = required_moves[:1] if required_moves else []
        
        # Star thresholds
        stars = [path_len - 6, path_len - 3, path_len]
        
        # Time and mistakes based on level
        max_mistakes = 3 if i < 10 else (2 if i < 18 else 1)
        time_limit = 120 if i < 10 else (90 if i < 18 else 60)
        
        # Generate detailed objective
        objective_parts = []
        objective_parts.append(f"Visit {path_len} squares")
        if blocked_count > 0:
            objective_parts.append(f"Avoid {blocked_count} blocked squares")
        if len(required_moves) > 0:
            move_nums = [str(rm['moveNumber']) for rm in required_moves]
            objective_parts.append(f"Hit checkpoints at moves: {', '.join(move_nums)}")
        if max_mistakes < 3:
            objective_parts.append(f"Max {max_mistakes} mistakes allowed")
        objective = ". ".join(objective_parts) + "."
        
        levels.append({
            "id": i,
            "gridSize": 5,
            "fixedStart": current_path[0],
            "blockedSquares": blocked_squares,
            "requiredMoves": required_moves,
            "objective": objective,
            "stars": stars,
            "ruleSet": 5,
            "maxMistakes": max_mistakes,
            "timeLimit": time_limit,
            "fullPath": current_path
        })
        
    return levels

def generate_procedural_world(world_id, all_paths):
    """
    World 4-25: Dynamically generated with increasing difficulty
    
    NEW RULES:
    - İlk predefined: World'e göre artan (Move 5 → Move 12)
    - Gap: World'e göre artan (3 → 10)
    - blocked + predefined <= path_length / 3 (denge kuralı)
    - Yüksek blocked = az predefined (veya tam tersi)
    """
    levels = []
    
    # === WORLD-BASED DIFFICULTY PARAMETERS ===
    
    # İlk predefined hangi move'da başlasın (World'e göre artan)
    if world_id <= 5:
        min_first_move = 5   # Move 5
    elif world_id <= 10:
        min_first_move = 6   # Move 6
    elif world_id <= 15:
        min_first_move = 7   # Move 7-8
    elif world_id <= 20:
        min_first_move = 9   # Move 9-10
    else:
        min_first_move = 11  # Move 11-12 (Extreme)
    
    # Predefined'lar arası minimum gap (World'e göre artan)
    if world_id <= 5:
        min_gap = 3
        max_gap = 4
    elif world_id <= 10:
        min_gap = 4
        max_gap = 5
    elif world_id <= 15:
        min_gap = 5
        max_gap = 7
    elif world_id <= 20:
        min_gap = 6
        max_gap = 8
    else:
        min_gap = 7
        max_gap = 10  # Extreme: gap 7-10
    
    for i in range(1, 26):
        path = random.choice(all_paths)
        current_path = list(path)
        
        # === 1. BLOCKED SQUARES (düşük tutulacak) ===
        # Denge için blocked sayısı azaltıldı
        if world_id <= 8:
            blocked_count = random.randint(0, 2)
        elif world_id <= 15:
            blocked_count = random.randint(1, 3)
        elif world_id <= 20:
            blocked_count = random.randint(2, 4)
        else:
            blocked_count = random.randint(2, 5)
            
        blocked_squares = []
        if blocked_count > 0:
            for j in range(blocked_count):
                sq = current_path[-(j+1)]
                blocked_squares.append({'x': sq['x'], 'y': sq['y']})
            current_path = current_path[:25 - blocked_count]
            
        path_len = len(current_path)
        
        # === 2. PREDEFINED MOVES (yeni dinamik logic) ===
        required_moves = []
        
        # Predefined sayısı (world'e göre)
        if world_id <= 8:
            req_count = random.randint(1, 2)
        elif world_id <= 15:
            req_count = random.randint(2, 3)
        elif world_id <= 20:
            req_count = random.randint(2, 4)
        else:
            req_count = random.randint(3, 5)
        
        # === DENGE KONTROLÜ ===
        # blocked + predefined <= path_len / 3
        max_constraints = path_len // 3
        available_for_predefined = max_constraints - len(blocked_squares)
        req_count = min(req_count, max(1, available_for_predefined))
        
        # Predefined pozisyonları hesapla
        # İlk predefined >= min_first_move, aralarındaki gap >= min_gap
        
        if req_count >= 1 and path_len > min_first_move:
            # İlk predefined pozisyonu
            first_idx = min_first_move - 1  # 0-indexed
            
            # Kaç predefined sığar?
            positions = [first_idx]
            current_pos = first_idx
            
            for _ in range(req_count - 1):
                gap = random.randint(min_gap, max_gap)
                next_pos = current_pos + gap
                if next_pos < path_len - 1:
                    positions.append(next_pos)
                    current_pos = next_pos
                else:
                    break
            
            # Required moves oluştur
            for idx in positions:
                if idx < path_len:
                    required_moves.append({
                        "moveNumber": idx + 1,
                        "x": current_path[idx]['x'],
                        "y": current_path[idx]['y']
                    })
        
        # === 3. GAME CONDITIONS ===
        # minMoves ve minCheckpoints: Son worldlerde çok strict
        if world_id >= 21:
            max_mistakes = 1
            time_limit = 60
            # Extreme: path_len - 1 (neredeyse tam)
            min_moves = path_len - 1
            min_checkpoints = len(required_moves)  # Hepsini hit etmeli
        elif world_id >= 16:
            max_mistakes = 2
            time_limit = 75
            # Very Hard: path_len - 2
            min_moves = path_len - 2
            min_checkpoints = max(1, len(required_moves) - 1)
        elif world_id >= 11:
            max_mistakes = 2
            time_limit = 90
            # Hard: path_len - 3
            min_moves = path_len - 3
            min_checkpoints = max(1, len(required_moves) - 1)
        else:
            max_mistakes = 3
            time_limit = 120
            # Medium: path_len - 5
            min_moves = max(10, path_len - 5)
            min_checkpoints = max(1, len(required_moves) - 2)
        
        # Star thresholds
        stars = [max(1, path_len - 5), max(1, path_len - 2), path_len]
        
        # Generate detailed objective
        objective_parts = []
        objective_parts.append(f"Visit at least {min_moves} of {path_len} squares")
        if blocked_count > 0:
            objective_parts.append(f"Avoid {blocked_count} blocked squares")
        if len(required_moves) > 0:
            move_nums = [str(rm['moveNumber']) for rm in required_moves]
            if min_checkpoints == len(required_moves):
                objective_parts.append(f"Hit ALL checkpoints at moves: {', '.join(move_nums)}")
            else:
                objective_parts.append(f"Hit at least {min_checkpoints} checkpoint(s) at moves: {', '.join(move_nums)}")
        if max_mistakes < 3:
            objective_parts.append(f"Max {max_mistakes} mistake(s)")
        if time_limit < 120:
            objective_parts.append(f"Complete in {time_limit}s")
        objective = ". ".join(objective_parts) + "."
        
        levels.append({
            "id": i,
            "gridSize": 5,
            "fixedStart": current_path[0],
            "blockedSquares": blocked_squares,
            "requiredMoves": required_moves,
            "objective": objective,
            "stars": stars,
            "ruleSet": 7,
            "maxMistakes": max_mistakes,
            "timeLimit": time_limit,
            "minMoves": min_moves,
            "minCheckpoints": min_checkpoints,
            "fullPath": current_path
        })
        
    return levels

def main():
    # Ensure correct paths relative to this script file
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Change CWD to script dir so load_valid_paths finds its file (if needed)
    # But load_valid_paths implementation might depend on CWD.
    # Let's just fix the OUTPUT paths.
    
    all_paths = load_valid_paths()
    if not all_paths: return

    # W1-3 Existing
    w1 = generate_world1(all_paths)
    with open(os.path.join(script_dir, 'world1_levels.json'), 'w') as f: json.dump(w1, f, indent=2)
    print(f"Generated World 1: {len(w1)} levels")
    
    w2 = generate_world2(all_paths)
    with open(os.path.join(script_dir, 'world2_levels.json'), 'w') as f: json.dump(w2, f, indent=2)
    print(f"Generated World 2: {len(w2)} levels")

    w3 = generate_world3(all_paths)
    with open(os.path.join(script_dir, 'world3_levels.json'), 'w') as f: json.dump(w3, f, indent=2)
    print(f"Generated World 3: {len(w3)} levels")
    
    # W4-25 Procedural
    for w in range(4, 26):
        levels = generate_procedural_world(w, all_paths)
        with open(os.path.join(script_dir, f'world{w}_levels.json'), 'w') as f:
            json.dump(levels, f, indent=2)
        print(f"Generated World {w}: {len(levels)} levels")


if __name__ == "__main__":
    main()
