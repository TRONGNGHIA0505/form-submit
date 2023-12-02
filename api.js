import { google } from 'googleapis';
const sheets = google.sheets("v4");



// Hàm chính không cần thêm async nếu bạn sử dụng callback
function sendDataToSheet(formData) {
  // ... Code trước đó để lấy formData

  // Chuyển đối tượng formData thành mảng giá trị
  const values = Object.values(formData);

  // Tạo dịch vụ Google Sheets
  const service = google.sheets({
    version: 'v4',
    auth: {
      client_email: "data-493@magnetic-lore-406710.iam.gserviceaccount.com",
      client_secret: "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",
    },
  });

  // Lấy dữ liệu hiện tại từ ô A1
  service.spreadsheets.values.get({
    spreadsheetId: "1KKsJ5X9nqbIBtry8Oe0WKk4U8ZbQAftzGtaiQ3sYq3s",
    range: "A1",
  }, (err, res) => {
    if (err) {
      console.error('Error getting current value:', err);
      return;
    }

    // Thêm dữ liệu mới vào mảng giá trị
    values.forEach((value, index) => {
      res.data.values[0][index] = value;
    });

    // Cập nhật dữ liệu trên Google Sheets
    service.spreadsheets.values.update({
      spreadsheetId: "1KKsJ5X9nqbIBtry8Oe0WKk4U8ZbQAftzGtaiQ3sYq3s",
      range: "A1",
      valueInputOption: 'USER_ENTERED', // Định dạng giá trị người dùng nhập
      resource: {
        values: [res.data.values[0]],
      },
    }, (err, res) => {
      if (err) {
        console.error('Error updating data:', err);
        return;
      }
      
      console.log('Data sent and updated successfully!');
    });
  });
}
