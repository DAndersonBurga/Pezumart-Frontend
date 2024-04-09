export type Categoria = {
    id: number
    nombre: string
    imagen: string
}

export type UserData = {
    sub: string
    nombre: string
    rol: string
    imagen: string
}

export type Rol = {
    id: number
    rol: string
}

export type PageableUsuario = {

    content: TypeUsuario[]
    pageable: {
        sort: {
            sorted: boolean
            unsorted: boolean
            empty: boolean
        }
        pageNumber: number
        pageSize: number
        offset: number
        paged: boolean
        unpaged: boolean
    }
    last: boolean
    totalElements: number
    totalPages: number
    size: number
    number: number
    sort: {
        sorted: boolean
        unsorted: boolean
        empty: boolean
    }
    numberOfElements: number
    first: boolean
    empty: boolean
}

export type TypeUsuario = {
    id: number
    nombreCompleto: string
    imagenUrl: string
    nombreImagen: string
    telefono: string
    direccion: string
    correo: string
    coordenadas: string
    rol: Rol,
}

export type PageableProducto = {

    content: TypeUsuario[]
    pageable: {
        sort: {
            sorted: boolean
            unsorted: boolean
            empty: boolean
        }
        pageNumber: number
        pageSize: number
        offset: number
        paged: boolean
        unpaged: boolean
    }
    last: boolean
    totalElements: number
    totalPages: number
    size: number
    number: number
    sort: {
        sorted: boolean
        unsorted: boolean
        empty: boolean
    }
    numberOfElements: number
    first: boolean
    empty: boolean
}

export type Producto = {
    id: number
    nombre: string
    descripcion: string
    categoria: Categoria
    disponible: boolean
    precio: number
    cantidadDisponible: number
    fechaCreacion: Date
    usuario: {
        imagenUrl: string
        nombreCompleto: string
    }
    imagenes: ImagenProducto[]
}

export type ProductoDetalle = {
    autor: Autor
    cantidadDisponible: number
    categoriaId: number
    descripcion: string
    disponible: boolean
    fechaCreacion: Date
    id: number
    imagenes: ImagenDetalle[]
    nombre: string
    precio: number
}

export type Autor = {
    id: number
    imagen: string
    nombre: string
    telefono: String
}

export type ImagenDetalle = {
    id: number,
    nombreImagen: string
    url: string
}


export type ImagenProducto = {
    id: number
    nombreImagen: string
    imagenUrl: string
}

export type UsuarioProducto = {
    nombreCompleto: string
    imagenUrl: string
}

export type ProductoDestacado = {
    id: number
    producto: Producto
  }