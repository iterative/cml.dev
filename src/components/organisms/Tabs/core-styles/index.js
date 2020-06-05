module.exports = {
  "&>section": {
    variant: "styles.Tabs.InactiveContent",
  },
  "&>label": {
    variant: "styles.Tabs.Tab",
  },
  RadioInput: {
    "&:checked": {
      "& + label": {
        variant: "styles.Tabs.Tab.Active",
      },
      "& + label + section": {
        variant: "styles.Tabs.Content",
      },
    },
  },
  InactiveContent: {
    overflow: "hidden",
    display: "block",
    height: 0,
    width: 0,
    order: 1,
    "& video": {
      display: "none",
    },
  },
}
