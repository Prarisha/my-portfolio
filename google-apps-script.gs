function doGet() {
  return ContentService.createTextOutput('Contact form endpoint is ready.');
}

function doPost(e) {
  try {
    const spreadsheetId = '1_-HfgfRtLz9JtI4_WwnSCaVapP95JWy9wXjwgBNhWXI';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheets()[0];
    const timestamp = new Date();
    const name = e.parameter.name || '';
    const email = e.parameter.email || '';
    const message = e.parameter.message || '';

    sheet.appendRow([timestamp, name, email, message]);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      timestamp: timestamp.toISOString(),
      name: name,
      email: email,
      message: message
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
