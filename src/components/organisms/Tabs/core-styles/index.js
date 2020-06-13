module.exports = {
  "&>section": {
    variant: "styles.Tabs.Content",
  },
  "&>label": {
    variant: "styles.Tabs.Tab",
  },
  "&>input": {
    "&:not(:checked)": {
      "& + label + section": {
        variant: "styles.Tabs.Content.Inactive",
      },
    },
    "&:checked": {
      "& + label": {
        variant: "styles.Tabs.Tab.Active",
      },
      "& + label + section": {
        variant: "styles.Tabs.Content.Active",
      },
    },
  },
}
