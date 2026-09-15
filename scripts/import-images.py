#!/usr/bin/env python3
"""
Import product photos you already have on disk.

    python3 scripts/import-images.py shot.jpg:rejuran another.png:aestura,aesturaLegs

Each argument is a file path, a colon, then one or more product ids that should
use it (a product bought twice shares one photo). Images are squared, resized to
320px — the largest thumbnail at 3x — and written as WebP into public/products/,
then registered in src/data/productImages.json.

A shot on a plain white studio background gets its dead margin trimmed first so
the packaging fills the tile instead of floating in it. Shots on a coloured or
gradient background are left alone.

Needs Pillow:  pip install pillow
"""
import json
import os
import sys

try:
    from PIL import Image, ImageChops
except ImportError:
    sys.exit('Pillow is not installed. Run: pip install pillow')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'products')
REGISTRY = os.path.join(ROOT, 'src', 'data', 'productImages.json')

SIZE = 320      # 84px sheet thumbnail at 3x device pixel ratio
PAD = 0.06      # breathing room around a trimmed product
WHITE = 238     # corner brightness at or above which a background counts as white


def known_ids():
    src = os.path.join(ROOT, 'src', 'data', 'products.js')
    ids = []
    with open(src, encoding='utf-8') as fh:
        for line in fh:
            line = line.strip()
            if line.startswith('id: '):
                ids.append(line.split("'")[1])
    return ids


def on_white(im):
    w, h = im.size
    corners = [(2, 2), (w - 3, 2), (2, h - 3), (w - 3, h - 3)]
    return all(sum(im.getpixel(p)) / 3 >= WHITE for p in corners)


def trim(im):
    """Crop to the product, squared around its centre, with a little padding."""
    diff = ImageChops.difference(im, Image.new('RGB', im.size, (255, 255, 255)))
    box = diff.convert('L').point(lambda v: 255 if v > 12 else 0).getbbox()
    if not box:
        return im
    l, t, r, b = box
    w, h = im.size
    cx, cy = (l + r) / 2, (t + b) / 2
    half = max(r - l, b - t) * (1 + PAD * 2) / 2
    l2, t2, r2, b2 = cx - half, cy - half, cx + half, cy + half
    # Shift back inside the source rather than distorting the aspect.
    if l2 < 0: r2 -= l2; l2 = 0
    if t2 < 0: b2 -= t2; t2 = 0
    if r2 > w: l2 -= r2 - w; r2 = w
    if b2 > h: t2 -= b2 - h; b2 = h
    return im.crop((int(max(0, l2)), int(max(0, t2)), int(r2), int(b2)))


def square(im):
    w, h = im.size
    if w == h:
        return im
    s = min(w, h)
    return im.crop(((w - s) // 2, (h - s) // 2, (w + s) // 2, (h + s) // 2))


def main(args):
    if not args:
        sys.exit(__doc__.strip())

    ids = known_ids()
    registry = {}
    if os.path.exists(REGISTRY):
        with open(REGISTRY, encoding='utf-8') as fh:
            registry = json.load(fh)
    os.makedirs(OUT, exist_ok=True)

    for arg in args:
        if ':' not in arg:
            sys.exit(f'Expected <path>:<productId>, got "{arg}"')
        path, _, id_list = arg.rpartition(':')
        targets = [i.strip() for i in id_list.split(',') if i.strip()]
        if not os.path.exists(path):
            sys.exit(f'No such file: {path}')
        unknown = [t for t in targets if t not in ids]
        if unknown:
            sys.exit(f'Unknown product id(s): {", ".join(unknown)}')

        im = Image.open(path).convert('RGB')
        w0, h0 = im.size
        trimmed = on_white(im)
        if trimmed:
            im = trim(im)
        cropped = im.size
        im = square(im).resize((SIZE, SIZE), Image.LANCZOS)

        for pid in targets:
            dest = os.path.join(OUT, f'{pid}.webp')
            im.save(dest, 'WEBP', quality=86, method=6)
            registry[pid] = f'{pid}.webp'
            kb = os.path.getsize(dest) / 1024
            note = f'trimmed {w0}x{h0} -> {cropped[0]}x{cropped[1]}' if trimmed else f'{w0}x{h0} as-is'
            print(f'  {pid:<16} {kb:5.1f} KB   ({note})')

    with open(REGISTRY, 'w', encoding='utf-8') as fh:
        json.dump(dict(sorted(registry.items())), fh, indent=2)
        fh.write('\n')

    have, total = len(registry), len(ids)
    print(f'\n{have}/{total} products have a photo. {total - have} still on monogram tiles.')


if __name__ == '__main__':
    main(sys.argv[1:])
