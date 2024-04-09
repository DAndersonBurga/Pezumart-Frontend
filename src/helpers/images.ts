export function base64ToFile(base64: string, fileName: string, mimeType: string): File {
  const byteNumbers = new Array(base64.length);
  for (let i = 0; i < base64.length; i++) {
      byteNumbers[i] = base64.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const file = new File([byteArray], fileName, { type: mimeType });
  return file;
}

export function obtenerExtencionDeUnBase64(base64: string): string {
  return base64.split(';')[0].split(':')[1]
} 