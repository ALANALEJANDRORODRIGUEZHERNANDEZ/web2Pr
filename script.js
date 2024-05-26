document.querySelector('#botonSeleccionar').addEventListener('click', function () {
  document.querySelector('#inputArchivo').click();
});

document.querySelector('#inputArchivo').addEventListener('change', function (e) {
  const archivo = e.target.files[0];
  if (archivo) {
    leerCSV(archivo);
  } else {
    alert('Por favor, selecciona un archivo CSV.');
  }
});

document.querySelector('#botonLeer').addEventListener('click', function () {
  mostrarTabla();
});

document.querySelector('#botonEliminarTodo').addEventListener('click', function () {
  const confirmar = confirm('¿Estás seguro de que deseas eliminar todos los datos?');
  if (confirmar) {
    document.querySelectorAll('#tablaCSV tbody tr').forEach(tr => tr.remove());
    document.querySelector('#tablaCSV').style.display = 'none';
  }
});

document.querySelector('#botonAgregarDatos').addEventListener('click', function () {
  mostrarTabla();
  insertarDatos();
});

function leerCSV(archivo) {
  const lector = new FileReader();
  lector.onload = function (e) {
    const datosCSV = e.target.result;
    parsearCSV(datosCSV);
    mostrarMenuSecundario();
  };
  lector.readAsText(archivo);
}

function parsearCSV(datosCSV) {
  const filas = datosCSV.trim().split('\n').map(fila => fila.split(',').map(columna => columna.trim()));
  const cuerpoTabla = document.querySelector('#tablaCSV tbody');
  cuerpoTabla.innerHTML = '';

  filas.forEach((columnas, index) => {
    const tr = document.createElement('tr');
    columnas.forEach((valorColumna, columnIndex) => {
      const td = document.createElement('td');
      td.textContent = valorColumna;
      td.contentEditable = true;
      tr.appendChild(td);
    });


    if (index !== 0) {
      const celdaEliminar = document.createElement('td');
      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.classList.add('botonEliminar');
      botonEliminar.onclick = () => tr.remove();
      celdaEliminar.appendChild(botonEliminar);
      tr.appendChild(celdaEliminar);
    }

    cuerpoTabla.appendChild(tr);
  });
}

function mostrarTabla() {
  document.querySelector('#tablaCSV').style.display = 'table';
}

function insertarDatos() {
  const numColumnas = document.querySelectorAll('#tablaCSV tbody tr:first-child td').length;
  const cuerpoTabla = document.querySelector('#tablaCSV tbody');
  const nuevaFila = document.createElement('tr');

  for (let i = 0; i < numColumnas; i++) {
    const td = document.createElement('td');
    td.contentEditable = true;
    nuevaFila.appendChild(td);
  }

  const celdaEliminar = document.createElement('td');
  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.classList.add('botonEliminar');
  botonEliminar.onclick = () => nuevaFila.remove();
  celdaEliminar.appendChild(botonEliminar);
  nuevaFila.appendChild(celdaEliminar);

  cuerpoTabla.appendChild(nuevaFila);
}

function mostrarMenuSecundario() {
  document.querySelector('#menuInicial').style.display = 'none';
  document.querySelector('#menuSecundario').style.display = 'block';

}