import {Pipe} from "@angular/core";

@Pipe({
  standalone: true,
  name: 'phoneTransform'
})

export class PhoneTransformPipe {
  transform(text: string): string {
    return text.replace(/-/g, "");
  }
}
