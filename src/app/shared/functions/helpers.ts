import { formatDate } from '@angular/common';

export function convertDateToRequest(date, format: 'date' | 'datetime' | 'periodo') {
    switch (format) {
        case "date":
            return date == null ? null : formatDate(new Date(date), 'yyyy-MM-dd', 'en-ES');
        case "periodo":
            return date == null ? null : formatDate(new Date(date), 'yyyy-MM', 'en-US');
        case "datetime":
            return date == null ? null : formatDate(new Date(date), 'yyyy-MM-dd hh:mm:ss', 'en-US');

    }
}

export function toBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}