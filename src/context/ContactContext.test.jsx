import { renderHook, act, waitFor } from '@testing-library/react'
import { ContactProvider, useContacts } from './ContactContext'

const BASE = 'https://playground.4geeks.com/contact/agendas/carlos-avila-contact-list'
const respuesta = (cuerpo, estado = 200) => ({ ok: estado >= 200 && estado < 300, status: estado, json: async () => cuerpo })
const envoltorio = ({ children }) => <ContactProvider>{children}</ContactProvider>

let llamadas
function simular(manejador) {
  llamadas = []
  vi.stubGlobal('fetch', vi.fn(async (url, opciones = {}) => {
    llamadas.push({ url, metodo: opciones.method ?? 'GET', cuerpo: opciones.body })
    return manejador(url, opciones)
  }))
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('ContactContext', () => {
  it('carga los contactos de la agenda', async () => {
    simular((url) => (url.endsWith('/contacts') ? respuesta({ contacts: [{ id: 1, name: 'Ana' }] }) : respuesta({})))
    const { result } = renderHook(() => useContacts(), { wrapper: envoltorio })
    await act(() => result.current.getContacts())
    expect(result.current.contacts).toEqual([{ id: 1, name: 'Ana' }])
    expect(result.current.error).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('crea la agenda si no existe (404) antes de pedir los contactos', async () => {
    simular((url, o) => {
      if (url === BASE && !o.method) return respuesta({}, 404)
      return respuesta({ contacts: [] })
    })
    const { result } = renderHook(() => useContacts(), { wrapper: envoltorio })
    await act(() => result.current.getContacts())
    expect(llamadas.some((c) => c.url === BASE && c.metodo === 'POST')).toBe(true)
  })

  it('expone el error cuando la API falla al listar', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    simular((url) => (url.endsWith('/contacts') ? respuesta({}, 500) : respuesta({})))
    const { result } = renderHook(() => useContacts(), { wrapper: envoltorio })
    await act(() => result.current.getContacts())
    expect(result.current.error).toBe('Error al obtener contactos')
    expect(result.current.contacts).toEqual([])
  })

  it('crea un contacto con POST y JSON y recarga la lista', async () => {
    simular(() => respuesta({ contacts: [{ id: 2, name: 'Luis' }] }))
    const { result } = renderHook(() => useContacts(), { wrapper: envoltorio })
    await act(() => result.current.createContact({ name: 'Luis', phone: '1' }))
    const post = llamadas.find((c) => c.metodo === 'POST' && c.url === `${BASE}/contacts`)
    expect(JSON.parse(post.cuerpo)).toEqual({ name: 'Luis', phone: '1' })
    await waitFor(() => expect(result.current.contacts).toHaveLength(1))
  })

  it('actualiza con PUT y elimina con DELETE sobre el id correcto', async () => {
    simular(() => respuesta({ contacts: [] }))
    const { result } = renderHook(() => useContacts(), { wrapper: envoltorio })
    await act(() => result.current.updateContact(7, { name: 'Nuevo' }))
    await act(() => result.current.deleteContact(7))
    expect(llamadas.some((c) => c.metodo === 'PUT' && c.url === `${BASE}/contacts/7`)).toBe(true)
    expect(llamadas.some((c) => c.metodo === 'DELETE' && c.url === `${BASE}/contacts/7`)).toBe(true)
  })

  it('getContactById acepta el id como texto (viene de la URL) y devuelve null si no existe', async () => {
    simular(() => respuesta({ contacts: [{ id: 3, name: 'Eva' }] }))
    const { result } = renderHook(() => useContacts(), { wrapper: envoltorio })
    await act(() => result.current.getContacts())
    expect(result.current.getContactById('3')).toEqual({ id: 3, name: 'Eva' })
    expect(result.current.getContactById('99')).toBeNull()
  })
})
