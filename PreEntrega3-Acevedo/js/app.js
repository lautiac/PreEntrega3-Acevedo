function guardarProductosEnLocalStorage (producto) {
    
    const productosEnLS = localStorage.getItem("productos");
    
    if(productosEnLS !== null) {

        const productos = JSON.parse(productosEnLS);

        const indiceProductosEncontrado = productos.findIndex( (elemento) => {
            return elemento.nombre === producto.nombre;
        });

        //Piso la cantidad por la que tiene el nuevo producto
        productos[indiceProductosEncontrado].cantidad = producto.cantidad;

        //Cambio de nuevo el localStorage
        localStorage.setItem("productos", JSON.stringify(productos));

        //Renderizo la tabla
        renderizarTabla(productos);
    }
}
function renderizarTabla (productos) {

    const bodyTabla = document.getElementById("body_productos");

    //Limpio el body de la tabla
    bodyTabla.innerHTML = "";

    for(const producto of productos) {

        //Creo las filas y columnas de la tabla mediante DOM
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.innerText = producto.nombre;

        const td2 = document.createElement("td");
        td2.innerText = producto.cantidad;

        const td3 = document.createElement("td");

        const botonSumarCantidad = document.createElement("button");
        botonSumarCantidad.innerText = "+";
        const botonRestarCantidad = document.createElement("button");
        botonRestarCantidad.innerText = "-";

        //Agrego evento a los botones
        botonSumarCantidad.addEventListener("click", () => {
            producto.cantidad += 1;

            guardarProductosEnLocalStorage(producto);
        });

        botonRestarCantidad.addEventListener("click", () => {
            producto.cantidad -= 1;

            guardarProductosEnLocalStorage(producto);
        });

        //Agrego la columna para sumar la cantidad de productos a comprar
        td3.append(botonSumarCantidad);
        td3.append(botonRestarCantidad);

        tr.append(td1);
        tr.append(td2);
        tr.append(td3);

        bodyTabla.append(tr);
    }
}

let productos = [];

//Confirmo si tengo productos en el localStorage
const productosStorage = localStorage.getItem("productos");

if(productosStorage !== null) {
    productos = JSON.parse(productosStorage);
}

//Detecto el evento SUBMIT del formulario
const formAgregarProducto = document.getElementById("formulario_agregar_producto");

formAgregarProducto.addEventListener("submit", (e) => {

    e.preventDefault();

    //Obtengo el nombre y la cantidad de los productos ingresados
    const inputNombreProducto = document.getElementById("nombre_producto");
    const inputCantidadProducto = document.getElementById("cantidad_producto");

    const nombreProducto = inputNombreProducto.value;
    const cantidadProducto = inputCantidadProducto.value;

    //Limpio los inputs
    inputNombreProducto.value = "";
    inputCantidadProducto.value = "";

    //Agrego los productos al array y despues al localStorage
    productos.push({
        nombre: nombreProducto,
        cantidad: Number(cantidadProducto),
    });

    localStorage.setItem("productos", JSON.stringify(productos)); 

    //Renderizo la tabla
    renderizarTabla(productos);
})

//Renderizo los productos
renderizarTabla(productos);