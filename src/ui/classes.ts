export const classes = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(' ')
