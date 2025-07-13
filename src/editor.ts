import { EditorView, basicSetup } from "codemirror"
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { acceptCompletion } from "@codemirror/autocomplete"
import { treeView } from '@overleaf/codemirror-tree-view'
import { EditorState, type EditorStateConfig, type Extension } from "@codemirror/state"

export function setupEditor(parent: HTMLElement, state: EditorStateConfig) {
    let ext = state.extensions ? [state.extensions] : []
    state.extensions = [basicSetup, keymap.of([{ key: "Tab", run: acceptCompletion }, indentWithTab]), treeView as Extension, ...ext];
    return new EditorView({
        state: EditorState.create(state),
        parent
    })
}
