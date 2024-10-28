export const simplifyAccelerator = accelerator => {
  return accelerator
    .replace(/Command|Ctrl/g, '⌘')
    .replace(/Option|Alt/g, '⌥')
    .replace(/Shift/g, '⇧')
}

export const viditorFormatAccelerator = accelerator => {
  return accelerator
    .replace(/Command|Ctrl/g, '⌘')
    .replace(/Option|Alt/g, '⌥')
    .replace(/Shift/g, '⇧')
    .replace(/[+]/g, '')
    .replace(/⌘⇧/g, '⇧⌘')
    .replace(/⌘⌥/g, '⌥⌘')
}

export const modifiableKeybindingsMap = new Map([
  ['file.open-file', 'Open File'],
  ['file.open-folder', 'Open Folder'],
  ['view.text-mode', 'Text Mode'],
  ['file.new-file', 'New File'],
  ['file.save', 'Save File'],
  ['file.save-as', 'Save As'],
  ['file.rename-file', 'Rename File'],
  ['file.close-tab', 'Close Tab'],
  ['file.export-as-html', 'Export As HTML'],
  ['file.export-as-pdf', 'Export As PDF'],
  ['file.export-as-png', 'Export As PNG'],
  ['file.quit', 'Quit'],
  ['edit.undo', 'Undo'],
  ['edit.redo', 'Redo'],
  ['edit.cut', 'Cut'],
  ['edit.copy-as-markdown', 'Cpoy As Markdown'],
  ['edit.copy-as-html', 'Copy As HTML'],
  ['edit.paste-as-plaintext', 'Paste As Plaintext'],
  ['edit.find', 'Find'],
  ['edit.delete', 'Delete'],
  ['format.strong', 'Bold'],
  ['format.emphasis', 'Italic'],
  ['format.strike', 'Strikethrough'],
  ['format.inline-code', 'In-line code'],
  ['format.inline-math', 'Inline Math'],
  ['format.highlight', 'Highlight'],
  ['format.filelink', 'Filelink'],
  ['format.hyperlink', 'Hyperlink'],
  ['format.image', 'Image'],
  ['format.clear-format', 'Clear Format'],
  ['paragraph.heading-1', 'Heading 1'],
  ['paragraph.heading-2', 'Heading 2'],
  ['paragraph.heading-3', 'Heading 3'],
  ['paragraph.heading-4', 'Heading 4'],
  ['paragraph.heading-5', 'Heading 5'],
  ['paragraph.heading-6', 'Heading 6'],
  ['paragraph.table', 'Inserting tables'],
  ['paragraph.math-formula', 'Maths formula block'],
  ['paragraph.code-fence', 'Code block'],
  ['paragraph.quote-block', 'Quote'],
  ['paragraph.order-list', 'Ordered list'],
  ['paragraph.bullet-list', 'Unordered list'],
  ['paragraph.task-list', 'Task List'],
  ['paragraph.horizontal-line', 'Horizontal line'],
  ['view.source-code-mode', 'Source code model'],
  ['view.ficus-mode', 'Bodhi Model'],
  ['view.toggle-dev-tools', 'Developer Tools'],
  ['view.typewriter-mode', 'Typewriter Mode']
])
