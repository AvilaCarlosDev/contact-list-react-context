# contact-list-react-context

[Español](README.md) · [English](README.en.md)

[![CI](https://github.com/AvilaCarlosDev/contact-list-react-context/actions/workflows/ci.yml/badge.svg)](https://github.com/AvilaCarlosDev/contact-list-react-context/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A React contact book that manages all global state with the **Context API**, with no external state library. It lists, creates, edits and deletes contacts against the public practice API of 4Geeks Academy.

> A learning project from the Full Stack program at [4Geeks Academy](https://4geeks.com). Its value is showing the Context + custom hook pattern applied and tested properly, not being a product.

## What it does

- Lists the contacts of its own agenda (`carlos-avila-contact-list`) and creates the agenda by itself if it does not exist yet.
- Creates and edits contacts with a single form (`/add-contact` and `/edit-contact/:id`) and name validation.
- Deletes through a confirmation modal.
- Shows loading and error states.

## Structure

| Path | Responsibility |
| --- | --- |
| `src/context/ContactContext.jsx` | `ContactProvider` and the `useContacts()` hook: state (`contacts`, `loading`, `error`) and the API operations |
| `src/views/Contact.jsx` | Main view with the list |
| `src/views/AddContact.jsx` | Create and edit form |
| `src/components/` | `ContactCard` and `ConfirmModal` |

## Usage

Requires Node.js 22 or later.

```bash
npm ci          # install dependencies
npm run dev     # dev server
npm run lint    # code review
npm test        # tests
npm run build   # production build into dist/
```

## Tests

`src/context/ContactContext.test.jsx` (Vitest + Testing Library, with a mocked `fetch`) checks that the context:

- loads the agenda contacts;
- creates the agenda when the API answers 404;
- exposes the error when the API fails;
- creates (`POST`), updates (`PUT`) and deletes (`DELETE`) on the right path and id, then reloads the list;
- resolves `getContactById` with the id as text (as it arrives from the URL) and returns `null` when it does not exist.

CI runs lint, tests, build and a dependency audit on every push and pull request.

## Known limitations

- The 4Geeks API is a shared practice environment: data can be wiped and there is no authentication.
- The linter reports four `react-hooks/exhaustive-deps` warnings in the views' `useEffect`s; they do not affect behavior and are pending review.

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md), the [code of conduct](CODE_OF_CONDUCT.md) and the [security policy](SECURITY.md). [MIT](LICENSE) licensed.

## Author

Carlos Avila · [GitHub](https://github.com/AvilaCarlosDev) · [LinkedIn](https://www.linkedin.com/in/avilacarlosdev)
