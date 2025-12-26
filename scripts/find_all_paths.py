#!/usr/bin/env python3
"""
Exhaustive Backtracking Algorithm for 25-Squares Game
Finds ALL possible complete paths that visit all 25 squares exactly once.
"""

import json
import time
from datetime import datetime

# Game constants
GRID_SIZE = 5
TOTAL_SQUARES = GRID_SIZE * GRID_SIZE

# Legal moves (same as in the game)
MOVES = [
    (3, 0), (-3, 0),   # Horizontal 3
    (0, 3), (0, -3),   # Vertical 3
    (2, 2), (-2, -2),  # Diagonal
    (2, -2), (-2, 2)   # Anti-diagonal
]

def is_valid(x, y, visited):
    """Check if position is valid and not visited"""
    return 0 <= x < GRID_SIZE and 0 <= y < GRID_SIZE and (x, y) not in visited

def find_all_paths_from(start_x, start_y, visited, path, all_paths, max_paths=None):
    """
    Recursively find all complete paths starting from a position.
    
    Args:
        start_x, start_y: Current position
        visited: Set of visited positions
        path: Current path as list of (x, y) tuples
        all_paths: List to collect all complete paths
        max_paths: Optional limit on number of paths to find
    """
    if max_paths and len(all_paths) >= max_paths:
        return
    
    visited.add((start_x, start_y))
    path.append((start_x, start_y))
    
    if len(path) == TOTAL_SQUARES:
        # Found a complete path!
        all_paths.append(list(path))
        visited.remove((start_x, start_y))
        path.pop()
        return
    
    # Try all possible moves
    for dx, dy in MOVES:
        nx, ny = start_x + dx, start_y + dy
        if is_valid(nx, ny, visited):
            find_all_paths_from(nx, ny, visited, path, all_paths, max_paths)
            if max_paths and len(all_paths) >= max_paths:
                break
    
    # Backtrack
    visited.remove((start_x, start_y))
    path.pop()

def find_all_paths(max_paths_per_start=None, max_total_paths=None):
    """
    Find all complete paths starting from every possible position.
    
    Args:
        max_paths_per_start: Limit paths per starting position
        max_total_paths: Limit total paths found
    
    Returns:
        Dictionary with paths grouped by starting position
    """
    all_paths = []
    paths_by_start = {}
    
    print(f"Finding all valid paths for {GRID_SIZE}x{GRID_SIZE} grid...")
    print(f"Moves available: {MOVES}")
    print("-" * 60)
    
    start_time = time.time()
    
    for start_x in range(GRID_SIZE):
        for start_y in range(GRID_SIZE):
            if max_total_paths and len(all_paths) >= max_total_paths:
                break
                
            start_key = f"{start_x},{start_y}"
            paths_for_this_start = []
            
            remaining = max_total_paths - len(all_paths) if max_total_paths else None
            limit = min(remaining, max_paths_per_start) if remaining and max_paths_per_start else (max_paths_per_start or remaining)
            
            find_all_paths_from(
                start_x, start_y,
                set(), [],
                paths_for_this_start,
                max_paths=limit
            )
            
            if paths_for_this_start:
                paths_by_start[start_key] = len(paths_for_this_start)
                all_paths.extend(paths_for_this_start)
                print(f"Start ({start_x},{start_y}): Found {len(paths_for_this_start)} paths")
            else:
                print(f"Start ({start_x},{start_y}): No valid paths")
    
    elapsed = time.time() - start_time
    print("-" * 60)
    print(f"Total paths found: {len(all_paths)}")
    print(f"Time elapsed: {elapsed:.2f} seconds")
    
    return all_paths, paths_by_start

def path_to_json_format(path):
    """Convert path to JSON-friendly format"""
    return [{"x": x, "y": y} for x, y in path]

def save_paths_to_file(all_paths, filename="all_valid_paths.json"):
    """Save all paths to a JSON file"""
    output = {
        "metadata": {
            "gridSize": GRID_SIZE,
            "totalSquares": TOTAL_SQUARES,
            "moves": [{"dx": dx, "dy": dy} for dx, dy in MOVES],
            "totalPaths": len(all_paths),
            "generatedAt": datetime.now().isoformat()
        },
        "paths": [path_to_json_format(p) for p in all_paths]
    }
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2)
    
    print(f"Saved {len(all_paths)} paths to {filename}")

def main():
    print("=" * 60)
    print("25-Squares Path Finder - Exhaustive Backtracking")
    print("=" * 60)
    
    # Find ALL paths exhaustively - no limits
    all_paths, paths_by_start = find_all_paths(
        max_paths_per_start=None,  # No limit per start
        max_total_paths=None       # No total limit
    )
    
    if all_paths:
        save_paths_to_file(all_paths, "all_valid_paths.json")
        
        # Also save a summary
        summary = {
            "totalPaths": len(all_paths),
            "pathsByStartPosition": paths_by_start,
            "samplePath": path_to_json_format(all_paths[0]) if all_paths else None
        }
        
        with open("paths_summary.json", 'w', encoding='utf-8') as f:
            json.dump(summary, f, indent=2)
        print("Saved summary to paths_summary.json")
    else:
        print("No valid paths found!")

if __name__ == "__main__":
    main()
