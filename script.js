const SECCION_HAMBURGUESA = document.getElementById('productoHamburguesas');
const SECCION_PIZZA = document.getElementById('productoPizzas');
const SECCION_OTROS = document.getElementById('productosOtros');

const LISTA = document.getElementById('lista-menu');
const SHEET_ID = "?";
const ACCESS_TOKEN =
  "?";

fetch(
  // Obtenemos los datos de la planilla, de la hoja hojaMenu, columnas A y B desde la segunda fila
  `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/menu!A1:D`,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  }
).then(function (response) {
  if (response.status >= 400) {
    alert('NO SE PUDO CONECTAR')
  }
  response.json().then((data) => {
    localStorage = data.json;
    const VALORES = data.values;
    consultarTipo(VALORES);
    console.log(localStorage);
  });
})

function consultarTipo(dato) {
  for (x = 0; x < dato.length; x++) {
    if (dato[x][0] === "HAMBURGUESA") {
      document.getElementById('hamburguesas').hidden = false;
      document.getElementById('hamburguesas').innerHTML = "HAMBURGUESAS";
      SECCION_HAMBURGUESA.innerHTML += devolverProduvto(dato[x]);
      console.log(dato[x])
    }
    else if (dato[x][0] === "PIZZA") {
      document.getElementById('pizzas').hidden = false;
      document.getElementById('pizzas').innerHTML = "PIZZAS";
      SECCION_PIZZA.innerHTML += devolverProduvto(dato[x]);
    }
    else if (dato[x][0] === "OTROS") {
      document.getElementById('otros').hidden = false;
      document.getElementById('otros').innerHTML = "OTROS";
      SECCION_OTROS.innerHTML += devolverProduvto(dato[x]);
    }
  }
}

function devolverProduvto(Producto) {
  return `<div class="item"><span class="nombre">${Producto[1]}</span>${devolverPrecio(Producto)}${devolverDescripcion(Producto)}</div>`;
}

function devolverPrecio(Precio) {
  return `<span class="precios">${Precio[3]}</span>`;
}

function devolverDescripcion(Descripcion) {
  return `<p>${Descripcion[2]}</p>`;
}