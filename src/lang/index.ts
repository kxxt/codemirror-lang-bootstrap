import { tags } from '@lezer/highlight'
import { parser } from './parser.mjs'
import {
    HighlightStyle,
    LanguageSupport,
    LRLanguage,
    syntaxHighlighting,
} from '@codemirror/language'

export const LangHighlightSytle = HighlightStyle.define([
    { tag: tags.variableName, color: "purple" },
    { tag: tags.number, textDecoration: 'underline', fontWeight: 'bold', color: "red" },
    { tag: tags.string, fontWeight: 'bold', color: "orange" },
])

export function lang(): LanguageSupport {
    return new LanguageSupport(LRLanguage.define({
        name: 'lang',
        parser: parser,
    }), [
        syntaxHighlighting(LangHighlightSytle)
    ])
}