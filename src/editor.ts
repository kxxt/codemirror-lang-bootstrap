import { EditorView, basicSetup } from "codemirror"
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { acceptCompletion } from "@codemirror/autocomplete"
import { javascript } from "@codemirror/lang-javascript"
import { treeView } from '@overleaf/codemirror-tree-view'
import type { Extension } from "@codemirror/state"

export function setupEditor(parent: HTMLElement, extraExtensions?: [Extension]) {
    let extra = extraExtensions ?? [];
    return new EditorView({
        extensions: [basicSetup, keymap.of([{ key: "Tab", run: acceptCompletion }, indentWithTab]), javascript(), treeView, ...extra],
        parent
    })
}
