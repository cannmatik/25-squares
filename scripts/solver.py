
import json
import random

# Grid setup
GRID_SIZE = 5
TOTAL_SQUARES = GRID_SIZE * GRID_SIZE

# Move definitions (Knight-like moves from the game)
MOVES = [
    (3, 0), (-3, 0),
    (0, 3), (0, -3),
    (2, 2), (-2, -2),
    (2, -2), (-2, 2)
]

def is_valid(x, y, visited):
    return 0 <= x < GRID_SIZE and 0 <= y < GRID_SIZE and (x, y) not in visited

def solve_path(x, y, visited, path):
    visited.add((x, y))
    path.append({'x': x, 'y': y})

    if len(path) == TOTAL_SQUARES:
        return True

    # Try all possible moves in random order to get diverse paths
    random_moves = MOVES[:]
    random.shuffle(random_moves)

    for dx, dy in random_moves:
        nx, ny = x + dx, y + dy
        if is_valid(nx, ny, visited):
            if solve_path(nx, ny, visited, path):
                return True

    # Backtrack
    visited.remove((x, y))
    path.pop()
    return False


def generate_valid_levels(num_levels=50):
    levels = []
    
    print(f"Searching for up to {num_levels} valid full-path levels (Hamiltonian paths)...")
    
    # Exhaustive Backtracking with limit
    def find_all_paths(current_x, current_y, current_visited, current_path):
        if len(levels) >= num_levels:
            return

        if len(current_path) == TOTAL_SQUARES:
            # Found a path!
            path_copy = current_path[:]
            levels.append({
                "id": len(levels) + 1,
                "gridSize": GRID_SIZE,
                "fixedStart": path_copy[0],
                "blockedSquares": [],
                "requiredMoves": [], # Can populate later or on-the-fly to save space
                "stars": [15, 20, 25],
                "fullPath": path_copy
            })
            if len(levels) % 100 == 0:
                print(f"Found {len(levels)} paths...")
            return

        # Optimization: Warnsdorff's rule heuristic (visit neighbors with fewest onward moves)
        # This helps find paths faster, but for *all* paths, standard order is fine.
        # However, to get 12k distinct ones, standard backtracking is good.
        
        possible_moves = []
        for dx, dy in MOVES:
            nx, ny = current_x + dx, current_y + dy
            if is_valid(nx, ny, current_visited):
                # Count onward moves for heuristic sorting (optional, but good for finding one path fast)
                # For exhaustive, we just explore.
                possible_moves.append((nx, ny))
        
        # Sort by "degree" (Warnsdorff's) to find *a* path quickly? 
        # Actually random shuffle helps distribution if we cut off early.
        # But for "ALL", we want deterministic order or just let it run.
        # Let's shuffle to get a good mix if we don't find all.
        random.shuffle(possible_moves)

        for nx, ny in possible_moves:
             current_visited.add((nx, ny))
             current_path.append({'x': nx, 'y': ny})
             find_all_paths(nx, ny, current_visited, current_path)
             if len(levels) >= num_levels: return
             current_path.pop()
             current_visited.remove((nx, ny))

    # Try starting from each square to be thorough
    # Since the graph is symmetric, we could optimization, but brute force is fine for 12k.
    for x in range(GRID_SIZE):
        for y in range(GRID_SIZE):
            if len(levels) >= num_levels: break
            
            # Start fresh for each start pos
            visited = set()
            visited.add((x, y))
            path = [{'x': x, 'y': y}]
            find_all_paths(x, y, visited, path)
    
    return levels

if __name__ == "__main__":
    # User mentioned ~12500 total. Let's cap at 15000 to get them all.
    levels = generate_valid_levels(13000)
    
    print(f"Total levels generated: {len(levels)}")
    with open('generated_levels.json', 'w') as f:
        json.dump(levels, f, indent=0) # Compact JSON
    
    print("Successfully saved generated_levels.json")
