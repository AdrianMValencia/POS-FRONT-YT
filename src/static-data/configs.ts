// Módulo de clientes

export const tipoPersonas = [
    { value: 1, label: 'Persona Natural' },
    { value: 2, label: 'Persona Jurídica' }
];

export const generos = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' }
];

export const estadosMaritales = [
    { value: 'S', label: 'Soltero' },
    { value: 'C', label: 'Casado' },
    { value: 'V', label: 'Viudo' },
    { value: 'D', label: 'Divorciado' },
];

export const tipoDocumentos = [
    { value: 1, label: 'DNI' },
    { value: 2, label: 'C.E.' },
    { value: 3, label: 'Pasaporte' },
    { value: 4, label: 'RUC' },
    { value: 5, label: 'PTP' },
];

export const tipoDirecciones = [
    { value: 1, label: 'Domicilio' },
    { value: 2, label: 'Oficina' },
    { value: 3, label: 'Trabajo' }
];

export const tipoTelefonos = [
    { value: 1, label: 'Personal' },
    { value: 2, label: 'Casa' },
    { value: 3, label: 'Trabajo' }
];

export const tipoCorreosEletronicos = [
    { value: 1, label: 'Personal' },
    { value: 2, label: 'Trabajo' }
];

// Módulo de siniestros

export const ramos = [
    { value: 1, label: 'Accidentes personales' },
    { value: 2, label: 'Asistencia médica' }
];

export const productos = [
    { value: 1, label: 'Seguro Oncológico CHUBB' },
    { value: 2, label: 'Accidentes Personales CHUBB' },
    { value: 3, label: 'Accidentes CHUBB' }
];

export const monedas = [
    { value: "1", label: 'SOLES' },
    { value: "2", label: 'DÓLARES' }
];

export const brokers = [
    { value: 1, label: 'Arias & Asociados Corredores d' },
    { value: 2, label: 'Seguros Alvarado' },
    { value: 3, label: 'Encalada Corredores' }
];

// Módulo de usuarios

export const statesSelect = [
    { value: 1, label: 'Activo' },
    { value: 0, label: 'Inactivo' }
];

export const accessRoles = [
    { value: 1, label: 'Master' },
    { value: 2, label: 'Admin' },
    // { value: 3, label: 'Revisor' }
];

export const tipoUsuario = [
    { value: 1, label: 'Azure Active Directory'},
    { value: 2, label: 'Azure Active Directory B2C'}
];
//documento Facturador
export const tipoDocPago = [
    { value: '01', label: 'FACTURA' },
    { value: '02', label: 'RECIBO POR HONORARIOS' },
    { value: '03', label: 'BOLETA DE VENTA' },
    { value: '04', label: 'LIQUIDACION DE COMPRA' },
    { value: '05', label: 'BOLETO DE AVIACIÓN COMERCIAL PARA TRANSPORTE DE PASAJEROS' },
    { value: '09', label: 'TICKET O CINTA EMITIDO POR MÁQUINA REGISTRADORA' },
    { value: '99', label: 'OTROS DOCUMENTOS AUTORIZADOS POR LA SUNAT' }
]
export const mecanismoPago = [
    { value: 1, label: 'Paquete quirúrgico' },
]
export const tipoMecanismoPago = [
    { value: 1, label: 'Paquete quirúrgico' },
]
export const tipoIdentNota = [
    { value: 1, label: 'Nota de crédito' },
]
export const motivoNota = [
    { value: 1, label: 'Descuento parcial' },
]
export const indicadorFactGlobal = [
    { value: 1, label: 'Individual' },
]
//General
export const tipoAfiliacionPaciente = [
    { value: 1, label: 'SCTR' },
]

export const docAutorizacionPrestacion = [
    { value: 1, label: 'Solicitud de Chequeo Médico / SITEDS' },
]

export const tipoCoberturaPrestacion = [
    { value: 1, label: 'Hospitalaria' },
]

export const tipoProfesionalResponsable = [
    { value: 1, label: 'Colegio Médico del Perú' },
]

export const tipoHospitalizacion = [
    { value: 1, label: 'Hospitalización Quirúrgica, se efectúa un procedimiento quirúrgico o de naturaleza obstetricia (cesáreas).' },
]

export const tipoEgresoHospitalizacion = [
    { value: 1, label: 'Transferencia a otro establecimiento de IAFAS' },
]
//detalles factura


export const servicioExentoImpuesto = [
    { value: 1, label: 'Servicio No exonerado de Impuesto' },
]

export const codigoRubro = [
    { value: 1, label: 'Tratamiento paliativo y terapia del dolor' },
]
//farmacia factura
export const tipoProducto = [
    { value: 1, label: 'Medicamento o producto de origen biológico' },
]
export const catalogo = [
    { value: 1, label: 'Código de productos y servicios estándar de las Naciones Unidas (UNSPSC) según lo aprobado por la SUNAT.' },
]
export const tipoUnidadDispensacion = [
    { value: 1, label: 'Por empaque' },
]

export const productoExentoIgv = [
    { value: 1, label: 'Producto no exonerado de impuesto' },
]

export const meses = [
    {
        value: "01",
        label: "Enero"
    },
    {
        value: "02",
        label: "Febrero"
    },
    {
        value: "03",
        label: "Marzo"
    },
    {
        value: "04",
        label: "Abril"
    },
    {
        value: "05",
        label: "Mayo"
    },
    {
        value: "06",
        label: "Junio"
    },
    {
        value: "07",
        label: "Julio"
    },
    {
        value: "08",
        label: "Agosto"
    },
    {
        value: "09",
        label: "Setiembre"
    },
    {
        value: "10",
        label: "Octubre"
    },
    {
        value: "11",
        label: "Noviembre"
    },
    {
        value: "12",
        label: "Diciembre"
    }
]

