import { files } from 'dropbox/types/dropbox_types';
import loIsNumber from 'lodash/isNumber';

// ---

export interface ErrorType {
  error: any
  error_summary: string
}

export function isErrorType(data: any): data is ErrorType {
  return !!data?.error && !!data?.error_summary
}

// ---

type MetadataType = files.Metadata;

export function isMetadataType(data: any): data is MetadataType {
  if (!data) return false;
  return data?.name;
}

// ---

export type WriteModeType = files.WriteMode

// ---

type FileMetadataType = files.FileMetadata;

export function isFileMetadataType(data: any): data is FileMetadataType {
  if (!isMetadataType(data)) return false;
  const dataNext = data as FileMetadataType;
  return !!dataNext.id
    && !!dataNext.client_modified
    && !!dataNext.server_modified
    && !!dataNext.rev
    && loIsNumber(dataNext.size);
}
