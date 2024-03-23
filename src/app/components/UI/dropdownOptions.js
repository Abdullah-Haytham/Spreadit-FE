const dropdownOptions = [
  {
    parentId: 7,
    choices: [
      {
        dropId: 1,
        icon: "🔥",
        desc: "Hot",
      },
      {
        dropId: 2,
        icon: "🆕",
        desc: "New",
      },
      {
        dropId: 3,
        icon: "🔝",
        desc: "Top",
      },
      {
        dropId: 4,
        icon: "💹",
        desc: "Rising",
      },
    ],
  },
  {
    parentId: 9,
    choices: [
      {
        dropId: 1,
        icon: "🃏",
        desc: "Card",
      },
      {
        dropId: 2,
        icon: "⏲",
        desc: "Classic",
      },
      {
        dropId: 3,
        icon: "🔹",
        desc: "Compact",
      },
    ],
  },
  {
    parentId: -1,
    choices: [
      {
        dropId: 1,
        icon: "⛔",
        desc: "Null",
      },
    ],
  },
];

export default dropdownOptions;
