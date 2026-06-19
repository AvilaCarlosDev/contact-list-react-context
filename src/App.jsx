import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";
import Contact from "./views/Contact";
import AddContact from "./views/AddContact";

function App() {
  return (
    // El ContactProvider envuelve todo para que todas las vistas accedan al contexto
    <ContactProvider>
      <BrowserRouter>
        <Routes>
          {/* Vista principal: lista de contactos */}
          <Route path="/" element={<Contact />} />

          {/* Vista para agregar un nuevo contacto */}
          <Route path="/add-contact" element={<AddContact />} />

          {/* Vista para editar un contacto existente */}
          <Route path="/edit-contact/:id" element={<AddContact />} />
        </Routes>
      </BrowserRouter>
    </ContactProvider>
  );
}

export default App;
