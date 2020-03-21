import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { ServersService } from "../servers.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor (private serversService: ServersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}