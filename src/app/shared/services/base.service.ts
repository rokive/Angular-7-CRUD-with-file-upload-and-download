import { Observable } from 'rxjs/Rx';
// INSTEAD of
//import 'rxjs/Observable';

export abstract class BaseService {  
    
    constructor() { }

    protected handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');
    console.log(applicationError);
    // either applicationError in header or model error in body
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    // var modelStateErrors: string = '';
    // var serverError = error.json();

    // if (!serverError.type) {
    //   for (var key in serverError) {
    //     if (serverError[key])
    //       modelStateErrors += serverError[key] + '\n';
    //   }
    // }

    // modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    // return Observable.throw(modelStateErrors || 'Server error');
    return Observable.throw(error || 'Server error');
  }

  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  
  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);
  
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}