interface RolUser {
    ADMINISTRADOR: string;
    USUARIO: string;
}

const ROL: RolUser = {
    ADMINISTRADOR: 'ADMINISTRADOR',
    USUARIO: 'USUARIO'
}

Object.freeze(ROL);

export default ROL;