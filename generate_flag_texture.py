import requests
from PIL import Image, ImageOps
from io import BytesIO
import math

# List of countries from game.js (Copied manually to ensure consistency)
# Priority Countries (User Request)
PRIORITY = [
    'jp', 'us', 'gb', 'fr', 'it', 'es', 'ca', 'ar', 'de', 'cn', 'ng', 'nl', 'ch', 'se', 'il'
]

# Other Countries (Filler/Balance)
OTHERS = [
    'br', 'au', 'ru', 'in', 'th', 'vn', 'sg', 'id', 'ph', 'my', 'be', 'pt',
    'mx', 'cl', 'co', 'pe', 'eg', 'za', 'ke', 'gh', 'ma', 'et', 'cm', 'ci', 'sn',
    'sa', 'tr', 'ae', 'ir', 'qa', 'nz', 'gr', 'no', 'dk', 'fi', 'ua', 'pl',
    'kz', 'uz', 'pk', 'np', 'bt', 'mn', 'lk', 'bd', 'kh', 'la', 'mm', 'cz', 'hu', 'at', 'ro', 'bg', 'kr'
]

# Construct list: Fill Poles with OTHERS, Place PRIORITY on Equator
# Total ~68. Rows=8, Cols=9.
# Row 0-2 (Indices 0-26): North Hemisphere -> Use first 27 of OTHERS
# Row 3-4 (Indices 27-44): Equator -> Use PRIORITY (15) + some OTHERS
# Row 5-7 (Indices 45+): South Hemisphere -> Remaining OTHERS

# Slice OTHERS
others_north = OTHERS[:27]
others_equator_fill = OTHERS[27:29] # Fill remaining equator spots
others_south = OTHERS[29:]

# Final List Order
COUNTRIES = others_north + PRIORITY + others_equator_fill + others_south

# Settings
ROWS = 8  # Increased from 4 to 8 to make flags smaller
SLOT_WIDTH = 120
SLOT_HEIGHT = 80
OUTPUT_PATH = "assets/flag_texture_final.png"

def download_flag(code):
    # Download h80 image
    url = f"https://flagcdn.com/h80/{code}.png"
    print(f"Downloading {code}...")
    try:
        response = requests.get(url)
        response.raise_for_status()
        return Image.open(BytesIO(response.content)).convert("RGBA")
    except Exception as e:
        print(f"Failed to download {code}: {e}")
        return None

def create_texture():
    images = []
    print(f"Found {len(COUNTRIES)} countries.")
    
    # Pre-download all images
    valid_images = []
    for code in COUNTRIES:
        img = download_flag(code)
        if img:
            # FORCE FIT to slot size (Crop to fill) to ensure no gaps
            # ImageOps.fit crops center
            img = ImageOps.fit(img, (SLOT_WIDTH, SLOT_HEIGHT), method=Image.LANCZOS)
            valid_images.append(img)
            
    if not valid_images:
        print("No images downloaded.")
        return

    count = len(valid_images)
    cols = math.ceil(count / ROWS)
    
    total_width = cols * SLOT_WIDTH
    total_height = ROWS * SLOT_HEIGHT
    
    print(f"Grid Layout: {ROWS} rows x {cols} cols")
    print(f"Texture Size: {total_width}x{total_height}")
    
    # Create transparent canvas
    texture = Image.new("RGBA", (total_width, total_height), (0, 0, 0, 0))
    
    for i, img in enumerate(valid_images):
        col = i % cols
        row = i // cols
        
        x = col * SLOT_WIDTH
        y = row * SLOT_HEIGHT
        
        # No offsets needed, exact fit
        texture.paste(img, (x, y))
        
    # Save
    texture.save(OUTPUT_PATH)
    print(f"Texture saved to {OUTPUT_PATH}")

if __name__ == "__main__":
    create_texture()
