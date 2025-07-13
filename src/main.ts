import './style.css'
import { setupEditor } from './editor.ts'
import { lang } from './lang'
import { javascript } from "@codemirror/lang-javascript"
import { Compartment } from "@codemirror/state"
import {
  LanguageSupport,
} from '@codemirror/language'

import type { EditorView } from 'codemirror';


let LANGUAGES: { [language_id: string]: LanguageSupport; } = {
  "lang": lang(),
  "javascript": javascript()
}

let language = new Compartment;

globalThis.editor = setupEditor(document.getElementById('editor')!, {
  extensions: [
    language.of(LANGUAGES["lang"])
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
  setLanguage(select.options[select.selectedIndex].value)
})

function setLanguage(lang: string) {
  editor.dispatch({
    effects: language.reconfigure(LANGUAGES[lang])
  })
}

declare global {
  var editor: EditorView
}
