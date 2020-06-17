const { system: preset } = require("@theme-ui/presets")
const tabsCoreStyles = require("../components/organisms/Tabs/core-styles")
const { alpha, darken } = require("@theme-ui/color")

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
  breakpoints: ["480px", "640px", "980px", "1440px"],
  text: {
    ...preset.text,
    accuracy: {
      px: "20px",
      py: "10px",
    },
  },
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
  shadows: {
    wide: "0px 20px 30px rgba(74, 63, 99, 0.1)",
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
      pt: [3, null, 0],
      Logo: {
        display: "block",
        flex: "0 1 auto",
        pt: "1rem",
        pb: ["0.5rem", null, "1rem"],
        width: ["100%", null, "auto"],
        img: {
          maxWidth: ["154px", null, "115px"],
          height: ["40px", null, "30px"],
          display: "block",
          width: "100%",
          mx: "auto",
        },
      },
      Inner: {
        variant: "layout.container",
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        flexFlow: ["column", null, "row"],
      },
      Nav: {
        px: 0,
        display: "flex",
        flexDirection: "row",
        flexWrap: ["wrap", null, "nowrap"],
        justifyContent: ["center", null, "flex-end"],
        flex: "1",
        Link: {
          px: 2,
          py: "6px",
          fontSize: 2,
          fontWeight: "normal",
          height: "48px",
          textAlign: "center",
          lineHeight: "36px",
        },
      },
    },
    Footer: {
      borderTop: "1px solid rgba(255, 255, 255, 0.3)",
      variant: "styles.invert",
      py: 1,
      Inner: {
        flexFlow: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        variant: "layout.container",
        my: ["40px", null, null, 0],
        display: ["block", null, null, "flex"],
      },
      Logo: {
        order: -2,
        display: "block",
        flex: "0 1 auto",
        p: "10px",
        my: "40px",
        mx: "auto",
        img: {
          display: "block",
          width: "100%",
          mx: "auto",
          maxWidth: "154px",
          height: "40px",
        },
      },
      Nav: {
        px: 0,
        mx: "auto",
        display: "flex",
        flexDirection: ["column", "row"],
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        flex: "1",
        fontSize: "18px",
        Link: {
          fontWeight: "normal",
          px: 2,
          py: "6px",
          fontSize: 2,
          height: "48px",
          textAlign: "center",
          lineHeight: "36px",
        },
      },
      SocialIcons: {
        justifyContent: ["center", null, null, "flex-end"],
        alignItems: "center",
        textAlign: ["center", null, null, "right"],
        width: "300px",
        mx: "auto",
        my: "40px",
        ">a": {
          px: "6px",
          mx: "6px",
          color: "background",
          "&:hover": {
            color: "purple",
          },
        },
      },
      PoweredBy: {
        textAlign: "center",
        my: "40px",
        order: -1,
      },
    },
    main: {
      overflow: "auto",
    },
  },
  buttons: {
    base: {
      transition: "0.2s background-color",
      display: "inline-block",
      textDecoration: "none",
      borderRadius: "30px",
      px: 1,
    },
    primary: {
      lineHeight: "50px",
      height: "50px",
      variant: "buttons.base",
      backgroundColor: "primary",
      color: "white",
      border: "none",
      px: "2em",
      cursor: "pointer",
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
    nav: {
      ...preset.nav,
      fontWeight: "normal",
    },
    RepoButton: {
      variant: "buttons.base",
      display: "flex",
      flexFlow: "row nowrap",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "95px",
      color: "background",
      border: "1px solid",
      borderColor: "background",
      height: "30px",
      py: "8px",
      mx: "4px",
      fontSize: "14px",
      textDecoration: "none",
      "&:hover": { color: "inherit" },
      "&>svg, &>img": {
        mr: "-0.25em",
        ml: "0.5em",
      },
      ">span": {
        height: "20px",
        mx: ".8em",
        display: "inline-block",
      },
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
      Label: {
        outline: "none",
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
        variant: "switches.Base.Label",
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
    CenteredBlock: {
      display: "block",
      mx: "auto",
    },
    CodeBlock: {
      fontFamily: "monospace",
      fontSize: "12px",
      overflow: "auto",
      pre: {
        display: "inline-block",
        pt: "20px",
        px: "20px",
      },
    },
    Video: {
      borderRadius: 1,
    },
    invert: {
      color: alpha("background", 0.5),
      backgroundColor: "text",
    },
    SolutionList: {
      p: 0,
      listStyle: "none",
      color: "text",
      fontSize: ["12px", null, "14px", "22px"],
      maxWidth: [null, "586px", "834px"],
      Item: {
        display: "flex",
        flexFlow: "row nowrap",
        borderTop: "1px solid",
        borderColor: alpha("#4A3F63", 0.2),
        alignItems: "center",
        ":first-of-type": { borderTop: "none" },
        "&>h3": {
          color: "text",
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
      overflow: "visible",
      width: "100%",

      px: [0, null, 3],

      "& div": {
        maxHeight: "100%",
      },

      Content: {
        order: 1,
        overflow: "hidden",
        borderBottomRightRadius: [0, null, 1],
        borderBottomLeftRadius: [0, null, 1],
        borderTopRightRadius: [0, null, 1],
        borderTopLeftRadius: 0,
        Active: {
          width: "100%",
          flex: [null, null, "1 1 100%"],
          boxShadow: [null, "wide"],
          textAlign: "left",
        },
        Inactive: {
          display: "block",
          height: 0,
          width: 0,
          "& video": {
            display: "none",
          },
        },
      },

      Tab: {
        outline: "none",
        flex: "1 0",
        marginRight: [0, null, "2px"],
        height: ["48px", null, null, "70px"],
        maxWidth: [null, null, "315px"],
        px: 4,
        py: [0, null, null, "11px"],
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
      color: alpha("text", 0.5),
      minWidth: "350px",
      fontSize: "14px",
      "*": {
        boxSizing: "border-box",
      },
    },
  },
}
