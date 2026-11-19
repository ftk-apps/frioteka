# Precios de las apps FRIOTEKA — cómo funciona

## Regla de oro
**Los precios están en un solo lugar: `precios.json`.**
Las 4 apps (Gestión, Preventista suelta, Catálogo clientes y Catálogo VIP) lo leen al abrirse.
Nunca se escriben precios adentro de los `.html`.

| Archivo | Para qué |
|---|---|
| `precios.json` | Lista vigente: congelados (P), lácteos (LAC), TOGO, y los datos de la lista (fecha, fuente, quién cargó, quién aprobó) |
| `precios-historial.json` | Registro de cada actualización: fecha, fuente, quién cargó, quién aprobó y cada precio que cambió (antes → después) |
| `precios.js` | Cargador que usan las 4 apps. Muestra abajo a la izquierda "Precios al dd/mm" (o un aviso amarillo si no pudo cargar) |

## Fuente de verdad
El **sistema de Fenovo / FRIOTEKA**, que tiene los precios minoristas y mayoristas.
Si una app no coincide con el sistema, la que está mal es la app.

## Roles
- **Encargado (carga):** Claude, cuando el administrador se lo pide ("actualizá los precios").
- **Responsable (aprueba):** el administrador. Nada se publica sin su OK.

## Procedimiento de actualización
1. El administrador pide la actualización.
2. El encargado entra al sistema Fenovo / FRIOTEKA y toma la lista de precios.
3. Arma el **informe de cambios** contra `precios.json`: qué sube, qué baja, qué es nuevo y qué se da de baja.
   - **Antes de nada**, avisa los productos que van **por balanza** (por ejemplo, las pizzitas TOGO), para que sistema y balanza se cambien juntos.
4. El responsable revisa y aprueba (o pide correcciones).
5. Con la aprobación, se actualizan `precios.json` (fecha, fuente, cargó, aprobó) y `precios-historial.json`. Después se publica.
6. En 1 o 2 minutos las 4 apps muestran la lista nueva y el cartel "Precios al dd/mm".

## Control
- Cada app muestra la fecha de la lista que está usando. Si una app muestra otra fecha, hay que recargarla (Ctrl + F5).
- Si la lista tiene más de 15 días, se pide una actualización.
- El Catálogo de clientes y el VIP no muestran la familia "Frutas y verduras al por mayor". Es a propósito, no es un error.
