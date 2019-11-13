import { getType } from "./utils";

export function proxy(
  resource: Record<string, any>,
  key: string,
  descriptor: PropertyDescriptor
): void;

export function proxy(
  resource: Record<string, any>,
  target: Record<string, any>
): void;


export function proxy(resource: Record<string, any>, targetOrkey: Record<string, any> | string, descriptor?: PropertyDescriptor):void{

  if (getType(targetOrkey) === "object") {
    for (const key in resource) {
      proxy(targetOrkey as Record<string, any>, key, {
        get: function getProxyData(){return resource[key]},
        set: function setProxyData(newVal){ resource[key] = newVal}
      });
    }
    return;
  }
  Object.defineProperty(resource, targetOrkey as string, {
    enumerable: true,
    configurable: true,
    ...descriptor
  });
}
