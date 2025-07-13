import './style.css'
import { setupEditor } from './editor.ts'
import { lang } from './lang'
import { javascript } from "@codemirror/lang-javascript"
import { Compartment } from "@codemirror/state"
import {
  LanguageSupport,
} from '@codemirror/language'

import type { EditorView } from 'codemirror';

import exampleLang from "./lang.example?raw"
import exampleJs from "./js.example?raw"


let LANGUAGES: { [language_id: string]: LanguageSupport; } = {
  "lang": lang(),
  "javascript": javascript()
}

let SAMPLE_FILES: { [language_id: string]: string; } = {
  "lang": exampleLang,
  "javascript": exampleJs
}

let language = new Compartment;
let defaultLang = "lang"

globalThis.editor = setupEditor(document.getElementById('editor')!, {
  doc: SAMPLE_FILES[defaultLang],
  extensions: [
    language.of(LANGUAGES[defaultLang])
  ]
});

let languageSelect = document.getElementById("language")! as HTMLSelectElement;
for (const languageId in LANGUAGES) {
  let option = document.createElement("option");
  option.innerText = languageId;
  languageSelect.appendChild(
    option
  )
}
languageSelect.addEventListener("change", (ev) => {
  let select = ev.target as HTMLSelectElement;
  let targetLang = select.options[select.selectedIndex].value
  let updateDoc = (document.getElementById("update-doc") as HTMLInputElement).checked ? {
    from: 0,
    to: editor.state.doc.length,
    insert: SAMPLE_FILES[targetLang]
  } : undefined;
  editor.dispatch({
    changes: updateDoc,
    effects: language.reconfigure(LANGUAGES[targetLang])
  })
})


declare global {
  var editor: EditorView
}
