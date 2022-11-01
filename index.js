// D:\personal\universidadAdventista\2DO SEMESTRE 2022\TECNOLOGIAS DE INTERNET\TAREAS_CLASROOM\sistemaFloat\3erParcialConcesionario\index.js
const indexedDB = window.indexedDB
// localizamos el formulario de #2
// const form = document.getElementById('form')

//agregando las tareas #4
// const tasks = document.getElementById('tasks')

//aumentamos la verificacion que exista form
if (indexedDB) {
  let db
  const request = indexedDB.open('caroy', 1) //base de datos
  //abrir base de datos
  request.onsuccess = () => {
    db = request.result
    console.log('OPEN', db)
    readData() // #4
  }

  //base de datos creada
  request.onupgradeneeded = () => {
    db = request.result
    console.log('Create', db)
    //crando almacenes
    const objectStore = db.createObjectStore('vehiculos', {
      //almacen
      // const objectStore2 = db.createObjectStore('tasks2')
      autoIncrement: true, // #3    [GENERAMOS EL ID AUTOMATICO DE ESTA FORMA]
      /**
       * COMO BUSCAR POR NUMERO ES COPLICADO PARA BASES DE DATOS GRANDES ES MEJOR USAR UN NUMERO DE CARNET O UN IDENTIFICADOR COMO VEREMOS EN LA SIGUIENTE MODIFICACION DEL CODIGO
       */
      // keyPath :  'taskTitle' /// 2da forma de ID
    })
  }

  //
  request.onerror = () => {
    console.log('Error', error)
  }
  /* //ponemos el formulario a la escucha #2
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        //creamos el objeto para almacenar los datos
        const data = {
            taskTitle: e.target.task.value,
            taskPriority: e.target.priority.value
        }
        console.log(data)
        addData(data)//#3 ejecutamos la funcion
    })
    */
  /*-------- */

  const $seleccionArchivos = document.querySelector('#seleccionArchivos'),
    $imagenPrevisualizacion = document.querySelector('#imagenPrevisualizacion')

  // Escuchar cuando cambie
  $seleccionArchivos.addEventListener('change', () => {
    // Los archivos seleccionados, pueden ser muchos o uno
    const archivos = $seleccionArchivos.files
    // Si no hay archivos salimos de la función y quitamos la imagen
    if (!archivos || !archivos.length) {
      $imagenPrevisualizacion.src = ''
      return
    }
    // Ahora tomamos el primer archivo, el cual vamos a previsualizar
    const primerArchivo = archivos[0]
    // Lo convertimos a un objeto de tipo objectURL
    const objectURL = URL.createObjectURL(primerArchivo)
    // Y a la fuente de la imagen le ponemos el objectURL
    $imagenPrevisualizacion.src = objectURL

    console.log(objectURL)
    // ----------------------------------------------------------------
    // console.log(blobGlobal);
    // -----------
    const form = document.getElementById('formRegistro')
    //ponemos el formulario a la escucha #2
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      // Obtener referencia al input y a la imagen
      const data = {
        registroMarca: e.target.marca.value,
        registroTipo: e.target.tipo.value,
        registroModelo: e.target.modelo.value,
        registroPrecio: e.target.precio.value,
        registroImagen: objectURL,
      }
      console.log(data)
      addData(data) //#3 ejecutamos la funcion
      form.reset()
    })
  })
  /*-------- */

  // para agregar elementos a nuestra base de datos esta es la funcion #3
  const addData = (data) => {
    const transaction = db.transaction(['vehiculos'], 'readwrite')
    const objectStore = transaction.objectStore('vehiculos')
    const request = objectStore.add(data)
    // readData() // #4
  }

  // para leer los elementos de nuestra base de datos esta es la funcion #4

  const readData = () => {
    const transaction = db.transaction(['vehiculos'], 'readonly')
    const objectStore = transaction.objectStore('vehiculos')
    const request = objectStore.openCursor()
    // #5 para imprimir los datos en pantalla
    // const fragment = document.createDocumentFragment()
    //inssertar datos al HTML
    var lista = document.getElementById('listaCarros')
    lista.innerHTML = "";
    request.onsuccess = (e) => {
      // en este caso tarjet es el cursor #4
      const cursor = e.target.result
      if (cursor) {
        // verifica que no este vacio
        console.log(cursor.value)
        // #5 para imprimir los datos en pantalla
        // const taskTitle = document.createElement('p')
        // taskTitle.textContent =cursor.value.taskTitle + ' - ' + cursor.value.taskPriority
        lista.innerHTML += "<div class='col my-2'><div class='card text-center'><button class='btn btn-light w-1' onclick='CompararFunc("+cursor.key+")'>Favorito</button><img src='auto.jp'class='card-img-top' alt='...'><div class='card-body'><h5 class='card-title'>"+cursor.value['registroMarca']+" </h5><p class='card-text'><span class='badge rounded-pill bg-info text-dark'> Precio: $"+cursor.value['registroPrecio']+" </span><span class='badge rounded-pill bg-secondary'>Modelo: "+cursor.value['registroModelo']+"</span><span class='badge bg-success'>Tipo: "+cursor.value['registroTipo']+"</span></p><a href='#' class='btn btn-primary'>Comparar</a></div></div></div>";
        // lista.innerHTML += "<div class='col my-2'><div class='card text-center'><button class='btn btn-light w-1' onclick='CompararFunc("+cursor.key+")'>Favorito</button><img src='"+cursor.value['registroImagen']+"'class='card-img-top' alt='...'><div class='card-body'><h5 class='card-title'>"+cursor.value['registroMarca']+" </h5><p class='card-text'><span class='badge rounded-pill bg-info text-dark'> Precio: $"+cursor.value['registroPrecio']+" </span><span class='badge rounded-pill bg-secondary'>Modelo: "+cursor.value['registroModelo']+"</span><span class='badge bg-success'>Tipo: "+cursor.value['registroTipo']+"</span></p><a href='#' class='btn btn-primary'>Comparar</a></div></div></div>";

        // fragment.appendChild(taskTitle)
        // const taskPriority = document.createElement('p')
        // taskPriority.textContent = cursor.value.taskPriority
        // fragment.appendChild(taskPriority)

        cursor.continue() //mientras haya elementos
      } else {
        console.log('No more data')
      
      }

      // console.log(e.target)
    }
  }
}
