import math
import os
import shutil
import subprocess
from PIL import Image, ImageDraw

os.makedirs('public/gifs', exist_ok=True)

BG_COLOR = (255, 253, 250, 255) # Exact #FFFDFA
DARK = (25, 11, 0, 255)         # #190b00 (portfolio charcoal)
ORANGE = (234, 88, 12, 255)     # #ea580c (portfolio signature orange)
MUTED = (119, 105, 93, 255)     # #77695d (muted brown/grey)
WHITE = (255, 255, 255, 255)
LIGHT_TINT = (244, 239, 232, 255)

SCALE = 4
# Target size: 48x48 (at 4x = 192x192)
CANVAS_SIZE = 48 * SCALE
TOTAL_FRAMES = 48 # 48 frames @ 24fps = 2.0s loop

def ease_in_out_cubic(t):
    return 4 * t * t * t if t < 0.5 else 1 - math.pow(-2 * t + 2, 3) / 2

def ease_out_back(t):
    c1 = 1.70158
    c3 = c1 + 1
    return 1 + c3 * math.pow(t - 1, 3) + c1 * math.pow(t - 1, 2)

def compile_gif(frame_dir, output_path):
    subprocess.run([
        "/opt/homebrew/bin/ffmpeg", "-y", "-framerate", "24",
        "-i", f"{frame_dir}/f_%03d.png",
        "-filter_complex", "[0:v] split [a][b];[a] palettegen=stats_mode=full [p];[b][p] paletteuse=dither=bayer:bayer_scale=5",
        output_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    shutil.rmtree(frame_dir, ignore_errors=True)
    print(f"Compiled {output_path}")

# =====================================================================
# 1. PRODUCT DESIGN: Brutalist Wireframe Box with Responsive Split Pane
# Reference: Square box with top header bar [ ⯐ ]
# =====================================================================
def generate_product_design():
    tmp_dir = "/tmp/brutal_product_design"
    os.makedirs(tmp_dir, exist_ok=True)
    
    # Outer box dimensions: 34x34 centered in 48x48
    box_w = 34 * SCALE
    box_h = 34 * SCALE
    bx0 = (CANVAS_SIZE - box_w) / 2
    by0 = (CANVAS_SIZE - box_h) / 2
    bx1 = bx0 + box_w
    by1 = by0 + box_h
    stroke_w = int(2.2 * SCALE)
    header_y = by0 + 10 * SCALE # Top header line
    
    for i in range(TOTAL_FRAMES):
        t = i / TOTAL_FRAMES
        img = Image.new('RGBA', (CANVAS_SIZE, CANVAS_SIZE), BG_COLOR)
        d = ImageDraw.Draw(img)
        
        # 1. Outer brutalist square
        d.rectangle([bx0, by0, bx1, by1], outline=DARK, width=stroke_w)
        # 2. Horizontal header line
        d.line([(bx0, header_y), (bx1, header_y)], fill=DARK, width=stroke_w)
        
        # Top header indicator: tiny orange square dot that pulses/slides
        # Indicator position moves subtly or blinks
        ind_x = bx0 + 4 * SCALE
        ind_y = by0 + 4 * SCALE
        ind_size = 3 * SCALE
        d.rectangle([ind_x, ind_y, ind_x + ind_size, ind_y + ind_size], fill=ORANGE)
        
        # Bottom body viewport: by0 + 10 to by1
        # Inside layout animation: A vertical divider slides across (responsive split view)
        # 0.0 -> 0.4: divider slides from 30% to 65% width
        # 0.4 -> 0.5: orange block lights up in right pane
        # 0.5 -> 0.8: divider slides to 40% width
        # 0.8 -> 1.0: returns seamlessly to start
        if t < 0.4:
            p = ease_in_out_cubic(t / 0.4)
            div_rel = 0.35 + p * 0.30
        elif t < 0.7:
            p = ease_in_out_cubic((t - 0.4) / 0.3)
            div_rel = 0.65 - p * 0.20
        else:
            p = ease_in_out_cubic((t - 0.7) / 0.3)
            div_rel = 0.45 - p * 0.10
            
        div_x = bx0 + (bx1 - bx0) * div_rel
        
        # Content in left pane: 2 minimal wireframe lines
        lw = (div_x - bx0) - 6 * SCALE
        if lw > 4 * SCALE:
            d.line([(bx0 + 3*SCALE, header_y + 7*SCALE), (bx0 + 3*SCALE + lw * 0.7, header_y + 7*SCALE)], fill=MUTED, width=int(1.5*SCALE))
            d.line([(bx0 + 3*SCALE, header_y + 13*SCALE), (bx0 + 3*SCALE + lw * 0.5, header_y + 13*SCALE)], fill=MUTED, width=int(1.5*SCALE))
            
        # Right pane: Orange active block that resizes with divider
        rx0 = div_x + 3 * SCALE
        rx1 = bx1 - 3 * SCALE
        ry0 = header_y + 4 * SCALE
        ry1 = by1 - 4 * SCALE
        if rx1 - rx0 > 3 * SCALE:
            # Active orange brutalist card
            d.rectangle([rx0, ry0, rx1, ry1], fill=ORANGE)
            # Inner white detail line
            d.line([(rx0 + 2*SCALE, (ry0 + ry1)/2), (rx1 - 2*SCALE, (ry0 + ry1)/2)], fill=WHITE, width=int(1.2*SCALE))
            
        # Vertical divider line
        d.line([(div_x, header_y), (div_x, by1)], fill=DARK, width=int(1.8*SCALE))
        
        final_frame = img.resize((48, 48), Image.Resampling.LANCZOS)
        final_frame.save(f"{tmp_dir}/f_{i:03d}.png")

    compile_gif(tmp_dir, 'public/gifs/focus-product-design.gif')

# =====================================================================
# 2. HUMAN–AI INTERACTION: Brutalist Square with Rotating Cross / AI Star
# Reference: Square box with centered plus [+]
# =====================================================================
def generate_human_ai():
    tmp_dir = "/tmp/brutal_human_ai"
    os.makedirs(tmp_dir, exist_ok=True)
    
    box_w = 34 * SCALE
    box_h = 34 * SCALE
    bx0 = (CANVAS_SIZE - box_w) / 2
    by0 = (CANVAS_SIZE - box_h) / 2
    bx1 = bx0 + box_w
    by1 = by0 + box_h
    stroke_w = int(2.2 * SCALE)
    cx = (bx0 + bx1) / 2
    cy = (by0 + by1) / 2
    
    for i in range(TOTAL_FRAMES):
        t = i / TOTAL_FRAMES
        img = Image.new('RGBA', (CANVAS_SIZE, CANVAS_SIZE), BG_COLOR)
        d = ImageDraw.Draw(img)
        
        # 1. Outer brutalist square
        d.rectangle([bx0, by0, bx1, by1], outline=DARK, width=stroke_w)
        
        # Kinetic animation:
        # Cross [+] pauses, then cleanly snaps 90° into next orientation
        # 0.0 -> 0.3: hold at +
        # 0.3 -> 0.5: rotate 45° to × with orange core expansion
        # 0.5 -> 0.8: hold at × (AI spark mode)
        # 0.8 -> 1.0: rotate 45° to + (complete 90° cycle)
        if t < 0.25:
            rot = 0.0
            scale = 1.0
            is_spark = False
        elif t < 0.5:
            p = ease_in_out_cubic((t - 0.25) / 0.25)
            rot = p * (math.pi / 4) # 0 to 45 deg
            scale = 1.0 + math.sin(p * math.pi) * 0.2
            is_spark = p > 0.5
        elif t < 0.75:
            rot = math.pi / 4 # 45 deg (X shape)
            scale = 1.0
            is_spark = True
        else:
            p = ease_in_out_cubic((t - 0.75) / 0.25)
            rot = math.pi / 4 + p * (math.pi / 4) # 45 to 90 deg
            scale = 1.0 + math.sin(p * math.pi) * 0.2
            is_spark = p < 0.5
            
        arm_len = 8.5 * SCALE * scale
        arm_w = int(2.2 * SCALE)
        
        # Draw 4 arms of the cross with rotation
        for a_idx in range(4):
            angle = rot + a_idx * (math.pi / 2)
            dx = math.cos(angle) * arm_len
            dy = math.sin(angle) * arm_len
            d.line([(cx, cy), (cx + dx, cy + dy)], fill=DARK, width=arm_w)
            
        # Center core: When rotating / in spark mode, central orange diamond/square pops
        core_size = (3.5 + (0.8 if is_spark else 0.0)) * SCALE
        # Center orange diamond
        d.polygon([
            (cx, cy - core_size),
            (cx + core_size, cy),
            (cx, cy + core_size),
            (cx - core_size, cy)
        ], fill=ORANGE)
        
        # 4 subtle corner registration marks (brutalist technical aesthetic)
        tick_len = 2.5 * SCALE
        tick_pad = 3.5 * SCALE
        # Top-left
        d.line([(bx0 + tick_pad, by0 + tick_pad), (bx0 + tick_pad + tick_len, by0 + tick_pad)], fill=MUTED, width=SCALE)
        d.line([(bx0 + tick_pad, by0 + tick_pad), (bx0 + tick_pad, by0 + tick_pad + tick_len)], fill=MUTED, width=SCALE)
        # Bottom-right
        d.line([(bx1 - tick_pad, by1 - tick_pad), (bx1 - tick_pad - tick_len, by1 - tick_pad)], fill=MUTED, width=SCALE)
        d.line([(bx1 - tick_pad, by1 - tick_pad), (bx1 - tick_pad, by1 - tick_pad - tick_len)], fill=MUTED, width=SCALE)
        
        final_frame = img.resize((48, 48), Image.Resampling.LANCZOS)
        final_frame.save(f"{tmp_dir}/f_{i:03d}.png")

    compile_gif(tmp_dir, 'public/gifs/focus-human-ai.gif')

# =====================================================================
# 3. SYSTEMS & CRAFT: Brutalist Box with Orbiting Token & Alignment Guide
# Reference: Square box with corner circle & corner arc [ ◰ ]
# =====================================================================
def generate_systems_craft():
    tmp_dir = "/tmp/brutal_systems_craft"
    os.makedirs(tmp_dir, exist_ok=True)
    
    box_w = 34 * SCALE
    box_h = 34 * SCALE
    bx0 = (CANVAS_SIZE - box_w) / 2
    by0 = (CANVAS_SIZE - box_h) / 2
    bx1 = bx0 + box_w
    by1 = by0 + box_h
    stroke_w = int(2.2 * SCALE)
    
    # 4 quadrant target positions for the circle token (clockwise)
    # 0: bottom-right (exact reference position!)
    # 1: bottom-left
    # 2: top-left
    # 3: top-right
    pad = 8.5 * SCALE
    targets = [
        (bx1 - pad, by1 - pad), # BR
        (bx0 + pad, by1 - pad), # BL
        (bx0 + pad, by0 + pad), # TL
        (bx1 - pad, by0 + pad), # TR
    ]
    
    for i in range(TOTAL_FRAMES):
        t = i / TOTAL_FRAMES
        img = Image.new('RGBA', (CANVAS_SIZE, CANVAS_SIZE), BG_COLOR)
        d = ImageDraw.Draw(img)
        
        # 1. Outer brutalist square
        d.rectangle([bx0, by0, bx1, by1], outline=DARK, width=stroke_w)
        
        # Quarter-circle arc in bottom-right corner (as in the reference image!)
        # The reference has an inner corner arc in one corner
        arc_r = 16 * SCALE
        # Draw arc in bottom-right corner: from (bx1 - arc_r, by1 - arc_r)
        d.arc([bx1 - arc_r*2, by1 - arc_r*2, bx1, by1], start=0, end=90, fill=DARK, width=int(1.8*SCALE))
        
        # Token movement between positions:
        # Spends most time resting at bottom-right (as in reference),
        # then snaps around the grid and returns
        # 0.0 -> 0.4: rests at BR (bottom-right)
        # 0.4 -> 0.6: moves BR -> TR
        # 0.6 -> 0.8: moves TR -> TL
        # 0.8 -> 1.0: moves TL -> BR (smooth return)
        if t < 0.4:
            tx, ty = targets[0]
            is_docked = True
        elif t < 0.6:
            p = ease_in_out_cubic((t - 0.4) / 0.2)
            tx = targets[0][0] + (targets[3][0] - targets[0][0]) * p
            ty = targets[0][1] + (targets[3][1] - targets[0][1]) * p
            is_docked = False
        elif t < 0.8:
            p = ease_in_out_cubic((t - 0.6) / 0.2)
            tx = targets[3][0] + (targets[2][0] - targets[3][0]) * p
            ty = targets[3][1] + (targets[2][1] - targets[3][1]) * p
            is_docked = False
        else:
            p = ease_in_out_cubic((t - 0.8) / 0.2)
            tx = targets[2][0] + (targets[0][0] - targets[2][0]) * p
            ty = targets[2][1] + (targets[0][1] - targets[2][1]) * p
            is_docked = p > 0.9
            
        # Draw precision alignment dashed crosshairs when moving
        if not is_docked:
            # Subtle dashed crosshairs aligning to token
            d.line([(tx, by0 + 2*SCALE), (tx, by1 - 2*SCALE)], fill=(119, 105, 93, 70), width=SCALE)
            d.line([(bx0 + 2*SCALE, ty), (bx1 - 2*SCALE, ty)], fill=(119, 105, 93, 70), width=SCALE)
            
        # Circular token: Clean circle outline + orange fill
        token_r = 4.2 * SCALE
        # Outer circle outline
        d.ellipse([tx - token_r, ty - token_r, tx + token_r, ty + token_r], outline=DARK, width=int(1.8*SCALE), fill=BG_COLOR)
        # Inner orange core dot
        core_r = 2.0 * SCALE
        d.ellipse([tx - core_r, ty - core_r, tx + core_r, ty + core_r], fill=ORANGE)
        
        final_frame = img.resize((48, 48), Image.Resampling.LANCZOS)
        final_frame.save(f"{tmp_dir}/f_{i:03d}.png")

    compile_gif(tmp_dir, 'public/gifs/focus-systems-craft.gif')

if __name__ == '__main__':
    generate_product_design()
    generate_human_ai()
    generate_systems_craft()
    print("All 3 minimal-brutalist GIFs generated and compiled!")
