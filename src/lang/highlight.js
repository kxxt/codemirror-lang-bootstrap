import { styleTags, tags } from "@lezer/highlight"

export const langHighlight = styleTags({
    "Identifier": tags.variableName,
    "Number": tags.number,
    "String": tags.string,
})
