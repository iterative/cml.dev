const { system: preset } = require("@theme-ui/presets")
const tabsCoreStyles = require("../components/organisms/Tabs/core-styles")

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
  colors: {
    ...palette,
    background: palette.white,
    text: palette.darkPurple[0],
    primary: palette.purple[0],
  },
  layout: {
    header: {
      variant: "styles.invert",
      logo: {
        display: "block",
        flex: "0 1 auto",
        p: "1rem",
        img: {
          width: "115px",
          height: "30px",
        },
      },
      inner: {
        display: "flex",
        flexWrap: "nowrap",
        flexFlow: ["column", "row"],
      },
      nav: {
        px: 2,
        display: "flex",
        flexFlow: "row",
        flexWrap: ["wrap", "nowrap"],
        justifyContent: "center",
        flex: "1",
        link: {
          px: 3,
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
  fonts: {
    body: "'DM Sans', sans-serif",
    heading: "'DM Sans', sans-serif",
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
    subscribe: {
      color: "white",
      backgroundColor: "purple",
      borderRadius: "1.5rem",
      lineHeight: "1.5rem",
      flex: "0 0 auto",
    },
  },
  links: {
    ...preset.links,
    button: {
      variant: "buttons.primary",
    },
  },
  forms: {
    partial: {
      border: "none",
      backgroundColor: "unset",
    },
  },
  radii: [0, "8px"],
  sizes: [0, "4px", "8px", "12px", "16px", "24px", "32px", "48px", "64px"],
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
    invert: {
      color: "background",
      backgroundColor: "text",
    },
    buttonInput: {
      backgroundColor: "white",
      borderRadius: "1.5rem",
      pl: "0.5rem",
      pr: "2px",
      py: "2px",
    },
    Tabs: {
      ...tabsCoreStyles,

      color: "white",
      minWidth: "250px",

      display: "flex",
      flexFlow: ["column nowrap", "row wrap"],
      overflow: "hidden",
      width: "100%",

      borderRadius: [1, 0],

      Content: {
        backgroundColor: "darkPurple.0",
        width: "100%",
        height: "auto",
        padding: "1rem",
        flex: [null, "1 0 100%"],
        borderBottomRightRadius: [0, 1],
        borderBottomLeftRadius: [0, 1],
        borderTopRightRadius: [0, 1],
        borderTopLeftRadius: 0,
      },

      Tab: {
        flex: "1 0",
        margin: [0, "0 0.1rem 0 0"],
        height: ["48px", "70px"],
        maxWidth: [null, "315px"],
        px: 4,
        py: [0, "11px"],
        color: "white",
        backgroundColor: "darkPurple.0",
        whiteSpace: "nowrap",
        textAlign: "center",
        borderTopLeftRadius: [0, 1],
        borderTopRightRadius: [0, 1],
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
          marginRight: [null, "2rem"],
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
      "*": {
        boxSizing: "border-box",
      },
    },
  },
}
