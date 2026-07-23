-- Migración: agrega la plataforma específica al consumo de agua por pozos.
-- Ejemplos de valores: CV26-RIG-001, CV26-RIG-002.
-- Ejecutar una sola vez por cada base de datos.

ALTER TABLE c_ag_posos
ADD COLUMN plataforma_c_ag_ps VARCHAR(100) NULL
AFTER FK_ubicacion;