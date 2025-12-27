#!/usr/bin/env python3
"""
Creates a compact valid paths file with sample paths per start position.
"""

import json

def main():
    with open('all_valid_paths.json', 'r') as f:
        data = json.load(f)
    
    paths = data['paths']
    
    # Group paths by start position
    paths_by_start = {}
    for path in paths:
        start = f"{path[0]['x']},{path[0]['y']}"
        if start not in paths_by_start:
            paths_by_start[start] = []
        paths_by_start[start].append(path)
    
    # Create compact output: 10 sample paths per start position
    compact_output = {
        "metadata": {
            "description": "Sample valid paths for 25-Squares game",
            "totalPathsAvailable": len(paths),
            "samplesPerStart": 10,
            "gridSize": 5,
            "moves": [
                {"type": "horizontal", "distance": 3},
                {"type": "vertical", "distance": 3},
                {"type": "diagonal", "distance": 2}
            ],
            "note": "Each path visits ALL 25 squares exactly once"
        },
        "pathsByStart": {}
    }
    
    for start, start_paths in paths_by_start.items():
        compact_output["pathsByStart"][start] = {
            "totalPaths": len(start_paths),
            "samples": start_paths[:10]  # First 10 paths
        }
    
    with open('valid_paths_compact.json', 'w') as f:
        json.dump(compact_output, f, indent=2)
    
    print(f"Created valid_paths_compact.json")
    print(f"- Total paths: {len(paths)}")
    print(f"- Start positions: {len(paths_by_start)}")
    print(f"- Samples per start: 10")

if __name__ == "__main__":
    main()
