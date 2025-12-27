import json

with open('world3_levels.json', 'r') as f:
    levels = json.load(f)

print("World 3 Predefined Kare Kontrolu:")
print("=" * 50)

for level in levels:
    moves = [m['moveNumber'] for m in level['requiredMoves']]
    blocked = len(level['blockedSquares'])
    path_len = len(level['fullPath'])
    
    # Validate rules
    all_valid = True
    issues = []
    
    if moves and moves[0] >= 10:
        all_valid = False
        issues.append(f"Ilk kare >= 10! ({moves[0]})")
    
    for i in range(1, len(moves)):
        gap = moves[i] - moves[i-1]
        if gap > 5:
            all_valid = False
            issues.append(f"Gap > 5! ({gap})")
    
    status = "OK" if all_valid else "FAIL"
    print(f"Level {level['id']:2d}: moves={moves}, blocked={blocked}, pathLen={path_len} [{status}] {' '.join(issues)}")

print("=" * 50)
print("Tum leveller kontrol edildi!")
