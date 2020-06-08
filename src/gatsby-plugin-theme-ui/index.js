const { system: preset } = require("@theme-ui/presets")
const tabsCoreStyles = require("../components/organisms/Tabs/core-styles")
const { alpha } = require("@theme-ui/color")

const palette = {
  ...preset.colors,
  cyan: ["#24ADC5", "#B6E8ED"],
  purple: ["#9361D3", "#BB8DDA", "#7845BA"],
  darkPurple: ["#3A2D4C", "#4A3F63"],
  gray: "#EEF4F8",
  white: "#FFF",
  navy: ["#2C274B", "#737396", "#9898B0"],
  orange: ["#F26740", "#F6936A"],
  yellow: "#E3EE9E",
}

export default {
  ...preset,
  breakpoints: ["640px", "980px", "1440px"],
  colors: {
    ...palette,
    background: palette.white,
    text: palette.darkPurple[0],
    primary: palette.purple[0],
  },
  tooltips: {
    primary: {
      "&[title]": {
        position: "relative",
        "&:after": {
          textAlign: "center",
          content: "attr(title)",
          position: "absolute",
          bottom: "100%",
        },
      },
    },
  },
  radii: [0, "8px"],
  sizes: [0, "4px", "8px", "12px", "16px", "24px", "32px", "48px", "64px"],
  fonts: {
    body: "'DM Sans', sans-serif",
    heading: "'DM Sans', sans-serif",
  },

  layout: {
    ...preset.layout,
    container: {
      maxWidth: "1280px",
      mx: "auto",
      px: 3,
    },
    Header: {
      variant: "styles.invert",
      pt: [3, 0],
      Logo: {
        display: "block",
        flex: "0 1 auto",
        pt: "1rem",
        pb: ["0.5rem", "1rem"],
        width: ["100%", "auto"],
        img: {
          display: "block",
          width: "100%",
          mx: "auto",
          maxWidth: ["154px", "115px"],
          height: ["40px", "30px"],
        },
      },
      Inner: {
        variant: "layout.container",
        display: "flex",
        flexWrap: "nowrap",
        alignItems: ["center"],
        flexFlow: ["column", "row"],
      },
      Nav: {
        px: 0,
        display: "flex",
        flexDirection: "row",
        flexWrap: ["wrap", "nowrap"],
        justifyContent: ["center", "flex-end"],
        flex: "1",
        Link: {
          px: 2,
          py: "6px",
          fontSize: 2,
          height: "48px",
          textAlign: "center",
          lineHeight: "36px",
        },
      },
    },
    Footer: {
      variant: "styles.invert",
      pt: [3, 0],
      Logo: {
        display: "block",
        flex: "0 1 auto",
        pt: "1rem",
        pb: ["0.5rem", "1rem"],
        width: ["100%", "auto"],
        img: {
          display: "block",
          width: "100%",
          mx: "auto",
          maxWidth: ["154px", "115px"],
          height: ["40px", "30px"],
        },
      },
      Inner: {
        variant: "layout.container",
        display: "flex",
        flexWrap: "nowrap",
        alignItems: ["center"],
        flexFlow: ["column", "row"],
      },
      Nav: {
        px: 0,
        display: "flex",
        flexDirection: "row",
        flexWrap: ["wrap", "nowrap"],
        justifyContent: ["center", "flex-end"],
        flex: "1",
        Link: {
          px: 2,
          py: "6px",
          fontSize: 2,
          height: "48px",
          textAlign: "center",
          lineHeight: "36px",
        },
      },
    },
    main: {
      overflow: "auto",
    },
  },
  buttons: {
    primary: {
      display: "inline-block",
      lineHeight: "50px",
      backgroundColor: "primary",
      borderRadius: "30px",
      height: "50px",
      color: "white",
      border: "none",
      px: "2em",
      transition: "0.2s background-color",
      cursor: "pointer",
      textDecoration: "none",
      "&:hover": {
        bg: "purple.2",
      },
    },
  },
  links: {
    ...preset.links,
    button: {
      variant: "buttons.primary",
    },
  },
  forms: {
    input: {
      color: "text",
    },
    partial: {
      border: "none",
      backgroundColor: "unset",
    },
    ButtonInput: {
      backgroundColor: "white",
      color: "black",
      borderRadius: "1.5rem",
      pr: "2px",
      Input: {
        variant: "forms.partial",
        pl: "1rem",
        borderTopLeftRadius: "1.5rem",
        borderBottomLeftRadius: "1.5rem",
        borderTopRightRadius: 1,
        borderBottomRightRadius: 1,
      },
      Button: {
        my: "2px",
        color: "white",
        backgroundColor: "purple",
        borderRadius: "1.5rem",
        lineHeight: "1.5rem",
        flex: "0 0 auto",
      },
    },
  },
  switches: {
    Base: {
      position: "relative",
      "::before": {
        border: "1px solid",
        borderColor: "text",
        backgroundColor: "background",
        transition: "0.1s all",
        position: "absolute",
        display: "block",
        borderRadius: 1,
        content: "''",
        bottom: "0",
        top: "0",
      },
      Left: {
        "::before": {
          left: "0",
          right: "50%",
        },
      },
      Right: {
        "::before": {
          right: "0",
          left: "50%",
        },
      },
      ">span": {
        variant: "switches.Base.Label",
      },
    },
    primary: {
      variant: "switches.Base",
      display: "block",
      whiteSpace: "nowrap",
      color: "background",
      bg: "darkPurple.1",
      borderRadius: 1,
      width: "100%",
      overflow: "hidden",
      Label: {
        py: 1,
        px: 2,
        zIndex: "3",
        width: "50%",
        textAlign: "center",
        display: "inline-block",
        position: "relative",
        transition: "0.2s all",
        cursor: "pointer",
        Active: {
          color: "text",
        },
      },
    },
  },
  styles: {
    ...preset.styles,
    Video: {
      borderRadius: 1,
    },
    invert: {
      color: "background",
      backgroundColor: "text",
    },
    SolutionList: {
      p: 0,
      listStyle: "none",
      color: "text",
      fontSize: ["12px", "14px", "22px"],
      Item: {
        display: "flex",
        flexFlow: "row nowrap",
        borderTop: "1px solid",
        borderColor: alpha("#4A3F63", 0.2),
        alignItems: "center",
        ":first-of-type": { borderTop: "none" },
        "&>h3": {
          color: "black",
          flex: 1,
          ":first-of-type": { textAlign: "left" },
          ":last-of-type": { textAlign: "right" },
        },
        "&>svg": {
          minWidth: "60px",
          maxHeight: "24px",
          height: "100%",
          flex: "0 0 auto",
        },
      },
    },
    Tabs: {
      ...tabsCoreStyles,

      color: "white",
      minWidth: "250px",

      display: "flex",
      flexFlow: ["column nowrap", null, "row wrap"],
      overflow: "hidden",
      width: "100%",

      borderRadius: [1, null, 0],

      Content: {
        width: "100%",
        height: "auto",
        flex: [null, null, "1 0 100%"],
        borderBottomRightRadius: [0, null, 1],
        borderBottomLeftRadius: [0, null, 1],
        borderTopRightRadius: [0, null, 1],
        borderTopLeftRadius: 0,
      },

      Tab: {
        flex: "1 0",
        margin: [0, null, "0 0.1rem 0 0"],
        height: ["48px", null, "70px"],
        maxWidth: [null, null, "315px"],
        px: 4,
        py: [0, null, "11px"],
        color: "white",
        backgroundColor: "darkPurple.0",
        whiteSpace: "nowrap",
        textAlign: "center",
        borderTopLeftRadius: [0, null, 1],
        borderTopRightRadius: [0, null, 1],
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        opacity: 0.5,
        fontWeight: "800",
        cursor: "pointer",
        zIndex: "5",
        position: "relative",
        fontSize: "18px",
        lineHeight: "48px",
        display: "block",

        order: "0",

        borderBottom: "none",

        verticalAlign: "middle",

        transition: "opacity 0.2s",
        ":last-of-type": {
          marginRight: [null, null, "2rem"],
        },

        "&:hover": {
          opacity: 0.7,
        },
        Active: {
          opacity: 1,
        },
      },
    },
    root: {
      ...preset.styles.root,
      minWidth: "360px",
      "*": {
        boxSizing: "border-box",
      },
    },
  },
}
