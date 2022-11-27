import { UseToastOptions } from '@chakra-ui/react';

export const GOOGLE_SPREADSHEETS_URL = 'https://docs.google.com/spreadsheets/d'
/** книга 'app-asau170' */
export const ASAU170_SPREADSHEET_ID = '1o-QzhaOdAaXxjnw93MCZM5VJGFB-_2_dbazbj3hlf-o';

/** количество рядов над данными - заголовок и пр. */
export const CONF_NODATA_ROWS_COUNT = 1;

/** *п-список (см. понятие [221123113251]) */
export const SHEET_PRODUCTS_INFO = {
  name: 'products',
  sheetId: 0
}

export const SHEET_PRODUCTS_CHECK_COLUMN = {
  columnIndex: 1
}

export const toastSuccess: UseToastOptions = {
  status: 'success',
  title: 'success',
  position: 'top',
  duration: 1000
}
export const toastError: UseToastOptions = {
  status: 'error',
  title: 'error',
  position: 'top'
}
