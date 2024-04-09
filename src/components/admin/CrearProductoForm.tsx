import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Categoria } from "../../types";
import { pezumartApi } from "../../api/pezumartApi";

import "../../scss/admin/crearProductoForm.scss";
import AvatarEditor from "react-avatar-editor";
import { toast } from "react-toastify";
import { base64ToFile, obtenerExtencionDeUnBase64 } from "../../helpers/images";

interface Imagenes {
    imagen1: string;
    imagen2: string;
    imagen3: string;
}

interface CrearProductoFormProps {
    setModalActivo: React.Dispatch<React.SetStateAction<boolean>>;
    setProductos: React.Dispatch<React.SetStateAction<any[]>>;
    setTotalPaginas: React.Dispatch<React.SetStateAction<number>>;
    setPaginaActual: React.Dispatch<React.SetStateAction<number>>;
    setProductosTotales: React.Dispatch<React.SetStateAction<number>>;
}

const CrearProductoForm = ({ setModalActivo, setProductos, setPaginaActual, 
  setProductosTotales, setTotalPaginas } : CrearProductoFormProps) => {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [imagenObj, setImagenObj] = useState<Imagenes>({
    imagen1: "",
    imagen2: "",
    imagen3: "",
  });

  const imagenAjustada1 = useRef<AvatarEditor>(null);
  const imagenAjustada2 = useRef<AvatarEditor>(null);
  const imagenAjustada3 = useRef<AvatarEditor>(null);

  useEffect(() => {
    const obtenerCategorias = async () => {
      const response = await pezumartApi.get("/categoria/listar");
      const data = await response.data;
      setCategorias(data);
    };

    obtenerCategorias();
  }, []);

  const obtenerProductos = async () => {
    const { data } = await pezumartApi.get('/producto/listar')

    setProductos(data.content)
    setTotalPaginas(data.totalPages)
    setPaginaActual(data.pageable.pageNumber)
    setProductosTotales(data.totalElements)
  }

  const handleChangeImagenes = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if(file) {
        const reader = new FileReader()
        reader.onloadend = () => {
            const imageDataUrl = reader.result as string
            setImagenObj((prevImagenObj) => ({
                ...prevImagenObj,
                [e.target.name]: imageDataUrl,

            }));
        }
        reader.readAsDataURL(file)
    }

    
  };

  const handleSubmitFormulario = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const contenido = e.target as HTMLFormElement

    const nombre: string = contenido.nombre.value
    const descripcion: string = contenido.descripcion.value
    const categoria = +contenido.categoria.value
    const disponible = contenido.disponible.value === "true" ? true : false
    const precio = +contenido.precio.value
    const cantidad = +contenido.cantidad.value
    
    const imagen1 = imagenAjustada1.current?.getImageScaledToCanvas().toDataURL() as string
    const imagen2 = imagenAjustada2.current?.getImageScaledToCanvas().toDataURL() as string
    const imagen3 = imagenAjustada3.current?.getImageScaledToCanvas().toDataURL() as string        
    

    if(nombre === "" || descripcion === "" || categoria < 0 || precio < 0 || cantidad < 0
        || imagen1 === undefined || imagen2 === undefined || imagen3 === undefined) {
        toast("Todos los campos son obligatorios");
        return;
    }

    if(nombre.length < 3 || nombre.length > 30) {
        toast("El nombre debe tener entre 3 y 30 caracteres");
        return;
    }

    if(descripcion.length < 3 || descripcion.length > 300) {
        toast("La descripción debe tener entre 3 y 300 caracteres");
        return;
    }

    const extencionImagen1 = obtenerExtencionDeUnBase64(imagen1)
    const extencionImagen2 = obtenerExtencionDeUnBase64(imagen2)
    const extencionImagen3 = obtenerExtencionDeUnBase64(imagen3)

    const imagenBlob1 = base64ToFile(
        imagen1, 
        `${nombre}-1.${extencionImagen1.split("/")[1]}`, 
        extencionImagen1
    )
    const imagenBlob2 = base64ToFile(
        imagen2, 
        `${nombre}-2.${extencionImagen2.split("/")[1]}`, 
        extencionImagen2
    )
    const imagenBlob3 = base64ToFile(
        imagen3, 
        `${nombre}-3.${extencionImagen3.split("/")[1]}`, 
        extencionImagen3
    )

    const producto = JSON.stringify({
        nombre,
        descripcion,
        categoriaId: categoria,
        disponible,
        precio,
        cantidadDisponible: cantidad
    })

    crearProducto([imagenBlob1, imagenBlob2, imagenBlob3], producto)

  }

  const crearProducto = async (files: File[], producto: string) => {
    const productoData = new Blob([producto], { type: 'application/json' })
    const formData = new FormData()
    formData.append("producto", productoData);
    files.forEach((file) => {
        formData.append("files", file);
    });

    const response = await pezumartApi.post("/producto/crear", formData)

    if(response.status === 201) {
        const data = response.data
        
        toast.success(data.mensaje)
        setModalActivo(false)
        setImagenObj({
            imagen1: "",
            imagen2: "",
            imagen3: ""
        })

        obtenerProductos()
    } else {
        toast.error("Ocurrió un error al crear el producto")
    }
  }

  return (
    <form className="producto-form" onSubmit={handleSubmitFormulario}>
      <div className="producto-form__informacion">
        <div className="producto-form__campo">
          <label className="producto-form__label" htmlFor="nombre">
            Nombre:
          </label>
          <input className="producto-form__input" name="nombre" type="text" id="nombre" />
        </div>

        <div className="producto-form__campo">
          <label className="producto-form__label" htmlFor="descripcion">
            Descripción:
          </label>
          <textarea
            className="producto-form__textarea"
            id="descripcion"
            name="decripcion"
          ></textarea>
        </div>

        <div className="producto-form__campo">
          <label className="producto-form__label" htmlFor="categoria">
            Categoria:
          </label>
          <select className="producto-form__select" name="categoria" id="categoria">
            {categorias?.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="producto-form__campo">
          <label className="producto-form__label" htmlFor="disponible">
            Disponible:
          </label>

          <select name="disponible" className="producto-form__select" id="disponible">
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="producto-form__campo">
          <label className="producto-form__label" htmlFor="precio">
            Precio:
          </label>
          <input name="precio" className="producto-form__input" step="0.01" min="0" type="number" id="precio" />
        </div>

        <div className="producto-form__campo">
          <label className="producto-form__label" htmlFor="cantidad">
            Cantidad Disponible:
          </label>
          <input name="cantidad" className="producto-form__input" type="number" id="cantidad" />
        </div>

        <input
          className="producto-form__submit"
          type="submit"
          value="Publicar Producto"
        />
      </div>

      <div className="producto-form__imagenes">
        <div className="producto-form__imagen">
          <label className="producto-form__label" htmlFor="imagen1">
            Imagen 1:
          </label>
          <input
            className="producto-form__file"
            onChange={handleChangeImagenes}
            name="imagen1"
            id="imagen1"
            type="file"
          />

            {imagenObj?.imagen1 && (
                <AvatarEditor 
                ref={imagenAjustada1}

                image={imagenObj?.imagen1}
                width={400}
                height={400}
                border={50}
                color={[255, 255, 255, 0.6]}
                scale={1.2}
                rotate={0}
                />
            )}
        </div>
        <div className="producto-form__imagen">
          <label className="producto-form__label" htmlFor="imagen2">
            Imagen 2:
          </label>
          <input
            className="producto-form__file"
            onChange={handleChangeImagenes}
            id="imagen2"
            name="imagen2"
            type="file"
          />

            {imagenObj?.imagen2 && (
                <AvatarEditor 
                ref={imagenAjustada2}

                image={imagenObj?.imagen2}
                width={400}
                height={400}
                border={50}
                color={[255, 255, 255, 0.6]}
                scale={1.2}
                rotate={0}
                />
            )}
        </div>
        <div className="producto-form__imagen">
          <label className="producto-form__label" htmlFor="imagen3">
            Imagen 3:
          </label>
          <input
            className="producto-form__file"
            onChange={handleChangeImagenes}
            id="imagen3"
            name="imagen3"
            type="file"
          />

            {imagenObj?.imagen3 && (
                <AvatarEditor 
                ref={imagenAjustada3}

                image={imagenObj?.imagen3}
                width={400}
                height={400}
                border={50}
                color={[255, 255, 255, 0.6]}
                scale={1.2}
                rotate={0}
                />
            )}
        </div>
      </div>
    </form>
  );
};

export default CrearProductoForm;
