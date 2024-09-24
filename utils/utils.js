import { fileURLToPath } from 'url';
import path from 'path';

/**
 * Obtém o caminho do arquivo atual a partir de import.meta.url
 * @param {string} metaUrl - import.meta.url do módulo chamador
 * @returns {string} Caminho absoluto do arquivo
 */
export function getFilename(metaUrl) {
    return fileURLToPath(metaUrl);
}

/**
 * Obtém o diretório atual a partir de import.meta.url
 * @param {string} metaUrl - import.meta.url do módulo chamador
 * @returns {string} Caminho absoluto do diretório
 */
export function getDirname(metaUrl) {
    return path.dirname(fileURLToPath(metaUrl));
}
