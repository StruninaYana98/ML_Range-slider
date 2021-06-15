type Listener = (arument?:any)=>any

interface IEventSubscribers{
  [key:string]:Listener[],
}

class EventEmitter {
 private _eventsSubscribersScore:IEventSubscribers
  constructor() {
   this._eventsSubscribersScore={}
  }
  on(evt:string, listener:Listener):void {
    (this._eventsSubscribersScore[evt] || (this._eventsSubscribersScore[evt] = [])).push(listener);
   // return this;
  }
  emit(evt:string, arg:any):void {
    (this._eventsSubscribersScore[evt] || []).slice().forEach((lsn) => lsn(arg));
  }
}
export { EventEmitter, Listener };
