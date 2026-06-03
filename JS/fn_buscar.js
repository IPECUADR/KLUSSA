        function doSearch()

        {

            const tableReg = document.getElementById('datatable');

            const searchText = document.getElementById('searchTerm').value.toLowerCase();

            let total = 0;

 

            // Recorremos todas las filas con contenido de la tabla

            for (let i = 1; i < tableReg.rows.length; i++) {

                // Si el td tiene la clase "noSearch" no se busca en su cntenido

                if (tableReg.rows[i].classList.contains("noSearch")) {

                    continue;

                }

 

                let found = false;

                const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');

                // Recorremos todas las celdas

                for (let j = 0; j < cellsOfRow.length && !found; j++) {

                    const compareWith = cellsOfRow[j].innerHTML.toLowerCase();

                    // Buscamos el texto en el contenido de la celda

                    if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {

                        found = true;

                        total++;

                    }

                }

                if (found) {

                    tableReg.rows[i].style.display = '';

                } else {

                    // si no ha encontrado ninguna coincidencia, esconde la

                    // fila de la tabla

                    tableReg.rows[i].style.display = 'none';

                }

            }

 

            // mostramos las coincidencias

            const lastTR=tableReg.rows[tableReg.rows.length-1];

            const td=lastTR.querySelector("td");

            lastTR.classList.remove("hide", "red");

            if (searchText == "") {

                lastTR.classList.add("hide");

            } else if (total) {

                $('#res_busqueda').empty();



                mensaje ="Se ha encontrado "+total+" coincidencia"+((total>1)?"s":"");
   
            

                $('#res_busqueda').append(mensaje);




            } else {

                

                
                $('#res_busqueda').empty();


                mensaje ="No se han encontrado coincidencias";

                $('#res_busqueda').append(mensaje);


            }

        }





        ///// BUSCADOR FECHAS 





        function buscador()

        {

            const tableReg = document.getElementById('datatable2');

            const searchText = document.getElementById('buscador').value.toLowerCase();

            let total = 0;

 

            // Recorremos todas las filas con contenido de la tabla

            for (let i = 1; i < tableReg.rows.length; i++) {

                // Si el td tiene la clase "noSearch" no se busca en su cntenido

                if (tableReg.rows[i].classList.contains("noSearch")) {

                    continue;

                }

 

                let found = false;

                const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');

                // Recorremos todas las celdas

                for (let j = 0; j < cellsOfRow.length && !found; j++) {

                    const compareWith = cellsOfRow[j].innerHTML.toLowerCase();

                    // Buscamos el texto en el contenido de la celda

                    if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {

                        found = true;

                        total++;

                    }

                }

                if (found) {

                    tableReg.rows[i].style.display = '';

                } else {

                    // si no ha encontrado ninguna coincidencia, esconde la

                    // fila de la tabla

                    tableReg.rows[i].style.display = 'none';

                }

            }

 

            // mostramos las coincidencias

            const lastTR=tableReg.rows[tableReg.rows.length-1];

            const td=lastTR.querySelector("td");

            lastTR.classList.remove("hide", "red");

            if (searchText == "") {

                lastTR.classList.add("hide");

            } else if (total) {

                $('#res_busqueda_2').empty();



                mensaje ="Se ha encontrado "+total+" coincidencia"+((total>1)?"s":"");
   
            

                $('#res_busqueda_2').append(mensaje);




            } else {

                

                
                $('#res_busqueda_2').empty();


                mensaje ="No se han encontrado coincidencias";

                $('#res_busqueda_2').append(mensaje);


            }

        }

        // buscador  residuos 


$('#buscar_residuo').on('input', function () {

    const searchText = $(this).val().toLowerCase();
    let total = 0;

    $('#tabla_res tbody tr').each(function () {

        // ignorar filas con noSearch
        if ($(this).hasClass('noSearch')) return;

        const row = $(this);
        let found = false;

        row.find('td').each(function () {
            if ($(this).text().toLowerCase().includes(searchText)) {
                found = true;
                return false; // break
            }
        });

        row.toggle(found);
        if (found) total++;
    });

    // Mostrar mensaje
    const resultado = $('#res_busqueda').empty();

    if (searchText === '') return;

    if (total > 0) {
        resultado.append(`
            <span class="badge bg-success mt-2 fs-6 p-2 mb-3 ms-2">
                Consulta completada: ${total} registro${total > 1 ? "s" : ""} encontrado${total > 1 ? "s" : ""}.
            </span>
        `);
    } else {
        resultado.append(`
            <span class="badge bg-danger mt-2 fs-6 p-2 mb-3 ms-2">
                No se encontraron coincidencias.
            </span>
        `);
    }
});
