/* eslint-disable react-hooks/rules-of-hooks */
import { yrsaStyle, rochesterStyle } from '@fonts'
import { MantineThemeColorsOverride, useMantineTheme, DefaultMantineColor } from '@mantine/core';
export const themeColors: MantineThemeColorsOverride = {
    "gray": [
        "#F1F0F4",
        "#D7D6E1",
        "#BDBCCD",
        "#A4A1BA",
        "#8A87A6",
        "#716C93",
        "#5A5775",
        "#444158",
        "#2D2B3B",
        "#17161D"
    ],
    "red": [
        "#FFE5E5",
        "#FFB8B8",
        "#FF8A8A",
        "#FF5C5C",
        "#FF2E2E",
        "#FF0000",
        "#CC0000",
        "#990000",
        "#660000",
        "#330000"
    ],
    "orange": [
        "#FFEFE5",
        "#FFD2B8",
        "#FFB58A",
        "#FF985C",
        "#FF7B2E",
        "#FF5F00",
        "#CC4C00",
        "#993900",
        "#662600",
        "#331300"
    ],
    "yellow": [
        "#FFF8E5",
        "#FFECB8",
        "#FFE08A",
        "#FFD45C",
        "#FFC82E",
        "#FFBC00",
        "#CC9600",
        "#997100",
        "#664B00",
        "#332600"
    ],
    "green": [
        "#E5FFE9",
        "#B8FFC0",
        "#8AFF98",
        "#5CFF6F",
        "#2EFF47",
        "#00FF1F",
        "#00CC18",
        "#009912",
        "#00660C",
        "#003306"
    ],
    "teal": [
        "#E5FFF9",
        "#B8FFEF",
        "#8AFFE5",
        "#5CFFDA",
        "#2EFFD0",
        "#00FFC6",
        "#00CC9E",
        "#009977",
        "#00664F",
        "#003328"
    ],
    "cyan": [
        "#E5FDFF",
        "#B8FAFF",
        "#8AF7FF",
        "#5CF4FF",
        "#2EF0FF",
        "#00EDFF",
        "#00BECC",
        "#008E99",
        "#005F66",
        "#002F33"
    ],
    "indigo": [
        "#E5E9FF",
        "#B8C1FF",
        "#8A9AFF",
        "#5C72FF",
        "#2E4AFF",
        "#0023FF",
        "#001CCC",
        "#001599",
        "#000E66",
        "#000733"
    ],
    "grape": [
        "#F4E6FF",
        "#DFB9FE",
        "#CB8BFE",
        "#B65EFD",
        "#A231FC",
        "#8D03FC",
        "#7103C9",
        "#550297",
        "#390165",
        "#1C0132"
    ],
    "pink": [
        "#FFE6F3",
        "#FEB8DE",
        "#FE8BCA",
        "#FE5DB5",
        "#FD30A0",
        "#FD028B",
        "#CA026F",
        "#980153",
        "#650138",
        "#33001C"
    ],
    "lime": [
        "#EDFFE5",
        "#CBFFB8",
        "#AAFF8A",
        "#89FF5C",
        "#67FF2E",
        "#46FF00",
        "#38CC00",
        "#2A9900",
        "#1C6600",
        "#0E3300"
     ],
     "blue": [
        "#E5ECFF",
        "#B8CBFF",
        "#8AA9FF",
        "#5C87FF",
        "#2E66FF",
        "#0044FF",
        "#0036CC",
        "#002999",
        "#001B66",
        "#000E33"
     ],
     "violet": [
        "#E8E6FF",
        "#C0B9FE",
        "#978BFE",
        "#6F5EFD",
        "#4631FC",
        "#1D03FC",
        "#1703C9",
        "#120297",
        "#0C0165",
        "#060132"
     ]

};

export const fonts = [
    { ...yrsaStyle },
    { ...rochesterStyle }
]

export const colors = {
    'primary': 'pink',
    'secondary': 'violet',
    'success': 'green',
    'danger': 'red',
    'warning': 'yellow',
    'info': 'cyan',
    'light': 'gray',
    'dark': 'gray',
    'white': 'white',
    'black': 'black',
    'gray': 'gray',
    'red': 'red',
    'orange': 'orange',
    'yellow': 'yellow',
    'green': 'green',
    'teal': 'teal',
    'cyan': 'cyan',
    'indigo': 'indigo',
    'grape': 'grape',
    'pink': 'pink',
    'lime': 'lime',
    'blue': 'blue',
    'violet': 'violet'
}

export type Colors = keyof typeof colors;