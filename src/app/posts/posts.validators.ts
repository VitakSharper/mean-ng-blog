import {FormControl} from '@angular/forms';
import {Observable, Observer, of} from 'rxjs';

export class PostsValidators {

  static mimeType(control: FormControl): Observable<{ [key: string]: boolean }> | Promise<{ [key: string]: boolean }> {

    if (+(control.value.size / 1024).toFixed(2) > 2048) {
      return of({invalidMimeType: true});
    }

    if (typeof (control.value) === 'string') {
      return of(null);
    }

    const file = control.value as File;
    const fileReader = new FileReader();

    return new Observable((observer: Observer<{ [key: string]: boolean }>) => {
      fileReader.addEventListener('loadend', () => {
        const arr = new Uint8Array(fileReader.result as Uint8Array).subarray(0, 4);
        const header = arr.reduce((acc, value) => acc + value.toString(16), '');
        let isValid = false;
        switch (header) {
          case '89504e47':
            isValid = true;
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
          case 'ffd8ffe3':
          case 'ffd8ffe8':
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({invalidMimeType: true});
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    });
  }
}
