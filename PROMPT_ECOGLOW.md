En el formulario de tu página web, cuando el cliente selecciona una profesional (ej. Nayareth) y una fecha (ej. 2026-09-25):
La web consulta a Google:


// Consulta qué horas están ocupadas
const checkAvailability = async (practitionerName: string, date: string) => {
  const res = await fetch(
    `${GOOGLE_SHEET_WEBHOOK_URL}?practitioner=${encodeURIComponent(practitionerName)}&date=${encodeURIComponent(date)}`
  );
  const result = await res.json();
  if (result.status === 'success') {
    setOccupiedHours(result.busyTimes); // Ejemplo: ["10:00", "15:00"]
  }
};
En los botones o selector de horas:
Si una hora está en la lista occupiedHours, el botón de esa hora se muestra en gris con la etiqueta "Ocupado" y no se puede presionar:

{AVAILABLE_HOURS.map((hour) => {
  const isOccupied = occupiedHours.includes(hour);
  return (
    <button
      key={hour}
      disabled={isOccupied}
      className={isOccupied ? "opacity-40 line-through cursor-not-allowed bg-stone-200" : "bg-white hover:bg-rose-50"}
    >
      {hour} {isOccupied && "(Ocupado)"}
    </button>
  );
})}
Al enviar la cita:
Si dos personas intentaran presionar el botón al mismo segundo, el doPost del script detecta el choque y devuelve status: 'conflict', mostrando un aviso amigable: "Este horario acaba de ser reservado, por favor elige otra hora".