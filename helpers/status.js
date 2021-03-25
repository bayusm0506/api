module.exports = {
  code_response: {
    success: "01",
    error: "02",
  },

  code: {
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
  },

  message: {
    success: "success",
    error: "error",
    not_found: "not_found",
  },

  description: {
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
  },

  response: (code, status, message, ress) => ({
    code: code,
    status: status,
    message: message,
    data: ress,
  }),
};
