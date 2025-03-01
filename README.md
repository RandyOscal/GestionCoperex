# GestionCoperex
API para gestionar la incorporacion de nuevos socios y empresas a su famosa feria "Interfer".


Para los filtros de las empresas se debe colocar los siguientes datos en el form-data de postman

Category:

(Tecnología, Energía Renovable, Educación, Salud)

Key         value
filter      category
value       Tecnología, Energía Renovable, Educación o Salud
order       asc/desc


impactLevel:

(ALTO, MEDIO, BAJO)

Key         value
filter      impactLevel
value       ALTO, MEDIO o BAJO
order       asc/desc


yearsOfExperience:

Key         value
filter      yearsOfExperience
order       asc/desc

name:

Key         value
filter      name
order       asc/desc


El reporte del excel se esta guardando en una carpeta de report dentro del src