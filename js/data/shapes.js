/* Canvas shapes. `ratio` is width / height; null means "fit the mark".
   Picking a shape applies its default padding (grid units): fixed shapes
   get room around the mark, fit stays tight. Social presets also carry the
   platform's native export width. */
export const FIT_PAD = 0,
  SHAPE_PAD = 10;

export const PNG_WIDTHS = [512, 1024, 1080, 1600, 2048, 4096];

export const SHAPES = [
  { id: "auto", label: "fit", ratio: null, pad: FIT_PAD },
  { id: "square", label: "1:1", ratio: 1, pad: SHAPE_PAD },
  { id: "wide", label: "2:1", ratio: 2, pad: SHAPE_PAD },
];

export const SOCIAL = [
  {
    group: "instagram",
    items: [
      {
        id: "ig-portrait",
        label: "portrait 4:5",
        ratio: 4 / 5,
        png: 1080,
        pad: SHAPE_PAD,
      },
      {
        id: "ig-story",
        label: "story 9:16",
        ratio: 9 / 16,
        png: 1080,
        pad: SHAPE_PAD,
      },
    ],
  },
  {
    group: "X",
    items: [
      {
        id: "x-post",
        label: "post 16:9",
        ratio: 16 / 9,
        png: 1600,
        pad: SHAPE_PAD,
      },
    ],
  },
];

const ALL = [...SHAPES, ...SOCIAL.flatMap((g) => g.items)];
export function shapeById(id) {
  return ALL.find((s) => s.id === id) || SHAPES[0];
}
