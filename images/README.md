# Amenity photos

The amenities carousel in `index.html` currently uses temporary placeholder
images served from a CDN. To show the real City Tower photos, drop the files
below into this folder using **these exact filenames**, then the carousel will
pick them up once the `<img src>` is pointed at `images/...`.

| Filename             | Photo                                                        | Carousel label    |
|----------------------|--------------------------------------------------------------|-------------------|
| `amenity-yoga.jpg`   | Yoga studio — black mats, mirrored wall, gym beyond glass    | Yoga Studio       |
| `amenity-padel.jpg`  | Rooftop padel court — green court, netting, tower behind     | Padel Courts      |
| `amenity-kids.jpg`   | Family splash pool + shaded climbing frame play area         | Kids' Play Zone   |

Recommended: JPG, landscape, ~1600 px wide, optimised (< 400 KB each). The
carousel slides are cropped to a 4:3 ratio, so landscape framing works best.

The three slides that map to these photos are tagged in `index.html` with a
`data-photo="..."` attribute matching the filenames above.
