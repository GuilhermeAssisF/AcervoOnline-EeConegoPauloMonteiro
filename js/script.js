document.getElementById("donateBtn").addEventListener("click", function () {
    
});

// Função para carregar e exibir dados da planilha do Google Sheets
function loadGoogleSheetData() {
    const spreadsheetId = '1QGOKxZN1cOIVS9kpoi-gmk_hjBa4sg_zq7zTvLRBwQI';
    const sheetId = 0;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'acoes' // Substitua pelo nome da aba que você deseja ler
    }).then(function(response) {
        const data = response.result.values;
        const tableBody = document.querySelector('#actions-table tbody');

        // Limpe qualquer conteúdo existente na tabela
        tableBody.innerHTML = '';

        // Preencha a tabela com os dados da planilha
        data.forEach(function(row, rowIndex) {
            const rowData = row.map(item => item || ''); // Lida com valores nulos ou indefinidos

            const tableRow = document.createElement('tr');
            rowData.forEach(function(cellData, colIndex) {
                const cell = document.createElement('td');
                cell.textContent = cellData;

                // Adiciona uma classe específica para cada coluna
                cell.classList.add(`col-${colIndex}`);

                tableRow.appendChild(cell);
            });

            tableBody.appendChild(tableRow);
        });
    });
}



// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyDMdbZJbe47RIdRSx3bkUoJVog7kMwNcf0',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetData();
    });
}

// Carrega a API do Google Sheets e inicia a aplicação
gapi.load('client', initGoogleSheetsApi);









