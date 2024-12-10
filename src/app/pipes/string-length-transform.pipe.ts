import {Pipe, PipeTransform} from "@angular/core";

@Pipe ({
  standalone: true,
  name: 'stringLengthTransform'
})
export class StringLengthTransformPipe implements PipeTransform {
  transform(text: string): string {
    return  text.slice(0, 20) + '...';
  }
}
