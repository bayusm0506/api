const code_response = {
  success: "01",
  error: "02",
}

const code = {
  success: 200,
  created: 201,
  accepted: 201,
  nocontent: 204,
  moved: 301,
  bad: 400,
  unauthorized: 401,
  forbidden: 403,
  notfound: 404,
  conflict: 409,
  error: 500,
}

const message = {
  success: "success",
  error: "error",
  not_found: "not_found",
}

const description = {
  DASHBOARD: "Dashboard",
  VIEW: "Data berhasil ditampilkan",
  CREATE: "Data berhasil dibuat",
  UPDATE: "Data berhasil diperbarui",
  DELETE: "Data berhasil dihapus",
  VALIDATE: "Validasi Payload",
  INSERT_FAILED: "Data Gagal di Input",
  UPDATE_FAILED: "Data Gagal di Perbarui",
  DELETE_FAILED: "Data Gagal di Hapus",
  DATA_NOT_FOUND: "Data Tidak di Temukan",
}

module.exports = {
  code_response: code_response,
  code: code,
  message: message,
  description: description,

  response: (code, status, message, ress) => ({
    code: code,
    status: status,
    message: message,
    data: ress,
  }),

  response_success: (desc, data) => ({
    code: code_response.success,
    status: message.success,
    message: data,
    data: ress,
  }),

  response_error: (desc) => ({
    code: code_response.error,
    status: message.error,
    message: desc,
  }),

  response_validation: (ress) => ({
    code: code_response.error,
    status: message.error,
    message: description.VALIDATE,
    data: ress,
  }),
};
