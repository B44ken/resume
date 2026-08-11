# resume.tsx
a nice resume template in react/typescript, with a wysiwyg editor. see `example.pdf`

## how to use
clone the repo, do
```
npm install
npm run dev
```
then edit the resume directly on the page - it looks exactly like the printed
version while you type. use `ctrl+p` (or the `print / pdf` button) to export.

### editing
- click any text to edit it
- `enter` in a bullet starts a new bullet, `backspace` in an empty one deletes it
- hover a line to get its controls in the left margin (move up/down, delete, set link)
- `+ section` / `+ entry` / `+ skills` under each section add new blocks there
- `preview` hides the editing chrome, `export` / `import` save and load the
  resume as json, `reset` goes back to the template

the font size and line height are picked automatically: the largest font size
that still fits on one page wins, then the line height is opened up as far as it
can go at that size. both ranges live in `src/fit.ts`.

edits are saved in your browser's local storage. the starting content lives in
`src/data.ts` if you would rather edit it as code.
