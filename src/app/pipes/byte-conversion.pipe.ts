import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteConversion'
})
export class ByteConversionPipe implements PipeTransform {

  transform(value: any): string {
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (value === 0) return 'n/a'
    const i: number = parseInt(Math.floor(Math.log(value) / Math.log(1024)).toString())
    if (i === 0) return `${value} ${sizes[i]}`
    return `${(value / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
  }

}