import './style.css'
import { setupEditor } from './editor.ts'
import type { EditorView } from 'codemirror';

globalThis.editor = setupEditor(document.getElementById('editor')!);

declare global {
  var editor: EditorView
}