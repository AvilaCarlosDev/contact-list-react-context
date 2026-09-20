# contact-list-react-context

[Español](README.md) · [English](README.en.md)

[![CI](https://github.com/AvilaCarlosDev/contact-list-react-context/actions/workflows/ci.yml/badge.svg)](https://github.com/AvilaCarlosDev/contact-list-react-context/actions/workflows/ci.yml)
[![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-blue.svg)](LICENSE)

Agenda de contactos en React que gestiona todo el estado global con la **Context API**, sin librerías externas de estado. Lista, crea, edita y elimina contactos contra la API pública de práctica de 4Geeks Academy.

> Proyecto de aprendizaje del programa Full Stack de [4Geeks Academy](https://4geeks.com). Su valor está en mostrar el patrón Context + hook personalizado bien aplicado y probado, no en ser un producto.

## Qué hace

- Lista los contactos de una agenda propia (`carlos-avila-contact-list`) y la crea sola si todavía no existe.
- Crea y edita contactos con un mismo formulario (`/add-contact` y `/edit-contact/:id`) y validación del nombre.
- Elimina con un modal de confirmación.
- Muestra estados de carga y de error.

## Cómo está organizado

| Ruta | Responsabilidad |
| --- | --- |
| `src/context/ContactContext.jsx` | `ContactProvider` y el hook `useContacts()`: estado (`contacts`, `loading`, `error`) y las operaciones contra la API |
| `src/views/Contact.jsx` | Vista principal con la lista |
| `src/views/AddContact.jsx` | Formulario de alta y edición |
| `src/components/` | `ContactCard` y `ConfirmModal` |

## Cómo usarlo

Requisitos: Node.js 22 o superior.

```bash
npm ci          # instala dependencias
npm run dev     # servidor de desarrollo
npm run lint    # revisión de código
npm test        # pruebas
npm run build   # build de producción en dist/
```

## Pruebas

`src/context/ContactContext.test.jsx` (Vitest + Testing Library, con `fetch` simulado) comprueba que el contexto:

- carga los contactos de la agenda;
- crea la agenda si la API responde 404;
- expone el error si la API falla;
- crea (`POST`), actualiza (`PUT`) y elimina (`DELETE`) sobre la ruta y el id correctos y recarga la lista;
- resuelve `getContactById` con el id como texto (así llega desde la URL) y devuelve `null` si no existe.

El CI ejecuta lint, pruebas, build y una auditoría de dependencias en cada push y pull request.

## Limitaciones conocidas

- La API de 4Geeks es un entorno de práctica compartido: los datos pueden borrarse y no hay autenticación.
- El linter reporta cuatro avisos de `react-hooks/exhaustive-deps` en los `useEffect` de las vistas; no afectan al funcionamiento y están pendientes de revisar.

## Contribuir y seguridad

Lee [CONTRIBUTING.md](CONTRIBUTING.md), el [código de conducta](CODE_OF_CONDUCT.md) y la [política de seguridad](SECURITY.md). Licencia [MIT](LICENSE).

## Autor

Carlos Avila · [GitHub](https://github.com/AvilaCarlosDev) · [LinkedIn](https://www.linkedin.com/in/avilacarlosdev)
