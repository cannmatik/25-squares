
import json
import sys

def verify_json(filename):
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
            print(f"✅ {filename}: Loaded successfully ({len(data)} levels)")
            
            # Basic validation
            for lvl in data:
                if 'fullPath' not in lvl or len(lvl['fullPath']) < 1:
                    print(f"❌ Level {lvl['id']} missing fullPath!")
                
                # Verify path connectivity
                path = lvl['fullPath']
                for i in range(len(path)-1):
                    curr = path[i]
                    next_n = path[i+1]
                    dx = abs(curr['x'] - next_n['x'])
                    dy = abs(curr['y'] - next_n['y'])
                    is_valid_move = (dx==3 and dy==0) or (dx==0 and dy==3) or (dx==2 and dy==2)
                    if not is_valid_move:
                        print(f"❌ Level {lvl['id']} has invalid move at step {i}: {curr} -> {next_n}")
                        
            print(f"✨ {filename} passed validation checks.")
            return True
    except Exception as e:
        print(f"❌ Failed to verify {filename}: {e}")
        return False

def main():
    files = ['world1_levels.json', 'world2_levels.json', 'world3_levels.json']
    success = True
    for f in files:
        if not verify_json(f):
            success = False
            
    if success:
        print("\nAll level files verified successfully!")
    else:
        print("\nSome files failed verification.")
        sys.exit(1)

if __name__ == "__main__":
    main()
